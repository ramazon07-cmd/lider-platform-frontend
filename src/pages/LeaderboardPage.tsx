import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { LeaderboardEntry } from '../types';
import { Icon } from '../components/Icon';
import { Loading } from '../components/Loading';

export function LeaderboardPage() {
  const [items, setItems] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('Barcha vaqt');
  useEffect(() => { api.leaderboard.list().then(setItems).finally(() => setLoading(false)); }, []);
  const top = items.slice(0, 3);
  const rest = items.slice(3);
  return (
    <div>
      <section className="leaderboard-hero">
        <div><span className="eyebrow eyebrow--light">ENG FAOL VOLONTYORLAR</span><h2>Harakat qil. Ball to‘pla. <span>Yetakchiga aylan.</span></h2><p>Faolligingizni oshiring va O‘zbekistonning eng kuchli volontyorlari qatoridan joy oling.</p></div>
        <div className="leaderboard-hero__trophy"><Icon name="trophy" size={68} /></div>
      </section>
      <div className="leaderboard-toolbar"><div className="filter-tabs">{['Bu oy', 'Bu yil', 'Barcha vaqt'].map((item) => <button key={item} className={period === item ? 'active' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div><label className="select-field"><Icon name="map" /><select><option>Barcha hududlar</option><option>Sirdaryo</option><option>Toshkent</option></select><Icon name="chevron-down" size={15} /></label></div>
      {loading ? <Loading /> : <>
        <section className="podium">
          {top.map((entry, index) => {
            const order = index === 0 ? 1 : index === 1 ? 2 : 3;
            return <article className={`podium-card podium-card--${order}`} key={entry.id}><span className="podium-rank">{order}</span><div className="podium-avatar">{entry.full_name.split(' ').map((x) => x[0]).join('')}</div>{order === 1 && <Icon name="crown" className="podium-crown" />}<h3>{entry.full_name}</h3><p>{entry.region_name}</p><strong>{entry.total_points} ball</strong><small>{entry.completed_projects} ta loyiha</small></article>;
          })}
        </section>
        <section className="panel ranking-table-panel">
          <header><div><span className="panel-kicker">UMUMIY REYTING</span><h3>Top volontyorlar</h3></div><span className="ranking-updated"><Icon name="clock" /> Hozirgina yangilandi</span></header>
          <div className="ranking-table"><div className="ranking-table__head"><span>O‘rin</span><span>Volontyor</span><span>Hudud</span><span>Loyihalar</span><span>Ball</span></div>{rest.map((entry, index) => <div className={`ranking-table__row ${entry.id === 7 ? 'is-me' : ''}`} key={entry.id}><span className="rank-number">{index + 4}</span><span className="rank-person"><i>{entry.full_name.split(' ').map((x) => x[0]).join('')}</i><strong>{entry.full_name}{entry.id === 7 && <small>Siz</small>}</strong></span><span>{entry.region_name}</span><span>{entry.completed_projects}</span><span className="rank-points"><Icon name="star" size={16} /> {entry.total_points}</span></div>)}</div>
        </section>
      </>}
    </div>
  );
}
