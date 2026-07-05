import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Logo } from '../components/Logo';
export function NotFoundPage() { return <div className="not-found"><Logo /><span>404</span><h1>Sahifa topilmadi</h1><p>Siz izlayotgan sahifa o‘chirilgan yoki manzili o‘zgargan.</p><Link to="/" className="button button--primary"><Icon name="home" /> Bosh sahifaga qaytish</Link></div>; }
