export function SearchAndTrust({ trustBadges }: { trustBadges: string[] }) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div>
        <label htmlFor="gift-search" style={{ fontWeight: 700 }}>
          Find the perfect gift
        </label>
        <input id="gift-search" placeholder="Search by relationship, occasion, or sculpture style" />
      </div>
      <div className="badges">
        {trustBadges.map((item) => (
          <span className="badge" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
