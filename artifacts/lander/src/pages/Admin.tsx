import { useState } from "react";
import { THEMES } from "@/config";
import { loadAdminConfig, saveAdminConfig, resetAdminConfig } from "@/adminConfig";
import type { AdminConfig, ThemeKey } from "@/adminConfig";

// ─── CHANGE THIS PASSWORD ──────────────────────────────────────────────────
const ADMIN_PASSWORD = "lander2024";
// ──────────────────────────────────────────────────────────────────────────

const SESSION_KEY = "lander_admin_auth";

const THEME_OPTIONS: { key: ThemeKey; label: string; color: string }[] = [
  { key: "apple",   label: "Apple Cash",      color: "#000000" },
  { key: "shein",   label: "Shein",           color: "#db2777" },
  { key: "amazon",  label: "Amazon",          color: "#FF9900" },
  { key: "walmart", label: "Walmart",         color: "#0071CE" },
  { key: "cashapp", label: "Cash App",        color: "#00C244" },
];

const FEATURE_LABELS: { key: keyof AdminConfig["features"]; label: string; desc: string }[] = [
  { key: "timerBar",               label: "Countdown Timer",        desc: "Bar at the top counting down to offer expiry" },
  { key: "stepProgress",           label: "Step Progress",          desc: '"Step 2 of 3" indicator below the timer' },
  { key: "socialProof",            label: "Social Proof Counter",   desc: '"$XXX,XXX earned this week" banner' },
  { key: "liveBadge",              label: "Live Badge",             desc: '"Rewards being claimed right now" pill' },
  { key: "notificationToasts",     label: "Activity Toasts",        desc: "Pop-up notifications every 45 seconds" },
  { key: "rewardCalculator",       label: "Reward Calculator",      desc: "Spend → earn slider widget" },
  { key: "faqSection",             label: "FAQ Accordion",          desc: "Collapsible frequently asked questions" },
  { key: "spotsCounter",           label: "Spots Remaining",        desc: '"Limited spots remaining" urgency box' },
  { key: "stickyCtaBtn",           label: "Sticky CTA Button",      desc: "CTA button that sticks to the bottom on scroll" },
  { key: "processingInterstitial", label: "Processing Overlay",     desc: '"Reserving your spot…" overlay on click' },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: on ? "#22c55e" : "#d1d5db" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

function PasswordScreen({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your password to continue</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className="w-full border rounded-xl px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900 transition"
            style={{ borderColor: error ? "#ef4444" : "#e5e7eb" }}
          />
          {error && <p className="text-red-500 text-sm -mt-2">Incorrect password</p>}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [cfg, setCfg] = useState<AdminConfig>(() => loadAdminConfig());
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  function update(patch: Partial<AdminConfig>) {
    setCfg((prev) => ({ ...prev, ...patch }));
    setDirty(true);
    setSaved(false);
  }

  function toggleFeature(key: keyof AdminConfig["features"]) {
    update({ features: { ...cfg.features, [key]: !cfg.features[key] } });
  }

  function handleSave() {
    saveAdminConfig(cfg);
    setSaved(true);
    setDirty(false);
  }

  function handleReset() {
    if (!confirm("Reset everything to code defaults?")) return;
    resetAdminConfig();
    setCfg(loadAdminConfig());
    setSaved(false);
    setDirty(false);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  if (!authed) return <PasswordScreen onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-[17px] font-bold text-gray-900">Admin Panel</h1>
          {dirty && <p className="text-[12px] text-amber-600 font-medium">Unsaved changes</p>}
          {saved && !dirty && <p className="text-[12px] text-green-600 font-medium">Saved ✓</p>}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`${base}/offer`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Preview
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button onClick={handleLogout} className="text-[13px] text-gray-500 hover:text-gray-700">
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 flex flex-col gap-6">

        {/* Theme */}
        <Section title="Theme" subtitle="Which brand to show across the entire site">
          <div className="flex flex-col gap-2">
            {THEME_OPTIONS.map((t) => {
              const themeObj = THEMES[t.key];
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => update({ theme: t.key })}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                  style={
                    cfg.theme === t.key
                      ? { borderColor: t.color, backgroundColor: t.color + "10" }
                      : { borderColor: "#e5e7eb", backgroundColor: "#fff" }
                  }
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="font-medium text-[14px] text-gray-800 flex-1">{t.label}</span>
                  <span className="text-[12px] text-gray-400">{themeObj.rewardLabel}</span>
                  {cfg.theme === t.key && (
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: t.color }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Offer URL */}
        <Section title="Offer URL" subtitle="The affiliate link users are sent to when they click the CTA">
          <input
            type="url"
            value={cfg.offerUrl}
            onChange={(e) => update({ offerUrl: e.target.value })}
            placeholder="https://example.com/offer"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-gray-900 transition font-mono"
          />
        </Section>

        {/* Feature Flags */}
        <Section title="Features" subtitle="Toggle individual elements on the offer page">
          <div className="flex flex-col divide-y divide-gray-100">
            {FEATURE_LABELS.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-gray-900 leading-snug">{label}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
                </div>
                <Toggle on={cfg.features[key]} onChange={() => toggleFeature(key)} />
              </div>
            ))}
          </div>
        </Section>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-8">
          <button
            onClick={handleSave}
            disabled={!dirty}
            className="w-full py-3.5 rounded-xl font-semibold text-[15px] transition-colors"
            style={{
              backgroundColor: dirty ? "#111827" : "#e5e7eb",
              color: dirty ? "#fff" : "#9ca3af",
            }}
          >
            {saved && !dirty ? "Changes Saved ✓" : "Save Changes"}
          </button>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl font-medium text-[14px] text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
          >
            Reset to Code Defaults
          </button>
        </div>

      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <h2 className="text-[15px] font-semibold text-gray-900">{title}</h2>
        <p className="text-[12px] text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
