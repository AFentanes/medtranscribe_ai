import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import ConsultationTable from './components/ConsultationTable';
import SystemNotifications from './components/SystemNotifications';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Mock data initialization
  useEffect(() => {
    // Mock consultations data
    const mockConsultations = [
      {
        id: 'CONS-2024-001',
        patientInitials: 'M.G.',
        date: '04/09/2024',
        time: '09:30',
        status: 'completed',
        diagnosis: 'Hipertensión arterial sistémica, diabetes mellitus tipo 2',
        duration: '25 min'
      },
      {
        id: 'CONS-2024-002',
        patientInitials: 'J.R.',
        date: '04/09/2024',
        time: '10:15',
        status: 'processing',
        diagnosis: 'Transcripción en proceso...',
        duration: '18 min'
      },
      {
        id: 'CONS-2024-003',
        patientInitials: 'A.L.',
        date: '04/09/2024',
        time: '11:00',
        status: 'pending',
        diagnosis: 'Análisis médico pendiente',
        duration: '32 min'
      },
      {
        id: 'CONS-2024-004',
        patientInitials: 'C.M.',
        date: '03/09/2024',
        time: '16:45',
        status: 'completed',
        diagnosis: 'Gastritis crónica, reflujo gastroesofágico',
        duration: '22 min'
      },
      {
        id: 'CONS-2024-005',
        patientInitials: 'R.S.',
        date: '03/09/2024',
        time: '15:30',
        status: 'draft',
        diagnosis: 'Borrador guardado',
        duration: '15 min'
      }
    ];

    // Mock notifications data
    const mockNotifications = [
      {
        id: 'NOT-001',
        type: 'success',
        title: 'Transcripción completada',
        message: 'La consulta CONS-2024-001 ha sido transcrita exitosamente',
        timestamp: '09:45 - Hoy',
        read: false
      },
      {
        id: 'NOT-002',
        type: 'processing',
        title: 'Análisis médico en progreso',
        message: 'Procesando análisis para consulta CONS-2024-002',
        timestamp: '10:20 - Hoy',
        read: false
      },
      {
        id: 'NOT-003',
        type: 'update',
        title: 'Actualización de terminología médica',
        message: 'Base de datos actualizada con 150 nuevos términos',
        timestamp: '08:00 - Hoy',
        read: true
      },
      {
        id: 'NOT-004',
        type: 'warning',
        title: 'Consulta pendiente de revisión',
        message: 'CONS-2024-003 requiere validación médica',
        timestamp: '11:05 - Hoy',
        read: false
      }
    ];

    // Mock recent activities
    const mockActivities = [
      {
        id: 'ACT-001',
        type: 'transcription',
        description: 'Transcripción completada para consulta médica',
        timestamp: '09:45 - Hoy',
        patientInitials: 'M.G.'
      },
      {
        id: 'ACT-002',
        type: 'upload',
        description: 'Nuevo archivo de audio cargado',
        timestamp: '10:15 - Hoy',
        patientInitials: 'J.R.'
      },
      {
        id: 'ACT-003',
        type: 'analysis',
        description: 'Análisis médico iniciado',
        timestamp: '11:00 - Hoy',
        patientInitials: 'A.L.'
      },
      {
        id: 'ACT-004',
        type: 'report',
        description: 'Reporte médico generado y exportado',
        timestamp: '16:50 - Ayer',
        patientInitials: 'C.M.'
      },
      {
        id: 'ACT-005',
        type: 'export',
        description: 'Consulta exportada en formato PDF',
        timestamp: '15:35 - Ayer',
        patientInitials: 'R.S.'
      }
    ];

    setConsultations(mockConsultations);
    setNotifications(mockNotifications);
    setRecentActivities(mockActivities);
  }, []);

  // Metrics calculations
  const todayConsultations = consultations?.filter(c => c?.date === '04/09/2024')?.length;
  const pendingTranscriptions = consultations?.filter(c => c?.status === 'processing')?.length;
  const completedToday = consultations?.filter(c => c?.date === '04/09/2024' && c?.status === 'completed')?.length;
  const pendingReview = consultations?.filter(c => c?.status === 'pending')?.length;

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleStatusUpdate = (consultationId, newStatus) => {
    setConsultations(prev =>
      prev?.map(consultation =>
        consultation?.id === consultationId
          ? { ...consultation, status: newStatus }
          : consultation
      )
    );
  };

  return (
  <div className="min-h-screen bg-background relative z-[1]">
      <Header />
      
      <main className="pt-medical-3xl">
        <div className="max-w-7xl mx-auto px-medical-lg py-medical-2xl">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-medical-2xl">
            <div>
              <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                Panel de Control
              </h1>
              <p className="text-lg font-body text-muted-foreground">
                Bienvenido, {user?.name || 'Doctor'}. Aquí tienes un resumen de tu actividad médica.
              </p>
            </div>
            <div className="mt-medical-lg lg:mt-0">
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/audio-upload')}
              >
                Nueva Consulta
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-medical-lg mb-medical-2xl">
            <MetricsCard
              title="Consultas Hoy"
              value={todayConsultations}
              subtitle="Total del día"
              icon="Calendar"
              trend="up"
              trendValue="+2 desde ayer"
              color="primary"
            />
            <MetricsCard
              title="Transcripciones Pendientes"
              value={pendingTranscriptions}
              subtitle="En procesamiento"
              icon="Clock"
              trend="neutral"
              trendValue="Sin cambios"
              color="warning"
            />
            <MetricsCard
              title="Completadas Hoy"
              value={completedToday}
              subtitle="Finalizadas"
              icon="CheckCircle"
              trend="up"
              trendValue="+1 desde ayer"
              color="success"
            />
            <MetricsCard
              title="Pendientes de Revisión"
              value={pendingReview}
              subtitle="Requieren validación"
              icon="AlertCircle"
              trend="down"
              trendValue="-1 desde ayer"
              color="accent"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-medical-2xl">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-medical-2xl">
              {/* Quick Actions */}
              <QuickActions />

              {/* Consultations Table */}
              <ConsultationTable
                consultations={consultations}
                onStatusUpdate={handleStatusUpdate}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-medical-2xl">
              {/* System Notifications */}
              <SystemNotifications
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAllNotifications}
              />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;