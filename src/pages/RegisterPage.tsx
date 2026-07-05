import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const districts: Record<string, string[]> = {
  'Sirdaryo viloyati': ['Yangiyer shahri', 'Guliston shahri', 'Shirin shahri', 'Sirdaryo tumani'],
  'Toshkent shahri': ['Yunusobod', 'Chilonzor', 'Mirzo Ulug‘bek', 'Shayxontohur'],
  'Samarqand viloyati': ['Samarqand shahri', 'Urgut', 'Kattaqo‘rg‘on'],
  'Farg‘ona viloyati': ['Farg‘ona shahri', 'Qo‘qon', 'Marg‘ilon']
};

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('UZ');
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', region: 'Sirdaryo viloyati', district: 'Yangiyer shahri', birth_date: '', phone: '', password: '', password_confirm: '', terms: false });

  function update(name: string, value: string | boolean) { setForm((current) => ({ ...current, [name]: value })); }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (form.password !== form.password_confirm) { setError('Parollar bir-biriga mos emas.'); return; }
    if (!form.terms) { setError('Foydalanish shartlariga rozilik bildiring.'); return; }
    setLoading(true);
    try {
      await register({ ...form, region: 12, district: 121 });
      setSuccess(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Ro‘yxatdan o‘tishda xatolik yuz berdi.'); }
    finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="register-success-page">
        <div className="success-dots success-dots--one" /><div className="success-dots success-dots--two" />
        <section className="success-card">
          <Logo />
          <div className="success-logo"><img src="/assets/lider-logo.png" alt="Lider Platformasi" /></div>
          <div className="success-check"><Icon name="check" size={44} /></div>
          <h1>Ro‘yxatdan muvaffaqiyatli o‘tdingiz!</h1>
          <p>Hisobingiz yaratildi. Endi platformadagi imkoniyatlardan foydalanishingiz mumkin.</p>
          <button className="button button--primary button--lg button--full" onClick={() => navigate('/login')}>Davom etish <Icon name="arrow-right" /></button>
        </section>
      </div>
    );
  }

  return (
    <div className="register-page">
      <aside className="register-aside">
        <Logo light />
        <div className="register-aside__content"><span className="eyebrow eyebrow--light">YANGI AVLOD LIDERLARI</span><h1>O‘zgarishning bir qismi bo‘ling.</h1><p>Volontyorlik orqali tajriba, do‘stlar, sertifikat va kelajak uchun kuchli portfolio yarating.</p></div>
        <div className="register-feature-list"><span><Icon name="shield" /> Ishonchli loyihalar</span><span><Icon name="trophy" /> Ball va reyting</span><span><Icon name="file" /> Rasmiy sertifikatlar</span></div>
      </aside>
      <main className="register-main">
        <div className="register-panel">
          <div className="mobile-auth-logo"><Logo /></div>
          <div className="register-heading"><div><span className="auth-kicker">YANGI HISOB</span><h2>Ro‘yxatdan o‘tish</h2><p>Ma’lumotlaringizni to‘ldiring va liderlar safidan joy oling.</p></div><Link to="/login">Kirish</Link></div>
          <div className="language-tabs">
            {['UZ', 'RUS', 'ENG'].map((item) => <button key={item} onClick={() => setLang(item)} className={lang === item ? 'active' : ''}><span>{item === 'UZ' ? '🇺🇿' : item === 'RUS' ? '🇷🇺' : '🇬🇧'}</span>{item}</button>)}
          </div>
          {error && <div className="form-alert form-alert--error"><Icon name="warning" />{error}</div>}
          <form className="register-form" onSubmit={submit}>
            <div className="form-grid form-grid--two">
              <label className="field"><span>Ism</span><div className="input-wrap"><Icon name="user" /><input required value={form.first_name} onChange={(e) => update('first_name', e.target.value)} placeholder="Ismingiz" /></div></label>
              <label className="field"><span>Familiya</span><div className="input-wrap"><Icon name="user" /><input required value={form.last_name} onChange={(e) => update('last_name', e.target.value)} placeholder="Familiyangiz" /></div></label>
            </div>
            <label className="field"><span>Email manzil</span><div className="input-wrap"><Icon name="mail" /><input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@example.com" /></div></label>
            <div className="form-grid form-grid--two">
              <label className="field"><span>Viloyat</span><div className="input-wrap"><Icon name="map" /><select value={form.region} onChange={(e) => { update('region', e.target.value); update('district', districts[e.target.value][0]); }}>{Object.keys(districts).map((region) => <option key={region}>{region}</option>)}</select><Icon name="chevron-down" className="select-icon" /></div></label>
              <label className="field"><span>Tuman / shahar</span><div className="input-wrap"><Icon name="building" /><select value={form.district} onChange={(e) => update('district', e.target.value)}>{districts[form.region].map((district) => <option key={district}>{district}</option>)}</select><Icon name="chevron-down" className="select-icon" /></div></label>
            </div>
            <div className="form-grid form-grid--two">
              <label className="field"><span>Tug‘ilgan sana</span><div className="input-wrap"><Icon name="calendar" /><input type="date" required value={form.birth_date} onChange={(e) => update('birth_date', e.target.value)} /></div></label>
              <label className="field"><span>Telefon raqami</span><div className="input-wrap"><Icon name="phone" /><input required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+998 90 123 45 67" /></div></label>
            </div>
            <div className="form-grid form-grid--two">
              <label className="field"><span>Parol</span><div className="input-wrap"><Icon name="lock" /><input type={showPassword ? 'text' : 'password'} required minLength={8} value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Kamida 8 ta belgi" /><button type="button" className="input-action" onClick={() => setShowPassword((v) => !v)}><Icon name={showPassword ? 'eye-off' : 'eye'} /></button></div></label>
              <label className="field"><span>Parolni tasdiqlang</span><div className="input-wrap"><Icon name="lock" /><input type={showPassword ? 'text' : 'password'} required minLength={8} value={form.password_confirm} onChange={(e) => update('password_confirm', e.target.value)} placeholder="Parolni takrorlang" /></div></label>
            </div>
            <label className="checkbox checkbox--terms"><input type="checkbox" checked={form.terms} onChange={(e) => update('terms', e.target.checked)} /><span /> Men <a href="#">foydalanish shartlari</a> va <a href="#">maxfiylik siyosati</a>ga roziman.</label>
            <button className="button button--primary button--full button--lg" disabled={loading}>{loading ? <><span className="button-spinner" /> Yaratilmoqda...</> : <>Ro‘yxatdan o‘tish <Icon name="arrow-right" /></>}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
