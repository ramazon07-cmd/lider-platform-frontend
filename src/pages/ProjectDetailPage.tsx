import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { Icon } from "../components/Icon";
import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal";
import { PublicHeader } from "../components/PublicHeader";
import { api } from "../lib/api";
import type { Project } from "../types";
import { useAuth } from "../context/AuthContext";

type AnswerValue = string | boolean;
type AnswersState = Record<number, AnswerValue>;

function formatDate(value: string, time = false) {
  return new Intl.DateTimeFormat(
    "uz-UZ",
    time
      ? {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      : {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
  ).format(new Date(value));
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.";
}

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const publicView = !location.pathname.startsWith("/app/");

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [applyOpen, setApplyOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    motivation: "",
    experience: "",
    education_place: "Lider xususiy maktab",
  });

  const [answers, setAnswers] = useState<AnswersState>({});

  useEffect(() => {
    let mounted = true;

    async function loadProject() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await api.projects.detail(slug);
        if (mounted) {
          setProject(data);
        }
      } catch (error) {
        if (mounted) {
          setLoadError(getErrorMessage(error));
          setProject(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      mounted = false;
    };
  }, [slug]);

  function openApply() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setSubmitError("");
    setApplyOpen(true);
  }

  function updateAnswer(questionId: number, value: AnswerValue) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function buildAnswersPayload() {
    if (!project?.questions?.length) return [];

    return project.questions
      .filter((question) => {
        const value = answers[question.id];

        if (typeof value === "boolean") return true;
        return value !== undefined && String(value).trim() !== "";
      })
      .map((question) => ({
        question: question.id,
        answer: answers[question.id],
      }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!project) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await api.applications.create({
        project: project.id,
        motivation: form.motivation.trim(),
        experience: form.experience.trim(),
        education_place: form.education_place.trim(),
        answers: buildAnswersPayload(),
      });

      setApplyOpen(false);
      setApplied(true);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  const content = loading ? (
    <Loading label="Loyiha ma’lumotlari yuklanmoqda..." />
  ) : loadError ? (
    <div className="empty-state">
      <Icon name="warning" size={36} />
      <h3>Loyihani yuklab bo‘lmadi</h3>
      <p>{loadError}</p>
    </div>
  ) : !project ? (
    <div className="empty-state">
      <Icon name="search" size={36} />
      <h3>Loyiha topilmadi</h3>
      <p>Bu loyiha mavjud emas yoki o‘chirib tashlangan.</p>
    </div>
  ) : (
    <>
      <section className="project-detail-hero">
        <div className="project-detail-hero__pattern" />

        <div className="project-detail-hero__content">
          <div className="breadcrumbs">
            <Link to={publicView ? "/projects" : "/app/projects"}>
              Loyihalar
            </Link>
            <Icon name="chevron-right" size={14} />
            <span>{project.title}</span>
          </div>

          <div className="project-detail-org">
            <span className="org-dot org-dot--large">
              {project.organization_name.charAt(0)}
            </span>

            <div>
              <strong>{project.organization_name}</strong>
              <small>
                Tasdiqlangan tashkilot <span className="verified">✓</span>
              </small>
            </div>
          </div>

          <div className="project-detail-title-row">
            <div>
              <div className="tag-row">
                {project.tags?.map((tag) => (
                  <span className="tag tag--white" key={tag}>
                    {tag}
                  </span>
                ))}

                {project.is_premium_only && (
                  <span className="badge badge--premium">
                    <Icon name="crown" size={14} /> Premium
                  </span>
                )}
              </div>

              <h1>{project.title}</h1>
              <p>{project.short_description}</p>
            </div>

            <button
              className="project-save"
              type="button"
              aria-label="Loyihani saqlash"
            >
              <Icon name="heart" />
            </button>
          </div>
        </div>
      </section>

      <div className="project-detail-layout">
        <div className="project-detail-main">
          {applied && (
            <div className="form-alert form-alert--success">
              <span>
                <Icon name="check" />
              </span>

              <div>
                <strong>Arizangiz yuborildi!</strong>
                <p>Holatini “Arizalarim” bo‘limida kuzatishingiz mumkin.</p>
              </div>

              <Link to="/app/applications">Ko‘rish</Link>
            </div>
          )}

          <article className="panel prose-panel">
            <span className="panel-kicker">LOYIHA HAQIDA</span>
            <h2>Faoliyat tavsifi</h2>
            <p>{project.description}</p>
            <p>
              Ushbu loyiha yoshlarning amaliy ko‘nikmalarini oshirish, yangi
              tanishuvlar yaratish va jamiyatdagi muhim masalalarga birgalikda
              yechim topish uchun tashkil etilgan.
            </p>
          </article>

          <article className="panel prose-panel">
            <span className="panel-kicker">TALABLAR</span>
            <h2>Kimlar qatnasha oladi?</h2>

            <div className="requirements-list">
              {project.requirements
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => (
                  <span key={item}>
                    <Icon name="check" />
                    {item}
                  </span>
                ))}

              <span>
                <Icon name="check" />
                Faoliyat davomida mas’uliyat va intizomga rioya qilish
              </span>

              <span>
                <Icon name="check" />
                Tashkilotchilar bilan doimiy aloqada bo‘lish
              </span>
            </div>
          </article>

          <article className="panel prose-panel">
            <span className="panel-kicker">SIZ NIMA OLASIZ?</span>
            <h2>Imkoniyat va foydalar</h2>

            <div className="benefits-grid">
              <div>
                <Icon name="star" />
                <strong>+{project.points} ball</strong>
                <span>Reyting uchun</span>
              </div>

              <div>
                <Icon name="file" />
                <strong>Sertifikat</strong>
                <span>Elektron tasdiq</span>
              </div>

              <div>
                <Icon name="users" />
                <strong>Yangi jamoa</strong>
                <span>Networking</span>
              </div>

              <div>
                <Icon name="briefcase" />
                <strong>Tajriba</strong>
                <span>Portfolio uchun</span>
              </div>
            </div>
          </article>

          <article className="panel prose-panel">
            <span className="panel-kicker">JARAYON</span>
            <h2>Loyiha taqvimi</h2>

            <div className="vertical-timeline">
              <div>
                <span>1</span>
                <section>
                  <small>{formatDate(project.application_deadline)}</small>
                  <strong>Arizalar yopiladi</strong>
                  <p>Arizangizni ushbu sanagacha yuboring.</p>
                </section>
              </div>

              <div>
                <span>2</span>
                <section>
                  <small>{formatDate(project.event_start, true)}</small>
                  <strong>Loyiha boshlanadi</strong>
                  <p>{project.address}</p>
                </section>
              </div>

              <div>
                <span>3</span>
                <section>
                  <small>{formatDate(project.event_end, true)}</small>
                  <strong>Faoliyat yakunlanadi</strong>
                  <p>Natijalar tasdiqlanadi va ball beriladi.</p>
                </section>
              </div>
            </div>
          </article>
        </div>

        <aside className="project-apply-card panel">
          <div className="deadline-box">
            <Icon name="clock" />

            <div>
              <small>Ariza muddati</small>
              <strong>{formatDate(project.application_deadline)}</strong>
            </div>
          </div>

          <div className="apply-facts">
            <div>
              <Icon name="calendar" />
              <span>
                <small>Tadbir sanasi</small>
                <strong>{formatDate(project.event_start)}</strong>
              </span>
            </div>

            <div>
              <Icon name="map" />
              <span>
                <small>Manzil</small>
                <strong>
                  {project.district_name}, {project.region_name}
                </strong>
              </span>
            </div>

            <div>
              <Icon name="users" />
              <span>
                <small>Volontyorlar</small>
                <strong>
                  {project.applicants_count ?? 0}/{project.volunteer_limit} joy
                </strong>
              </span>
            </div>

            <div>
              <Icon name="star" />
              <span>
                <small>Mukofot</small>
                <strong>+{project.points} ball</strong>
              </span>
            </div>
          </div>

          <div className="apply-progress">
            <div>
              <span>Joylar bandligi</span>
              <strong>
                {Math.round(
                  ((project.applicants_count ?? 0) / project.volunteer_limit) *
                    100,
                )}
                %
              </strong>
            </div>

            <div className="progress progress--large">
              <span
                style={{
                  width: `${Math.round(
                    ((project.applicants_count ?? 0) /
                      project.volunteer_limit) *
                      100,
                  )}%`,
                }}
              />
            </div>
          </div>

          <button
            className="button button--primary button--full button--lg"
            type="button"
            onClick={openApply}
            disabled={applied}
          >
            {applied ? (
              <>
                <Icon name="check" /> Ariza yuborilgan
              </>
            ) : (
              <>
                Ariza topshirish <Icon name="arrow-right" />
              </>
            )}
          </button>

          <p className="apply-note">
            <Icon name="shield" /> Ma’lumotlaringiz himoyalangan
          </p>
        </aside>
      </div>

      <Modal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        title="Loyihaga ariza topshirish"
      >
        <form className="apply-form" onSubmit={submit}>
          <div className="apply-form__project">
            <span className="org-dot">
              {project.organization_name.charAt(0)}
            </span>

            <div>
              <strong>{project.title}</strong>
              <small>{project.organization_name}</small>
            </div>
          </div>

          {submitError && (
            <div className="form-alert form-alert--error">
              <Icon name="warning" />
              {submitError}
            </div>
          )}

          <label className="field">
            <span>Nega ushbu loyihada qatnashmoqchisiz?</span>
            <textarea
              required
              rows={4}
              value={form.motivation}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  motivation: event.target.value,
                }))
              }
              placeholder="Motivatsiyangizni aniq va qisqa yozing..."
            />
          </label>

          <label className="field">
            <span>Tegishli tajribangiz</span>
            <textarea
              required
              rows={3}
              value={form.experience}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  experience: event.target.value,
                }))
              }
              placeholder="Oldingi loyihalar yoki ko‘nikmalaringiz..."
            />
          </label>

          <label className="field">
            <span>Ta’lim muassasasi / ish joyi</span>
            <div className="input-wrap">
              <Icon name="building" />
              <input
                required
                value={form.education_place}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    education_place: event.target.value,
                  }))
                }
              />
            </div>
          </label>

          {project.questions?.map((question) => (
            <label className="field" key={question.id}>
              <span>
                {question.text}
                {question.is_required && " *"}
              </span>

              {question.answer_type === "CHOICE" ? (
                <select
                  required={question.is_required}
                  value={String(answers[question.id] ?? "")}
                  onChange={(event) =>
                    updateAnswer(question.id, event.target.value)
                  }
                >
                  <option value="">Tanlang</option>

                  {question.choices?.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              ) : question.answer_type === "BOOLEAN" ? (
                <select
                  required={question.is_required}
                  value={
                    answers[question.id] === undefined
                      ? ""
                      : String(answers[question.id])
                  }
                  onChange={(event) =>
                    updateAnswer(question.id, event.target.value === "true")
                  }
                >
                  <option value="">Tanlang</option>
                  <option value="true">Ha</option>
                  <option value="false">Yo‘q</option>
                </select>
              ) : (
                <textarea
                  required={question.is_required}
                  rows={question.answer_type === "LONG_TEXT" ? 4 : 2}
                  value={String(answers[question.id] ?? "")}
                  onChange={(event) =>
                    updateAnswer(question.id, event.target.value)
                  }
                  placeholder="Javobingizni yozing..."
                />
              )}
            </label>
          ))}

          <label className="checkbox checkbox--terms">
            <input type="checkbox" required />
            <span /> Ma’lumotlarim to‘g‘riligini tasdiqlayman.
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="button button--ghost"
              onClick={() => setApplyOpen(false)}
            >
              Bekor qilish
            </button>

            <button className="button button--primary" disabled={submitting}>
              {submitting ? (
                "Yuborilmoqda..."
              ) : (
                <>
                  Arizani yuborish <Icon name="arrow-right" size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );

  if (publicView) {
    return (
      <div className="project-detail-public">
        <PublicHeader />
        <main className="project-detail-wrapper container">{content}</main>
      </div>
    );
  }

  return <div className="project-detail-wrapper">{content}</div>;
}
