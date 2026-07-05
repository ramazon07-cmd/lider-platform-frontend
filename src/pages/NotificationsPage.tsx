import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import type { Notification } from '../types';
import { Icon } from '../components/Icon';
import { Loading } from '../components/Loading';

function iconFor(type?: Notification['type']) {
  if (type === 'success') return 'check';
  if (type === 'warning') return 'warning';
  if (type === 'reward') return 'gift';
  return 'bell';
}

export function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('Barchasi');
  useEffect(() => { api.notifications.list().then((data) => setItems(data.results)).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => items.filter((item) => tab === 'Barchasi' || !item.is_read), [items, tab]);
  function markAll() { setItems((current) => current.map((item) => ({ ...item, is_read: true }))); }
  return (
    <div>
      <section className="content-hero content-hero--notifications"><div><span className="eyebrow">YANGILIKLAR MARKAZI</span><h2>Hech bir imkoniyatni o‘tkazib yubormang</h2><p>Arizalar, ballar va yangi loyihalar haqida barcha xabarlar shu yerda.</p></div><div className="content-hero__graphic"><Icon name="bell" size={55} /></div></section>
      <div className="notification-toolbar"><div className="tabs tabs--small">{['Barchasi', 'O‘qilmagan'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}{item === 'O‘qilmagan' && <b>{items.filter((x) => !x.is_read).length}</b>}</button>)}</div><button className="button button--ghost" onClick={markAll}><Icon name="check" size={17} /> Barchasini o‘qilgan qilish</button></div>
      {loading ? <Loading /> : <div className="notification-list panel">{filtered.map((item) => <article className={`notification-item ${item.is_read ? '' : 'is-unread'}`} key={item.id}><span className={`notification-item__icon notification-item__icon--${item.type}`}><Icon name={iconFor(item.type) as Parameters<typeof Icon>[0]['name']} /></span><div><h3>{item.title}</h3><p>{item.message}</p><small>{new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(item.created_at))}</small></div>{!item.is_read && <i />}</article>)}</div>}
    </div>
  );
}
