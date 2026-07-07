export type UserRole = 'USER' | 'ORGANIZATION_MANAGER' | 'REVIEWER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  birth_date?: string;
  avatar?: string | null;
  region?: number | null;
  region_name?: string;
  district?: number | null;
  district_name?: string;
  role: UserRole;
  total_points: number;
  date_joined?: string;
  premium?: boolean;
  rank?: number;
}

export interface Project {
  id: number;
  organization: number;
  organization_name: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  cover_image?: string | null;
  application_deadline: string;
  event_start: string;
  event_end: string;
  region: number;
  region_name?: string;
  district: number;
  district_name?: string;
  address: string;
  volunteer_limit: number;
  applicants_count?: number;
  points: number;
  requirements: string;
  status: string;
  is_premium_only: boolean;
  tags?: string[];
  questions?: ProjectQuestion[];
}

export interface ProjectQuestion {
  id: number;
  text: string;
  answer_type: "TEXT" | "LONG_TEXT" | "BOOLEAN" | "CHOICE";
  choices?: string[];
  is_required: boolean;
  order: number;
}

export interface Application {
  id: number;
  project: number;
  project_title: string;
  organization_name?: string;
  motivation: string;
  experience: string;
  education_place: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
  rejection_reason?: string;
  created_at: string;
  event_start?: string;
  address?: string;
  points?: number;
}

export interface LeaderboardEntry {
  id: number;
  full_name: string;
  avatar?: string | null;
  region_name: string;
  total_points: number;
  completed_projects?: number;
}

export interface Reward {
  id: number;
  name: string;
  image?: string | null;
  description: string;
  required_points: number;
  stock: number;
  is_active: boolean;
  category?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  type?: 'success' | 'info' | 'warning' | 'reward';
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
