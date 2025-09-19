export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Terms of Use</h1>
      <p><strong>Last updated:</strong> September 2025</p>

      <section>
        <h2 className="text-xl font-semibold">1. Overview</h2>
        <p>
          StudyBuddyAI (“we”, “us”) provides tools that generate study materials
          (summaries, guides, flashcards, OCR) from content you upload. By using
          our site, you agree to these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Fair-use & Academic Integrity</h2>
        <p>
          Our tools are for learning. Do not submit work generated here as your
          own where prohibited. You are responsible for following your school’s
          policies and copyright law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Only upload content you own or may lawfully use.</li>
          <li>No illegal, harmful, or infringing content.</li>
          <li>No attempts to disrupt the service or other users.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Accounts & Billing</h2>
        <p>
          Subscriptions are handled by our payment processor. You may cancel any
          time via the self-serve portal; access remains through the paid period.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Disclaimers</h2>
        <p>
          Content may contain errors. Use judgment and verify important facts.
          The service is provided “as is” without warranties.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Contact</h2>
        <p>Questions? Email support@studybuddy.ai</p>
      </section>
    </main>
  );
}
