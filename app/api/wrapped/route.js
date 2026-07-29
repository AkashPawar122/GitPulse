import { ImageResponse} from "next/og";
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