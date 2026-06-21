export default function Privacy() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <div className="min-h-screen bg-white px-5 py-10 max-w-2xl mx-auto">
      <a href={`${base}/offer`} className="text-orange-500 text-sm font-semibold mb-6 inline-block hover:underline">
        ← Back to Offer
      </a>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: June 21, 2026</p>

      <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">We may collect information you voluntarily provide, such as your email address, when you participate in our reward program. We also collect standard usage data such as IP address, browser type, and pages visited through cookies and analytics tools.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">2. How We Use Your Information</h2>
          <p className="text-gray-600">We use your information to: (a) facilitate reward redemption, (b) send notifications about your reward status, (c) improve our website and services, and (d) comply with legal obligations.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">3. Cookies</h2>
          <p className="text-gray-600">We use cookies to save your session state, including countdown timer data, so your experience is consistent across page refreshes. You may disable cookies in your browser settings, but some features may not function correctly.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">4. Third-Party Sharing</h2>
          <p className="text-gray-600">We may share your information with third-party reward program partners solely for the purpose of fulfilling rewards. We do not sell your personal information to advertisers or other third parties.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">5. No Affiliation</h2>
          <p className="text-gray-600">This site is not affiliated with Apple Inc., TikTok, Meta (Facebook/Instagram), or any other platform. Any trademarks referenced belong to their respective owners.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">6. Data Retention</h2>
          <p className="text-gray-600">We retain your data only as long as necessary to fulfill the purposes described in this policy, or as required by law.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">7. Your Rights</h2>
          <p className="text-gray-600">You have the right to request access to, correction of, or deletion of your personal data. Contact us through the site to exercise these rights.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">8. Changes to This Policy</h2>
          <p className="text-gray-600">We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page.</p>
        </section>
      </div>
    </div>
  );
}
