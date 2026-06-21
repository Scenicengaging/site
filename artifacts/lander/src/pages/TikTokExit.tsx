export default function TikTokExit() {
  function handleContinue() {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const target = `${window.location.origin}${base}/verify`;
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isInApp =
      /TikTok/i.test(ua) ||
      /Instagram/i.test(ua) ||
      /FBAN|FBAV/i.test(ua) ||
      /BytedanceWebview/i.test(ua);

    if (isInApp && isAndroid) {
      const domain = target.replace(/^https?:\/\//, "");
      window.location.href = `intent://${domain}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(target)};end`;
    } else if (isInApp && isIOS) {
      const a = document.createElement("a");
      a.href = target;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => { window.location.href = target; }, 300);
    } else {
      window.location.href = target;
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
            <svg className="w-9 h-9 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              Get the Full Experience
            </h1>
            <p className="mt-2 text-gray-500 text-base leading-relaxed">
              You're in an in-app browser. Tap continue to open in Safari or Chrome and start earning.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 w-full text-center">
          <p className="text-gray-700 font-semibold text-sm">
            🎁 A <span className="font-bold text-gray-900">$750 Apple Cash</span> reward is reserved for you
          </p>
        </div>

        <button
          onClick={handleContinue}
          className="pulse-btn w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-lg transition-colors"
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
