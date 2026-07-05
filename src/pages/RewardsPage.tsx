import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { Reward } from '../types';
import { Icon } from '../components/Icon';
import { Loading } from '../components/Loading';
import { Modal } from '../components/Modal';

function rewardIcon(category?: string) {
  if (category === 'Kitob') return 'book'; if (category === 'Texnika') return 'headphones'; if (category === 'Premium') return 'crown'; return 'shirt';
}

export function RewardsPage() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Barchasi');
  const [selected, setSelected] = useState<Reward | null>(null);
  const [address, setAddress] = useState('Sirdaryo viloyati, Yangiyer shahri');
  const [done, setDone] = useState(false);
  useEffect(() => { api.rewards.list().then((data) => setRewards(data.results)).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => rewards.filter((item) => category === 'Barchasi' || item.category === category), [rewards, category]);
  async function redeem(event: FormEvent) { event.preventDefault(); if (!selected) return; await api.rewards.redeem(selected.id, address); setDone(true); }
  return (
    <div>
      <section className="rewards-hero"><div><span className="eyebrow eyebrow--light">BALLARINGIZNI QADRLANG</span><h2>Faolligingiz uchun munosib sovg‘alar</h2><p>To‘plagan ballaringizni kitoblar, merch va texnologik sovg‘alarga almashtiring.</p></div><div className="points-wallet"><small>Sizning balansingiz</small><strong><Icon name="star" /> {user?.total_points} ball</strong><span>Keyingi sovg‘agacha 65 ball</span></div></section>
      <div className="reward-tabs">{['Barchasi', 'Kitob', 'Merch', 'Premium', 'Texnika'].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      {loading ? <Loading /> : <div className="rewards-grid">{filtered.map((reward) => { const enough = (user?.total_points ?? 0) >= reward.required_points; return <article className="reward-card" key={reward.id}><div className={`reward-card__visual reward-card__visual--${reward.category?.toLowerCase()}`}><Icon name={rewardIcon(reward.category) as Parameters<typeof Icon>[0]['name']} size={58} /><span>{reward.category}</span></div><div className="reward-card__body"><h3>{reward.name}</h3><p>{reward.description}</p><div className="reward-stock"><span><Icon name="gift" size={15} /> {reward.stock} dona qoldi</span></div><div className="reward-card__footer"><strong><Icon name="star" size={17} /> {reward.required_points} ball</strong><button className={`button ${enough ? 'button--primary' : 'button--disabled'}`} disabled={!enough} onClick={() => { setSelected(reward); setDone(false); }}>{enough ? 'Almashtirish' : 'Ball yetarli emas'}</button></div></div></article>; })}</div>}
      <section className="panel reward-history"><div className="panel__header"><div><span className="panel-kicker">BUYURTMALAR</span><h3>Almashtirish tarixi</h3></div><button className="text-link">Barchasi</button></div><div className="history-row"><span className="activity-icon"><Icon name="book" /></span><div><strong>Lider daftar va ruchka</strong><small>10-iyun, 2026</small></div><b>-180 ball</b><span className="status-badge status-badge--approved">Yetkazildi</span></div></section>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Sovg‘ani almashtirish">
        {selected && (done ? <div className="modal-success"><span><Icon name="check" size={35} /></span><h3>Buyurtma qabul qilindi!</h3><p>Operatorimiz tez orada siz bilan bog‘lanadi.</p><button className="button button--primary" onClick={() => setSelected(null)}>Tushunarli</button></div> : <form className="redeem-form" onSubmit={redeem}><div className="redeem-preview"><span><Icon name={rewardIcon(selected.category) as Parameters<typeof Icon>[0]['name']} /></span><div><strong>{selected.name}</strong><small>{selected.required_points} ball</small></div></div><div className="redeem-balance"><span>Hozirgi balans</span><strong>{user?.total_points} ball</strong><span>Keyingi balans</span><strong>{(user?.total_points ?? 0) - selected.required_points} ball</strong></div><label className="field"><span>Yetkazib berish manzili</span><textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} required /></label><div className="modal-actions"><button type="button" className="button button--ghost" onClick={() => setSelected(null)}>Bekor qilish</button><button className="button button--primary">Tasdiqlash</button></div></form>)}
      </Modal>
    </div>
  );
}
