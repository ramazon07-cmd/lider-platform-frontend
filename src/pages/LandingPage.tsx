import { Link } from 'react-router-dom';
import { PublicHeader } from '../components/PublicHeader';
import { Icon } from '../components/Icon';
import { Logo } from '../components/Logo';
import { ProjectCard } from '../components/ProjectCard';
import { mockProjects } from '../data/mock';

const partners = ['Ibrat Farzandlari', 'Ustoz AI', 'Mutolaa', 'Yoshlar agentligi', 'Ekologik Harakat'];

export function LandingPage() {
  return (
    <div className="landing-page">
      <PublicHeader />
      <main>
        <section className="hero">
          <div className="hero__dots hero__dots--left" />
          <div className="hero__dots hero__dots--right" />
          <div className="container hero__grid">
            <div className="hero__content">
              <span className="eyebrow"><Icon name="sparkles" size={16} /> O‘zbekiston yoshlarining imkoniyatlar platformasi</span>
              <h1>Kelajak liderlari <span>shu yerdan</span> boshlanadi</h1>
              <p>Volontyorlik loyihalarida qatnashing, amaliy tajriba to‘plang, ball ishlang va mamlakat taraqqiyotiga hissa qo‘shing.</p>
              <div className="hero__actions">
                <Link to="/projects" className="button button--primary button--lg">Loyihalarni ko‘rish <Icon name="arrow-right" /></Link>
                <Link to="/register" className="button button--outline button--lg">Ro‘yxatdan o‘tish</Link>
              </div>
              <div className="hero__trust">
                <div className="avatar-stack"><span>AK</span><span>DR</span><span>JM</span><span>+2K</span></div>
                <div><strong>2 500+ faol yoshlar</strong><small>bugun platformadan foydalanmoqda</small></div>
              </div>
            </div>
            <div className="hero__visual" aria-label="Lider Platformasi imkoniyatlari">
              <div className="hero-logo-card">
                <img src="/assets/lider-logo.png" alt="Lider Platformasi logosi" />
                <div className="hero-logo-card__copy"><strong>LIDER</strong><span>PLATFORMASI</span></div>
              </div>
              <div className="floating-card floating-card--points"><span><Icon name="star" /></span><div><small>Jami ball</small><strong>485 ball</strong></div><b>+15</b></div>
              <div className="floating-card floating-card--rank"><span><Icon name="trophy" /></span><div><small>Reyting</small><strong>18-o‘rin</strong></div></div>
              <div className="floating-card floating-card--approved"><span><Icon name="check" /></span><div><small>Ariza holati</small><strong>Tasdiqlandi</strong></div></div>
              <div className="hero__ring hero__ring--one" /><div className="hero__ring hero__ring--two" />
            </div>
          </div>
          <div className="container stats-strip">
            <div><strong>2500+</strong><span>Faol volontyorlar</span></div>
            <div><strong>180+</strong><span>O‘tkazilgan loyihalar</span></div>
            <div><strong>42</strong><span>Hamkor tashkilotlar</span></div>
            <div><strong>14</strong><span>Hudud qamrovi</span></div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">QANDAY ISHLAYDI?</span>
              <h2>To‘rtta oddiy qadamda <span>katta imkoniyatlar</span></h2>
              <p>Profil yarating, o‘zingizga mos loyihani tanlang va faoliyatingizni rasmiy sertifikat bilan tasdiqlang.</p>
            </div>
            <div className="steps-grid">
              {[
                ['01', 'user', 'Profil yarating', 'Shaxsiy ma’lumotlaringizni kiriting va qiziqishlaringizni belgilang.'],
                ['02', 'compass', 'Loyihani toping', 'Hudud, yo‘nalish va sana bo‘yicha eng mos imkoniyatni tanlang.'],
                ['03', 'file', 'Ariza yuboring', 'Motivatsiyangizni yozing va tashkilot javobini kuzatib boring.'],
                ['04', 'trophy', 'Tajriba va ball oling', 'Faoliyatni yakunlang, sertifikat va reyting ballariga ega bo‘ling.']
              ].map(([number, icon, title, text]) => (
                <article className="step-card" key={number}>
                  <span className="step-card__number">{number}</span>
                  <span className="step-card__icon"><Icon name={icon as Parameters<typeof Icon>[0]['name']} size={28} /></span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--muted">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="eyebrow">YANGI IMKONIYATLAR</span><h2>Faol loyihalar</h2></div>
              <Link to="/projects" className="text-link">Barcha loyihalar <Icon name="arrow-right" size={18} /></Link>
            </div>
            <div className="projects-grid">{mockProjects.slice(0, 3).map((project) => <ProjectCard project={project} key={project.id} />)}</div>
          </div>
        </section>

        <section className="section impact-section">
          <div className="container impact-grid">
            <div className="impact-visual">
              <div className="impact-panel">
                <div className="impact-panel__top"><span>Faollik statistikasi</span><b>2026</b></div>
                <div className="impact-chart">
                  {[35, 48, 42, 65, 55, 78, 82, 68, 90, 84, 96, 88].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                </div>
                <div className="impact-panel__bottom"><span>Yan</span><span>Mar</span><span>May</span><span>Iyul</span><span>Sen</span><span>Dek</span></div>
              </div>
              <div className="impact-mini impact-mini--left"><Icon name="users" /><strong>+38%</strong><small>yangi volontyorlar</small></div>
              <div className="impact-mini impact-mini--right"><Icon name="chart" /><strong>24 800</strong><small>volontyorlik soati</small></div>
            </div>
            <div className="impact-copy">
              <span className="eyebrow">REAL NATIJA</span>
              <h2>Har bir ishtirok — jamiyat uchun <span>ijobiy o‘zgarish</span></h2>
              <p>Lider Platformasi yoshlarning g‘oyalarini real loyihalarga aylantiradi. Siz nafaqat tajriba orttirasiz, balki yangi jamoa, mentor va hamkorlar bilan tanishasiz.</p>
              <div className="check-list">
                <span><Icon name="check" /> Tasdiqlangan tashkilotlar va xavfsiz loyihalar</span>
                <span><Icon name="check" /> Faoliyat uchun rasmiy elektron sertifikat</span>
                <span><Icon name="check" /> Ball, reyting va qiymatli sovg‘alar tizimi</span>
              </div>
              <Link to="/register" className="button button--primary">Safimizga qo‘shiling <Icon name="arrow-right" /></Link>
            </div>
          </div>
        </section>

        <section className="section premium-banner-section">
          <div className="container premium-banner">
            <div className="premium-banner__glow" />
            <div className="premium-banner__icon"><Icon name="crown" size={44} /></div>
            <div className="premium-banner__copy"><span>PREMIUM A’ZOLIK</span><h2>Ko‘proq imkoniyat. Tezroq o‘sish.</h2><p>Cheksiz arizalar, 1.5x ball, ustuvor ko‘rib chiqish va eksklyuziv hamkor loyihalari.</p></div>
            <Link to="/premium" className="button button--white">Premiumni ko‘rish <Icon name="arrow-right" /></Link>
          </div>
        </section>

        <section className="section" id="partners">
          <div className="container">
            <div className="section-heading section-heading--center"><span className="eyebrow">ISHONCHLI HAMKORLAR</span><h2>Birgalikda katta natijalar</h2></div>
            <div className="partners-row">{partners.map((partner, index) => <div className="partner-card" key={partner}><span>{index + 1}</span><strong>{partner}</strong></div>)}</div>
          </div>
        </section>

        <section className="section final-cta-section">
          <div className="container final-cta">
            <div className="hero__dots hero__dots--cta" />
            <img src="/assets/lider-logo.png" alt="" />
            <span className="eyebrow eyebrow--light">BUGUN BOSHLANG</span>
            <h2>Sizning liderlik yo‘lingiz shu yerdan boshlanadi</h2>
            <p>O‘z hududingizdagi eng yaxshi volontyorlik imkoniyatlarini kashf eting.</p>
            <Link to="/register" className="button button--white button--lg">Bepul ro‘yxatdan o‘tish <Icon name="arrow-right" /></Link>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer__grid">
          <div><Logo light /><p>Yoshlarni birlashtiruvchi, rivojlantiruvchi va yangi imkoniyatlarga olib boruvchi milliy platforma.</p></div>
          <div><strong>Platforma</strong><Link to="/projects">Loyihalar</Link><Link to="/premium">Premium</Link><a href="/#how">Qanday ishlaydi?</a></div>
          <div><strong>Yordam</strong><a href="#">Ko‘p so‘raladigan savollar</a><a href="#">Maxfiylik siyosati</a><a href="#">Bog‘lanish</a></div>
          <div><strong>Aloqa</strong><a href="mailto:info@lider.uz">info@lider.uz</a><a href="tel:+998712000000">+998 71 200 00 00</a><span>Telegram: @lider_platformasi</span></div>
        </div>
        <div className="container footer__bottom"><span>© 2026 Lider Platformasi. Barcha huquqlar himoyalangan.</span><span>O‘zbekiston yoshlari uchun yaratilgan.</span></div>
      </footer>
    </div>
  );
}
