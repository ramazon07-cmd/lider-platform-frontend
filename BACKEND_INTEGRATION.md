# Backend Integration Map

Frontend mavjud Django REST Framework backend endpointlariga moslab yozilgan.

| Frontend funksiyasi | Endpoint |
|---|---|
| Register | `POST /api/v1/auth/register/` |
| Login | `POST /api/v1/auth/login/` |
| Token refresh | `POST /api/v1/auth/token/refresh/` |
| Logout | `POST /api/v1/auth/logout/` |
| Current user | `GET /api/v1/auth/me/` |
| Projects | `GET /api/v1/projects/` |
| Project detail | `GET /api/v1/projects/{slug}/` |
| Applications | `GET /api/v1/applications/` |
| Create application | `POST /api/v1/applications/` |
| Points | `GET /api/v1/points/` |
| Leaderboard | `GET /api/v1/leaderboard/` |
| Rewards | `GET /api/v1/rewards/` |
| Redeem reward | `POST /api/v1/rewards/{id}/redeem/` |
| Notifications | `GET /api/v1/notifications/` |

## Muhim farqlar

Backend foydalanuvchini `first_name` va `last_name` sifatida qabul qiladi. Dizayndagi bitta “Ism familiya” maydoni frontendda ikkita maydonga ajratilgan.

Backend `region` va `district` uchun integer ID kutadi. Hozir demo registration formasi Sirdaryo va Yangiyer IDlarini misol sifatida yuboradi. Real rejimda `/regions/` va `/districts/?region=<id>` endpointlaridan ma’lumot olish kerak.

Backend loyiha detail endpointi router konfiguratsiyasiga ko‘ra slug orqali ishlaydi. Frontend ham `slug` ishlatadi.

## Keyingi backend ulash ishlari

1. Region va district dropdownlarini real APIga ulash.
2. User profile update endpointini API moduliga qo‘shish.
3. Notification mark-as-read actionini backend actioniga ulash.
4. Premium payment provider endpointlarini qo‘shish.
5. Certificate download endpointini qo‘shish.
6. File upload uchun `FormData` oqimini qo‘shish.
