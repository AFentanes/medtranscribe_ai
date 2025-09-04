import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHeader = ({ 
  reportData, 
  onEdit, 
  onExport, 
  onPrint, 
  isEditing, 
  validationStatus 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'validated': return 'text-success';
      case 'pending': return 'text-warning';
      case 'draft': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validated': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'draft': return 'FileText';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg mb-medical-lg medical-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-medical-base">
        {/* Report Title and Status */}
        <div className="flex-1">
          <div className="flex items-center gap-medical-sm mb-medical-xs">
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Reporte Médico
            </h1>
            <div className={`flex items-center gap-medical-xs px-medical-sm py-1 rounded-medical bg-muted ${getStatusColor(validationStatus)}`}>
              <Icon name={getStatusIcon(validationStatus)} size={16} />
              <span className="text-sm font-caption font-medium">
                {validationStatus === 'validated' ? 'Validado' :
                 validationStatus === 'pending' ? 'Pendiente' : 'Borrador'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-medical-base text-sm text-muted-foreground">
            <div className="flex items-center gap-medical-xs">
              <Icon name="Calendar" size={16} />
              <span>Fecha: {reportData?.consultationDate}</span>
            </div>
            <div className="flex items-center gap-medical-xs">
              <Icon name="User" size={16} />
              <span>Paciente: {reportData?.patientName}</span>
            </div>
            <div className="flex items-center gap-medical-xs">
              <Icon name="Stethoscope" size={16} />
              <span>Dr. {reportData?.doctorName}</span>
            </div>
            <div className="flex items-center gap-medical-xs">
              <Icon name="Hash" size={16} />
              <span>ID: {reportData?.consultationId}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-medical-sm">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
            disabled={validationStatus === 'validated'}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Printer"
            iconPosition="left"
            onClick={onPrint}
          >
            Imprimir
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Exportar PDF
          </Button>
        </div>
      </div>
      {/* Hospital Branding */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-medical-sm">
            <div className="w-8 h-8 bg-primary rounded-medical flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div>
              <span className="text-sm font-heading font-semibold text-foreground">Hospital Ángeles</span>
              <p className="text-xs text-muted-foreground">Sistema de Transcripción Médica</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Generado: {reportData?.generatedDate}</p>
            <p className="text-xs text-muted-foreground">Versión: {reportData?.version}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;