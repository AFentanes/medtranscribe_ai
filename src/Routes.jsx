import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MedicalAnalysis from './pages/medical-analysis';
import AudioUpload from './pages/audio-upload';
import Dashboard from './pages/dashboard';
import ConsultationHistory from './pages/consultation-history';
import TranscriptionMonitor from './pages/transcription-monitor';
import MedicalReport from './pages/medical-report';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AudioUpload />} />
        <Route path="/medical-analysis" element={<MedicalAnalysis />} />
        <Route path="/audio-upload" element={<AudioUpload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consultation-history" element={<ConsultationHistory />} />
        <Route path="/transcription-monitor" element={<TranscriptionMonitor />} />
        <Route path="/medical-report" element={<MedicalReport />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
