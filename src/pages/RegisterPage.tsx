import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Icon } from "../components/Icon";
import { Logo } from "../components/Logo";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1"
).replace(/\/$/, "");

interface Region {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  region?: number;
}

interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  region: string;
  district: string;
  birth_date: string;
  phone: string;
  password: string;
  password_confirm: string;
  terms: boolean;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

function extractList<T>(data: T[] | PaginatedResponse<T>): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data.results) ? data.results : [];
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ro‘yxatdan o‘tishda xatolik yuz berdi.";
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(true);

  const [error, setError] = useState("");
  const [geoError, setGeoError] = useState("");
  const [lang, setLang] = useState("UZ");

  const [regions, setRegions] = useState<Region[]>([]);
  const [districtList, setDistrictList] = useState<District[]>([]);

  const [form, setForm] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    district: "",
    birth_date: "",
    phone: "",
    password: "",
    password_confirm: "",
    terms: false,
  });

  function update(name: keyof RegisterForm, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  /*
   * Viloyatlarni backenddan olish.
   */
  useEffect(() => {
    const controller = new AbortController();

    async function loadRegions() {
      setGeoLoading(true);
      setGeoError("");

      try {
        const response = await fetch(`${API_BASE_URL}/regions/`, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Viloyatlarni yuklashda xatolik: ${response.status}`);
        }

        const data = (await response.json()) as
          | Region[]
          | PaginatedResponse<Region>;

        const regionItems = extractList(data);

        setRegions(regionItems);

        if (regionItems.length === 0) {
          setGeoError("Backend bazasida viloyatlar topilmadi.");
          return;
        }

        const defaultRegion =
          regionItems.find((region) =>
            region.name.toLowerCase().includes("sirdaryo"),
          ) ?? regionItems[0];

        setForm((current) => ({
          ...current,
          region: String(defaultRegion.id),
          district: "",
        }));
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setGeoError(
          requestError instanceof Error
            ? requestError.message
            : "Viloyatlarni yuklab bo‘lmadi.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setGeoLoading(false);
        }
      }
    }

    void loadRegions();

    return () => {
      controller.abort();
    };
  }, []);

  /*
   * Tanlangan viloyat bo‘yicha tumanlarni olish.
   */
  useEffect(() => {
    if (!form.region) {
      setDistrictList([]);
      return;
    }

    const controller = new AbortController();

    async function loadDistricts() {
      setGeoLoading(true);
      setGeoError("");

      setForm((current) => ({
        ...current,
        district: "",
      }));

      try {
        const response = await fetch(
          `${API_BASE_URL}/districts/?region=${form.region}`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Tumanlarni yuklashda xatolik: ${response.status}`);
        }

        const data = (await response.json()) as
          | District[]
          | PaginatedResponse<District>;

        const districtItems = extractList(data);

        setDistrictList(districtItems);

        if (districtItems.length === 0) {
          setGeoError("Tanlangan viloyat uchun tumanlar topilmadi.");
          return;
        }

        const defaultDistrict =
          districtItems.find((district) =>
            district.name.toLowerCase().includes("yangiyer"),
          ) ?? districtItems[0];

        setForm((current) => ({
          ...current,
          district: String(defaultDistrict.id),
        }));
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setDistrictList([]);

        setGeoError(
          requestError instanceof Error
            ? requestError.message
            : "Tumanlarni yuklab bo‘lmadi.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setGeoLoading(false);
        }
      }
    }

    void loadDistricts();

    return () => {
      controller.abort();
    };
  }, [form.region]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.region) {
      setError("Viloyatni tanlang.");
      return;
    }

    if (!form.district) {
      setError("Tuman yoki shaharni tanlang.");
      return;
    }

    if (form.password !== form.password_confirm) {
      setError("Parollar bir-biriga mos emas.");
      return;
    }

    if (!form.terms) {
      setError("Foydalanish shartlariga rozilik bildiring.");
      return;
    }

    const normalizedPhone = normalizePhone(form.phone);

    if (!normalizedPhone.startsWith("+998")) {
      setError("Telefon raqamini +998 formatida kiriting.");
      return;
    }

    setLoading(true);

    try {
      await register({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        region: Number(form.region),
        district: Number(form.district),
        birth_date: form.birth_date,
        phone: normalizedPhone,
        password: form.password,
        password_confirm: form.password_confirm,
      });

      setSuccess(true);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="register-success-page">
        <div className="success-dots success-dots--one" />
        <div className="success-dots success-dots--two" />

        <section className="success-card">
          <Logo />

          <div className="success-logo">
            <img src="/assets/lider-logo.png" alt="Lider Platformasi" />
          </div>

          <div className="success-check">
            <Icon name="check" size={44} />
          </div>

          <h1>Ro‘yxatdan muvaffaqiyatli o‘tdingiz!</h1>

          <p>
            Hisobingiz yaratildi. Endi platformadagi imkoniyatlardan
            foydalanishingiz mumkin.
          </p>

          <button
            type="button"
            className="button button--primary button--lg button--full"
            onClick={() => navigate("/login")}
          >
            Davom etish
            <Icon name="arrow-right" />
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="register-page">
      <aside className="register-aside">
        <Logo light />

        <div className="register-aside__content">
          <span className="eyebrow eyebrow--light">YANGI AVLOD LIDERLARI</span>

          <h1>O‘zgarishning bir qismi bo‘ling.</h1>

          <p>
            Volontyorlik orqali tajriba, do‘stlar, sertifikat va kelajak uchun
            kuchli portfolio yarating.
          </p>
        </div>

        <div className="register-feature-list">
          <span>
            <Icon name="shield" />
            Ishonchli loyihalar
          </span>

          <span>
            <Icon name="trophy" />
            Ball va reyting
          </span>

          <span>
            <Icon name="file" />
            Rasmiy sertifikatlar
          </span>
        </div>
      </aside>

      <main className="register-main">
        <div className="register-panel">
          <div className="mobile-auth-logo">
            <Logo />
          </div>

          <div className="register-heading">
            <div>
              <span className="auth-kicker">YANGI HISOB</span>

              <h2>Ro‘yxatdan o‘tish</h2>

              <p>
                Ma’lumotlaringizni to‘ldiring va liderlar safidan joy oling.
              </p>
            </div>

            <Link to="/login">Kirish</Link>
          </div>

          <div className="language-tabs">
            {["UZ", "RUS", "ENG"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                className={lang === item ? "active" : ""}
              >
                <span>
                  {item === "UZ" ? "🇺🇿" : item === "RUS" ? "🇷🇺" : "🇬🇧"}
                </span>

                {item}
              </button>
            ))}
          </div>

          {geoError && (
            <div className="form-alert form-alert--error">
              <Icon name="warning" />
              {geoError}
            </div>
          )}

          {error && (
            <div className="form-alert form-alert--error">
              <Icon name="warning" />
              {error}
            </div>
          )}

          <form className="register-form" onSubmit={submit}>
            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Ism</span>

                <div className="input-wrap">
                  <Icon name="user" />

                  <input
                    required
                    autoComplete="given-name"
                    value={form.first_name}
                    onChange={(event) =>
                      update("first_name", event.target.value)
                    }
                    placeholder="Ismingiz"
                  />
                </div>
              </label>

              <label className="field">
                <span>Familiya</span>

                <div className="input-wrap">
                  <Icon name="user" />

                  <input
                    required
                    autoComplete="family-name"
                    value={form.last_name}
                    onChange={(event) =>
                      update("last_name", event.target.value)
                    }
                    placeholder="Familiyangiz"
                  />
                </div>
              </label>
            </div>

            <label className="field">
              <span>Email manzil</span>

              <div className="input-wrap">
                <Icon name="mail" />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </label>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Viloyat</span>

                <div className="input-wrap">
                  <Icon name="map" />

                  <select
                    required
                    value={form.region}
                    disabled={geoLoading || regions.length === 0}
                    onChange={(event) => update("region", event.target.value)}
                  >
                    <option value="">
                      {geoLoading ? "Yuklanmoqda..." : "Viloyatni tanlang"}
                    </option>

                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>

                  <Icon name="chevron-down" className="select-icon" />
                </div>
              </label>

              <label className="field">
                <span>Tuman / shahar</span>

                <div className="input-wrap">
                  <Icon name="building" />

                  <select
                    required
                    value={form.district}
                    disabled={
                      geoLoading || !form.region || districtList.length === 0
                    }
                    onChange={(event) => update("district", event.target.value)}
                  >
                    <option value="">
                      {geoLoading
                        ? "Yuklanmoqda..."
                        : "Tuman yoki shaharni tanlang"}
                    </option>

                    {districtList.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>

                  <Icon name="chevron-down" className="select-icon" />
                </div>
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Tug‘ilgan sana</span>

                <div className="input-wrap">
                  <Icon name="calendar" />

                  <input
                    type="date"
                    required
                    value={form.birth_date}
                    onChange={(event) =>
                      update("birth_date", event.target.value)
                    }
                  />
                </div>
              </label>

              <label className="field">
                <span>Telefon raqami</span>

                <div className="input-wrap">
                  <Icon name="phone" />

                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Parol</span>

                <div className="input-wrap">
                  <Icon name="lock" />

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) => update("password", event.target.value)}
                    placeholder="Kamida 8 ta belgi"
                  />

                  <button
                    type="button"
                    className="input-action"
                    aria-label={
                      showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"
                    }
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    <Icon name={showPassword ? "eye-off" : "eye"} />
                  </button>
                </div>
              </label>

              <label className="field">
                <span>Parolni tasdiqlang</span>

                <div className="input-wrap">
                  <Icon name="lock" />

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={form.password_confirm}
                    onChange={(event) =>
                      update("password_confirm", event.target.value)
                    }
                    placeholder="Parolni takrorlang"
                  />
                </div>
              </label>
            </div>

            <label className="checkbox checkbox--terms">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(event) => update("terms", event.target.checked)}
              />
              <span />
              Men <a href="/terms">foydalanish shartlari</a> va{" "}
              <a href="/privacy">maxfiylik siyosati</a>
              ga roziman.
            </label>

            <button
              type="submit"
              className="button button--primary button--full button--lg"
              disabled={loading || geoLoading || !form.region || !form.district}
            >
              {loading ? (
                <>
                  <span className="button-spinner" />
                  Yaratilmoqda...
                </>
              ) : (
                <>
                  Ro‘yxatdan o‘tish
                  <Icon name="arrow-right" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
