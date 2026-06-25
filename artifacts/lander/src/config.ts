// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  THEME TOGGLE — change to "shein" to switch the whole site
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const THEME = "shein" as "apple" | "shein";

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
const themes = {
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
    // Buttons / primary
    primary: "#000000",
    primaryActive: "#1a1a1a",
    // Timer bar
    timerBg: "#030712",
    timerCountdown: "#38bdf8",
    // Live badge
    badgeBg: "#f0fdf4",
    badgeBorder: "#bbf7d0",
    badgeText: "#15803d",
    badgeDot: "#22c55e",
    // Spots box
    spotsBg: "#f0fdf4",
    spotsBorder: "#bbf7d0",
    spotsText: "#15803d",
    // Disclaimer
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
    // Buttons / primary
    primary: "#db2777",
    primaryActive: "#9d174d",
    // Timer bar
    timerBg: "#831843",
    timerCountdown: "#f9a8d4",
    // Live badge
    badgeBg: "#fdf2f8",
    badgeBorder: "#fbcfe8",
    badgeText: "#9d174d",
    badgeDot: "#ec4899",
    // Spots box
    spotsBg: "#fdf2f8",
    spotsBorder: "#fbcfe8",
    spotsText: "#9d174d",
    // Disclaimer
    disclaimer: "Not affiliated with SHEIN Group, TikTok, or Meta (Facebook/Instagram). SHEIN is a registered trademark.",
  },
} as const;

export const T = themes[THEME];
