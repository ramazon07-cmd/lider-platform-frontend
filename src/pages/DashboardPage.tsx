import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/Icon';
import { StatCard } from '../components/StatCard';
import { ProjectCard } from '../components/ProjectCard';
import { mockApplications, mockProjects } from '../data/mock';
import { StatusTimeline } from '../components/StatusTimeline';

export function DashboardPage() {
  const { user } = useAuth();
  const approved = mockApplications.find((item) => item.status === 'APPROVED');
  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div className="welcome-banner__content"><span className="eyebrow eyebrow--light">XUSH KELIBSIZ, {user?.first_name?.toUpperCase()}!</span><h2>Bugun qanday o‘zgarish qilamiz?</h2><p>Yangi imkoniyatlarni kashf eting va liderlik yo‘lingizni davom ettiring.</p><Link to="/app/projects" className="button button--white">Loyihalarni ko‘rish <Icon name="arrow-right" /></Link></div>
        <div className="welcome-banner__logo"><img src="/assets/lider-logo.png" alt="" /></div>
        <div className="welcome-banner__dots" />
      </section>

      <section className="stats-grid">
        <StatCard icon="star" label="Jami ball" value={`${user?.total_points ?? 0}`} change="Bu oy +75 ball" tone="blue" />
        <StatCard icon="trophy" label="Reytingdagi o‘rin" value={`#${user?.rank ?? 18}`} change="3 pog‘ona yuqoriladi" tone="purple" />
        <StatCard icon="briefcase" label="Yakunlangan loyihalar" value="13" change="2 tasi bu oy" tone="green" />
        <StatCard icon="clock" label="Volontyorlik soati" value="86 soat" change="Maqsad: 100 soat" tone="orange" />
      </section>

      <section className="dashboard-grid">
        <article className="panel upcoming-panel">
          <div className="panel__header"><div><span className="panel-kicker">YAQINLASHAYOTGAN TADBIR</span><h3>{approved?.project_title}</h3></div><span className="badge badge--success">Tasdiqlangan</span></div>
          <div className="upcoming-event">
            <div className="date-box"><strong>29</strong><span>IYUL</span></div>
            <div className="event-info"><span><Icon name="clock" /> 15:00 — 18:00</span><span><Icon name="map" /> {approved?.address}</span><span><Icon name="building" /> {approved?.organization_name}</span></div>
          </div>
          <StatusTimeline status="APPROVED" />
          <div className="panel__footer"><button className="button button--soft">Tadbir tafsilotlari</button><button className="button button--ghost"><Icon name="calendar" size={17} /> Taqvimga qo‘shish</button></div>
        </article>

        <article className="panel progress-panel">
          <div className="panel__header"><div><span className="panel-kicker">OYLIK MAQSAD</span><h3>Faollik darajasi</h3></div><button className="icon-button"><Icon name="edit" size={18} /></button></div>
          <div className="progress-ring" style={{ '--value': '72%' } as React.CSSProperties}><div><strong>72%</strong><span>bajarildi</span></div></div>
          <div className="goal-row"><span>300 / 420 ball</span><strong>120 ball qoldi</strong></div>
          <div className="progress progress--large"><span style={{ width: '72%' }} /></div>
          <p className="goal-message"><Icon name="sparkles" /> Yana 2 ta loyihani yakunlasangiz, maqsadga yetasiz!</p>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-heading section-heading--split section-heading--compact"><div><span className="eyebrow">SIZ UCHUN TANLANDI</span><h2>Tavsiya etilgan loyihalar</h2></div><Link to="/app/projects" className="text-link">Barchasini ko‘rish <Icon name="arrow-right" size={18} /></Link></div>
        <div className="projects-grid">{mockProjects.slice(0, 3).map((project) => <ProjectCard project={project} key={project.id} />)}</div>
      </section>

      <section className="dashboard-grid dashboard-grid--bottom">
        <article className="panel activity-panel"><div className="panel__header"><div><span className="panel-kicker">SO‘NGGI FAOLLIK</span><h3>Ball tarixi</h3></div><Link to="/app/profile" className="text-link">Barchasi</Link></div>
          <div className="activity-list">
            {[['Yashil makon loyihasi', '+15', '28-iyun', 'tree'], ['Haftalik vazifa', '+10', '24-iyun', 'check'], ['Do‘stni taklif qilish', '+20', '18-iyun', 'users'], ['Sovg‘a buyurtmasi', '-180', '10-iyun', 'gift']].map(([title, points, date, icon]) => <div className="activity-item" key={title}><span className={`activity-icon ${points.startsWith('-') ? 'is-negative' : ''}`}><Icon name={icon === 'tree' ? 'sparkles' : icon as Parameters<typeof Icon>[0]['name']} /></span><div><strong>{title}</strong><small>{date}</small></div><b className={points.startsWith('-') ? 'negative' : ''}>{points}</b></div>)}
          </div>
        </article>
        <article className="panel rank-panel"><div className="panel__header"><div><span className="panel-kicker">SIRDARYO BO‘YICHA</span><h3>Top volontyorlar</h3></div><Link to="/app/leaderboard" className="text-link">Reyting</Link></div>
          <div className="mini-ranking">
            {[['1', 'Nodira Karimova', '780'], ['2', 'Sardor Otabekov', '655'], ['3', 'Shahnoza Umarova', '570'], ['18', `${user?.first_name} ${user?.last_name}`, `${user?.total_points}`]].map(([rank, name, points]) => <div className={rank === '18' ? 'is-me' : ''} key={rank}><span>{rank}</span><i>{name.split(' ').map((item) => item[0]).join('')}</i><strong>{name}</strong><b>{points} ball</b></div>)}
          </div>
        </article>
      </section>
    </div>
  );
}
