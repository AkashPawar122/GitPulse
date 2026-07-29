export function personalityTag(stats) {
  const top = stats.topLanguage || "code";

  if (stats.longestStreak >= 14) return `relentless ${top} shipper with calendar discipline`;
  if (stats.commits >= 500) return `high-output ${top} engine with main-character commit energy`;
  if (stats.repoCount >= 25) return `curious builder collecting side quests in ${top}`;
  if (stats.languageCount >= 6) return `polyglot debugger who speaks fluent ${top}`;
  if (stats.stars >= 50) return `tasteful ${top} maker with repo shelf appeal`;
  return `quietly consistent ${top} crafter with clean-room focus`;
}