import { icons } from "../assets/icons.js";

const cardImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80";

export function ContentCard({ label, className = "" }) {
  return (
    <article className={`content-card${className ? ` ${className}` : ""}`}>
      <div className="content-card__image-wrap">
        <img src={cardImage} alt="" className="content-card__image" />
        <img
          src={icons.star}
          alt=""
          className="content-card__star"
          aria-hidden="true"
        />
      </div>
      <div className="content-card__footer">
        <p>{label}</p>
      </div>
    </article>
  );
}
