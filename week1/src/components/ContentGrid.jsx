import { ContentCard } from "./ContentCard.jsx";

const titles = Array.from({ length: 10 }, (_, index) => `Title ${index + 1}`);

function getCardClassName(index) {
  const classes = [];

  if (index === 0 || index === 5) {
    classes.push("content-card--desktop-span-2");
  }

  if (index >= 8) {
    classes.push("content-card--tablet-span-2");
  }

  return classes.join(" ");
}

export function ContentGrid() {
  return (
    <section className="content-grid" aria-label="內容區塊">
      <div className="content-grid__inner">
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
