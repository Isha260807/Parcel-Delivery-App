import { Star } from 'lucide-react';

export default function RatingStars({ value, onChange }) {
  return (
    <div className="rating-stars" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          onClick={() => onChange(star)}
          className={star <= value ? 'active' : ''}
        >
          <Star size={20} />
        </button>
      ))}
    </div>
  );
}
