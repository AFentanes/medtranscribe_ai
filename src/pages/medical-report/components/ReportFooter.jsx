import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportFooter = ({ 
  reportData, 
  validationStatus, 
  onValidate, 
  onSave, 
  onNavigate,
  isEditing 
}) => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
      {/* Legal Disclaimer */}
      <div className="mb-medical-base p-medical-sm bg-muted rounded-medical">
        <div className="flex items-start gap-medical-sm">
          <Icon name="Shield" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p className="font-medium mb-1">Aviso Legal y Médico:</p>
            <p>
              Este reporte ha sido generado mediante inteligencia artificial como herramienta de apoyo diagnóstico. 
              La información contenida debe ser validada por un profesional médico certificado antes de su uso clínico. 
              Hospital Ángeles no se hace responsable por decisiones médicas basadas únicamente en este reporte automatizado. 
              Este documento es confidencial y está protegido por las leyes de privacidad médica aplicables en México.
            </p>
          </div>
        </div>
      </div>
      {/* Validation Section */}
      <div className="mb-medical-base">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-medical-base">
          <div className="flex items-center gap-medical-sm">
            <Icon 
              name={validationStatus === 'validated' ? 'CheckCircle' : 'Clock'} 
              size={20} 
              className={validationStatus === 'validated' ? 'text-success' : 'text-warning'} 
            />
            <div>
              <h3 className="text-sm font-heading font-medium text-foreground">
                Estado de Validación
              </h3>
              <p className="text-xs text-muted-foreground">
                {validationStatus === 'validated' 
                  ? `Validado por Dr. ${reportData?.validatedBy} el ${reportData?.validationDate}`
                  : 'Pendiente de validación médica profesional'
                }
              </p>
            </div>
          </div>

          {validationStatus !== 'validated' && !isEditing && (
            <Button
              variant="default"
              size="sm"
              iconName="CheckCircle"
              iconPosition="left"
              onClick={onValidate}
            >
              Validar Reporte
            </Button>
          )}
        </div>
      </div>
      {/* Digital Signature Section */}
      {validationStatus === 'validated' && (
        <div className="mb-medical-base p-medical-sm border medical-border rounded-medical">
          <div className="flex items-center gap-medical-sm mb-medical-xs">
            <Icon name="FileSignature" size={16} className="text-primary" />
            <h4 className="text-sm font-heading font-medium text-foreground">Firma Digital</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-medical-base text-xs">
            <div>
              <p className="text-muted-foreground">Médico Responsable:</p>
              <p className="font-medium text-foreground">Dr. {reportData?.doctorName}</p>
              <p className="text-muted-foreground">Cédula Profesional: {reportData?.doctorLicense}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fecha y Hora de Validación:</p>
              <p className="font-medium text-foreground">{reportData?.validationDate}</p>
              <p className="text-muted-foreground">Hash de Verificación: {reportData?.verificationHash}</p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-medical-sm mb-medical-base">
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => onNavigate('/medical-analysis')}
        >
          Volver al Análisis
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="History"
          iconPosition="left"
          onClick={() => onNavigate('/consultation-history')}
        >
          Ver Historial
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onNavigate('/audio-upload')}
        >
          Nueva Consulta
        </Button>
        
        <div className="flex-1" />
        
        {isEditing && (
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconPosition="left"
            onClick={onSave}
          >
            Guardar Cambios
          </Button>
        )}
      </div>
      {/* Hospital Branding and Copyright */}
      <div className="pt-medical-base border-t medical-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-medical-sm">
          <div className="flex items-center gap-medical-sm">
            <div className="w-8 h-8 bg-primary rounded-medical flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-heading font-semibold text-foreground">Hospital Ángeles</p>
              <p className="text-xs text-muted-foreground">Sistema MedTranscribe AI</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Hospital Ángeles. Todos los derechos reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              Documento generado el {reportData?.generatedDate} - ID: {reportData?.consultationId}
            </p>
          </div>
        </div>
      </div>
      {/* Version and Audit Trail */}
      <div className="mt-medical-sm pt-medical-sm border-t medical-border">
        <div className="flex flex-wrap items-center gap-medical-base text-xs text-muted-foreground">
          <div className="flex items-center gap-medical-xs">
            <Icon name="GitBranch" size={12} />
            <span>Versión: {reportData?.version}</span>
          </div>
          <div className="flex items-center gap-medical-xs">
            <Icon name="Clock" size={12} />
            <span>Última modificación: {reportData?.lastModified}</span>
          </div>
          <div className="flex items-center gap-medical-xs">
            <Icon name="User" size={12} />
            <span>Modificado por: {reportData?.lastModifiedBy}</span>
          </div>
          <div className="flex items-center gap-medical-xs">
            <Icon name="Database" size={12} />
            <span>Respaldo: Automático</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFooter;