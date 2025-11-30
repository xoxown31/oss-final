import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddRecordPage from './pages/AddRecordPage';
import RecordPage from './pages/RecordPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

import RankingPage from './pages/RankingPage';
import CommunityPage from './pages/CommunityPage';

// ... other imports

import HomePage from './pages/HomePage';

import DevPage from './pages/DevPage';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-record" element={<AddRecordPage />} />
            <Route path="/record/:id" element={<RecordPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/dev" element={<DevPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;






