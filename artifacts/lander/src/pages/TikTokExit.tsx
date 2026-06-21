import { useLocation } from "wouter";

export default function TikTokExit() {
  const [, navigate] = useLocation();

  function handleContinue() {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const target = `${window.location.origin}${base}/verify`;

    if (
      /TikTok/i.test(navigator.userAgent) ||
      /Instagram/i.test(navigator.userAgent) ||
      /FBAN|FBAV/i.test(navigator.userAgent)
    ) {
      window.location.href = target;
    } else {
      navigate("/verify");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center shadow-md">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center leading-tight">
            Get the Full Experience
          </h1>
          <p className="text-gray-500 text-center text-base leading-relaxed">
            You're viewing this in an in-app browser. Open in Safari or Chrome for the best experience and to start earning.
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 w-full text-center">
          <p className="text-orange-700 font-semibold text-sm">
            🎁 Don't miss out — a <span className="font-bold">$750 Apple Cash</span> reward is waiting for you
          </p>
        </div>

        <button
          onClick={handleContinue}
          className="pulse-btn w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-lg transition-colors"
        >
          Continue to Claim →
        </button>

        <p className="text-xs text-gray-400 text-center">
          To get the full experience and start earning, click continue
        </p>
      </div>
    </div>
  );
}
