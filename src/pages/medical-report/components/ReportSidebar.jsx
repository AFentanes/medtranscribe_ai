import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportSidebar = ({ 
  reportData, 
  validationStatus, 
  onSectionNavigate, 
  activeSection,
  onExport,
  onPrint,
  onShare 
}) => {
  const sections = [
    { id: 'patient', name: 'Datos del Paciente', icon: 'User' },
    { id: 'transcription', name: 'Transcripción', icon: 'MessageSquare' },
    { id: 'symptoms', name: 'Análisis de Síntomas', icon: 'Activity' },
    { id: 'diagnosis', name: 'Diagnóstico', icon: 'Brain' },
    { id: 'treatment', name: 'Tratamiento', icon: 'Pill' }
  ];

  const getValidationIcon = (status) => {
    switch (status) {
      case 'validated': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'draft': return 'FileText';
      default: return 'FileText';
    }
  };

  const getValidationColor = (status) => {
    switch (status) {
      case 'validated': return 'text-success';
      case 'pending': return 'text-warning';
      case 'draft': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="w-80 bg-card border-l medical-border h-full overflow-y-auto">
      {/* Report Status */}
      <div className="p-medical-lg border-b medical-border">
        <div className="flex items-center gap-medical-sm mb-medical-sm">
          <Icon 
            name={getValidationIcon(validationStatus)} 
            size={20} 
            className={getValidationColor(validationStatus)} 
          />
          <div>
            <h3 className="text-sm font-heading font-medium text-foreground">
              Estado del Reporte
            </h3>
            <p className="text-xs text-muted-foreground">
              {validationStatus === 'validated' ? 'Validado y Aprobado' :
               validationStatus === 'pending' ? 'Pendiente de Validación' : 'Borrador'}
            </p>
          </div>
        </div>

        {/* Report Metadata */}
        <div className="space-y-medical-xs text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ID Consulta:</span>
            <span className="font-mono text-foreground">{reportData?.consultationId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fecha:</span>
            <span className="text-foreground">{reportData?.consultationDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versión:</span>
            <span className="text-foreground">{reportData?.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Páginas:</span>
            <span className="text-foreground">{reportData?.pageCount || 1}</span>
          </div>
        </div>
      </div>
      {/* Section Navigation */}
      <div className="p-medical-lg border-b medical-border">
        <h4 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Navegación por Secciones
        </h4>
        
        <nav className="space-y-medical-xs">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => onSectionNavigate(section?.id)}
              className={`w-full flex items-center gap-medical-sm px-medical-sm py-medical-xs rounded-medical text-left medical-transition ${
                activeSection === section?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span className="text-sm font-body">{section?.name}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Quick Actions */}
      <div className="p-medical-lg border-b medical-border">
        <h4 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Acciones Rápidas
        </h4>
        
        <div className="space-y-medical-xs">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
            fullWidth
          >
            Exportar PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Printer"
            iconPosition="left"
            onClick={onPrint}
            fullWidth
          >
            Imprimir
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
            onClick={onShare}
            fullWidth
          >
            Compartir
          </Button>
        </div>
      </div>
      {/* Report Statistics */}
      <div className="p-medical-lg border-b medical-border">
        <h4 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Estadísticas del Reporte
        </h4>
        
        <div className="space-y-medical-sm">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-medical-xs">
              <Icon name="FileText" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Palabras:</span>
            </div>
            <span className="font-medium text-foreground">{reportData?.wordCount || '2,847'}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-medical-xs">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Duración Audio:</span>
            </div>
            <span className="font-medium text-foreground">{reportData?.audioDuration || '18:32'}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-medical-xs">
              <Icon name="Zap" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Precisión IA:</span>
            </div>
            <span className="font-medium text-foreground">{reportData?.aiAccuracy || '94.2%'}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-medical-xs">
              <Icon name="BookOpen" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Términos Médicos:</span>
            </div>
            <span className="font-medium text-foreground">{reportData?.medicalTermsCount || '47'}</span>
          </div>
        </div>
      </div>
      {/* Validation History */}
      <div className="p-medical-lg border-b medical-border">
        <h4 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Historial de Validación
        </h4>
        
        <div className="space-y-medical-sm">
          {reportData?.validationHistory && reportData?.validationHistory?.length > 0 ? (
            reportData?.validationHistory?.map((validation, index) => (
              <div key={index} className="flex items-start gap-medical-sm">
                <Icon 
                  name={validation?.action === 'validated' ? 'CheckCircle' : 'Edit'} 
                  size={14} 
                  className={validation?.action === 'validated' ? 'text-success' : 'text-warning'} 
                />
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">
                    {validation?.action === 'validated' ? 'Validado' : 'Modificado'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {validation?.doctor} - {validation?.date}
                  </p>
                  {validation?.notes && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {validation?.notes}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">
              Sin historial de validación disponible
            </p>
          )}
        </div>
      </div>
      {/* Related Consultations */}
      <div className="p-medical-lg">
        <h4 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Consultas Relacionadas
        </h4>
        
        <div className="space-y-medical-sm">
          {reportData?.relatedConsultations && reportData?.relatedConsultations?.length > 0 ? (
            reportData?.relatedConsultations?.map((consultation, index) => (
              <button
                key={index}
                className="w-full text-left p-medical-xs border medical-border rounded-medical hover:bg-muted medical-transition"
              >
                <div className="flex items-center gap-medical-xs mb-1">
                  <Icon name="FileText" size={12} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">
                    {consultation?.date}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {consultation?.summary}
                </p>
              </button>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">
              No hay consultas relacionadas
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportSidebar;