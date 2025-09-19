"use client";

const tools = [
  { name: "Image → Text", desc: "Upload lecture photos or textbook pages." },
  { name: "Study Guide", desc: "Skim + structure into key points." },
  { name: "Flashcards", desc: "Auto-generate Q/A from notes." },
  { name: "Grammar/Clarity", desc: "Improve essays without changing meaning." },
];

export default function AppHome() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tools.map((t) => (
        <div key={t.name} className="border rounded-xl p-4 space-y-2">
          <div className="text-xs inline-block px-2 py-1 border rounded-full">
            Subscribe to use
          </div>
          <h2 className="text-lg font-semibold">{t.name}</h2>
          <p className="text-sm text-gray-600">{t.desc}</p>
          <button
            onClick={() => (window.location.href = "/pricing")}
            className="mt-2 w-full rounded-lg border px-3 py-2 hover:bg-gray-50"
          >
            View Plans
          </button>
        </div>
      ))}
    </div>
  );
}
