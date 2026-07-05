import type { Application, LeaderboardEntry, Notification, Paginated, Project, Reward, User } from '../types';
import { mockApplications, mockLeaderboard, mockNotifications, mockProjects, mockRewards, mockUser } from '../data/mock';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
export const MOCK_MODE = (import.meta.env.VITE_MOCK_MODE ?? 'true') !== 'false';

const sleep = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = localStorage.getItem('lider_refresh_token');
  if (!refresh) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.access) localStorage.setItem('lider_access_token', data.access);
    if (data.refresh) localStorage.setItem('lider_refresh_token', data.refresh);
    return data.access ?? null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  const access = localStorage.getItem('lider_access_token');
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (access) headers.set('Authorization', `Bearer ${access}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (response.status === 401 && retry) {
    const token = await refreshAccessToken();
    if (token) return request<T>(path, options, false);
  }

  const text = await response.text();
  let payload: unknown = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }

  if (!response.ok) {
    const message = typeof payload === 'object' && payload && 'detail' in payload
      ? String((payload as { detail: unknown }).detail)
      : 'Server bilan bog‘lanishda xatolik yuz berdi.';
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

function paginate<T>(items: T[]): Paginated<T> {
  return { count: items.length, next: null, previous: null, results: items };
}

export const api = {
  auth: {
    async login(email: string, password: string): Promise<{ user: User; access: string; refresh: string }> {
      if (MOCK_MODE) {
        await sleep();
        if (!email || !password) throw new ApiError('Email va parolni kiriting.', 400);
        return { user: { ...mockUser, email }, access: 'mock-access', refresh: 'mock-refresh' };
      }
      return request('/auth/login/', { method: 'POST', body: JSON.stringify({ email, password }) });
    },
    async register(payload: Record<string, unknown>): Promise<User> {
      if (MOCK_MODE) {
        await sleep(450);
        return { ...mockUser, ...payload, id: Date.now() } as User;
      }
      return request('/auth/register/', { method: 'POST', body: JSON.stringify(payload) });
    },
    async me(): Promise<User> {
      if (MOCK_MODE) { await sleep(120); return mockUser; }
      return request('/auth/me/');
    },
    async logout(): Promise<void> {
      const refresh = localStorage.getItem('lider_refresh_token');
      if (!MOCK_MODE && refresh) {
        await request('/auth/logout/', { method: 'POST', body: JSON.stringify({ refresh }) }).catch(() => undefined);
      }
      localStorage.removeItem('lider_access_token');
      localStorage.removeItem('lider_refresh_token');
    }
  },
  projects: {
    async list(): Promise<Paginated<Project>> {
      if (MOCK_MODE) { await sleep(); return paginate(mockProjects); }
      return request('/projects/');
    },
    async detail(slug: string): Promise<Project> {
      if (MOCK_MODE) {
        await sleep();
        const project = mockProjects.find((item) => item.slug === slug);
        if (!project) throw new ApiError('Loyiha topilmadi.', 404);
        return project;
      }
      return request(`/projects/${slug}/`);
    }
  },
  applications: {
    async list(): Promise<Paginated<Application>> {
      if (MOCK_MODE) { await sleep(); return paginate(mockApplications); }
      return request('/applications/');
    },
    async create(payload: Record<string, unknown>): Promise<Application> {
      if (MOCK_MODE) {
        await sleep(500);
        const project = mockProjects.find((item) => item.id === Number(payload.project));
        return {
          id: Date.now(),
          project: Number(payload.project),
          project_title: project?.title ?? 'Loyiha',
          motivation: String(payload.motivation ?? ''),
          experience: String(payload.experience ?? ''),
          education_place: String(payload.education_place ?? ''),
          status: 'SUBMITTED',
          created_at: new Date().toISOString()
        };
      }
      return request('/applications/', { method: 'POST', body: JSON.stringify(payload) });
    }
  },
  leaderboard: {
    async list(): Promise<LeaderboardEntry[]> {
      if (MOCK_MODE) { await sleep(); return mockLeaderboard; }
      const data = await request<Paginated<LeaderboardEntry> | LeaderboardEntry[]>('/leaderboard/');
      return Array.isArray(data) ? data : data.results;
    }
  },
  rewards: {
    async list(): Promise<Paginated<Reward>> {
      if (MOCK_MODE) { await sleep(); return paginate(mockRewards); }
      return request('/rewards/');
    },
    async redeem(id: number, delivery_address: string): Promise<void> {
      if (MOCK_MODE) { await sleep(450); return; }
      await request(`/rewards/${id}/redeem/`, { method: 'POST', body: JSON.stringify({ delivery_address }) });
    }
  },
  notifications: {
    async list(): Promise<Paginated<Notification>> {
      if (MOCK_MODE) { await sleep(); return paginate(mockNotifications); }
      return request('/notifications/');
    }
  }
};

export { ApiError };
