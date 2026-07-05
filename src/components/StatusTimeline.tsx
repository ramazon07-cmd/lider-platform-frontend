import { Icon } from './Icon';
import type { Application } from '../types';

const steps = [
  { key: 'SUBMITTED', label: 'Ariza yuborildi' },
  { key: 'UNDER_REVIEW', label: 'Ko‘rib chiqilmoqda' },
  { key: 'APPROVED', label: 'Tasdiqlandi' },
  { key: 'COMPLETED', label: 'Yakunlandi' }
];

const order = ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'COMPLETED'];

export function StatusTimeline({ status }: { status: Application['status'] }) {
  const activeIndex = status === 'REJECTED' ? 1 : status === 'CANCELLED' ? 0 : order.indexOf(status);
  return (
    <div className="status-timeline">
      {steps.map((step, index) => {
        const done = index <= activeIndex && status !== 'REJECTED';
        const current = index === activeIndex;
        return (
          <div className={`status-step ${done ? 'is-done' : ''} ${current ? 'is-current' : ''}`} key={step.key}>
            <span>{done ? <Icon name="check" size={14} /> : index + 1}</span>
            <small>{step.label}</small>
          </div>
        );
      })}
      {status === 'REJECTED' && <div className="status-rejected"><Icon name="warning" size={16} /> Ariza rad etildi</div>}
    </div>
  );
}
