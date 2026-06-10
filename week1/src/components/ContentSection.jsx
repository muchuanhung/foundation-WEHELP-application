import { ContentCard } from "./ContentCard.jsx";

const titles = Array.from({ length: 10 }, (_, index) => `Title ${index + 1}`);

function getCardClassName(index) {
  return index >= 8 ? "content-card--tablet-span-2" : "";
}

export function ContentSection() {
  return (
    <section className="content-section" aria-label="內容區塊">
      <div className="content-section__inner">
        {titles.map((title, index) => (
          <ContentCard
            key={title}
            label={title}
            className={getCardClassName(index)}
          />
        ))}
      </div>
    </section>
  );
}
