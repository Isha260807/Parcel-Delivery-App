export default function FarePanel({ estimate, compact = false }) {
  if (!estimate) return null;

  return (
    <section className={`fare-panel ${compact ? 'fare-panel--compact' : ''}`}>
      <div>
        <p className="fare-panel__label">Estimated Fare</p>
        <p className="fare-panel__amount">INR {estimate.total}</p>
      </div>
      <div className="fare-panel__grid">
        <p>Base: INR {estimate.base}</p>
        <p>Distance: INR {estimate.distanceFee}</p>
        <p>Surge: INR {estimate.surge}</p>
        <p>Tax: INR {estimate.tax}</p>
      </div>
      <p className="fare-panel__eta">Arrival window: {estimate.etaText}</p>
    </section>
  );
}
