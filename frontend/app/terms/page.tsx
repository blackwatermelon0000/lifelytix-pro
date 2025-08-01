'use client';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] px-6 py-12 text-white font-poppins">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="mb-4">Last Updated: July 29, 2025</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="text-sm">By using LifeLytix, you agree to these Terms. If you don’t agree, please do not use the app.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Eligibility</h2>
        <p className="text-sm">You must be 13 years or older to use this app.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Use of the App</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Don’t misuse the app or use it for unlawful purposes</li>
          <li>You’re responsible for your account and data accuracy</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
        <p className="text-sm">All content, trademarks, and software in LifeLytix belong to us or our licensors. Don’t copy or resell without permission.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
        <p className="text-sm">We reserve the right to suspend or terminate your access for violations of these Terms.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Disclaimer</h2>
        <p className="text-sm">We provide the app “as-is.” We’re not liable for errors, interruptions, or health decisions made based on our insights.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes</h2>
        <p className="text-sm">We may modify these Terms. Continued use after updates means you accept the new Terms.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
        <p className="text-sm">For questions, contact us at <strong>support@lifelytix.com</strong></p>
      </div>
    </div>
  );
}