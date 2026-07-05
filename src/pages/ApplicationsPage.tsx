import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import type { Application } from '../types';
import { Icon } from '../components/Icon';
import { StatusTimeline } from '../components/StatusTimeline';
import { Loading } from '../components/Loading';

const statusLabel: Record<Application['status'], string> = {
  SUBMITTED: 'Yuborilgan', UNDER_REVIEW: 'Ko‘rib chiqilmoqda', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan', CANCELLED: 'Bekor qilingan', COMPLETED: 'Yakunlangan'
};

export function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('Barchasi');
  useEffect(() => { api.applications.list().then((data) => setItems(data.results)).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => items.filter((item) => tab === 'Barchasi' || statusLabel[item.status] === tab), [items, tab]);
  return (
    <div>
      <section className="content-hero content-hero--applications"><div><span className="eyebrow">ARIZALAR MARKAZI</span><h2>Faoliyatingizni bir joydan boshqaring</h2><p>Yuborilgan arizalar holatini va yaqinlashayotgan tadbirlarni kuzating.</p></div><div className="content-hero__graphic"><Icon name="file" size={55} /></div></section>
      <div className="application-summary"><div><span><Icon name="file" /></span><strong>{items.length}</strong><small>Jami ariza</small></div><div><span><Icon name="clock" /></span><strong>{items.filter((x) => x.status === 'UNDER_REVIEW').length}</strong><small>Ko‘rib chiqilmoqda</small></div><div><span><Icon name="check" /></span><strong>{items.filter((x) => x.status === 'APPROVED').length}</strong><small>Tasdiqlangan</small></div><div><span><Icon name="trophy" /></span><strong>{items.filter((x) => x.status === 'COMPLETED').length}</strong><small>Yakunlangan</small></div></div>
      <div className="tabs tabs--applications">{['Barchasi', 'Ko‘rib chiqilmoqda', 'Tasdiqlangan', 'Yakunlangan'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
      {loading ? <Loading /> : <div className="applications-list">{filtered.map((application) => (
        <article className="application-card panel" key={application.id}>
          <header><div className="application-card__project"><span className="org-dot org-dot--large">{application.organization_name?.charAt(0)}</span><div><span>{application.organization_name}</span><h3>{application.project_title}</h3></div></div><span className={`status-badge status-badge--${application.status.toLowerCase()}`}>{statusLabel[application.status]}</span></header>
          <div className="application-card__meta"><span><Icon name="calendar" /> {new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(application.event_start ?? application.created_at))}</span><span><Icon name="map" /> {application.address ?? 'Manzil keyinroq beriladi'}</span><span><Icon name="star" /> +{application.points ?? 0} ball</span></div>
          <StatusTimeline status={application.status} />
          <footer><small>Ariza yuborilgan: {new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'long' }).format(new Date(application.created_at))}</small><div><button className="button button--ghost">Arizani ko‘rish</button>{application.status === 'APPROVED' && <button className="button button--soft">Tadbir tafsilotlari</button>}</div></footer>
        </article>
      ))}</div>}
    </div>
  );
}
