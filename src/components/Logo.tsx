import { Link } from 'react-router-dom';

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link to="/" className={`brand ${compact ? 'brand--compact' : ''} ${light ? 'brand--light' : ''}`} aria-label="Lider Platformasi bosh sahifasi">
      <span className="brand__mark"><img src="/assets/lider-logo.png" alt="" /></span>
      {!compact && <span className="brand__text"><strong>LIDER</strong><small>PLATFORMASI</small></span>}
    </Link>
  );
}
