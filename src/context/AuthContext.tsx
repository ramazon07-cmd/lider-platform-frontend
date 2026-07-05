import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, MOCK_MODE } from '../lib/api';
import type { User } from '../types';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: Record<string, unknown>) => Promise<User>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasToken = Boolean(localStorage.getItem('lider_access_token'));
    if (!hasToken) {
      setLoading(false);
      return;
    }
    api.auth.me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('lider_access_token');
        localStorage.removeItem('lider_refresh_token');
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const data = await api.auth.login(email, password);
    localStorage.setItem('lider_access_token', data.access);
    localStorage.setItem('lider_refresh_token', data.refresh);
    setUser(data.user);
  }

  async function register(payload: Record<string, unknown>) {
    return api.auth.register(payload);
  }

  async function logout() {
    await api.auth.logout();
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateUser: setUser
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}

export { MOCK_MODE };
