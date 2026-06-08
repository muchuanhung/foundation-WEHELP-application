import { PromotionBar } from "./PromotionBar.jsx";

const promotions = ["Promotion 1", "Promotion 2", "Promotion 3"];

export function PromotionSection() {
  return (
    <section className="box-border w-full" aria-label="促銷區塊">
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4">
        <PromotionBar
          label={promotions[0]}
          className="tablet:col-span-1 desktop:col-span-4"
        />
        <PromotionBar
          label={promotions[1]}
          className="tablet:col-span-1 desktop:col-span-3"
        />
        <PromotionBar
          label={promotions[2]}
          className="tablet:col-span-2 desktop:col-span-1"
        />
      </div>
    </section>
  );
}
