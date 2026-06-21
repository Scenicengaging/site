import { useLocation } from "wouter";

export default function Terms() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <div className="min-h-screen bg-white px-5 py-10 max-w-2xl mx-auto">
      <a href={`${base}/offer`} className="text-orange-500 text-sm font-semibold mb-6 inline-block hover:underline">
        ← Back to Offer
      </a>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: June 21, 2026</p>

      <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-600">By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">2. Eligibility</h2>
          <p className="text-gray-600">This site is intended for users who are 18 years of age or older. By using the site, you represent that you meet this age requirement.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">3. Reward Program</h2>
          <p className="text-gray-600">Rewards are offered through third-party partner programs. Completion of qualifying offers is required to receive any reward. We do not guarantee that any specific reward will be available at all times. Availability is subject to change without notice.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">4. No Affiliation</h2>
          <p className="text-gray-600">We are not affiliated with, endorsed by, or sponsored by Apple Inc., TikTok, Meta (Facebook/Instagram), or any other third party. "Apple Cash" is a registered trademark of Apple Inc. All trademarks belong to their respective owners.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-600">To the maximum extent permitted by law, we disclaim all liability for any direct, indirect, incidental, or consequential damages arising from your use of this site or participation in any reward program.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">6. Changes to Terms</h2>
          <p className="text-gray-600">We reserve the right to modify these Terms at any time. Continued use of the site after changes constitutes acceptance of the revised Terms.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">7. Contact</h2>
          <p className="text-gray-600">If you have any questions about these Terms, please contact us through the site.</p>
        </section>
      </div>
    </div>
  );
}
