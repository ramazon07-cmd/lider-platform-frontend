import type { Application, LeaderboardEntry, Notification, Project, Reward, User } from '../types';

export const mockUser: User = {
  id: 7,
  email: 'ramazon@lider.uz',
  first_name: 'Ramazon',
  last_name: 'Ergashev',
  phone: '+998 90 123 45 67',
  birth_date: '2010-09-07',
  region: 12,
  region_name: 'Sirdaryo viloyati',
  district: 121,
  district_name: 'Yangiyer shahri',
  role: 'USER',
  total_points: 485,
  premium: true,
  rank: 18,
  date_joined: '2026-02-10'
};

export const mockProjects: Project[] = [
  {
    id: 1,
    organization: 1,
    organization_name: "Ibrat Farzandlari",
    title: "Yoshlar uchun ingliz tili marafoni",
    slug: "ingliz-tili-marafoni",
    short_description:
      "Hududiy yoshlar bilan til mashg‘ulotlarini tashkil etishda ko‘maklashing.",
    description:
      "Bir hafta davomida yoshlar uchun amaliy ingliz tili mashg‘ulotlari, speaking club va motivatsion uchrashuvlar tashkil etiladi. Volontyorlar ro‘yxatdan o‘tish, ishtirokchilarni yo‘naltirish va kontent tayyorlashda yordam beradi.",
    application_deadline: "2026-07-18T18:00:00+05:00",
    event_start: "2026-07-22T09:00:00+05:00",
    event_end: "2026-07-28T17:00:00+05:00",
    region: 12,
    region_name: "Sirdaryo",
    district: 121,
    district_name: "Guliston",
    address: "Yoshlar markazi, Guliston shahri",
    volunteer_limit: 25,
    applicants_count: 17,
    points: 30,
    requirements:
      "Mas’uliyat, o‘zbek va ingliz tilida muloqot qila olish, jamoa bilan ishlash.",
    status: "PUBLISHED",
    is_premium_only: false,
    tags: ["Ta’lim", "Ingliz tili", "Offline"],
    questions: [
      {
        id: 1,
        text: "Nega ushbu loyihada qatnashmoqchisiz?",
        answer_type: "LONG_TEXT",
        is_required: true,
        order: 1,
      },
      {
        id: 2,
        text: "Ingliz tili darajangiz?",
        answer_type: "CHOICE",
        choices: ["A2", "B1", "B2", "C1"],
        is_required: true,
        order: 2,
      },
    ],
  },
  {
    id: 2,
    organization: 2,
    organization_name: "Ustoz AI",
    title: "AI savodxonlik haftaligi",
    slug: "ai-savodxonlik-haftaligi",
    short_description:
      "Maktab o‘quvchilariga sun’iy intellektdan to‘g‘ri foydalanishni tushuntiring.",
    description:
      "Volontyorlar maktablarda AI xavfsizligi, prompt yozish va ta’limda AI vositalaridan oqilona foydalanish bo‘yicha seminarlar o‘tkazadi.",
    application_deadline: "2026-07-25T18:00:00+05:00",
    event_start: "2026-08-01T10:00:00+05:00",
    event_end: "2026-08-07T16:00:00+05:00",
    region: 10,
    region_name: "Toshkent",
    district: 101,
    district_name: "Yunusobod",
    address: "Digital City, Toshkent",
    volunteer_limit: 40,
    applicants_count: 31,
    points: 45,
    requirements: "ITga qiziqish, yaxshi nutq, taqdimot qila olish.",
    status: "PUBLISHED",
    is_premium_only: true,
    tags: ["Texnologiya", "AI", "Premium"],
  },
  {
    id: 3,
    organization: 3,
    organization_name: "Mutolaa",
    title: "100 kitob — 100 uchrashuv",
    slug: "100-kitob-100-uchrashuv",
    short_description:
      "Mahallalarda kitobxonlik uchrashuvlarini tashkillashtirishga yordam bering.",
    description:
      "Kitob muhokamalari, mualliflar bilan uchrashuvlar va yosh kitobxonlar klublarini yo‘lga qo‘yishga qaratilgan loyiha.",
    application_deadline: "2026-07-20T23:59:00+05:00",
    event_start: "2026-07-29T15:00:00+05:00",
    event_end: "2026-09-01T18:00:00+05:00",
    region: 12,
    region_name: "Sirdaryo",
    district: 122,
    district_name: "Yangiyer",
    address: "Markaziy kutubxona, Yangiyer",
    volunteer_limit: 20,
    applicants_count: 9,
    points: 25,
    requirements: "Kitob mutolaasiga qiziqish va tadbir tashkil qilish istagi.",
    status: "PUBLISHED",
    is_premium_only: false,
    tags: ["Kitob", "Madaniyat", "Mahalla"],
  },
  {
    id: 4,
    organization: 4,
    organization_name: "Ekologik Harakat",
    title: "Yashil makon volontyorlari",
    slug: "yashil-makon-volontyorlari",
    short_description:
      "Daraxt ekish va ekologik targ‘ibot aksiyasida faol qatnashing.",
    description:
      "Shahar hududida ko‘chat ekish, chiqindilarni saralash bo‘yicha targ‘ibot va ekologik trening.",
    application_deadline: "2026-08-02T18:00:00+05:00",
    event_start: "2026-08-08T07:30:00+05:00",
    event_end: "2026-08-08T13:00:00+05:00",
    region: 12,
    region_name: "Sirdaryo",
    district: 123,
    district_name: "Shirin",
    address: "Shirin shahar bog‘i",
    volunteer_limit: 60,
    applicants_count: 38,
    points: 15,
    requirements: "Ochiq havoda ishlashga tayyor bo‘lish.",
    status: "PUBLISHED",
    is_premium_only: false,
    tags: ["Ekologiya", "Aksiya", "Ochiq havo"],
  },
  {
    id: 5,
    organization: 5,
    organization_name: "Yoshlar ishlari agentligi",
    title: "Mahalla liderlari forumi",
    slug: "mahalla-liderlari-forumi",
    short_description:
      "Forum mehmonlarini kutib olish va sessiyalarni boshqarishda yordam bering.",
    description:
      "Viloyat yosh liderlari uchun ikki kunlik forum. Volontyorlar registratsiya, yo‘naltirish va spikerlar bilan ishlaydi.",
    application_deadline: "2026-08-10T20:00:00+05:00",
    event_start: "2026-08-18T08:00:00+05:00",
    event_end: "2026-08-19T19:00:00+05:00",
    region: 12,
    region_name: "Sirdaryo",
    district: 121,
    district_name: "Guliston",
    address: "Viloyat Yoshlar markazi",
    volunteer_limit: 35,
    applicants_count: 22,
    points: 35,
    requirements: "Tashkiliy ko‘nikma, intizom va xushmuomalalik.",
    status: "PUBLISHED",
    is_premium_only: false,
    tags: ["Liderlik", "Forum", "Tashkilotchilik"],
  },
  {
    id: 6,
    organization: 6,
    organization_name: "Digital Volunteers",
    title: "Raqamli yordam markazi",
    slug: "raqamli-yordam-markazi",
    short_description:
      "Keksalarga davlat xizmatlaridan onlayn foydalanishni o‘rgating.",
    description:
      "Volontyorlar mahallalarda keksalar va fuqarolarga my.gov.uz hamda boshqa raqamli xizmatlardan foydalanishda ko‘mak beradi.",
    application_deadline: "2026-08-15T18:00:00+05:00",
    event_start: "2026-08-20T10:00:00+05:00",
    event_end: "2026-09-20T17:00:00+05:00",
    region: 12,
    region_name: "Sirdaryo",
    district: 122,
    district_name: "Yangiyer",
    address: "Yangiyer IT markazi",
    volunteer_limit: 15,
    applicants_count: 8,
    points: 40,
    requirements:
      "Kompyuter va smartfondan yaxshi foydalana olish, sabr-toqat.",
    status: "PUBLISHED",
    is_premium_only: true,
    tags: ["IT", "Ijtimoiy yordam", "Premium"],
  },
];

