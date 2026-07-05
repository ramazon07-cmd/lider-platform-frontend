import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/Icon';

export function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="profile-page">
      <section className="profile-cover"><div className="profile-cover__dots" /></section>
      <section className="profile-card panel">
        <div className="profile-avatar-large">{user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}<button><Icon name="edit" size={16} /></button></div>
        <div className="profile-card__identity"><div><h2>{user?.first_name} {user?.last_name}<span className="verified">✓</span></h2><p>@ramazon07 · {user?.region_name}</p></div><div className="profile-badges"><span className="badge badge--premium"><Icon name="crown" size={14} /> Premium</span><span className="badge badge--success"><Icon name="shield" size={14} /> Tasdiqlangan</span></div></div>
        <button className="button button--outline"><Icon name="edit" size={17} /> Profilni tahrirlash</button>
      </section>
      <section className="profile-stats"><div><strong>{user?.total_points}</strong><span>Jami ball</span></div><div><strong>13</strong><span>Yakunlangan loyiha</span></div><div><strong>86</strong><span>Volontyorlik soati</span></div><div><strong>#18</strong><span>Umumiy reyting</span></div></section>
      <div className="profile-grid">
        <article className="panel profile-info"><div className="panel__header"><div><span className="panel-kicker">SHAXSIY MA’LUMOT</span><h3>Profil ma’lumotlari</h3></div><button className="icon-button"><Icon name="edit" size={18} /></button></div><div className="info-list"><div><span><Icon name="mail" />Email</span><strong>{user?.email}</strong></div><div><span><Icon name="phone" />Telefon</span><strong>{user?.phone}</strong></div><div><span><Icon name="calendar" />Tug‘ilgan sana</span><strong>7-sentabr, 2010</strong></div><div><span><Icon name="map" />Hudud</span><strong>{user?.district_name}, {user?.region_name}</strong></div><div><span><Icon name="building" />Ta’lim muassasasi</span><strong>Lider xususiy maktab</strong></div></div></article>
        <article className="panel profile-level"><span className="panel-kicker">DARAJA</span><h3>Faol lider</h3><div className="level-badge"><Icon name="trophy" size={48} /></div><strong>7-daraja</strong><p>Keyingi darajagacha 115 ball</p><div className="progress progress--large"><span style={{ width: '76%' }} /></div><small>485 / 600 ball</small></article>
      </div>
      <section className="panel certificates-section"><div className="panel__header"><div><span className="panel-kicker">YUTUQLAR</span><h3>Sertifikatlar</h3></div><button className="text-link">Barchasini ko‘rish</button></div><div className="certificates-grid">{['Yashil makon volontyori', 'Mahalla yoshlar forumi', 'Kitobxonlik targ‘ibotchisi'].map((title, index) => <article className="certificate-card" key={title}><div className="certificate-card__logo"><img src="/assets/lider-logo.png" alt="" /></div><span>SERTIFIKAT</span><h4>{title}</h4><p>Ergashev Ramazon</p><footer><small>№ LP-2026-00{index + 17}</small><button><Icon name="download" size={17} /></button></footer></article>)}</div></section>
    </div>
  );
}
