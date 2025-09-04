import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      transcription: 'FileText',
      analysis: 'Brain',
      report: 'FileCheck',
      upload: 'Upload',
      export: 'Download'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      transcription: 'text-primary',
      analysis: 'text-secondary',
      report: 'text-success',
      upload: 'text-accent',
      export: 'text-warning'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg medical-shadow">
      <div className="p-medical-lg border-b medical-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Actividad Reciente
        </h3>
      </div>
      <div className="divide-y medical-border max-h-80 overflow-y-auto">
        {activities?.length > 0 ? (
          activities?.map((activity) => (
            <div key={activity?.id} className="p-medical-lg hover:bg-muted/30 medical-transition">
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-foreground">
                    {activity?.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs font-caption text-muted-foreground">
                      {activity?.timestamp}
                    </p>
                    {activity?.patientInitials && (
                      <p className="text-xs font-caption text-muted-foreground">
                        Paciente: {activity?.patientInitials}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-medical-3xl text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-heading font-medium text-foreground mb-2">
              Sin actividad reciente
            </p>
            <p className="text-sm font-body text-muted-foreground">
              La actividad del sistema aparecerá aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;