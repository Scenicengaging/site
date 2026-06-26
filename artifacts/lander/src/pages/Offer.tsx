import { useEffect, useState, useRef } from "react";
import { THEMES } from "@/config";
import { loadAdminConfig } from "@/adminConfig";
import { useOfferUrl } from "@/useOfferUrl";

const COOKIE_KEY = "lander_timer_end";
const SPOTS_COOKIE = "lander_spots";
const EARNED_COOKIE = "lander_earned";
const SPOTS_TICK_MS = 90_000;
const EARNED_TICK_MS = 12_000;

// ── Spots ──────────────────────────────────────────────────────────
function getSpots(): { count: number; nextTick: number } {
  const raw = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${SPOTS_COOKIE}=`))
    ?.split("=")[1];
  if (raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      if (typeof parsed.count === "number" && typeof parsed.nextTick === "number") {
        const now = Date.now();
        let { count, nextTick } = parsed;
        while (now >= nextTick && count > 1) { count--; nextTick += SPOTS_TICK_MS; }
        return { count, nextTick };
      }
    } catch {}
  }
  const count = Math.floor(Math.random() * 9) + 9;
  return { count, nextTick: Date.now() + SPOTS_TICK_MS };
}
function saveSpots(count: number, nextTick: number) {
  const val = encodeURIComponent(JSON.stringify({ count, nextTick }));
  document.cookie = `${SPOTS_COOKIE}=${val}; path=/; max-age=${7 * 24 * 3600}`;
}

// ── Earned counter ─────────────────────────────────────────────────
function getEarned(): { amount: number; nextTick: number } {
  const raw = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${EARNED_COOKIE}=`))
    ?.split("=")[1];
  if (raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      if (typeof parsed.amount === "number" && typeof parsed.nextTick === "number") {
        const now = Date.now();
        let { amount, nextTick } = parsed;
        while (now >= nextTick) {
          amount += Math.floor(Math.random() * 70) + 15;
          nextTick += EARNED_TICK_MS;
        }
        return { amount, nextTick };
      }
    } catch {}
  }
  // First visit: random value between $512k and $748k
  const amount = 512_000 + Math.floor(Math.random() * 236_001);
  return { amount, nextTick: Date.now() + EARNED_TICK_MS };
}
function saveEarned(amount: number, nextTick: number) {
  const val = encodeURIComponent(JSON.stringify({ amount, nextTick }));
  document.cookie = `${EARNED_COOKIE}=${val}; path=/; max-age=${7 * 24 * 3600}`;
}
function formatEarned(n: number) {
  return "$" + n.toLocaleString("en-US");
}

// ── Notifications ──────────────────────────────────────────────────
const FIRST_NAMES = [
  "Ashley","Brandon","Christina","Derek","Emma","Frank","Grace","Henry",
  "Isabella","Jake","Karen","Liam","Mia","Nathan","Olivia","Patrick",
  "Quinn","Rachel","Samuel","Tiffany","Victoria","William","Yvonne","Zachary",
  "Amber","Brett","Cassidy","Dylan","Elena","Felix","Gianna","Harold",
  "Iris","Jordan","Kelsey","Logan","Madison","Noah","Paige","Ryan","Savannah",
  "Tyler","Vanessa","Wesley",
];
const LAST_INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MESSAGES = [
  (n: string) => `${n} completed 7 deals and redeemed $250`,
  (n: string) => `${n} completed 5 deals and redeemed $100`,
  (n: string) => `${n} completed 10 deals and got $750`,
  (n: string) => `${n} submitted a product review for a bonus $750`,
];
function randomName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)];
  return `${first} ${last}.`;
}
function randomMessage() {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)](randomName());
}

