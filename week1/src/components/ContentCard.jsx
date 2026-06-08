import { Star } from "lucide-react";

const cardImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80";

export function ContentCard({ label, className = "" }) {
  return (
    <article
      className={`box-border flex min-w-0 flex-col overflow-hidden bg-white ${className}`}
    >
      <div className="relative box-border w-full">
        <img
          src={cardImage}
          alt=""
          className="box-border block aspect-[4/3] w-full object-cover tablet:aspect-square desktop:aspect-[4/3]"
        />
        <Star
          className="absolute right-2 top-2 fill-yellow-400 text-yellow-400"
          size={18}
          aria-hidden="true"
        />
      </div>
      <div className="box-border flex h-10 items-center justify-center bg-card-footer px-2">
        <p className="m-0 truncate text-center text-base">{label}</p>
      </div>
    </article>
  );
}
