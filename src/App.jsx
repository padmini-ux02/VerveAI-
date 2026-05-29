import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/landing/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import Dashboard from './pages/dashboard/Dashboard'
import ResumePage from './pages/resume/ResumePage'
import InterviewPage from './pages/interview/InterviewPage'
import MockInterviewRoom from './pages/mockinterview/MockInterviewRoom'
import CodingPage from './pages/coding/CodingPage'
import AnalyticsPage from './pages/analytics/AnalyticsPage'
import CareerPage from './pages/career/CareerPage'
import SkillsPage from './pages/skills/SkillsPage'
import GamificationPage from './pages/gamification/GamificationPage'
import ProfilePage from './pages/profile/ProfilePage'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/resume" element={<ProtectedRoute><AppLayout><ResumePage /></AppLayout></ProtectedRoute>} />
      <Route path="/interview" element={<ProtectedRoute><AppLayout><InterviewPage /></AppLayout></ProtectedRoute>} />
      <Route path="/mock-interview" element={<ProtectedRoute><AppLayout><MockInterviewRoom /></AppLayout></ProtectedRoute>} />
      <Route path="/coding" element={<ProtectedRoute><AppLayout><CodingPage /></AppLayout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AppLayout><AnalyticsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/career" element={<ProtectedRoute><AppLayout><CareerPage /></AppLayout></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><AppLayout><SkillsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/gamification" element={<ProtectedRoute><AppLayout><GamificationPage /></AppLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
