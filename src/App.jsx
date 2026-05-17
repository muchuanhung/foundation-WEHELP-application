import { SiteHeader } from "./components/SiteHeader.jsx";
import { TableOfContents } from "./components/TableOfContents.jsx";
import { QACard } from "./components/QACard.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";

export default function App({ visibleQuestions }) {
  return (
    <>
      <a
        href="#main"
        className="absolute -left-[9999px] z-[100] rounded bg-sky-700 px-4 py-2 text-white no-underline focus:top-4 focus:left-4"
      >
        跳至主要內容
      </a>

      <SiteHeader />

      <main id="main" className="mx-auto max-w-[720px] px-5 py-8 pb-12">
        <TableOfContents items={visibleQuestions} />

        <article className="flex flex-col gap-5">
          {visibleQuestions.map((q) => (
            <QACard key={q.id} question={q} optional={q.id === "q8"} />
          ))}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