// ── Timer ──────────────────────────────────────────────────────────
function getTimerEnd(): number {
  const cookieVal = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${COOKIE_KEY}=`))
    ?.split("=")[1];
  if (cookieVal) {
    const val = parseInt(cookieVal, 10);
    if (!isNaN(val) && val > Date.now()) return val;
  }
  const minSec = 14 * 60 + 12;
  const maxSec = 14 * 60 + 48;
  const startSeconds = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
  const endTs = Date.now() + startSeconds * 1000;
  document.cookie = `${COOKIE_KEY}=${endTs}; path=/; max-age=${7 * 24 * 3600}`;
  return endTs;
}
function formatTime(ms: number) {
  if (ms <= 0) return "00:00";
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// ── FAQ data ────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is this offer real?",
    a: "Yes. We partner with legitimate reward networks that have paid out to thousands of verified users. All offers are completely free to complete — you'll never be asked for payment.",
  },
  {
    q: "How long until I receive my reward?",
    a: "Most users receive their reward within 24–72 hours of completing the required steps. Some rewards are processed the same day.",
  },
  {
    q: "What tasks do I need to complete?",
    a: "After signing up you'll complete sponsored offers — such as free trials, surveys, or app downloads. The more offers you complete, the more you earn. Free offers get you started, but completing paid deals unlocks bigger rewards faster. Spending up to $200 across offers can qualify you for the full $750 reward.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. All data is protected by SSL encryption and we never sell or share your personal information with any third parties.",
  },
];

interface Notif { id: number; text: string; visible: boolean; }

export default function Offer() {
  const [adminCfg] = useState(loadAdminConfig);
  const FEATURES = adminCfg.features;
  const T = THEMES[adminCfg.theme];
  const offerUrl = useOfferUrl(adminCfg.offerUrl);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerEndRef = useRef(0);
  const [notif, setNotif] = useState<Notif | null>(null);
  const notifIdRef = useRef(0);
  const [spots, setSpots] = useState(0);
  const spotsRef = useRef({ count: 0, nextTick: 0 });
  const [earned, setEarned] = useState(0);
  const earnedRef = useRef({ amount: 0, nextTick: 0 });
  const [stickyBtn, setStickyBtn] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [spendAmount, setSpendAmount] = useState(0);
  const mainCtaRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    if (!FEATURES.timerBar) return;
    timerEndRef.current = getTimerEnd();
    const tick = () => setTimeLeft(Math.max(0, timerEndRef.current - Date.now()));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, []);

  // Spots
  useEffect(() => {
    if (!FEATURES.spotsCounter) return;
    const initial = getSpots();
    spotsRef.current = initial;
    setSpots(initial.count);
    saveSpots(initial.count, initial.nextTick);
    const id = setInterval(() => {
      if (Date.now() >= spotsRef.current.nextTick && spotsRef.current.count > 1) {
        const next = { count: spotsRef.current.count - 1, nextTick: spotsRef.current.nextTick + SPOTS_TICK_MS };
        spotsRef.current = next;
        setSpots(next.count);
        saveSpots(next.count, next.nextTick);
      }
    }, 5_000);
    return () => clearInterval(id);
  }, []);

  // Earned counter
  useEffect(() => {
    if (!FEATURES.socialProof) return;
    const initial = getEarned();
    earnedRef.current = initial;
    setEarned(initial.amount);
    saveEarned(initial.amount, initial.nextTick);
    const id = setInterval(() => {
      if (Date.now() >= earnedRef.current.nextTick) {
        const increment = Math.floor(Math.random() * 70) + 15;
        const next = { amount: earnedRef.current.amount + increment, nextTick: earnedRef.current.nextTick + EARNED_TICK_MS };
        earnedRef.current = next;
        setEarned(next.amount);
        saveEarned(next.amount, next.nextTick);
      }
    }, 3_000);
    return () => clearInterval(id);
  }, []);

  // Sticky CTA observer
  useEffect(() => {
    if (!FEATURES.stickyCtaBtn) return;
    const el = mainCtaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setStickyBtn(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Notification toasts
  useEffect(() => {
    if (!FEATURES.notificationToasts) return;
    function show() {
      const id = ++notifIdRef.current;
      setNotif({ id, text: randomMessage(), visible: true });
      setTimeout(() => {
        setNotif((p) => (p?.id === id ? { ...p, visible: false } : p));
        setTimeout(() => setNotif((p) => (p?.id === id ? null : p)), 500);
      }, 4500);
    }
    show();
    const id = setInterval(show, 45_000);
    return () => clearInterval(id);
  }, []);

  // CTA handler — opens URL immediately (avoids popup blocker), shows interstitial on this tab
  function handleCtaClick() {
    window.open(offerUrl, "_blank", "noopener,noreferrer");
    if (FEATURES.processingInterstitial) {
      setShowInterstitial(true);
      setTimeout(() => setShowInterstitial(false), 2_800);
    }
  }

  const base = import.meta.env.BASE_URL;
  const lbase = base.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-5 pt-0 pb-8">

      {/* Processing interstitial overlay */}
      {showInterstitial && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-5 px-8">
          <div
            className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-current animate-spin"
            style={{ borderTopColor: T.primary }}
          />
          <div className="text-center">
            <p className="text-[20px] font-bold text-gray-900">Reserving your spot…</p>
            <p className="text-gray-500 text-[14px] mt-1">Please wait, this only takes a moment.</p>
          </div>
          <div
            className="text-[12px] font-semibold px-4 py-1.5 rounded-full"
            style={{ backgroundColor: T.badgeBg, color: T.badgeText }}
          >
            🔒 Secure &amp; Free — No payment required
          </div>
        </div>
      )}

      {/* Timer bar */}
      {FEATURES.timerBar && (
        <div
          className="w-full text-white text-center py-2.5 text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2 -mx-5 mb-6"
          style={{ width: "calc(100% + 2.5rem)", backgroundColor: T.timerBg }}
        >
          <span>⏱</span>
          <span>Offer expires in</span>
          <span className="font-bold tabular-nums text-[14px]" style={{ color: T.timerCountdown }}>
            {formatTime(timeLeft)}
          </span>
        </div>
      )}

      {/* Step progress */}
      {FEATURES.stepProgress && (
        <div className="w-full max-w-sm flex items-center gap-0 mb-2">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold" style={{ backgroundColor: T.primary }}>✓</div>
            <span className="text-[10px] font-medium text-gray-400">Verify Age</span>
          </div>
          <div className="h-[2px] flex-1 mb-4" style={{ backgroundColor: T.primary }} />
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold" style={{ backgroundColor: T.primary }}>2</div>
            <span className="text-[10px] font-bold" style={{ color: T.primary }}>Claim Offer</span>
          </div>
          <div className="h-[2px] flex-1 mb-4 bg-gray-200" />
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 text-[12px] font-bold bg-gray-100">3</div>
            <span className="text-[10px] font-medium text-gray-400">Get Rewarded</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* Hero image */}
        <div className="relative w-full">
          {!T.heroWhiteBg && (
            <div className={`absolute inset-0 bg-gradient-to-br ${T.cardGlow} rounded-[28px] blur-2xl scale-95 translate-y-4`} />
          )}
          {T.heroWhiteBg ? (
            <div className="relative bg-white rounded-[22px] p-8 flex items-center justify-center">
              <img src={`${base}${T.heroImage}`} alt={T.heroAlt} className="w-full h-auto max-h-48 object-contain" />
            </div>
          ) : (
            <img src={`${base}${T.heroImage}`} alt={T.heroAlt} className="relative w-full rounded-[22px] shadow-2xl" />
          )}
        </div>

        {/* Social proof total */}
        {FEATURES.socialProof && earned > 0 && (
          <div
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 border"
            style={{ backgroundColor: T.badgeBg, borderColor: T.badgeBorder }}
          >
            <span className="text-lg">📈</span>
            <p className="text-[13px]" style={{ color: T.badgeText }}>
              <span className="font-extrabold tabular-nums">{formatEarned(earned)}</span>
              {" "}earned by members this week
            </p>
          </div>
        )}

        {/* Headline */}
        <div className="text-center">
          <h1 className="text-[34px] font-extrabold text-gray-900 tracking-tight leading-none">{T.headline}</h1>
          <p className="mt-2 text-gray-500 text-[15px]">{T.subheadline}</p>
        </div>

        {/* Live badge */}
        {FEATURES.liveBadge && (
          <div className="flex items-center gap-2 rounded-full px-4 py-1.5 border" style={{ backgroundColor: T.badgeBg, borderColor: T.badgeBorder }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: T.badgeDot }} />
            <span className="text-xs font-semibold" style={{ color: T.badgeText }}>Rewards being claimed right now</span>
          </div>
        )}

        {/* CTA */}
        <div ref={mainCtaRef} className="w-full">
          <button
            onClick={handleCtaClick}
            className="pulse-btn block w-full text-white font-bold text-[18px] py-5 rounded-2xl shadow-xl text-center transition-opacity active:opacity-80 cursor-pointer border-0"
            style={{ backgroundColor: T.primary }}
          >
            {T.ctaText}
          </button>
        </div>

        {/* How It Works */}
        <div className="w-full">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center mb-3">How It Works</p>
          <div className="flex flex-col gap-3">
            <Step number={1} title="Enter your email address" subtitle="For notifications & to receive rewards" color={T.primary} />
            <Step number={2} title="Complete 2–3 simple offers" subtitle="The more you do, the more you earn" color={T.primary} />
            <Step number={3} title="Receive your reward" subtitle="Sent directly to your account" color={T.primary} />
          </div>
        </div>

        {/* Reward Calculator */}
        {FEATURES.rewardCalculator && (
          <div className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center mb-1">Reward Calculator</p>
            <p className="text-[12px] text-gray-400 text-center mb-5">Slide to see how much you can earn</p>

            {/* Earn display */}
            <div className="text-center mb-5">
              <p className="text-[13px] text-gray-500 mb-0.5">You could earn up to</p>
              <p className="text-[42px] font-extrabold tabular-nums leading-none" style={{ color: T.primary }}>
                ${Math.round(50 + (spendAmount / 200) * 700).toLocaleString("en-US")}
              </p>
              <p className="text-[12px] text-gray-400 mt-1">
                {spendAmount === 0
                  ? "completing free offers only"
                  : `by investing $${spendAmount} in sponsored deals`}
              </p>
            </div>

            {/* Slider */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={spendAmount}
                onChange={(e) => setSpendAmount(Number(e.target.value))}
                className="reward-slider w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${T.primary} 0%, ${T.primary} ${(spendAmount / 200) * 100}%, #e5e7eb ${(spendAmount / 200) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-[11px] text-gray-400">
                <span>$0</span>
                <span>$50</span>
                <span>$100</span>
                <span>$150</span>
                <span>$200</span>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        {FEATURES.faqSection && (
          <div className="w-full">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center mb-3">Frequently Asked Questions</p>
            <div className="flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-[14px] text-gray-800 leading-snug">{faq.q}</span>
                    <span
                      className="text-gray-400 text-[20px] font-light flex-shrink-0 transition-transform duration-200 leading-none"
                      style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pt-2 bg-white">
                      <p className="text-[13px] text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spots remaining — below FAQ */}
        {FEATURES.spotsCounter && (
          <div className="w-full rounded-2xl px-5 py-4 border" style={{ backgroundColor: T.spotsBg, borderColor: T.spotsBorder }}>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">⚠️</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="font-bold text-[14px]" style={{ color: T.spotsText }}>Limited spots remaining</p>
                  {spots > 0 && (
                    <span className="text-white text-[12px] font-extrabold px-2.5 py-0.5 rounded-full tabular-nums" style={{ backgroundColor: T.badgeDot }}>
                      Only {spots} left
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-[13px] mt-1 leading-snug">
                  Complete 2 quick steps after sign in to lock in your bonus reward before it expires.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="w-full border-t border-gray-100 pt-4 text-center">
          <p className="text-[11px] text-gray-400 leading-relaxed">{T.disclaimer}</p>
          <div className="mt-2 flex justify-center gap-4 text-[11px] text-gray-500 font-medium">
            <a href={`${lbase}/terms`} className="hover:underline">Terms</a>
            <span className="text-gray-300">·</span>
            <a href={`${lbase}/privacy`} className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      {FEATURES.stickyCtaBtn && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 bg-white/95 backdrop-blur border-t border-gray-100 transition-all duration-300"
          style={{ transform: stickyBtn ? "translateY(0)" : "translateY(110%)", pointerEvents: stickyBtn ? "auto" : "none" }}
        >
          <button
            onClick={handleCtaClick}
            className="block w-full max-w-sm mx-auto text-white font-bold text-[17px] py-4 rounded-2xl shadow-xl text-center transition-opacity active:opacity-80 cursor-pointer border-0"
            style={{ backgroundColor: T.primary }}
          >
            {T.ctaText}
          </button>
        </div>
      )}

      {/* Notification toast */}
      {FEATURES.notificationToasts && notif && (
        <div
          key={notif.id}
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 z-50 ${notif.visible ? "notif-enter" : "notif-exit"}`}
        >
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-800 text-[13px] font-semibold leading-snug">{notif.text}</p>
            <p className="text-gray-400 text-[11px] mt-0.5">45 seconds ago</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ number, title, subtitle, color }: { number: number; title: string; subtitle: string; color: string }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-4 py-4">
      <div className="w-9 h-9 rounded-full text-white font-bold text-[15px] flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: color }}>
        {number}
      </div>
      <div className="min-w-0">
        <p className="text-gray-900 font-semibold text-[14px] leading-snug">{title}</p>
        <p className="text-gray-400 text-[12px] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
