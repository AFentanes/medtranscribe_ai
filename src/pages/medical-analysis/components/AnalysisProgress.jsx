import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisProgress = ({ progress, currentStep, totalSteps }) => {
  const steps = [
    { id: 'symptoms', name: 'Síntomas', icon: 'Activity' },
    { id: 'diagnosis', name: 'Diagnóstico', icon: 'Stethoscope' },
    { id: 'history', name: 'Historial', icon: 'FileText' },
    { id: 'treatment', name: 'Tratamiento', icon: 'Pill' },
    { id: 'tests', name: 'Estudios', icon: 'TestTube' }
  ];

  const getStepStatus = (stepId) => {
    if (progress?.[stepId]?.completed) return 'completed';
    if (progress?.[stepId]?.inProgress) return 'active';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success';
      case 'active': return 'text-primary bg-primary';
      case 'pending': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const overallProgress = Object.values(progress)?.reduce((acc, step) => {
    return acc + (step?.completed ? 1 : 0);
  }, 0);

  const progressPercentage = (overallProgress / steps?.length) * 100;

  return (
    <div className="bg-card border medical-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={18} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Progreso del Análisis
            </h3>
            <p className="text-sm text-muted-foreground">
              {overallProgress} de {steps?.length} secciones completadas
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-xs text-muted-foreground">
            Completado
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const stepProgress = progress?.[step?.id];
          
          return (
            <div
              key={step?.id}
              className={`p-3 rounded-lg border medical-transition ${
                status === 'completed' ? 'bg-success/5 border-success/20' :
                status === 'active'? 'bg-primary/5 border-primary/20' : 'bg-muted/50 border-border'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepColor(status)}`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={18} className="text-success-foreground" />
                  ) : status === 'active' ? (
                    <Icon name="Clock" size={18} className="text-primary-foreground" />
                  ) : (
                    <Icon name={step?.icon} size={18} className="text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {step?.name}
                  </h4>
                  {stepProgress && (
                    <p className="text-xs text-muted-foreground">
                      {stepProgress?.validated || 0}/{stepProgress?.total || 0} validados
                    </p>
                  )}
                </div>

                {status === 'active' && (
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ 
                        width: stepProgress ? `${(stepProgress?.validated / stepProgress?.total) * 100}%` : '0%' 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Current Activity */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full medical-pulse" />
          <span className="text-muted-foreground">Estado actual:</span>
          <span className="font-medium text-foreground">
            {currentStep ? `Analizando ${currentStep}` : 'Análisis completado'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;