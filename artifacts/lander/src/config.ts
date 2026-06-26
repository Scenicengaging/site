// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  THEME TOGGLE — change to any key below to switch the whole site
//  Options: "apple" | "shein" | "amazon" | "walmart" | "cashapp"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const THEME = "shein" as "apple" | "shein" | "amazon" | "walmart" | "cashapp";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FEATURE FLAGS — set any to false to hide it from the page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const FEATURES = {
  timerBar:               true,  // Countdown bar at the very top
  stepProgress:           true,  // "Step 2 of 3" progress indicator
  socialProof:            true,  // "$XXX,XXX earned this week" banner
  liveBadge:              true,  // "Rewards being claimed right now" pill
  notificationToasts:     true,  // Pop-up activity toasts every 45 s
  rewardCalculator:       true,  // Spend → earn slider
  faqSection:             true,  // Collapsible FAQ accordion
  spotsCounter:           true,  // "Limited spots remaining" urgency box
  stickyCtaBtn:           true,  // Sticky CTA that appears on scroll
  processingInterstitial: true,  // "Reserving your spot…" overlay on click
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AFFILIATE LINK — one place to change the offer URL everywhere
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const OFFER_URL = "https://example.com/offer";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EXIT PAGE SLUGS — add/remove slugs for the browser-escape page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const EXIT_SLUGS = ["go", "start", "tiktok", "exit"];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  THEME DEFINITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const THEMES = {
  apple: {
    brandName: "Apple Cash",
    rewardLabel: "$750 Apple Cash",
    heroImage: "apple-cash.png",
    heroAlt: "$750 Apple Cash Card",
    heroWhiteBg: false,
    headline: "$750 Apple Cash",
    subheadline: "Complete simple tasks & get rewarded instantly",
    ctaText: "Claim My $750 Now →",
    exitHeadline: ["Your $750 reward is", "waiting for you"],
    exitBadgeLabel: "$750 Apple Cash",
    cardGlow: "from-yellow-300/30 via-green-300/20 to-blue-300/30",
    primary: "#000000",
    primaryActive: "#1a1a1a",
    timerBg: "#030712",
    timerCountdown: "#38bdf8",
    badgeBg: "#f0fdf4",
    badgeBorder: "#bbf7d0",
    badgeText: "#15803d",
    badgeDot: "#22c55e",
    spotsBg: "#f0fdf4",
    spotsBorder: "#bbf7d0",
    spotsText: "#15803d",
    disclaimer: "Not affiliated with Apple Inc., TikTok, or Meta (Facebook/Instagram). Apple Cash is a trademark of Apple Inc.",
  },
  shein: {
    brandName: "Shein",
    rewardLabel: "$750 Shein Gift Card",
    heroImage: "shein-logo.png",
    heroAlt: "Shein $750 Gift Card",
    heroWhiteBg: true,
    headline: "$750 Shein Gift Card",
    subheadline: "Complete simple tasks & get rewarded instantly ✨",
    ctaText: "Claim My $750 Now 💅",
    exitHeadline: ["Your $750 Shein reward", "is waiting for you"],
    exitBadgeLabel: "$750 Shein Gift Card",
    cardGlow: "from-pink-300/40 via-rose-200/30 to-fuchsia-300/30",
    primary: "#db2777",
    primaryActive: "#9d174d",
    timerBg: "#831843",
    timerCountdown: "#f9a8d4",
    badgeBg: "#fdf2f8",
    badgeBorder: "#fbcfe8",
    badgeText: "#9d174d",
    badgeDot: "#ec4899",
    spotsBg: "#fdf2f8",
    spotsBorder: "#fbcfe8",
    spotsText: "#9d174d",
    disclaimer: "Not affiliated with SHEIN Group, TikTok, or Meta (Facebook/Instagram). SHEIN is a registered trademark.",
  },
  amazon: {
    brandName: "Amazon",
    rewardLabel: "$750 Amazon Gift Card",
    heroImage: "amazon-logo.svg",
    heroAlt: "$750 Amazon Gift Card",
    heroWhiteBg: true,
    headline: "$750 Amazon Gift Card",
    subheadline: "Complete simple tasks & get rewarded instantly",
    ctaText: "Claim My $750 Now →",
    exitHeadline: ["Your $750 Amazon reward", "is waiting for you"],
    exitBadgeLabel: "$750 Amazon Gift Card",
    cardGlow: "from-orange-300/30 via-yellow-200/20 to-amber-300/30",
    primary: "#FF9900",
    primaryActive: "#e68a00",
    timerBg: "#232F3E",
    timerCountdown: "#FF9900",
    badgeBg: "#fffbeb",
    badgeBorder: "#fde68a",
    badgeText: "#92400e",
    badgeDot: "#f59e0b",
    spotsBg: "#fffbeb",
    spotsBorder: "#fde68a",
    spotsText: "#92400e",
    disclaimer: "Not affiliated with Amazon.com, Inc., TikTok, or Meta (Facebook/Instagram). Amazon is a trademark of Amazon.com, Inc.",
  },
  walmart: {
    brandName: "Walmart",
    rewardLabel: "$750 Walmart Gift Card",
    heroImage: "walmart-logo.svg",
    heroAlt: "$750 Walmart Gift Card",
    heroWhiteBg: true,
    headline: "$750 Walmart Gift Card",
    subheadline: "Complete simple tasks & get rewarded instantly",
    ctaText: "Claim My $750 Now →",
    exitHeadline: ["Your $750 Walmart gift", "is waiting for you"],
    exitBadgeLabel: "$750 Walmart Gift Card",
    cardGlow: "from-blue-300/30 via-sky-200/20 to-cyan-300/30",
    primary: "#0071CE",
    primaryActive: "#005fa3",
    timerBg: "#004990",
    timerCountdown: "#FFC220",
    badgeBg: "#eff6ff",
    badgeBorder: "#bfdbfe",
    badgeText: "#1e40af",
    badgeDot: "#3b82f6",
    spotsBg: "#eff6ff",
    spotsBorder: "#bfdbfe",
    spotsText: "#1e40af",
    disclaimer: "Not affiliated with Walmart Inc., TikTok, or Meta (Facebook/Instagram). Walmart is a registered trademark of Walmart Inc.",
  },
  cashapp: {
    brandName: "Cash App",
    rewardLabel: "$750 Cash App Bonus",
    heroImage: "cashapp-logo.svg",
    heroAlt: "$750 Cash App Bonus",
    heroWhiteBg: false,
    headline: "$750 Cash App Bonus",
    subheadline: "Complete simple tasks & get rewarded instantly 💸",
    ctaText: "Claim My $750 Now 💰",
    exitHeadline: ["Your $750 Cash App bonus", "is waiting for you"],
    exitBadgeLabel: "$750 Cash App",
    cardGlow: "from-green-300/40 via-emerald-200/30 to-teal-300/30",
    primary: "#00C244",
    primaryActive: "#009933",
    timerBg: "#027336",
    timerCountdown: "#ffffff",
    badgeBg: "#f0fdf4",
    badgeBorder: "#bbf7d0",
    badgeText: "#15803d",
    badgeDot: "#22c55e",
    spotsBg: "#f0fdf4",
    spotsBorder: "#bbf7d0",
    spotsText: "#15803d",
    disclaimer: "Not affiliated with Block, Inc., TikTok, or Meta (Facebook/Instagram). Cash App is a trademark of Block, Inc.",
  },
} as const;

export const T = THEMES[THEME];
