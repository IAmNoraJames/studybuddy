export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p><strong>Last updated:</strong> September 2025</p>

      <section>
        <h2 className="text-xl font-semibold">1. What we collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Account info (email, authentication data).</li>
          <li>Uploaded files/text for generating study outputs.</li>
          <li>Usage and telemetry (to improve reliability).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. How we use data</h2>
        <p>
          To provide features, prevent abuse, support customers, and improve the
          service. We don’t sell personal data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Storage & retention</h2>
        <p>
          Files may be stored to generate outputs and for your history (if you
          enable it). You can delete items from your account; we may retain logs
          as required by law or for security.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Processors</h2>
        <p>
          We use trusted vendors (e.g., hosting, payments, support chat) under
          data-processing agreements. They only process data to deliver the
          service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Your controls</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access, update, or delete your data from your account.</li>
          <li>Contact support@studybuddy.ai for privacy requests.</li>
        </ul>
      </section>
    </main>
  );
}
