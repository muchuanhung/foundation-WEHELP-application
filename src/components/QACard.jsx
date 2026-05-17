export function QACard({ question, optional }) {
  return (
    <section
      id={question.id}
      className="scroll-mt-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-[0_1px_3px_rgb(15_23_42/6%),0_8px_24px_rgb(15_23_42/4%)] max-sm:px-4 max-sm:py-4"
    >
      <h2 className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[1.0625rem] leading-snug font-semibold text-slate-900 max-sm:text-base">
        <span className="inline-flex min-w-8 shrink-0 items-center justify-center rounded-md bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-700">
          {question.num}
        </span>
        {question.title}
        {question.badge && (
          <span className="rounded bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
            {question.badge}
          </span>
        )}
      </h2>
      <div className="text-slate-600 italic">
        <p className="m-0">
          <em className="mr-1 font-medium text-slate-400 not-italic">
            [請替換{optional ? " · 選填" : ""}]
          </em>
          {question.placeholder}
        </p>
      </div>
    </section>
  );
}
