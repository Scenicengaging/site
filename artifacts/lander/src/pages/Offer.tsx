import { useEffect, useState, useRef } from "react";
import { OFFER_URL } from "@/config";

const COOKIE_KEY = "lander_timer_end";

const FIRST_NAMES = [
  "Ashley","Brandon","Christina","Derek","Emma","Frank","Grace","Henry",
  "Isabella","Jake","Karen","Liam","Mia","Nathan","Olivia","Patrick",
  "Quinn","Rachel","Samuel","Tiffany","Ulysses","Victoria","William",
  "Xena","Yvonne","Zachary","Amber","Brett","Cassidy","Dylan","Elena",
  "Felix","Gianna","Harold","Iris","Jordan","Kelsey","Logan","Madison",
  "Noah","Paige","Ryan","Savannah","Tyler","Uma","Vanessa","Wesley",
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

interface Notif { id: number; text: string; visible: boolean; }

export default function Offer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerEndRef = useRef(0);
  const [notif, setNotif] = useState<Notif | null>(null);
  const notifIdRef = useRef(0);

  useEffect(() => {
    timerEndRef.current = getTimerEnd();
    const tick = () => setTimeLeft(Math.max(0, timerEndRef.current - Date.now()));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function show() {
      const id = ++notifIdRef.current;
      setNotif({ id, text: randomMessage(), visible: true });
      setTimeout(() => {
        setNotif((p) => p?.id === id ? { ...p, visible: false } : p);
        setTimeout(() => setNotif((p) => p?.id === id ? null : p), 500);
      }, 4500);
    }
    show();
    const id = setInterval(show, 45000);
    return () => clearInterval(id);
  }, []);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-5 pt-0 pb-6">

      {/* Timer bar */}
      <div className="w-full bg-gray-950 text-white text-center py-2.5 text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2 -mx-5 mb-6" style={{ width: "calc(100% + 2.5rem)" }}>
        <span>⏱</span>
        <span>Offer expires in</span>
        <span className="font-bold tabular-nums text-sky-400 text-[14px]">{formatTime(timeLeft)}</span>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* Card */}
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 via-green-300/20 to-blue-300/30 rounded-[28px] blur-2xl scale-95 translate-y-4" />
          <img
            src={`${import.meta.env.BASE_URL}apple-cash.png`}
            alt="$750 Apple Cash"
            className="relative w-full rounded-[22px] shadow-2xl"
          />
        </div>

        {/* Headline */}
        <div className="text-center">
          <h1 className="text-[34px] font-extrabold text-gray-900 tracking-tight leading-none">
            $750 Apple Cash
          </h1>
          <p className="mt-2 text-gray-500 text-[15px]">
            Complete simple tasks &amp; get rewarded instantly
          </p>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-700 text-xs font-semibold">Rewards being claimed right now</span>
        </div>

        {/* How It Works */}
        <div className="w-full">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center mb-3">How It Works</p>
          <div className="flex flex-col gap-3">
            <Step number={1} title="Enter your email address" subtitle="For notifications & to receive rewards" />
            <Step number={2} title="Complete 2–3 simple offers" subtitle="The more you do, the more you earn" />
            <Step number={3} title="Receive your Apple Pay reward" subtitle="Sent directly to your account" />
          </div>
        </div>

        {/* CTA — inline, bottom of content */}
        <a
          href={OFFER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pulse-btn block w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-bold text-[18px] py-5 rounded-2xl shadow-xl text-center transition-colors mt-2"
        >
          Claim My $750 Now →
        </a>

        {/* Footer */}
        <div className="w-full border-t border-gray-100 pt-4 text-center">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Not affiliated with Apple Inc., TikTok, or Meta (Facebook/Instagram).<br />Apple Cash is a trademark of Apple Inc.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-[11px] text-gray-500 font-medium">
            <a href={`${base}/terms`} className="hover:underline">Terms</a>
            <span className="text-gray-300">·</span>
            <a href={`${base}/privacy`} className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>

      {/* Notification toast */}
      {notif && (
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

function Step({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-4 py-4">
      <div className="w-9 h-9 rounded-full bg-black text-white font-bold text-[15px] flex items-center justify-center flex-shrink-0 shadow-sm">
        {number}
      </div>
      <div className="min-w-0">
        <p className="text-gray-900 font-semibold text-[14px] leading-snug">{title}</p>
        <p className="text-gray-400 text-[12px] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
