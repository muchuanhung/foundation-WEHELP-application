const thumbImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=160&h=100&q=80";

export function PromotionBar({ label, className = "" }) {
  return (
    <article
      className={`box-border flex h-promo min-h-promo w-full items-stretch overflow-hidden bg-promo ${className}`}
    >
      <img
        src={thumbImage}
        alt=""
        className="box-border block h-promo w-thumb shrink-0 object-cover"
        width={80}
        height={50}
      />
      <div className="box-border flex min-w-0 flex-1 items-center px-3">
        <p className="m-0 truncate text-base">{label}</p>
      </div>
    </article>
  );
}
