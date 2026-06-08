import { ContentCard } from "./ContentCard.jsx";

const titles = Array.from({ length: 10 }, (_, index) => `Title ${index + 1}`);

function getCardClassName(index) {
  const isWideDesktop = index === 0 || index === 5;
  const isWideTablet = index >= 8;

  return [
    isWideDesktop ? "desktop:col-span-2" : "",
    isWideTablet ? "tablet:col-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function ContentGrid() {
  return (
    <section className="box-border w-full" aria-label="內容區塊">
      <div className="grid grid-cols-1 gap-grid tablet:grid-cols-4 desktop:grid-cols-6">
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
