import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import RatingStars from '../../components/ui/RatingStars';
import { rateOrder } from '../../lib/mockApi';

const tags = ['Professional driver', 'On-time pickup', 'Smooth handling', 'Good communication', 'Affordable'];

export default function RatingPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [pickedTags, setPickedTags] = useState([]);
  const [comment, setComment] = useState('');

  return (
    <AppShell>
      <TopBar title="Rate Experience" subtitle={`Booking #${bookingId}`} showBack />

      <section className="summary-card">
        <p className="eyebrow">How was your delivery experience?</p>
        <RatingStars value={rating} onChange={setRating} />
      </section>

      <div className="chip-wrap">
        {tags.map((tag) => {
          const active = pickedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              className={active ? 'chip chip--active' : 'chip'}
              onClick={() =>
                setPickedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]))
              }
            >
              {tag}
            </button>
          );
        })}
      </div>

      <section className="form-card">
        <label>
          Additional feedback
          <textarea
            rows="4"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share what went well and what can improve"
          />
        </label>
      </section>

      <button
        className="btn-primary"
        type="button"
        onClick={async () => {
          await rateOrder({ bookingId, stars: rating, tags: pickedTags, comment });
          navigate('/orders');
        }}
      >
        Submit Review
      </button>
    </AppShell>
  );
}
