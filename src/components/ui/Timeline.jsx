import { CheckCircle2, Circle } from 'lucide-react';

export default function Timeline({ items }) {
  return (
    <section className="timeline-card">
      {items.map((item, index) => {
        const pending = !item.done;
        return (
          <div className="timeline-row" key={item.key + index}>
            <div className="timeline-row__rail">
              {item.done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              {index < items.length - 1 ? <span /> : null}
            </div>
            <div>
              <p className={`timeline-row__label ${pending ? 'muted' : ''}`}>{item.label}</p>
              <p className="timeline-row__time">{item.time}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
