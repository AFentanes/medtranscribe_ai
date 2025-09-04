import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationActions = ({ 
  transcriptionComplete, 
  processingProgress, 
  onSaveTranscription 
}) => {
  const navigate = useNavigate();

  const handleNavigateToAnalysis = () => {
    if (transcriptionComplete) {
      navigate('/medical-analysis');
    }
  };

  const handleNavigateToUpload = () => {
    navigate('/audio-upload');
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  const handleNavigateToHistory = () => {
    navigate('/consultation-history');
  };

  const canProceedToAnalysis = processingProgress >= 85;
  const canSaveTranscription = processingProgress >= 50;

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
      <div className="flex items-center space-x-medical-sm mb-medical-base">
        <div className="w-8 h-8 bg-primary/10 rounded-medical flex items-center justify-center">
          <Icon name="Navigation" size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-heading font-semibold text-foreground">
            Acciones Disponibles
          </h3>
          <p className="text-xs font-caption text-muted-foreground">
            Opciones según el progreso actual
          </p>
        </div>
      </div>

      <div className="space-y-medical-sm">
        {/* Primary Actions */}
        <div className="space-y-medical-xs">
          <Button
            variant="default"
            size="sm"
            iconName="Stethoscope"
            iconPosition="left"
            onClick={handleNavigateToAnalysis}
            disabled={!canProceedToAnalysis}
            fullWidth
          >
            Continuar al Análisis Médico
          </Button>
          
          {!canProceedToAnalysis && (
            <p className="text-xs font-caption text-muted-foreground px-medical-sm">
              Disponible cuando la transcripción esté al 85% o más
            </p>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="pt-medical-sm border-t medical-border space-y-medical-xs">
          <Button
            variant="outline"
            size="sm"
            iconName="Save"
            iconPosition="left"
            onClick={onSaveTranscription}
            disabled={!canSaveTranscription}
            fullWidth
          >
            Guardar Transcripción
          </Button>

          <div className="grid grid-cols-2 gap-medical-xs">
            <Button
              variant="ghost"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={handleNavigateToUpload}
            >
              Nueva Consulta
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="History"
              iconPosition="left"
              onClick={handleNavigateToHistory}
            >
              Ver Historial
            </Button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="pt-medical-sm border-t medical-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="LayoutDashboard"
            iconPosition="left"
            onClick={handleNavigateToDashboard}
            fullWidth
          >
            Volver al Dashboard
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <div className="grid grid-cols-3 gap-medical-sm text-center">
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
              processingProgress >= 50 ? 'bg-success/10' : 'bg-muted'
            }`}>
              <Icon 
                name={processingProgress >= 50 ? "CheckCircle" : "Clock"} 
                size={12} 
                className={processingProgress >= 50 ? 'text-success' : 'text-muted-foreground'} 
              />
            </div>
            <span className="text-xs font-caption text-muted-foreground">Guardar</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
              processingProgress >= 85 ? 'bg-success/10' : 'bg-muted'
            }`}>
              <Icon 
                name={processingProgress >= 85 ? "CheckCircle" : "Clock"} 
                size={12} 
                className={processingProgress >= 85 ? 'text-success' : 'text-muted-foreground'} 
              />
            </div>
            <span className="text-xs font-caption text-muted-foreground">Análisis</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
              processingProgress >= 100 ? 'bg-success/10' : 'bg-muted'
            }`}>
              <Icon 
                name={processingProgress >= 100 ? "CheckCircle" : "Clock"} 
                size={12} 
                className={processingProgress >= 100 ? 'text-success' : 'text-muted-foreground'} 
              />
            </div>
            <span className="text-xs font-caption text-muted-foreground">Reporte</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationActions;