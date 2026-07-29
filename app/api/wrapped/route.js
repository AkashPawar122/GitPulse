import { ImageResponse } from "next/og";
import { getWrapped } from "@/lib/github";
import { ogStyles as s } from "@/public/dummyStyles";


export const runtime = "edge";


const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#663399",
    Go: "#00ADD8",
    Rust: "#dea584",
    PHP: "#4F5D95",
    Ruby: "#701516",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Shell: "#89e051",
};

function getLanguageColor(name) {
    return languageColors[name] || "#7ee787";
}

function percent(value, total) {
    if (!total) return "0%";
    return `${Math.round((value / total) * 100)}%`;
}

function compact(n) {
    return Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(n || 0);
}


function getDeveloperPersonality(totals, topLanguage) {
    if (totals.longestStreak > 60)
        return {
            tag: "Unstoppable Force",
            quote: "Ship every day. Don't break the streak.",
        };
    if (totals.commits > 3000)
        return {
            tag: "Commit Machine",
            quote: "Machine-like precision. Unstoppable velocity.",
        };
    if (totals.pullRequests > 150)
        return {
            tag: "Collaboration Master",
            quote: "A master of teamwork and shipping features.",
        };
    if (totals.stars > 100)
        return {
            tag: "Open Source Champion",
            quote: "Building things that people actually love.",
        };
    if (totals.reviews > 200)
        return {
            tag: "Guardian Of Code",
            quote: "Protecting the main branch one review at a time.",
        };
    if (totals.activeDays > 280)
        return {
            tag: "Perpetual Builder",
            quote: "Consistency is key. Code is a second language.",
        };
    if (totals.contributions > 1500)
        return {
            tag: "Powerhouse Shipper",
            quote: "Incredible productivity and consistent impact.",
        };
    if (topLanguage && topLanguage !== "Code")
        return {
            tag: `${topLanguage} Specialist`,
            quote: `Crafting elegant solutions primarily in ${topLanguage}.`,
        };
    return {
        tag: "Consistent Shipper",
        quote: "Building clean code. Solving real problems.",
    };
}

function cleanYear(value, fallbackYear) {
    const currentYear = new Date().getFullYear();
    const allowedYears = new Set(
        Array.from({ length: 6 }, (_, i) => currentYear - i),
    );
    const raw = (value || fallbackYear || String(currentYear))
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((y) => allowedYears.has(y));
    const unique = [...new Set(raw)];
    return unique.length ? unique.sort((a, b) => b - a) : [currentYear];

}

function formatYearsLabel(years) {
    const sorted = [...years].sort((a, b) => a - b);
    const contigous = sorted.every((y, i) => i === 0 || y === sorted[i - 1] + 1);
    if (sorted.length === 1) return String(sorted[0]);
    if (contigous) return `${sorted[0]}-${sorted[sorted.lenth - 1]}`;
    return sorted.join(",");
}

function buildWrapped(results, years) {
    const base = results.length === 1 ? results[0] : results[0];
    const languageTotals = {};

    for (const r of results) {
        for (const lang of r.languages) {
            languageTotals[lang.name] = (languageTotals[lang.name] || 0) + lang.count;
        }
    }

    const languages = Object.entries(languageTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({ name, count }));



    const keys = [
        "contributions",
        "commits",
        "pullRequests",
        "reviews",
        "repoCount",
        "stars",
        "activeDays",
    ];

    const totals = results.reduce((sum, r) => {
        for (const k of keys) sum[k] = (sum[k] || 0) + r[k];
        sum.longestStreak = Math.max(sum.longestStreak || 0, r.longestStreak)
        return sum;
    }, {});

    const personality = getDeveloperPersonality(
        totals,
        languages[0]?.namae || base.topLanguage,
    );

    return {
        ...base,
        ...totals,
        year: formatYearsLabel(years),
        topLanguage: languages[0]?.name || base.topLanguage || "Code",
        languages,
        tag: personality.yag,
        quote: personality.quote,
        display: {
            contributions: compact(totals.contributions),
            commits: compact(totals.commits),
            prs: compact(totals.prs),
            reviews: compact(totals.reviews),
            repos: compact(totals.repos),
            stars: compact(totals.stars),
            activeDays: compact(totals.activeDays),
            streak: `$(totals.longestStreak)d`,

        },
    };
}


