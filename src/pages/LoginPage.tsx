import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Logo } from '../components/Logo';
import { MOCK_MODE, useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: "", password: "" });

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(''); setLoading(true);
    try { await login(form.email, form.password); navigate('/app'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Kirish amalga oshmadi.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="auth-page auth-page--login">
      <div className="auth-decoration auth-decoration--one" />
      <div className="auth-decoration auth-decoration--two" />
      <section className="auth-showcase">
        <Logo light />
        <div className="auth-showcase__content">
          <span className="eyebrow eyebrow--light">LIDERLAR HAMJAMIYATI</span>
          <h1>
            Yaxshi g‘oyalar <span>harakatdan</span> boshlanadi.
          </h1>
          <p>
            Profilingizga kiring, arizalaringizni boshqaring va yangi
            volontyorlik imkoniyatlarini toping.
          </p>
          <div className="auth-quote">
            <Icon name="sparkles" />
            <p>
              “Yetakchilik — boshqalarga yo‘l ko‘rsatishdan oldin o‘zingiz
              harakat boshlashingizdir.”
            </p>
          </div>
        </div>
        <small>© 2026 Lider Platformasi</small>
      </section>
      <section className="auth-form-side">
        <div className="auth-form-card">
          <div className="mobile-auth-logo">
            <Logo />
          </div>
          <span className="auth-kicker">XUSH KELIBSIZ</span>
          <h2>Hisobingizga kiring</h2>
          <p className="auth-subtitle">
            Faoliyatingizni davom ettirish uchun ma’lumotlarni kiriting.
          </p>
          {error && (
            <div className="form-alert form-alert--error">
              <Icon name="warning" />
              {error}
            </div>
          )}
          <form onSubmit={submit} className="auth-form">
            <label className="field">
              <span>Email manzil</span>
              <div className="input-wrap">
                <Icon name="mail" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </label>
            <label className="field">
              <span>Parol</span>
              <div className="input-wrap">
                <Icon name="lock" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Parolingizni kiriting"
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} />
                </button>
              </div>
            </label>
            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                <span /> Meni eslab qol
              </label>
              <a href="#">Parolni unutdingizmi?</a>
            </div>
            <button
              className="button button--primary button--full button--lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner" /> Kirilmoqda...
                </>
              ) : (
                <>
                  Kirish <Icon name="arrow-right" />
                </>
              )}
            </button>
          </form>
          <div className="auth-divider">
            <span>yoki</span>
          </div>
          <p className="auth-switch">
            Hisobingiz yo‘qmi? <Link to="/register">Ro‘yxatdan o‘ting</Link>
          </p>
          {MOCK_MODE && (
            <div className="demo-note">
              <Icon name="info" size={17} />
              <span>
                Demo rejim faol: istalgan email va parol bilan kirishingiz
                mumkin.
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
