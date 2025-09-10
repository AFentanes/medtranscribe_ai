import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import MedicalAnalysis from './pages/medical-analysis';
import AudioUpload from './pages/audio-upload';
import Dashboard from './pages/dashboard';
import ConsultationHistory from './pages/consultation-history';
import TranscriptionMonitor from './pages/transcription-monitor';
import MedicalReport from './pages/medical-report';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { useAuth } from './context/AuthContext';

const Routes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        
        {/* Protected routes */}
        <Route path="/medical-analysis" element={
          <ProtectedRoute>
            <MedicalAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/audio-upload" element={
          <ProtectedRoute>
            <AudioUpload />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/consultation-history" element={
          <ProtectedRoute>
            <ConsultationHistory />
          </ProtectedRoute>
        } />
        <Route path="/transcription-monitor" element={
          <ProtectedRoute>
            <TranscriptionMonitor />
          </ProtectedRoute>
        } />
        <Route path="/medical-report" element={
          <ProtectedRoute>
            <MedicalReport />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
