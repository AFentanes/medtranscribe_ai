import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedItems, onExportSelected, onGenerateReports, onValidateSelected, onDeleteSelected }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExportSelected(selectedItems, format);
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateReports = async () => {
    setIsGenerating(true);
    try {
      await onGenerateReports(selectedItems);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteSelected(selectedItems);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting consultations:', error);
    }
  };

  if (selectedItems?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-card rounded-medical-lg medical-border p-medical-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-medical-sm lg:space-y-0">
          <div className="flex items-center space-x-medical-sm">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-body font-medium text-foreground">
                {selectedItems?.length} consulta{selectedItems?.length !== 1 ? 's' : ''} seleccionada{selectedItems?.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Acciones disponibles para los elementos seleccionados
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Export Actions */}
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                loading={isExporting}
                onClick={() => handleExport('pdf')}
              >
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="FileSpreadsheet"
                iconPosition="left"
                loading={isExporting}
                onClick={() => handleExport('excel')}
              >
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
                loading={isExporting}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
            </div>

            <div className="w-px h-6 bg-border"></div>

            {/* Report Generation */}
            <Button
              variant="secondary"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              loading={isGenerating}
              onClick={handleGenerateReports}
            >
              Generar Reportes
            </Button>

            {/* Validation */}
            <Button
              variant="success"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              onClick={() => onValidateSelected(selectedItems)}
            >
              Validar
            </Button>

            <div className="w-px h-6 bg-border"></div>

            {/* Delete */}
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Eliminar
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-medical-lg pt-medical-lg border-t medical-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-medical-lg">
            <div className="text-center">
              <p className="text-lg font-heading font-bold text-foreground">
                {selectedItems?.length}
              </p>
              <p className="text-xs font-caption text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-heading font-bold text-success">
                {Math.round(selectedItems?.length * 0.85)}
              </p>
              <p className="text-xs font-caption text-muted-foreground">Completadas</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-heading font-bold text-warning">
                {Math.round(selectedItems?.length * 0.1)}
              </p>
              <p className="text-xs font-caption text-muted-foreground">Pendientes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-heading font-bold text-primary">
                {Math.round(selectedItems?.length * 0.9)}
              </p>
              <p className="text-xs font-caption text-muted-foreground">Validadas</p>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-medical-sm">
          <div className="bg-card rounded-medical-lg medical-border p-medical-lg max-w-md w-full">
            <div className="flex items-center space-x-medical-sm mb-medical-lg">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Confirmar Eliminación
                </h3>
                <p className="text-sm font-caption text-muted-foreground">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>

            <div className="mb-medical-lg">
              <p className="text-sm font-body text-foreground mb-medical-sm">
                ¿Está seguro de que desea eliminar {selectedItems?.length} consulta{selectedItems?.length !== 1 ? 's' : ''}?
              </p>
              <div className="bg-muted rounded-medical p-medical-sm">
                <p className="text-xs font-caption text-muted-foreground">
                  • Se eliminarán todas las transcripciones asociadas\n
                  • Se perderán los análisis médicos generados\n
                  • Los reportes ya descargados no se verán afectados\n
                  • Esta acción quedará registrada en el historial de auditoría
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-medical-sm">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                onClick={handleDelete}
              >
                Eliminar {selectedItems?.length} consulta{selectedItems?.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;