// Placeholder home page for the scaffold. The real home page (and the mega menu,
// hub/post content types and SEO features described in docs/requirements.md) are
// built in later tasks.

const PLANNED_HUBS = [
  "Blog",
  "Case Study",
  "VS / Comparison",
  "Integration",
  "Tools Directory",
  "Glossary",
  "Content Course",
  "Playbook",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">BetterContact</h1>
      <p className="text-sm leading-6 opacity-80">
        Scaffold for the headless-CMS rebuild of bettercontact.rocks. Nothing is
        published yet — see <code className="font-mono">docs/requirements.md</code>{" "}
        for the full brief.
      </p>
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide opacity-60">
          Planned content hubs
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PLANNED_HUBS.map((hub) => (
            <li
              key={hub}
              className="rounded-full border border-current/15 px-3 py-1 text-sm"
            >
              {hub}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
