// ----- Home page styles -----
export const homeStyles = {
  main: "relative h-screen min-h-[700px] overflow-hidden bg-background text-foreground",
  video: "absolute inset-0 z-0 h-full w-full object-cover",
  overlay: "absolute inset-0 z-10 bg-black/50",
  section:
    "relative z-20 mx-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center px-5 pb-8 pt-28 text-center sm:px-8",

  nav: "animate-fade-down fixed inset-x-4 top-5 z-30 mx-auto max-w-[1200px] md:inset-x-8",
  navInner:
    "liquid-glass flex items-center justify-between gap-3 rounded-full px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:px-6",
  navLink: "font-display shrink-0 text-xl leading-none text-white sm:text-3xl",
  starButton:
    "liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition duration-300 hover:scale-[1.03] hover:text-white sm:px-5",
  starIcon: "h-4 w-4",

  idleContainer: "flex w-full flex-col items-center",
  fadeRise: "animate-fade-rise",
  fadeAway: "animate-fade-away",
  title:
    "font-display w-full max-w-5xl text-[2.5rem] leading-[1.05] tracking-tight text-white break-words sm:text-6xl md:text-7xl lg:whitespace-nowrap lg:text-[5.5rem] xl:text-[6.5rem]",
  emphasis: "not-italic text-muted-foreground",
  subtitle:
    "animate-fade-rise-delay mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg",
  formWrapper:
    "animate-fade-rise-delay-2 mt-10 flex w-full max-w-[700px] flex-col items-center gap-4",
  form: "liquid-glass flex w-full flex-col gap-3 rounded-[2rem] p-3 shadow-[0_26px_90px_rgba(0,0,0,0.32)]",
  label: "flex min-w-0 flex-1 items-center gap-3 px-3 py-2 sm:px-4",
  input:
    "w-full min-w-0 bg-transparent text-base font-medium text-white outline-none placeholder:text-white/48",
  yearRow: "flex flex-col gap-3 sm:flex-row sm:items-center",
  yearSelector:
    "liquid-glass flex flex-1 flex-wrap items-center gap-2 rounded-[1.5rem] px-3 py-3 text-left",
  yearLabel: "mr-1 text-sm font-semibold text-white/58",
  yearBtnBase: "rounded-full px-3 py-1.5 text-sm font-bold transition",
  yearSelected: "bg-white text-black",
  yearUnselected: "bg-white/[0.06] text-white/68 hover:text-white",
  submitBtn:
    "liquid-glass rounded-full px-6 py-3 text-sm font-bold text-white transition duration-300 hover:scale-[1.03] hover:bg-white/[0.04] sm:px-7 sm:text-base",
  footerNote: "text-sm font-medium text-muted-foreground",

  loadingContainer:
    "animate-fade-rise flex w-full max-w-[700px] flex-col items-center",
  loadingCard:
    "liquid-glass w-full rounded-[2rem] p-7 text-left shadow-[0_26px_90px_rgba(0,0,0,0.32)] sm:p-9",
  loadingTop: "flex items-center justify-between gap-5",
  loadingLabel:
    "text-sm font-bold uppercase tracking-[0.22em] text-white/48",
  loadingUsername:
    "mt-3 font-display text-4xl leading-none text-white sm:text-6xl",
  loadingAvatar:
    "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]",
  loadingStatus:
    "mt-8 flex items-center gap-3 text-base font-semibold text-white",
  loadingDot: 
    "h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.9)]",
  progressTrack: "mt-6 h-3 overflow-hidden rounded-full bg-white/10",
  progressFill: "h-full rounded-full bg-white transition-all duration-300",
  progressFooter:
    "mt-5 flex items-center justify-between text-sm font-medium text-muted-foreground",
  loadingGrid: "mt-8 grid gap-3 sm:grid-cols-3",
  queueItem:
    "rounded-2xl border border-white/10 bg-white/[0.035] p-4",
  queueLabel:
    "text-xs font-bold uppercase tracking-[0.18em] text-white/38",
  queueValue: "mt-2 text-lg font-bold text-white",

  readyContainer:
    "animate-fade-rise flex w-full max-w-[700px] flex-col items-center",
  readyCard:
    "liquid-glass w-full rounded-[2rem] p-3 shadow-[0_26px_90px_rgba(0,0,0,0.32)]",
  cardImage:
    "aspect-[1200/720] w-full rounded-[1.35rem] object-cover",
  actionRow: "mt-5 flex w-full flex-col gap-3 sm:flex-row",
  shareCard:
    "liquid-glass flex flex-1 flex-col rounded-2xl px-5 py-4 text-left transition duration-300 hover:scale-[1.02] hover:bg-white/[0.04]",
  actionText: "flex items-center gap-2 text-base font-bold text-white",
  actionSub: "mt-1 text-sm text-muted-foreground",
  resetBtn:
    "mt-4 text-sm font-semibold text-white/60 transition hover:text-white",
  spinner: 
    "h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white",

  errorContainer:
    "animate-fade-rise flex w-full max-w-[700px] flex-col items-center",
  errorCard:
    "liquid-glass w-full rounded-[2rem] p-7 text-left shadow-[0_26px_90px_rgba(0,0,0,0.32)] sm:p-9",
  errorLabel:
    "text-sm font-bold uppercase tracking-[0.22em] text-red-200/70",
  errorTitle:
    "mt-3 font-display text-4xl leading-none text-white sm:text-5xl",
  errorDesc: "mt-5 text-base leading-7 text-muted-foreground",
  errorBtn:
    "liquid-glass mt-6 rounded-full px-6 py-3 text-sm font-bold text-white transition duration-300 hover:scale-[1.03] hover:bg-white/[0.04]",
};
// ----- OG Image (GitWrapped card) styles -----
export const ogStyles = {
  // constants
  cardBg: "linear-gradient(180deg,rgba(24,29,36,.88),rgba(16,20,27,.82))",
  shades: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  svgBase: {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },

  // style objects (for inline styles)
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative",
    color: "#f0f6fc",
    background: "#010409",
    fontFamily: "Inter, Arial, sans-serif",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 15% 10%,rgba(56,139,253,.18),transparent 28%),radial-gradient(circle at 85% 15%,rgba(57,211,83,.18),transparent 25%),linear-gradient(145deg,#070b12,#0d1117,#070d16)",
  },
  glassBorder: {
    position: "absolute",
    left: 28,
    right: 28,
    top: 26,
    bottom: 26,
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 36,
    background:
      "linear-gradient(180deg,rgba(24,29,36,.88),rgba(16,20,27,.82))",
    backdropFilter: "blur(20px)",
    boxShadow:
      "0 28px 90px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.08)",
  },
  heatmapContainer: {
    position: "absolute",
    right: 72,
    top: 66,
    width: 340,
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    opacity: 0.76,
  },
  heatmapCell: {
    width: 17,
    height: 17,
    borderRadius: 4,
    border: "1px solid rgba(240,246,252,.06)",
  },
  mainContent: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "56px 64px",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  avatar: {
    borderRadius: 999,
    border: "4px solid rgba(255,255,255,.12)",
    boxShadow:
      "0 0 0 8px rgba(57,211,83,.08), 0 20px 45px rgba(0,0,0,.35)",
  },
  nameDetails: {
    display: "flex",
    flexDirection: "column",
  },
  usernameYear: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 24,
    color: "#8b949e",
  },
  separator: { color: "#30363d" },
  fullName: {
    marginTop: 8,
    maxWidth: 560,
    fontSize: 64,
    fontWeight: 900,
    lineHeight: 0.98,
    letterSpacing: -2.8,
    color: "#f0f6fc",
  },
  quote: {
    marginTop: 10,
    fontSize: 24,
    color: "#8b949e",
    fontWeight: 500,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 18px",
    borderRadius: 999,
    border: "1px solid rgba(63,185,80,.28)",
    background: "rgba(18,25,31,.9)",
    backdropFilter: "blur(16px)",
    boxShadow:
      "0 8px 30px rgba(0,0,0,.4), 0 0 24px rgba(63,185,80,.18)",
    color: "#c9d1d9",
    fontSize: 22,
    fontWeight: 700,
  },
  badgeDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "#3fb950",
  },
  statsRow: {
    display: "flex",
    alignItems: "stretch",
    gap: 32,
  },
  personalityCard: {
    width: 390,
    height: 260,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 22,
    borderRadius: 26,
    border: "1px solid rgba(255,255,255,.08)",
    background:
      "linear-gradient(180deg,rgba(24,29,36,.88),rgba(16,20,27,.82))",
    backdropFilter: "blur(20px)",
  },
  personalityCardContent: {
    display: "flex",
    flexDirection: "column",
  },
  personalityLabel: {
    fontSize: 20,
    color: "#8b949e",
    fontWeight: 700,
  },
  personalityTag: {
    marginTop: 14,
    fontSize: 25,
    fontWeight: 800,
    lineHeight: 1.06,
    letterSpacing: -0.8,
    color: "#f0f6fc",
  },
  personalityStatsRow: {
    display: "flex",
    gap: 12,
    marginTop: 14,
  },
  personalityStatItem: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 12,
    borderRadius: 18,
    background: "rgba(48,54,61,.46)",
    border: "1px solid rgba(139,148,158,.15)",
  },
  statLabel: {
    fontSize: 16,
    color: "#8b949e",
  },
  statValue: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: 800,
  },
  tilesContainer: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    height: 260,
  },
  tileBase: {
    width: 195,
    height: 122,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,.08)",
    background:
      "linear-gradient(180deg,rgba(24,29,36,.88),rgba(16,20,27,.82))",
    backdropFilter: "blur(20px)",
  },
  tileHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 17,
    color: "#8b949e",
    fontWeight: 500,
  },
  tileValue: {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: -1,
    color: "#f0f6fc",
  },
  footer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 32,
  },
  languagesContainer: {
    width: 600,
    display: "flex",
    flexDirection: "column",
  },
  languagesHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languagesTitle: {
    fontSize: 21,
    fontWeight: 800,
    color: "#c9d1d9",
  },
  languagesTotal: {
    fontSize: 17,
    color: "#8b949e",
  },
  progressBar: {
    display: "flex",
    width: "100%",
    height: 16,
    marginTop: 8,
    borderRadius: 999,
    overflow: "hidden",
    background: "#161b22",
    boxShadow: "inset 0 1px 2px rgba(255,255,255,.06)",
  },
  languagesList: {
    display: "flex",
    gap: 16,
    marginTop: 8,
    flexWrap: "wrap",
  },
  languageItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#c9d1d9",
    fontSize: 16,
    fontWeight: 500,
  },
  languagePercent: { color: "#8b949e" },
  footerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: 380,
    color: "#8b949e",
    fontSize: 20,
    lineHeight: 1.35,
    textAlign: "right",
  },
  footerRightTitle: {
    color: "#f0f6fc",
    fontSize: 28,
    fontWeight: 900,
  },
  footerRightSubtitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 400,
  },
};