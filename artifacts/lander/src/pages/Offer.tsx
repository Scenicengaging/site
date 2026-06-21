import { useEffect, useState, useRef } from "react";

const OFFER_URL = "https://example.com/offer";
const COOKIE_KEY = "lander_timer_end";

const FIRST_NAMES = [
  "Ashley","Brandon","Christina","Derek","Emma","Frank","Grace","Henry",
  "Isabella","Jake","Karen","Liam","Mia","Nathan","Olivia","Patrick",
  "Quinn","Rachel","Samuel","Tiffany","Ulysses","Victoria","William",
  "Xena","Yvonne","Zachary","Amber","Brett","Cassidy","Dylan","Elena",
  "Felix","Gianna","Harold","Iris","Jordan","Kelsey","Logan","Madison",
  "Noah","Paige","Ryan","Savannah","Tyler","Uma","Vanessa","Wesley"
];
const LAST_INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const MESSAGES = [
  (n: string) => `${n} has completed 7 deals and redeemed $250`,
  (n: string) => `${n} has completed 5 deals and redeemed $100`,
  (n: string) => `${n} has completed 10 deals to get $750`,
  (n: string) => `${n} submitted a product review for a bonus $750`,
];

function randomName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)];
  return `${first} ${last}.`;
}
function randomMessage() {
  const name = randomName();
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)](name);
}

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
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface Notification {
  id: number;
  text: string;
  visible: boolean;
}

export default function Offer() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerEndRef = useRef<number>(0);
  const [notif, setNotif] = useState<Notification | null>(null);
  const notifIdRef = useRef(0);

  useEffect(() => {
    timerEndRef.current = getTimerEnd();
    const tick = () => setTimeLeft(Math.max(0, timerEndRef.current - Date.now()));
    tick();
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function showNotif() {
      const id = ++notifIdRef.current;
      setNotif({ id, text: randomMessage(), visible: true });
      setTimeout(() => {
        setNotif((prev) => (prev?.id === id ? { ...prev, visible: false } : prev));
        setTimeout(() => setNotif((prev) => (prev?.id === id ? null : prev)), 500);
      }, 4500);
    }
    showNotif();
    const interval = setInterval(showNotif, 45000);
    return () => clearInterval(interval);
  }, []);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-md pb-24">

        {/* Timer banner */}
        <div className="w-full bg-gray-900 text-white text-center py-2.5 text-sm font-semibold tracking-wide">
          ⏱ Offer expires in:{" "}
          <span className="font-bold tabular-nums text-blue-400">{formatTime(timeLeft)}</span>
        </div>

        <div className="px-5">
          {/* Apple Cash Card Image */}
          <div className="mt-7 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}apple-cash.png`}
              alt="$750 Apple Cash Card"
              className="w-72 max-w-full rounded-3xl shadow-2xl"
            />
          </div>

          {/* Headline */}
          <div className="mt-7 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              $750 Apple Cash
            </h1>
            <p className="mt-2 text-gray-500 text-base font-medium">
              Complete simple tasks &amp; get rewarded instantly
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-7">
            <a
              href={OFFER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse-btn block w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-bold text-xl py-5 rounded-2xl shadow-xl text-center transition-colors"
            >
              Claim My $750 Now →
            </a>
            <p className="text-center text-xs text-gray-400 mt-3">
              Limited spots available — act before the timer runs out
            </p>
          </div>

          {/* How It Works */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-5">How It Works</h2>
            <div className="flex flex-col gap-4">
              <Step
                number={1}
                title="Enter your email address"
                subtitle="For notifications & to receive rewards"
              />
              <Step
                number={2}
                title="Complete 2–3 simple offers"
                subtitle="The more you do, the more you earn"
              />
              <Step
                number={3}
                title="Receive your Apple Pay reward"
                subtitle="Sent directly to account"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              We are not affiliated with, endorsed by, or sponsored by Apple Inc., TikTok, or Meta (Facebook/Instagram). Apple Cash is a trademark of Apple Inc.
            </p>
            <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500 font-medium">
              <a href={`${base}/terms`} className="hover:underline">Terms of Service</a>
              <span className="text-gray-300">|</span>
              <a href={`${base}/privacy`} className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Notification toast */}
      {notif && (
        <div
          key={notif.id}
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl px-4 py-3 flex items-start gap-3 z-50 ${notif.visible ? "notif-enter" : "notif-exit"}`}
        >
          <div className="mt-0.5 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-gray-800 text-sm font-semibold">{notif.text}</p>
            <p className="text-gray-400 text-xs mt-0.5">45 seconds ago</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 rounded-2xl px-5 py-4">
      <div className="w-9 h-9 rounded-full bg-black text-white font-bold text-base flex items-center justify-center flex-shrink-0">
        {number}
      </div>
      <div>
        <p className="text-gray-900 font-semibold text-base">{title}</p>
        <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
