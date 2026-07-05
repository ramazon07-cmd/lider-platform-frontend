import { useState } from 'react';
import { Icon } from '../components/Icon';

export function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({ email: true, push: true, projects: true, application: true, rewards: false, language: 'O‘zbekcha' });
  function toggle(key: keyof typeof settings) { if (typeof settings[key] === 'boolean') setSettings({ ...settings, [key]: !settings[key] }); }
  return (
    <div className="settings-page">
      {saved && <div className="toast"><Icon name="check" /> Sozlamalar saqlandi</div>}
      <div className="settings-layout">
        <aside className="settings-nav panel"><button className="active"><Icon name="user" /> Shaxsiy ma’lumot</button><button><Icon name="bell" /> Bildirishnomalar</button><button><Icon name="globe" /> Til va hudud</button><button><Icon name="lock" /> Xavfsizlik</button><button><Icon name="shield" /> Maxfiylik</button></aside>
        <section className="settings-content">
          <article className="panel settings-section"><div className="settings-section__header"><div><span className="panel-kicker">BILDIRISHNOMALAR</span><h3>Xabarlarni boshqarish</h3><p>Qaysi turdagi xabarlarni olishni tanlang.</p></div></div>{[
            ['email', 'Email bildirishnomalari', 'Muhim yangiliklarni emailingizga yuboramiz.'],
            ['push', 'Push bildirishnomalar', 'Brauzer va mobil qurilmadagi tezkor xabarlar.'],
            ['projects', 'Yangi loyihalar', 'Hududingizda yangi loyiha chiqqanda.'],
            ['application', 'Ariza holati', 'Arizangiz holati o‘zgarganda.'],
            ['rewards', 'Aksiya va sovg‘alar', 'Yangi sovg‘alar yoki maxsus takliflar.']
          ].map(([key, title, text]) => <div className="setting-row" key={key}><div><strong>{title}</strong><p>{text}</p></div><button className={`switch ${settings[key as keyof typeof settings] ? 'active' : ''}`} onClick={() => toggle(key as keyof typeof settings)}><span /></button></div>)}</article>
          <article className="panel settings-section"><div className="settings-section__header"><div><span className="panel-kicker">TIL VA HUDUD</span><h3>Platforma tili</h3></div></div><label className="field"><span>Asosiy til</span><div className="input-wrap"><Icon name="globe" /><select value={settings.language as string} onChange={(e) => setSettings({ ...settings, language: e.target.value })}><option>O‘zbekcha</option><option>Русский</option><option>English</option></select><Icon name="chevron-down" className="select-icon" /></div></label></article>
          <article className="panel settings-section"><div className="settings-section__header"><div><span className="panel-kicker">XAVFSIZLIK</span><h3>Parolni almashtirish</h3></div></div><div className="form-grid form-grid--two"><label className="field"><span>Joriy parol</span><div className="input-wrap"><Icon name="lock" /><input type="password" placeholder="••••••••" /></div></label><label className="field"><span>Yangi parol</span><div className="input-wrap"><Icon name="lock" /><input type="password" placeholder="Kamida 8 belgi" /></div></label></div><button className="button button--outline">Parolni yangilash</button></article>
          <div className="settings-actions"><button className="button button--ghost">Bekor qilish</button><button className="button button--primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2200); }}>O‘zgarishlarni saqlash</button></div>
        </section>
      </div>
    </div>
  );
}