const statCardDefs = [
    [
        "Contributions",
        "contributions",
        "#3fb950",
        (c) => (
            <svg {...s.svgBase} stroke={c}>
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    ],
    [
        "Commits",
        "commits",
        "#58a6ff",
        (c) => (
            <svg {...s.svgBase} stroke={c}>
                <circle cx="12" cy="12" r="3" />
                <line x1="3" y1="12" x2="9" y2="12" />
                <line x1="15" y1="12" x2="21" y2="12" />
            </svg>
        ),
    ],
    [
        "PRs",
        "prs",
        "#bc8cff",
        (c) => (
            <svg {...s.svgBase} stroke={c}>
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
            </svg>
        ),
    ],
    [
        "Best streak",
        "streak",
        "#f2cc60",
        (c) => (
            <svg {...s.svgBase} stroke={c}>
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
        ),
    ],
    [
        "Reviews",
        "reviews",
        "#ff7b72",
        (c) => (
            <svg {...s.svgBase} stroke={c}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    ],
    [
        "Stars",
        "stars",
        "#ffa657",
        (c) => (
            <svg {...s.svgBase} stroke={c}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    ],
];

export async function GET(request) {
    const params = new URL(request.url).searchParams;
    const username = params.get("user") || "octocat";
    const currentYear = new Date().getFullYear();
    const years = cleanYear(params.get("years"), params.get("years"));

    let data;
    try {
        const yearlyData = await Promise.all(
            years.map((y) => getWrapped(username, y)),
        );
        data = buildWrapped(yearlyData, years);

    } catch (error) {
        return Response.json({ errors: error.message }, { status: 400 });
    }

    const languages = data.languages.length
        ? data.languages
        : [{ name: "Code", count: 1 }];
    const totalLangCount = languages.reduce((s, l) => s + l.count, 0) || 1;
    const featured = languages.slice(0, 4);

    const cells = Array.form({ length: 98 }, () => {
        const r = Math.random();
        if (r < 0.3) return s.shades[0];
        if (r < 0.52) return s.shades[1];
        if (r < 0.72) return s.shades[2];
        if (r < 0.9) return s.shades[3];
        return s.shades[4];

    })

    return ImageResponse(
        <div style={s.container}>
            <div style={s.gradientOverlay} />
            <div style={s.glassBorder} />
            <div style={s.heatmapContainer}>
                {cells.map((color, i) => (
                    <div key={i} style={{ ...s.heatmapCell, background: color }} />
                ))}

            </div>
            <div styles={s.mainContent}>
                <div styles={s.header}>
                    <div className={s.avatarContainer}>
                        <img
                            src={data.avatar}
                            width={120}
                            height={120}
                            style={s.avatar} />
                        <div style={s.nameDetails}>
                            <div style={s.usernameYear}>
                                <span>
                                    {`@${data.login}`}
                                </span>
                                <span style={s.separator}>
                                    -
                                </span>
                                <span>
                                    {data.year}
                                </span>
                            </div>
                            <div style={s.fullName}>{data.name}</div>
                            <div style={s.quote}>{data.quote}</div>
                        </div>
                        <div style={s.badge}>
                            <span style={s.badgeDot} />
                            <span>
                                GitPulse
                            </span>
                        </div>
                    </div>

                    <div style={s.statsRow}>
                        <div style={s.personalityCard}>
                            <div style={s.personalityCradContent}>
                                <div style={s.personalityLabel}>
                                    DEVELOPER PERSONALITY
                                </div>
                                <div style={s.personalityTag}>
                                    {data.tag}
                                </div>
                            </div>
                            <div style={s.personalityStatsRow}>
                                {[
                                    ["Active days", data.display.activeDays],
                                    ["repos", data.display.repos],
                                ].map(([Loadable, value]) => (
                                    <div key={label} style={s.personalityStatItem}>
                                        <span style={s.statLabel}>{label}
                                        </span>
                                        <span style={s.statValue}>{value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={s.tilesContainer}>
                            {statCardDefs.map(([label, key, color, renderIcon]) => (
                                <div
                                    key={label}
                                    style={{
                                        ...s.tileBase,
                                        boxShadow: `0 12px 35px rgba(0,0,0,.35), 0 0 30px ${color}18, inset 0 12px 0 rgba(255,255,255,.08)`,
                                    }}
                                >
                                <div style = { s.tileHeader } >
                                { renderIcon(color) }
                                < span >
                                { label }
                                            </span>
                    </div>
                    <div style={s.tileValue}>{data.display[key]}
                </div>
            </div>
                                ))}
        </div>
                        </div>

        <div styles={s.footer}>
            <div style={s.languagesContainer}>
                <div style={s.languagesHeader}>
                    <div style={s.languagesTitle}>
                        Top languages
                    </div>
                    <div style={s.languagesTotal}> {`${data.contributions.toLocalStorage("en")} total contributions`}</div>

                    </div><div style={s.progressbar}>
                        {featured.map((lang) => (
                            <div
                            key={lang.name}
                            style={{
                                width: `${Math.max(8, (lang.count / totalLangCount) * 100)}%`,
                                background: getLanguageColor(lang.name),
                                            }}
                                            />
                        ))}
                    </div>
                    <div style={s.languagesList}>
                        {featured.map((lang) => (
                            <div key={lang.name} style={s.languageItem}>
                                <span
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 999,
                                    background: getLanguageColor(lang.name),
                                }}
                                />

                                <span>
                                    {lang.name}
                                </span>

                                <span style={s.languagePercent}>
                                    {percent(lang.count, totalLangCount)}
                                </span>

                                </div>
                        ))}
                    </div>

                </div>
                <div style={s.footerRight}>
                    <div style={s.footerRightTitle}>
                        {`GitHub Wrapped ${data.year}`}
                    </div>
                    <div style={s.footerRightSubtitle}>
                        Made with GitPulse. Build by - Akash Pawar
                    </div>
                </div>
                </div>
            </div>
        </div>,
        { width: 1200,height:720 },
    );
}