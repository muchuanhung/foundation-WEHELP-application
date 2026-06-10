const thumbImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=160&h=100&q=80";

export function PromotionBar({ label, className = "" }) {
  return (
    <article className={`promo-bar${className ? ` ${className}` : ""}`}>
      <img
        src={thumbImage}
        alt=""
        className="promo-bar__thumb"
        width={80}
        height={50}
      />
      <div className="promo-bar__label">
        <p>{label}</p>
      </div>
    </article>
  );
}
