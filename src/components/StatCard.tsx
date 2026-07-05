import { Icon } from './Icon';

type IconName = Parameters<typeof Icon>[0]['name'];

export function StatCard({ icon, label, value, change, tone = 'blue' }: { icon: IconName; label: string; value: string; change?: string; tone?: 'blue' | 'green' | 'purple' | 'orange' }) {
  return (
    <article className="stat-card">
      <span className={`stat-card__icon stat-card__icon--${tone}`}><Icon name={icon} /></span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {change && <small>{change}</small>}
      </div>
    </article>
  );
}
