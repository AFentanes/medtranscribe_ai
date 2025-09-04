import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nueva Consulta',
      description: 'Iniciar transcripción de audio',
      icon: 'Plus',
      variant: 'default',
      path: '/audio-upload',
      color: 'primary'
    },
    {
      title: 'Ver Historial',
      description: 'Consultas anteriores',
      icon: 'History',
      variant: 'outline',
      path: '/consultation-history',
      color: 'secondary'
    },
    {
      title: 'Monitor en Vivo',
      description: 'Transcripción en tiempo real',
      icon: 'Activity',
      variant: 'outline',
      path: '/transcription-monitor',
      color: 'accent'
    }
  ];

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-medical-lg">
        Acciones Rápidas
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-medical-sm">
        {quickActions?.map((action) => (
          <div key={action?.path} className="group">
            <Button
              variant={action?.variant}
              size="lg"
              iconName={action?.icon}
              iconPosition="left"
              onClick={() => navigate(action?.path)}
              fullWidth
              className="h-auto p-medical-lg text-left justify-start group-hover:scale-105 medical-transition"
            >
              <div className="flex flex-col items-start space-y-1">
                <span className="font-heading font-medium">{action?.title}</span>
                <span className="text-xs font-caption opacity-80">{action?.description}</span>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;