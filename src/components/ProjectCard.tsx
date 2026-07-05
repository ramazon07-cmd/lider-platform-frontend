import { Link, useLocation } from 'react-router-dom';
import type { Project } from '../types';
import { Icon } from './Icon';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const location = useLocation();
  const detailUrl = location.pathname.startsWith('/app') ? `/app/projects/${project.slug}` : `/projects/${project.slug}`;
  const progress = Math.min(100, Math.round(((project.applicants_count ?? 0) / project.volunteer_limit) * 100));
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <div className="project-card__visual">
        <div className="project-card__symbol"><Icon name={project.id % 3 === 0 ? 'book' : project.id % 2 === 0 ? 'sparkles' : 'users'} size={36} /></div>
        {project.is_premium_only && <span className="badge badge--premium"><Icon name="crown" size={14} /> Premium</span>}
        <button className="project-card__heart" aria-label="Saqlash"><Icon name="heart" size={18} /></button>
      </div>
      <div className="project-card__body">
        <div className="project-card__org"><span className="org-dot">{project.organization_name.charAt(0)}</span>{project.organization_name}<span className="verified">✓</span></div>
        <h3><Link to={detailUrl}>{project.title}</Link></h3>
        <p>{project.short_description}</p>
        <div className="tag-row">{project.tags?.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="project-card__meta">
          <span><Icon name="calendar" size={17} /> {formatDate(project.event_start)}</span>
          <span><Icon name="map" size={17} /> {project.district_name}</span>
        </div>
        <div className="project-card__progress">
          <div><span>{project.applicants_count}/{project.volunteer_limit} volontyor</span><strong>+{project.points} ball</strong></div>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <Link to={detailUrl} className="button button--soft button--full">Batafsil ko‘rish <Icon name="arrow-right" size={17} /></Link>
      </div>
    </article>
  );
}