export const mockApplications: Application[] = [
  {
    id: 101,
    project: 3,
    project_title: '100 kitob — 100 uchrashuv',
    organization_name: 'Mutolaa',
    motivation: 'Kitobxonlik tadbirlarini tashkil etish tajribamni oshirmoqchiman.',
    experience: 'Maktabda kitobxonlik klubi ochganman.',
    education_place: 'Lider xususiy maktab',
    status: 'APPROVED',
    created_at: '2026-07-01T12:00:00+05:00',
    event_start: '2026-07-29T15:00:00+05:00',
    address: 'Markaziy kutubxona, Yangiyer',
    points: 25
  },
  {
    id: 102,
    project: 2,
    project_title: 'AI savodxonlik haftaligi',
    organization_name: 'Ustoz AI',
    motivation: 'AI mavzusini yoshlar orasida ommalashtirishni xohlayman.',
    experience: 'Django va AI vositalari bilan ishlayman.',
    education_place: 'Lider xususiy maktab',
    status: 'UNDER_REVIEW',
    created_at: '2026-07-03T09:30:00+05:00',
    event_start: '2026-08-01T10:00:00+05:00',
    address: 'Digital City, Toshkent',
    points: 45
  },
  {
    id: 103,
    project: 4,
    project_title: 'Yashil makon volontyorlari',
    organization_name: 'Ekologik Harakat',
    motivation: 'Ekologik aksiyalarda doim qatnashaman.',
    experience: 'Maktab hududida daraxt ekish aksiyasi.',
    education_place: 'Lider xususiy maktab',
    status: 'COMPLETED',
    created_at: '2026-05-14T10:00:00+05:00',
    event_start: '2026-05-25T07:30:00+05:00',
    address: 'Yangiyer shahar bog‘i',
    points: 15
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { id: 1, full_name: 'Azizbek Karimov', region_name: 'Toshkent', total_points: 1280, completed_projects: 34 },
  { id: 2, full_name: 'Dilnoza Rahimova', region_name: 'Samarqand', total_points: 1165, completed_projects: 31 },
  { id: 3, full_name: 'Javohir Mamatov', region_name: 'Farg‘ona', total_points: 1080, completed_projects: 29 },
  { id: 4, full_name: 'Madina Sobirova', region_name: 'Buxoro', total_points: 930, completed_projects: 24 },
  { id: 5, full_name: 'Bekzod Yusupov', region_name: 'Andijon', total_points: 855, completed_projects: 22 },
  { id: 7, full_name: 'Ramazon Ergashev', region_name: 'Sirdaryo', total_points: 485, completed_projects: 13 },
  { id: 8, full_name: 'Sarvinoz To‘xtayeva', region_name: 'Namangan', total_points: 460, completed_projects: 12 },
  { id: 9, full_name: 'Akmal Islomov', region_name: 'Jizzax', total_points: 425, completed_projects: 11 }
];

export const mockRewards: Reward[] = [
  { id: 1, name: '“Atom odatlar” kitobi', description: 'Shaxsiy rivojlanish uchun bestseller kitob.', required_points: 250, stock: 18, is_active: true, category: 'Kitob' },
  { id: 2, name: 'Lider futbolkasi', description: 'Sifatli paxtadan tayyorlangan rasmiy merch.', required_points: 400, stock: 12, is_active: true, category: 'Merch' },
  { id: 3, name: 'Premium — 1 oy', description: '1 oy davomida premium imkoniyatlar.', required_points: 550, stock: 99, is_active: true, category: 'Premium' },
  { id: 4, name: 'Simsiz quloqchin', description: 'Kundalik foydalanish uchun ixcham quloqchin.', required_points: 1250, stock: 5, is_active: true, category: 'Texnika' },
  { id: 5, name: 'Powerbank 20 000 mAh', description: 'Faol volontyorlar uchun kuchli powerbank.', required_points: 1600, stock: 4, is_active: true, category: 'Texnika' },
  { id: 6, name: 'Lider daftar va ruchka', description: 'Brendlangan premium bloknot to‘plami.', required_points: 180, stock: 30, is_active: true, category: 'Merch' }
];

export const mockNotifications: Notification[] = [
  { id: 1, title: 'Arizangiz tasdiqlandi', message: '“100 kitob — 100 uchrashuv” loyihasiga arizangiz qabul qilindi.', is_read: false, created_at: '2026-07-04T11:10:00+05:00', type: 'success' },
  { id: 2, title: 'Yangi premium loyiha', message: 'Ustoz AI tomonidan yangi volontyorlik imkoniyati e’lon qilindi.', is_read: false, created_at: '2026-07-03T16:40:00+05:00', type: 'info' },
  { id: 3, title: '+15 ball', message: '“Yashil makon” faoliyatini yakunlaganingiz uchun ball berildi.', is_read: true, created_at: '2026-06-28T09:20:00+05:00', type: 'reward' },
  { id: 4, title: 'Muddat yaqinlashmoqda', message: 'Ingliz tili marafoniga ariza topshirish uchun 3 kun qoldi.', is_read: true, created_at: '2026-06-25T12:00:00+05:00', type: 'warning' }
];

export const regions = ['Barcha hududlar', 'Toshkent', 'Sirdaryo', 'Samarqand', 'Farg‘ona', 'Andijon', 'Buxoro', 'Namangan'];
