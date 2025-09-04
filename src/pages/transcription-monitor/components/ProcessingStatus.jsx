import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = ({ 
  processingData, 
  onRetryProcessing, 
  onExportTranscription 
}) => {
  // Mock processing status data
  const mockProcessingData = processingData || {
    overallProgress: 85,
    currentStage: 'medical_analysis',
    stages: [
      {
        id: 'audio_upload',
        name: 'Carga de Audio',
        status: 'completed',
        progress: 100,
        duration: 2.3,
        icon: 'Upload'
      },
      {
        id: 'noise_reduction',
        name: 'Reducción de Ruido',
        status: 'completed',
        progress: 100,
        duration: 5.7,
        icon: 'Volume2'
      },
      {
        id: 'speaker_separation',
        name: 'Separación de Hablantes',
        status: 'completed',
        progress: 100,
        duration: 8.2,
        icon: 'Users'
      },
      {
        id: 'transcription',
        name: 'Transcripción',
        status: 'completed',
        progress: 100,
        duration: 12.5,
        icon: 'FileText'
      },
      {
        id: 'medical_analysis',
        name: 'Análisis Médico',
        status: 'processing',
        progress: 65,
        duration: null,
        icon: 'Stethoscope'
      },
      {
        id: 'report_generation',
        name: 'Generación de Reporte',
        status: 'pending',
        progress: 0,
        duration: null,
        icon: 'FileCheck'
      }
    ],
    qualityMetrics: {
      audioQuality: 'excellent',
      speakerSeparation: 92,
      medicalTermAccuracy: 96,
      overallConfidence: 89
    },
    detectedIssues: [
      {
        type: 'noise',
        timestamp: 78,
        severity: 'low',
        description: 'Ruido de fondo detectado durante 3 segundos'
      },
      {
        type: 'inaudible',
        timestamp: 108,
        severity: 'medium',
        description: 'Segmento inaudible de 2 segundos'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-secondary';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Loader';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-accent';
      case 'fair': return 'text-warning';
      default: return 'text-error';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-accent';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-medical-lg">
      {/* Overall Progress */}
      <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
        <div className="flex items-center justify-between mb-medical-base">
          <div className="flex items-center space-x-medical-sm">
            <div className="w-8 h-8 bg-secondary/10 rounded-medical flex items-center justify-center">
              <Icon name="Activity" size={16} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">
                Estado del Procesamiento
              </h3>
              <p className="text-xs font-caption text-muted-foreground">
                Progreso general: {mockProcessingData?.overallProgress}%
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-heading font-bold text-secondary">
              {mockProcessingData?.overallProgress}%
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              Completado
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-medical-base">
          <div
            className="bg-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${mockProcessingData?.overallProgress}%` }}
          />
        </div>

        {/* Processing Stages */}
        <div className="space-y-medical-sm">
          {mockProcessingData?.stages?.map((stage, index) => (
            <div key={stage?.id} className="flex items-center space-x-medical-sm">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                stage?.status === 'completed' ? 'bg-success/10' :
                stage?.status === 'processing' ? 'bg-secondary/10' :
                stage?.status === 'error'? 'bg-error/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={getStatusIcon(stage?.status)} 
                  size={12} 
                  className={`${getStatusColor(stage?.status)} ${
                    stage?.status === 'processing' ? 'animate-spin' : ''
                  }`} 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-foreground">
                    {stage?.name}
                  </span>
                  <span className="text-xs font-caption text-muted-foreground">
                    {stage?.duration ? `${stage?.duration}s` : stage?.status === 'processing' ? 'En proceso...' : ''}
                  </span>
                </div>
                
                {stage?.status === 'processing' && (
                  <div className="w-full bg-muted rounded-full h-1 mt-1">
                    <div
                      className="bg-secondary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${stage?.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quality Metrics */}
      <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
        <div className="flex items-center space-x-medical-sm mb-medical-base">
          <div className="w-8 h-8 bg-accent/10 rounded-medical flex items-center justify-center">
            <Icon name="BarChart3" size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground">
              Métricas de Calidad
            </h3>
            <p className="text-xs font-caption text-muted-foreground">
              Evaluación automática del procesamiento
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-medical-base">
          <div className="space-y-medical-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm font-body text-muted-foreground">Calidad de Audio</span>
              <span className={`text-sm font-body font-medium ${getQualityColor(mockProcessingData?.qualityMetrics?.audioQuality)}`}>
                {mockProcessingData?.qualityMetrics?.audioQuality === 'excellent' ? 'Excelente' : 
                 mockProcessingData?.qualityMetrics?.audioQuality === 'good' ? 'Buena' :
                 mockProcessingData?.qualityMetrics?.audioQuality === 'fair' ? 'Regular' : 'Pobre'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-body text-muted-foreground">Separación de Hablantes</span>
              <span className="text-sm font-body font-medium text-foreground">
                {mockProcessingData?.qualityMetrics?.speakerSeparation}%
              </span>
            </div>
          </div>
          
          <div className="space-y-medical-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm font-body text-muted-foreground">Términos Médicos</span>
              <span className="text-sm font-body font-medium text-foreground">
                {mockProcessingData?.qualityMetrics?.medicalTermAccuracy}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-body text-muted-foreground">Confianza General</span>
              <span className="text-sm font-body font-medium text-foreground">
                {mockProcessingData?.qualityMetrics?.overallConfidence}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Detected Issues */}
      {mockProcessingData?.detectedIssues?.length > 0 && (
        <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
          <div className="flex items-center space-x-medical-sm mb-medical-base">
            <div className="w-8 h-8 bg-warning/10 rounded-medical flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">
                Problemas Detectados
              </h3>
              <p className="text-xs font-caption text-muted-foreground">
                {mockProcessingData?.detectedIssues?.length} problema(s) encontrado(s)
              </p>
            </div>
          </div>

          <div className="space-y-medical-sm">
            {mockProcessingData?.detectedIssues?.map((issue, index) => (
              <div key={index} className="flex items-start space-x-medical-sm p-medical-sm bg-muted/30 rounded-medical">
                <Icon 
                  name={issue?.type === 'noise' ? 'Volume1' : 'VolumeX'} 
                  size={16} 
                  className={getSeverityColor(issue?.severity)} 
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body font-medium text-foreground">
                      {issue?.type === 'noise' ? 'Ruido Detectado' : 'Segmento Inaudible'}
                    </span>
                    <span className="text-xs font-caption text-muted-foreground">
                      {Math.floor(issue?.timestamp / 60)}:{(issue?.timestamp % 60)?.toString()?.padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-xs font-caption text-muted-foreground mt-1">
                    {issue?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-medical-sm">
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onRetryProcessing}
          disabled={mockProcessingData?.overallProgress < 100}
        >
          Reprocesar
        </Button>
        
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          onClick={onExportTranscription}
          disabled={mockProcessingData?.overallProgress < 50}
        >
          Exportar Transcripción
        </Button>
      </div>
    </div>
  );
};

export default ProcessingStatus;