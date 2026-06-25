import { useLocation } from "wouter";
import { T } from "@/config";

export default function AgeGate() {
  const [, navigate] = useLocation();
  function proceed() { navigate("/offer"); }

  const base = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center gap-7">

        {/* Hero image */}
        <div className="relative">
          {!T.heroWhiteBg && (
            <div className={`absolute inset-0 bg-gradient-to-br ${T.cardGlow} rounded-3xl blur-xl scale-95 translate-y-3`} />
          )}
          <div className={T.heroWhiteBg ? "relative bg-white rounded-2xl shadow-2xl p-5 w-56 max-w-[75vw] flex items-center justify-center" : "relative"}>
            <img
              src={`${base}${T.heroImage}`}
              alt={T.heroAlt}
              className={T.heroWhiteBg ? "w-full h-auto" : "w-56 max-w-[75vw] rounded-2xl shadow-2xl"}
            />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border"
            style={{ backgroundColor: T.badgeBg, borderColor: T.badgeBorder, color: T.badgeText }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ backgroundColor: T.badgeDot }} />
            Reward Available Now
          </div>
          <h1 className="text-[30px] font-extrabold text-gray-900 leading-tight tracking-tight">
            Quick Verification
          </h1>
          <p className="mt-2 text-gray-500 text-[15px]">
            Are you 21 years of age or older?
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={proceed}
            className="w-full text-white font-bold text-[17px] py-5 rounded-2xl shadow-md transition-opacity active:opacity-80"
            style={{ backgroundColor: T.primary }}
          >
            Yes, I'm 21 or Older ✓
          </button>
          <button
            onClick={proceed}
            className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-600 font-medium text-[16px] py-4 rounded-2xl border border-gray-200 transition-colors"
          >
            No, I'm Under 21
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          This helps verify eligibility for reward programs
        </p>
      </div>
    </div>
  );
}
