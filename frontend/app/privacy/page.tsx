// app/privacy/page.tsx
'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] px-6 py-12 text-white font-poppins">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last Updated: July 29, 2025</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Data We Collect</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Personal Info: Name, email, login data</li>
          <li>Health & Wellness Data: From wearables, voice, surveys</li>
          <li>Device Info: IP address, session analytics</li>
          <li>Third-Party Integrations: Google, Apple, etc.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use It</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Provide insights, predictions, and recommendations</li>
          <li>Improve app performance and personalization</li>
          <li>Send relevant updates (you may opt-out)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing & Disclosure</h2>
        <p className="text-sm">We never sell your data. We share it only with essential third-party services or when required by law.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
        <p className="text-sm">Access, export, correct, or delete your data anytime. Email us at <strong>privacy@lifelytix.com</strong></p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Security</h2>
        <p className="text-sm">We use encryption, role-based access, and industry best practices to protect your data.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Children</h2>
        <p className="text-sm">This platform is not for children under 13 years old.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes</h2>
        <p className="text-sm">We may update this policy and will notify you of any major changes.</p>
      </div>
    </div>
  );
}
