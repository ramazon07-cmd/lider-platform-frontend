import { useEffect, useMemo, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { Icon } from '../components/Icon';
import { api } from '../lib/api';
import type { Project } from '../types';
import { Loading } from '../components/Loading';

export function AppProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Barchasi');
  useEffect(() => { api.projects.list().then((data) => setProjects(data.results)).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => projects.filter((project) => {
    const matches = `${project.title} ${project.organization_name}`.toLowerCase().includes(query.toLowerCase());
    if (filter === 'Premium') return matches && project.is_premium_only;
    if (filter === 'Sirdaryo') return matches && project.region_name === 'Sirdaryo';
    return matches;
  }), [projects, query, filter]);
  return (
    <div>
      <section className="content-hero"><div><span className="eyebrow">YANGI IMKONIYATLAR</span><h2>O‘z yo‘nalishingizni tanlang</h2><p>Qiziqish, hudud va vaqtingizga mos volontyorlik loyihalarini toping.</p></div><div className="content-hero__graphic"><Icon name="compass" size={55} /></div></section>
      <div className="app-filter-bar"><label className="search-field"><Icon name="search" /><input placeholder="Loyihalarni qidiring..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><div className="filter-tabs">{['Barchasi', 'Sirdaryo', 'Premium'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item === 'Premium' && <Icon name="crown" size={15} />}{item}</button>)}</div><button className="button button--ghost"><Icon name="filter" size={17} /> Filtr</button></div>
      <div className="result-row"><p><strong>{filtered.length}</strong> ta faol loyiha</p><select className="sort-select"><option>Eng yangi</option><option>Eng ko‘p ball</option><option>Muddat bo‘yicha</option></select></div>
      {loading ? <Loading /> : <div className="projects-grid projects-grid--app">{filtered.map((project) => <ProjectCard project={project} key={project.id} />)}</div>}
    </div>
  );
}
