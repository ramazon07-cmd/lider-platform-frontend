import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Icon } from "../components/Icon";
import { StatCard } from "../components/StatCard";
import { ProjectCard } from "../components/ProjectCard";
import { StatusTimeline } from "../components/StatusTimeline";
import { api } from "../lib/api";
import type { Application, Project } from "../types";

export function DashboardPage() {
  const { user } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.applications
      .list()
      .then((data) => setApplications(data.results))
      .catch(() => setApplications([]));

    api.projects
      .list()
      .then((data) => setProjects(data.results))
      .catch(() => setProjects([]));
  }, []);

  const approved = applications.find((item) => item.status === "APPROVED");
  const completedCount = applications.filter(
    (item) => item.status === "COMPLETED",
  ).length;
  const totalPoints = user?.total_points ?? 0;

  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div className="welcome-banner__content">
          <span className="eyebrow eyebrow--light">
            XUSH KELIBSIZ, {user?.first_name?.toUpperCase()}!
          </span>

          <h2>Bugun qanday o‘zgarish qilamiz?</h2>

          <p>
            Yangi imkoniyatlarni kashf eting va liderlik yo‘lingizni davom
            ettiring.
          </p>

          <Link to="/app/projects" className="button button--white">
            Loyihalarni ko‘rish <Icon name="arrow-right" />
          </Link>
        </div>

        <div className="welcome-banner__logo">
          <img src="/assets/lider-logo.png" alt="" />
        </div>

        <div className="welcome-banner__dots" />
      </section>

      <section className="stats-grid">
        <StatCard
          icon="star"
          label="Jami ball"
          value={`${totalPoints}`}
          change="Faollik orqali ball to‘plang"
          tone="blue"
        />

        <StatCard
          icon="trophy"
          label="Reytingdagi o‘rin"
          value={`#${user?.rank ?? "-"}`}
          change="Reyting ballga qarab yangilanadi"
          tone="purple"
        />

        <StatCard
          icon="briefcase"
          label="Yakunlangan loyihalar"
          value={`${completedCount}`}
          change="Tasdiqlangan faoliyatlar"
          tone="green"
        />

        <StatCard
          icon="clock"
          label="Arizalar"
          value={`${applications.length}`}
          change="Jami yuborilgan arizalar"
          tone="orange"
        />
      </section>

      <section className="dashboard-grid">
        <article className="panel upcoming-panel">
          <div className="panel__header">
            <div>
              <span className="panel-kicker">YAQINLASHAYOTGAN TADBIR</span>
              <h3>
                {approved?.project_title ?? "Hali tasdiqlangan loyiha yo‘q"}
              </h3>
            </div>

            {approved && (
              <span className="badge badge--success">Tasdiqlangan</span>
            )}
          </div>

          {approved ? (
            <>
              <div className="upcoming-event">
                <div className="date-box">
                  <strong>
                    {new Intl.DateTimeFormat("uz-UZ", {
                      day: "2-digit",
                    }).format(
                      new Date(approved.event_start ?? approved.created_at),
                    )}
                  </strong>

                  <span>
                    {new Intl.DateTimeFormat("uz-UZ", { month: "short" })
                      .format(
                        new Date(approved.event_start ?? approved.created_at),
                      )
                      .toUpperCase()}
                  </span>
                </div>

                <div className="event-info">
                  <span>
                    <Icon name="clock" />{" "}
                    {new Intl.DateTimeFormat("uz-UZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(
                      new Date(approved.event_start ?? approved.created_at),
                    )}
                  </span>

                  <span>
                    <Icon name="map" />{" "}
                    {approved.address ?? "Manzil keyinroq beriladi"}
                  </span>

                  <span>
                    <Icon name="building" />{" "}
                    {approved.organization_name ?? "Tashkilot"}
                  </span>
                </div>
              </div>

              <StatusTimeline status="APPROVED" />

              <div className="panel__footer">
                <button className="button button--soft">
                  Tadbir tafsilotlari
                </button>

                <button className="button button--ghost">
                  <Icon name="calendar" size={17} /> Taqvimga qo‘shish
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Icon name="file" size={32} />
              <h3>Hali tadbir yo‘q</h3>
              <p>Loyihalarga ariza topshiring va tasdiqlanishini kuting.</p>
            </div>
          )}
        </article>

        <article className="panel progress-panel">
          <div className="panel__header">
            <div>
              <span className="panel-kicker">OYLIK MAQSAD</span>
              <h3>Faollik darajasi</h3>
            </div>

            <button className="icon-button">
              <Icon name="edit" size={18} />
            </button>
          </div>

          <div
            className="progress-ring"
            style={{ "--value": "72%" } as React.CSSProperties}
          >
            <div>
              <strong>72%</strong>
              <span>bajarildi</span>
            </div>
          </div>

          <div className="goal-row">
            <span>{totalPoints} ball</span>
            <strong>Keyingi bosqichga davom eting</strong>
          </div>

          <div className="progress progress--large">
            <span style={{ width: "72%" }} />
          </div>

          <p className="goal-message">
            <Icon name="sparkles" /> Yana loyihalarda qatnashsangiz,
            reytingingiz oshadi!
          </p>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-heading section-heading--split section-heading--compact">
          <div>
            <span className="eyebrow">SIZ UCHUN TANLANDI</span>
            <h2>Tavsiya etilgan loyihalar</h2>
          </div>

          <Link to="/app/projects" className="text-link">
            Barchasini ko‘rish <Icon name="arrow-right" size={18} />
          </Link>
        </div>

        <div className="projects-grid">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--bottom">
        <article className="panel activity-panel">
          <div className="panel__header">
            <div>
              <span className="panel-kicker">SO‘NGGI FAOLLIK</span>
              <h3>Arizalar holati</h3>
            </div>

            <Link to="/app/applications" className="text-link">
              Barchasi
            </Link>
          </div>

          <div className="activity-list">
            {applications.slice(0, 4).map((application) => (
              <div className="activity-item" key={application.id}>
                <span className="activity-icon">
                  <Icon name="file" />
                </span>

                <div>
                  <strong>{application.project_title}</strong>
                  <small>{application.status}</small>
                </div>

                <b>+{application.points ?? 0}</b>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="empty-state">
                <Icon name="file" size={30} />
                <h3>Hali ariza yo‘q</h3>
                <p>Birinchi arizangizni yuboring.</p>
              </div>
            )}
          </div>
        </article>

        <article className="panel rank-panel">
          <div className="panel__header">
            <div>
              <span className="panel-kicker">PROFIL</span>
              <h3>Sizning holatingiz</h3>
            </div>

            <Link to="/app/profile" className="text-link">
              Profil
            </Link>
          </div>

          <div className="mini-ranking">
            <div className="is-me">
              <span>#</span>
              <i>
                {user?.first_name?.charAt(0)}
                {user?.last_name?.charAt(0)}
              </i>
              <strong>
                {user?.first_name} {user?.last_name}
              </strong>
              <b>{user?.total_points ?? 0} ball</b>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
