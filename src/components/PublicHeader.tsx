import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from './Icon';
import { Logo } from './Logo';

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="public-header">
      <div className="container public-header__inner">
        <Logo />
        <button className="icon-button mobile-only" aria-label="Menyuni ochish" onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav className={`public-nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end>Bosh sahifa</NavLink>
          <NavLink to="/projects">Loyihalar</NavLink>
          <a href="/#how">Qanday ishlaydi?</a>
          <a href="/#partners">Hamkorlar</a>
          <NavLink to="/premium">Premium</NavLink>
          <div className="language-pill"><span>🇺🇿</span> UZ <Icon name="chevron-down" size={14} /></div>
          <Link to="/login" className="button button--ghost">Kirish</Link>
          <Link to="/register" className="button button--primary">Ro‘yxatdan o‘tish</Link>
        </nav>
      </div>
    </header>
  );
}
