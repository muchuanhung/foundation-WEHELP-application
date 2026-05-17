export function TableOfContents({ items }) {
  return (
    <nav
      className="mb-8 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-[0_1px_3px_rgb(15_23_42/6%),0_8px_24px_rgb(15_23_42/4%)]"
      aria-label="問答目錄"
    >
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-600 uppercase">
        目錄
      </h2>
      <ol className="m-0 list-decimal space-y-1.5 pl-5">
        {items.map((q) => (
          <li key={q.id}>
            <a
              href={`#${q.id}`}
              className="text-[0.9375rem] text-sky-700 no-underline hover:underline"
            >
              {q.title.replace(/[。.?？]$/, "")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
