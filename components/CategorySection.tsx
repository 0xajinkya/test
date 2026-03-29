const relationshipCategories = ['Girlfriend', 'Parents', 'Friends'];
const mottoCategories = ['Love & Appreciation', 'Motivation & Strength', 'Gratitude & Celebration', 'Spiritual & Meaningful'];

export function CategorySection() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <h2>Relationship Gifting</h2>
          <div className="badges">
            {relationshipCategories.map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2>Motto-based Gifts</h2>
          <div className="badges">
            {mottoCategories.map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
