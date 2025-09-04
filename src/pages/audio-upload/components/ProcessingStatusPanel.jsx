import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatusPanel = ({ 
  processingStatus, 
  estimatedTime, 
  onStartTranscription, 
  onCancel,
  isReadyToProcess 
}) => {
  const getStatusIcon = () => {
    switch (processingStatus) {
      case 'ready':
        return 'CheckCircle';
      case 'processing':
        return 'Loader2';
      case 'completed':
        return 'Check';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = () => {
    switch (processingStatus) {
      case 'ready':
        return 'text-success';
      case 'processing':
        return 'text-accent';
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusMessage = () => {
    switch (processingStatus) {
      case 'ready':
        return 'Listo para iniciar transcripción';
      case 'processing':
        return 'Procesando transcripción...';
      case 'completed':
        return 'Transcripción completada';
      case 'error':
        return 'Error en el procesamiento';
      default:
        return 'Esperando archivo y metadatos';
    }
  };

  const getBackgroundColor = () => {
    switch (processingStatus) {
      case 'ready':
        return 'bg-success/10 border-success/20';
      case 'processing':
        return 'bg-accent/10 border-accent/20';
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'error':
        return 'bg-destructive/10 border-destructive/20';
      default:
        return 'bg-muted/50 border-muted';
    }
  };

  return (
    <div className={`rounded-medical-lg p-medical-lg border ${getBackgroundColor()}`}>
      <div className="flex items-center justify-between mb-medical-lg">
        <div className="flex items-center space-x-medical-sm">
          <Icon 
            name={getStatusIcon()} 
            size={24} 
            className={`${getStatusColor()} ${processingStatus === 'processing' ? 'animate-spin' : ''}`} 
          />
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Estado del procesamiento
            </h3>
            <p className="text-sm text-muted-foreground">
              {getStatusMessage()}
            </p>
          </div>
        </div>
      </div>
      {estimatedTime && (
        <div className="mb-medical-lg p-medical-sm bg-card rounded-medical medical-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tiempo estimado:</span>
            <span className="text-sm font-medium text-foreground">{estimatedTime}</span>
          </div>
        </div>
      )}
      <div className="space-y-medical-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-medical-sm text-sm">
          <div className="flex items-center space-x-medical-xs">
            <Icon 
              name={isReadyToProcess?.audioFile ? "CheckCircle" : "Circle"} 
              size={16} 
              className={isReadyToProcess?.audioFile ? "text-success" : "text-muted-foreground"} 
            />
            <span className={isReadyToProcess?.audioFile ? "text-foreground" : "text-muted-foreground"}>
              Archivo de audio
            </span>
          </div>
          
          <div className="flex items-center space-x-medical-xs">
            <Icon 
              name={isReadyToProcess?.metadata ? "CheckCircle" : "Circle"} 
              size={16} 
              className={isReadyToProcess?.metadata ? "text-success" : "text-muted-foreground"} 
            />
            <span className={isReadyToProcess?.metadata ? "text-foreground" : "text-muted-foreground"}>
              Metadatos completos
            </span>
          </div>
          
          <div className="flex items-center space-x-medical-xs">
            <Icon 
              name={isReadyToProcess?.quality ? "CheckCircle" : "Circle"} 
              size={16} 
              className={isReadyToProcess?.quality ? "text-success" : "text-muted-foreground"} 
            />
            <span className={isReadyToProcess?.quality ? "text-foreground" : "text-muted-foreground"}>
              Calidad verificada
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-medical-sm pt-medical-sm">
          <Button
            variant="default"
            onClick={onStartTranscription}
            disabled={!isReadyToProcess?.audioFile || !isReadyToProcess?.metadata || processingStatus === 'processing'}
            loading={processingStatus === 'processing'}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
          >
            {processingStatus === 'processing' ? 'Procesando...' : 'Iniciar Transcripción'}
          </Button>

          {processingStatus === 'processing' && (
            <Button
              variant="outline"
              onClick={onCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancelar
            </Button>
          )}
        </div>
      </div>
      {processingStatus === 'error' && (
        <div className="mt-medical-sm p-medical-sm bg-destructive/10 rounded-medical border border-destructive/20">
          <div className="flex items-center space-x-medical-sm">
            <Icon name="AlertTriangle" size={16} className="text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Error de procesamiento</p>
              <p className="text-xs text-muted-foreground">
                Verifique el formato del archivo y la conexión de red
              </p>
            </div>
          </div>
        </div>
      )}
      {processingStatus === 'completed' && (
        <div className="mt-medical-sm">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/transcription-monitor'}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            Ver transcripción
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatusPanel;