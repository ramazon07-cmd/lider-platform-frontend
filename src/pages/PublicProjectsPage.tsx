import { useEffect, useMemo, useState } from 'react';
import { PublicHeader } from '../components/PublicHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Icon } from '../components/Icon';
import { api } from '../lib/api';
import type { Project } from '../types';
import { regions } from '../data/mock';
import { Loading } from '../components/Loading';
import { Logo } from '../components/Logo';

export function PublicProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('Barcha hududlar');
  const [premiumOnly, setPremiumOnly] = useState(false);

  useEffect(() => { api.projects.list().then((data) => setProjects(data.results)).finally(() => setLoading(false)); }, []);

  const filtered = useMemo(() => projects.filter((project) => {
    const haystack = `${project.title} ${project.organization_name} ${project.short_description}`.toLowerCase();
    return haystack.includes(query.toLowerCase())
      && (region === 'Barcha hududlar' || project.region_name === region)
      && (!premiumOnly || project.is_premium_only);
  }), [projects, query, region, premiumOnly]);

  return (
    <div className="public-projects-page">
      <PublicHeader />
      <section className="page-hero page-hero--projects">
        <div className="hero__dots hero__dots--left" />
        <div className="container"><span className="eyebrow">VOLONTYORLIK IMKONIYATLARI</span><h1>O‘zingizga mos loyihani toping</h1><p>Qiziqishingiz va hududingizga mos loyihalarda qatnashib, foydali tajriba to‘plang.</p></div>
      </section>
      <main className="section section--projects-list">
        <div className="container">
          <div className="projects-toolbar">
            <label className="search-field"><Icon name="search" /><input placeholder="Loyiha yoki tashkilot qidiring..." value={query} onChange={(e) => setQuery(e.target.value)} /></label>
            <label className="select-field"><Icon name="map" /><select value={region} onChange={(e) => setRegion(e.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select><Icon name="chevron-down" size={16} /></label>
            <label className="premium-toggle"><input type="checkbox" checked={premiumOnly} onChange={(e) => setPremiumOnly(e.target.checked)} /><span /><Icon name="crown" size={16} /> Faqat premium</label>
          </div>
          <div className="result-row"><p><strong>{filtered.length}</strong> ta loyiha topildi</p><button className="button button--ghost"><Icon name="filter" size={17} /> Barcha filtrlar</button></div>
          {loading ? <Loading label="Loyihalar yuklanmoqda..." /> : filtered.length ? <div className="projects-grid projects-grid--wide">{filtered.map((project) => <ProjectCard project={project} key={project.id} />)}</div> : <div className="empty-state"><Icon name="search" size={36} /><h3>Loyiha topilmadi</h3><p>Qidiruv so‘zi yoki filtrlarni o‘zgartirib ko‘ring.</p></div>}
        </div>
      </main>
      <footer className="footer footer--compact"><div className="container footer__bottom"><Logo light /><span>© 2026 Lider Platformasi</span></div></footer>
    </div>
  );
}
