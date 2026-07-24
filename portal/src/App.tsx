import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { PageTransitionLoader } from '@/components/ui/PageTransitionLoader';

// Pages
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import AdminPage from '@/pages/admin/AdminPage';
import AdminContentPage from '@/pages/admin/content/ContentPage';
import AdminDashboardPage from '@/pages/admin/dashboard/AdminDashPage';
import AdminEmailPage from '@/pages/admin/email/EmailPage';
import AdminMessagesPage from '@/pages/admin/messages/MessagesPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BackgroundVideo />
        <PageTransitionLoader />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/email" element={<AdminEmailPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
