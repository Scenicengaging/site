import { T } from "@/config";

export default function TikTokExit() {
  function handleContinue() {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const target = `${window.location.origin}${base}/`;
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

  const base = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center gap-7">

        {/* Hero image */}
        <div className="relative">
          {!T.heroWhiteBg && (
            <div className={`absolute inset-0 bg-gradient-to-br ${T.cardGlow} rounded-3xl blur-xl scale-95 translate-y-3`} />
          )}
          <div className={T.heroWhiteBg ? "relative bg-white rounded-3xl shadow-2xl p-6 w-64 max-w-[80vw] flex items-center justify-center" : "relative"}>
            <img
              src={`${base}${T.heroImage}`}
              alt={T.heroAlt}
              className={T.heroWhiteBg ? "w-full h-auto" : "w-64 max-w-[80vw] rounded-3xl shadow-2xl"}
            />
          </div>
          <div
            className="absolute -top-2 -right-2 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md"
            style={{ backgroundColor: T.badgeDot }}
          >
            Reserved ✓
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight">
            {T.exitHeadline[0]}<br />{T.exitHeadline[1]}
          </h1>
          <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
            Open in Safari or Chrome to claim it — some features don't work inside TikTok's browser.
          </p>
        </div>

        {/* Reward badge */}
        <div
          className="w-full rounded-2xl px-5 py-4 flex items-center gap-3 border"
          style={{ backgroundColor: T.badgeBg, borderColor: T.badgeBorder }}
        >
          <span className="text-2xl">🎁</span>
          <div>
            <p className="text-gray-900 font-semibold text-sm">{T.exitBadgeLabel}</p>
            <p className="text-gray-400 text-xs">Complete simple tasks to claim</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleContinue}
          className="pulse-btn w-full text-white font-bold text-[17px] py-5 rounded-2xl shadow-lg transition-opacity active:opacity-80"
          style={{ backgroundColor: T.primary }}
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
