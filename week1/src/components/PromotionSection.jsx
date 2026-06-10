import { PromotionBar } from "./PromotionBar.jsx";

const promotions = ["Promotion 1", "Promotion 2", "Promotion 3"];

export function PromotionSection() {
  return (
    <section className="promo-section" aria-label="促銷區塊">
      <div className="promo-grid">
        <PromotionBar
          label={promotions[0]}
          className="promo-bar--desktop-full"
        />
        <PromotionBar
          label={promotions[1]}
          className="promo-bar--desktop-two-thirds"
        />
        <PromotionBar
          label={promotions[2]}
          className="promo-bar--tablet-full promo-bar--desktop-one-third"
        />
      </div>
    </section>
  );
}
