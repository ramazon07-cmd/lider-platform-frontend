import { Icon } from '../components/Icon';

const features = [
  ['briefcase', 'Cheksiz arizalar', 'Istalgancha loyihaga ariza yuboring.'],
  ['star', '1.5x ko‘proq ball', 'Har bir faoliyatdan tezroq ball to‘plang.'],
  ['clock', 'Ustuvor ko‘rib chiqish', 'Arizalaringiz tashkilotlarga birinchi ko‘rsatiladi.'],
  ['crown', 'Eksklyuziv loyihalar', 'Ibrat, Ustoz AI va Mutolaa imkoniyatlari.'],
  ['shield', 'Hamkor volontyor maqomi', 'Maxsus profil belgisi va sertifikatlar.'],
  ['gift', 'Hamkor chegirmalari', 'Kurslar, kitoblar va tadbirlarga chegirma.']
];

export function PremiumPage() {
  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero__glow" /><div className="premium-hero__dots" />
        <div><span className="premium-pill"><Icon name="crown" size={16} /> LIDER PREMIUM</span><h2>Imkoniyatlaringizni <span>yangi darajaga</span> olib chiqing</h2><p>Ko‘proq loyiha, tezroq ball va yetakchi tashkilotlarning eksklyuziv imkoniyatlari.</p><button className="button button--white button--lg">Premiumga o‘tish <Icon name="arrow-right" /></button></div>
        <div className="premium-card-preview"><div className="premium-card-preview__top"><img src="/assets/lider-logo.png" alt="" /><span>PREMIUM</span></div><div><small>A’ZO</small><strong>RAMAZON ERGASHEV</strong></div><footer><span>№ 0007 2026</span><Icon name="crown" /></footer></div>
      </section>
      <section className="premium-features"><div className="section-heading section-heading--center"><span className="eyebrow">PREMIUM AFZALLIKLARI</span><h2>Siz uchun yaratilgan ustunliklar</h2></div><div className="feature-grid">{features.map(([icon, title, text]) => <article key={title}><span><Icon name={icon as Parameters<typeof Icon>[0]['name']} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="pricing-section"><div className="pricing-card pricing-card--main"><span className="pricing-badge">ENG OMMABOP</span><div className="pricing-icon"><Icon name="crown" size={31} /></div><h3>Lider Premium</h3><p>Faol yoshlar uchun to‘liq imkoniyatlar.</p><div className="pricing-price"><strong>29 000</strong><span>so‘m / oy</span></div><div className="pricing-list">{features.slice(0, 5).map(([, title]) => <span key={title}><Icon name="check" />{title}</span>)}</div><button className="button button--primary button--full button--lg">Premiumni faollashtirish</button><small>Istalgan vaqtda bekor qilishingiz mumkin.</small></div><div className="pricing-side"><article><Icon name="shield" /><h3>Xavfsiz to‘lov</h3><p>Uzcard, Humo va elektron to‘lov tizimlari orqali.</p></article><article><Icon name="gift" /><h3>3 oyga — 15% chegirma</h3><p>Uzoq muddatli reja bilan yanada tejamkor.</p></article><article><Icon name="users" /><h3>5 000+ premium a’zo</h3><p>Faol liderlar hamjamiyatiga qo‘shiling.</p></article></div></section>
      <section className="faq-section panel"><div><span className="eyebrow">SAVOLLAR</span><h2>Ko‘p so‘raladigan savollar</h2></div><div className="faq-list">{['Premiumni qanday bekor qilaman?', '1.5x ball qanday hisoblanadi?', 'Eksklyuziv loyihalar qayerda ko‘rinadi?', 'To‘lov qaytariladimi?'].map((question) => <details key={question}><summary>{question}<Icon name="plus" /></summary><p>Premium imkoniyatlar hisobingiz faollashgan zahoti ishga tushadi. Sozlamalar bo‘limidan obunani boshqarishingiz mumkin.</p></details>)}</div></section>
    </div>
  );
}
