import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ===== Top Nav ===== */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight">
            StudyBuddy<span className="text-blue-600">AI</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#how" className="hover:text-blue-600">How it works</a>
            <a href="#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="#faq" className="hover:text-blue-600">FAQ</a>
          </nav>

          <div className="flex gap-2">
            {/* Log in should go to the real auth route */}
            <Link
              href="/auth/signin"
              className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Log in
            </Link>
            {/* Get started should go to signup */}
            <Link
              href="/auth/signup"
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-10 md:items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Learn more in less time.<br />
                <span className="text-blue-600">AI that actually helps you study.</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Turn chapters into clean summaries, generate structured study guides,
                auto-make flashcards, and extract text from images. Built for students,
                test-takers, and busy professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {/* Trial CTA should go to signup */}
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Start free 30-day trial
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center rounded-xl border px-5 py-3 font-medium hover:bg-gray-50"
                >
                  See features
                </a>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Fair-use only • No cheating tools • Cancel anytime
              </p>
            </div>

            <div className="border rounded-2xl p-6 bg-white shadow-sm">
              <div className="text-sm font-semibold text-gray-700">What you can generate</div>
              <ul className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <li className="rounded-lg border p-3">Chapter Summary</li>
                <li className="rounded-lg border p-3">Study Guide</li>
                <li className="rounded-lg border p-3">Flashcards</li>
                <li className="rounded-lg border p-3">Outline</li>
                <li className="rounded-lg border p-3">Image → Text (OCR)</li>
                <li className="rounded-lg border p-3">Key Terms & Formulas</li>
              </ul>
              <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-900">
                Upload up to 10 files per run (PDF, images, docs). We enforce “only upload
                content you legally own” and do not expose user content to others.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Social proof strip ===== */}
      <section className="bg-gray-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-sm text-gray-600">
          Helping students & professionals create better notes, faster ✦ Accounting, Nursing, CS,
          Psychology, Finance, Law, Trade Licenses & more.
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Everything you need to actually study</h2>
        <p className="mt-2 text-gray-600">
          Focused on learning—no fluff, no cheating tools, just clarity.
        </p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Chapter Summaries",
              desc:
                "Defluffed, accurate chapter distillation with concepts, definitions, and what’s testable.",
            },
            {
              title: "Study Guides",
              desc:
                "Full-sentence explanations or concise bullet mode. Includes formulas, steps, and pitfalls.",
            },
            {
              title: "Flashcards",
              desc:
                "Instant term/definition decks you can export or copy into your favorite app.",
            },
            {
              title: "Image → Text (OCR)",
              desc:
                "Turn screenshots/handouts into clean text you can search and summarize.",
            },
            {
              title: "Outlines & Structures",
              desc:
                "Generate lecture or project outlines with hierarchy that matches your course.",
            },
            {
              title: "Admin-friendly",
              desc:
                "Terms forbid cheating; we log usage types and offer school-safe guardrails.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border p-5">
              <div className="font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold">How it works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Upload or paste", d: "PDFs, images, notes, or text." },
              { n: "2", t: "Pick a generator", d: "Summary, study guide, flashcards, outline, OCR." },
              { n: "3", t: "Get clean output", d: "Copy, export, or refine with follow-ups." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border p-6 bg-white">
                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {s.n}
                </div>
                <div className="mt-3 font-semibold">{s.t}</div>
                <p className="mt-1 text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Simple pricing</h2>
        <p className="mt-2 text-gray-600">Cancel anytime. Usage caps reset monthly.</p>

        <div className="mt-8 grid md:grid-cols-5 gap-6">
          {[
            {
              name: "Starter",
              price: "$5",
              suffix: "/mo",
              line: "75 generations / month",
              points: ["All generators", "Up to 10 files/run", "Email support"],
            },
            {
              name: "Core",
              price: "$10",
              suffix: "/mo",
              line: "250 generations / month",
              highlight: true,
              points: ["Everything in Starter", "Priority queue", "Saved presets"],
            },
            {
              name: "Pro",
              price: "$15",
              suffix: "/mo",
              line: "350 generations / month",
              points: ["Everything in Core", "Longer inputs", "Export flashcards"],
            },
            {
              name: "Advanced",
              price: "$20",
              suffix: "/mo",
              line: "450 generations / month",
              points: ["Everything in Pro", "Team sharing (optional)", "Faster processing"],
            },
            {
              name: "Max",
              price: "$40",
              suffix: "/mo",
              line: "1000 generations / month",
              points: ["Everything in Advanced", "Fastest queue", "Priority support"],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.highlight ? "border-blue-600 ring-1 ring-blue-100" : ""
              }`}
            >
              <div className="text-sm text-gray-600">{p.name}</div>
              <div className="mt-1 flex items-end gap-1">
                <div className="text-4xl font-extrabold">{p.price}</div>
                <div className="text-gray-600">{p.suffix}</div>
              </div>
              <div className="mt-2 text-sm text-gray-700">{p.line}</div>
              <ul className="mt-4 grid gap-2 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-blue-600" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Each tier should go to signup for now (Stripe comes next) */}
              <Link
                href="/auth/signup"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-medium ${
                  p.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border hover:bg-gray-50"
                }`}
              >
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-500">
          We enforce fair use and do not allow cheating. “Generations” = one input → output run
          (e.g., a chapter summary, study guide, flashcard deck, or OCR job).
        </p>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Frequently asked questions</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Is this a cheating tool?",
              a: "No. We forbid cheating in our Terms and in-product guardrails. This is for learning: summaries, study guides, flashcards, and OCR.",
            },
            {
              q: "What can I upload?",
              a: "Your own notes, handouts, legally purchased materials, and original content. Do not upload content you don’t own the rights to.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. Stripe handles subscription + proration cleanly. You can keep access until your period ends or get a prorated refund—your choice.",
            },
            {
              q: "Do you store my files?",
              a: "We keep them only as long as needed to generate outputs and for your personal access. We never expose your data to other users.",
            },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border p-5">
              <div className="font-semibold">{f.q}</div>
              <p className="mt-2 text-sm text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="font-bold">StudyBuddy<span className="text-blue-600">AI</span></div>
            <p className="mt-2 text-gray-600">
              Built for students and professionals who value clarity and time.
            </p>
          </div>
          <div>
            <div className="font-semibold">Product</div>
            <ul className="mt-2 grid gap-1">
              <li><a href="#features" className="hover:text-blue-600">Features</a></li>
              <li><a href="#how" className="hover:text-blue-600">How it works</a></li>
              <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 grid gap-1">
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/fair-use" className="hover:text-blue-600">Fair Use Policy</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Support</div>
            <ul className="mt-2 grid gap-1">
              <li><a href="#faq" className="hover:text-blue-600">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t text-center text-xs text-gray-500 py-4">
          © {new Date().getFullYear()} StudyBuddyAI. All rights reserved.
        </div>
      </footer>

      {/* ===== ADD NEW SECTIONS BELOW THIS LINE (append-only) ===== */}
    </main>
  );
}
