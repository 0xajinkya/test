import { Badge } from '@/components/ui/badge';

const relationshipCategories = ['Girlfriend', 'Parents', 'Friends'];
const mottoCategories = ['Love & Appreciation', 'Motivation & Strength', 'Gratitude & Celebration', 'Spiritual & Meaningful'];

export function CategorySection() {
  return (
    <section className="py-6">
      <div className="container grid gap-4">
        <div>
          <h2 className="mb-3 text-2xl font-semibold">Relationship Gifting</h2>
          <div className="flex flex-wrap gap-2">
            {relationshipCategories.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-semibold">Motto-based Gifts</h2>
          <div className="flex flex-wrap gap-2">
            {mottoCategories.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
