import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppShell } from './components/AppShell';
import { Loading } from './components/Loading';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PublicProjectsPage } from './pages/PublicProjectsPage';
import { DashboardPage } from './pages/DashboardPage';
import { AppProjectsPage } from './pages/AppProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { RewardsPage } from './pages/RewardsPage';
import { PremiumPage } from './pages/PremiumPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ProtectedLayout() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <Loading label="Hisob tekshirilmoqda..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppShell><Outlet /></AppShell>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/projects" element={<PublicProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/premium" element={<Navigate to="/login" replace />} />
      <Route path="/app" element={<ProtectedLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<AppProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="premium" element={<PremiumPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
