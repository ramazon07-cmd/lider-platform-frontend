import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icon } from './Icon';
import { Logo } from './Logo';

const navItems = [
  { to: '/app', label: 'Bosh sahifa', icon: 'home' as const, end: true },
  { to: '/app/projects', label: 'Loyihalar', icon: 'briefcase' as const },
  { to: '/app/applications', label: 'Arizalarim', icon: 'file' as const },
  { to: '/app/leaderboard', label: 'Reyting', icon: 'trophy' as const },
  { to: '/app/rewards', label: 'Sovg‘alar', icon: 'gift' as const },
  { to: '/app/premium', label: 'Premium', icon: 'crown' as const },
  { to: '/app/notifications', label: 'Bildirishnomalar', icon: 'bell' as const },
  { to: '/app/profile', label: 'Profil', icon: 'user' as const },
  { to: '/app/settings', label: 'Sozlamalar', icon: 'settings' as const }
];

const titleMap: Record<string, string> = {
  '/app': 'Bosh sahifa',
  '/app/projects': 'Loyihalar',
  '/app/applications': 'Arizalarim',
  '/app/leaderboard': 'Volontyorlar reytingi',
  '/app/rewards': 'Sovg‘alar do‘koni',
  '/app/premium': 'Lider Premium',
  '/app/notifications': 'Bildirishnomalar',
  '/app/profile': 'Mening profilim',
  '/app/settings': 'Sozlamalar'
};

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const currentTitle = Object.entries(titleMap).find(([path]) => location.pathname === path)?.[1]
    ?? (location.pathname.includes('/app/projects/') ? 'Loyiha haqida' : 'Lider Platformasi');

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <div className="app-layout">
      {sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Menyuni yopish" />}
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="sidebar__brand"><Logo /></div>
        <nav className="sidebar__nav">
          <p className="sidebar__label">ASOSIY MENYU</p>
          {navItems.slice(0, 6).map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon name={item.icon} size={20} /><span>{item.label}</span>
              {item.to === '/app/notifications' && <b>2</b>}
            </NavLink>
          ))}
          <p className="sidebar__label sidebar__label--second">HISOB</p>
          {navItems.slice(6).map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon name={item.icon} size={20} /><span>{item.label}</span>
              {item.to === '/app/notifications' && <b>2</b>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__premium">
          <div><Icon name="crown" /></div>
          <strong>Premium faol</strong>
          <p>1.5x ball va maxsus loyihalar</p>
          <NavLink to="/app/premium">Batafsil</NavLink>
        </div>
        <button className="sidebar__logout" onClick={handleLogout}><Icon name="logout" size={19} /> Chiqish</button>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <button className="icon-button sidebar-toggle" onClick={() => setSidebarOpen(true)} aria-label="Menyuni ochish"><Icon name="menu" /></button>
          <div><span className="topbar-eyebrow">LIDER PLATFORMASI</span><h1>{currentTitle}</h1></div>
          <div className="app-topbar__actions">
            <label className="topbar-search"><Icon name="search" size={18} /><input placeholder="Qidirish..." /></label>
            <NavLink to="/app/notifications" className="notification-button" aria-label="Bildirishnomalar"><Icon name="bell" /><span>2</span></NavLink>
            <div className="profile-menu">
              <button className="profile-trigger" onClick={() => setProfileOpen((value) => !value)}>
                <span className="avatar">{user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}</span>
                <span className="profile-trigger__text"><strong>{user?.first_name} {user?.last_name}</strong><small>#{user?.rank ?? 18} o‘rin</small></span>
                <Icon name="chevron-down" size={15} />
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <NavLink to="/app/profile"><Icon name="user" size={17} /> Profil</NavLink>
                  <NavLink to="/app/settings"><Icon name="settings" size={17} /> Sozlamalar</NavLink>
                  <button onClick={handleLogout}><Icon name="logout" size={17} /> Chiqish</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="app-content">{children}</main>
      </div>

      <nav className="mobile-bottom-nav">
        {navItems.slice(0, 5).map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            <Icon name={item.icon} size={21} /><span>{item.label === 'Bosh sahifa' ? 'Asosiy' : item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
