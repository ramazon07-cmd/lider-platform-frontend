# Lider Platformasi Frontend

Lider Platformasi uchun noldan yozilgan responsive React frontend. Dizayn loyiha logotipidagi ko‘k, navy, oq, kulrang va binafsha aksent ranglariga moslangan.

## Stack

- React + TypeScript
- Vite
- React Router
- Custom CSS design system
- Fetch API orqali Django REST Framework integratsiyasi
- JWT access/refresh token oqimi
- Mock mode

Tayyor sahifalar:

- Premium landing page
- Ro‘yxatdan o‘tish va muvaffaqiyat oynasi
- Login
- Foydalanuvchi dashboardi
- Loyihalar katalogi va filtrlar
- Loyiha detail sahifasi
- Ariza yuborish modal formasi
- Arizalar va status timeline
- Leaderboard
- Sovg‘alar do‘koni
- Premium sahifa
- Bildirishnomalar
- Profil va sertifikatlar
- Sozlamalar
- Desktop sidebar va mobile bottom navigation

## Ishga tushirish

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
npm run preview
```

## Demo rejim

`.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
VITE_MOCK_MODE=true
```

Demo rejimda istalgan email va parol bilan kirish mumkin. Tavsiya etilgan demo qiymatlar:

```text
Email: ramazon@lider.uz
Parol: Demo12345!
```

## Django REST API bilan ulash

Backendni ishga tushiring:

```bash
cd ../lider-platform-backend
source .venv/bin/activate
python manage.py runserver
```

Frontend `.env` faylini o‘zgartiring:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
VITE_MOCK_MODE=false
```

Backend `.env` ichida frontendga CORS ruxsati bo‘lishi kerak:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## API moduli

`src/lib/api.ts` quyidagilarni boshqaradi:

- Login, register, logout, token refresh
- Foydalanuvchi profili
- Loyihalar ro‘yxati va detail
- Arizalar
- Leaderboard
- Sovg‘alar va redemption
- Bildirishnomalar

JWT tokenlar local storage ichida saqlanadi:

```text
lider_access_token
lider_refresh_token
```

401 javob kelganda frontend refresh token orqali yangi access token olishga urinadi va so‘rovni bir marta takrorlaydi.

## Asosiy papkalar

```text
src/
├── components/     reusable UI komponentlar
├── context/        authentication holati
├── data/           demo ma’lumotlar
├── lib/            API client
├── pages/          sahifalar
├── App.tsx         routing
├── main.tsx        entry point
└── styles.css      to‘liq design system
```

## Tekshiruv

```bash
npm run build
```

Production build TypeScript tekshiruvi bilan muvaffaqiyatli yaratiladi.

## npm install muammosi

Bu paketdagi `package-lock.json` faqat public npm registry (`https://registry.npmjs.org/`) manzillaridan foydalanadi.

Toza o‘rnatish:

```bash
rm -rf node_modules
npm cache verify
npm ci
npm run dev
```

Paket o‘rnatmasdan tayyor buildni ko‘rish:

```bash
python3 -m http.server 3000 -d dist
```

So‘ng `http://localhost:3000` manzilini oching.

## Production deployment
See `DEPLOYMENT.md`. Set `VITE_MOCK_MODE=false` and point `VITE_API_BASE_URL` to the Render backend URL ending in `/api/v1`.
