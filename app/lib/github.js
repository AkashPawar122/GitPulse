import { personalityTag } from "./personality";

const currentYear = new Date().getFullYear();

function cleanUser(username) {
  return username.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 39);
}

function cleanYear(value) {
  const year = Number(value) || currentYear;
  return Math.min(currentYear, Math.max(2008, year));
}

function compact(n) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n || 0);
}

async function graphql(query, variables) {
  if (!process.env.GITHUB_TOKEN) throw new Error("Add GITHUB_TOKEN to load full-year GitHub analytics");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "dev-wrapped",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 * 60 },
  });

  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(json.errors?.[0]?.message || "GitHub API limit hit");
  return json.data;
}

function streaks(days) {
  let best = 0;
  let current = 0;
  let activeDays = 0;
  let busiest = { date: "", count: 0 };

  for (const day of days) {
    if (day.contributionCount > 0) {
      current += 1;
      activeDays += 1;
    } else {
      current = 0;
    }

    if (day.contributionCount > busiest.count) busiest = { date: day.date, count: day.contributionCount };
    best = Math.max(best, current);
  }

  return { activeDays, busiest, longestStreak: best };
}

function languageStats(repos) {
  const totals = {};

  for (const item of repos) {
    const language = item.repository.primaryLanguage?.name || "Other";
    totals[language] = (totals[language] || 0) + item.contributions.totalCount;
  }

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }));
}

const query = `
  query DevWrapped($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      name
      avatarUrl
      followers { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          isFork
          stargazerCount
          createdAt
        }
      }
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalRepositoryContributions
        restrictedContributionsCount
        commitContributionsByRepository(maxRepositories: 25) {
          contributions { totalCount }
          repository {
            nameWithOwner
            stargazerCount
            primaryLanguage { name }
          }
        }
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function getWrapped(username, requestedYear) {
  const login = cleanUser(username);
  const year = cleanYear(requestedYear);
  if (!login) throw new Error("Enter a GitHub username");

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;
  const data = await graphql(query, { login, from, to });
  if (!data.user) throw new Error("GitHub user not found");

  const user = data.user;
  const collection = user.contributionsCollection;
  const ownedRepos = user.repositories.nodes.filter((repo) => !repo.isFork);
  const days = collection.contributionCalendar.weeks.flatMap((week) => week.contributionDays);
  const languages = languageStats(collection.commitContributionsByRepository);
  const yearlyRepos = ownedRepos.filter((repo) => repo.createdAt.startsWith(`${year}-`)).length;
  const { activeDays, busiest, longestStreak } = streaks(days);

  const stats = {
    year,
    login: user.login,
    name: user.name || user.login,
    avatar: user.avatarUrl,
    followers: user.followers.totalCount,
    commits: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    reviews: collection.totalPullRequestReviewContributions,
    issues: collection.totalIssueContributions,
    contributions: collection.contributionCalendar.totalContributions,
    repoCount: collection.totalRepositoryContributions || yearlyRepos,
    stars: collection.commitContributionsByRepository.reduce(
      (sum, item) => sum + item.repository.stargazerCount,
      0,
    ),
    activeDays,
    busiestDay: busiest.date,
    busiestCount: busiest.count,
    longestStreak,
    privateCount: collection.restrictedContributionsCount,
    topLanguage: languages[0]?.name || "Code",
    languageCount: languages.length,
    languages,
  };

  return {
    ...stats,
    tag: personalityTag(stats),
    display: {
      contributions: compact(stats.contributions),
      commits: compact(stats.commits),
      prs: compact(stats.pullRequests),
      reviews: compact(stats.reviews),
      repos: compact(stats.repoCount),
      stars: compact(stats.stars),
      activeDays: compact(stats.activeDays),
      streak: `${stats.longestStreak}d`,
    },
  };
}