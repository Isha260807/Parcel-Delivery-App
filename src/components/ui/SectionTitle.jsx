export default function SectionTitle({ title, caption, action }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {caption ? <p>{caption}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
