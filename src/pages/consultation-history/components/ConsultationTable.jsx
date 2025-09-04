import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsultationTable = ({ consultations, selectedItems, onSelectionChange, onViewConsultation, onDownloadReport, onReopenConsultation }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedConsultations = [...consultations]?.sort((a, b) => {
    if (sortConfig?.key === 'date') {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortConfig?.key === 'patient') {
      return sortConfig?.direction === 'asc' 
        ? a?.patientInitials?.localeCompare(b?.patientInitials)
        : b?.patientInitials?.localeCompare(a?.patientInitials);
    }
    
    if (sortConfig?.key === 'diagnosis') {
      return sortConfig?.direction === 'asc'
        ? a?.diagnosisSummary?.localeCompare(b?.diagnosisSummary)
        : b?.diagnosisSummary?.localeCompare(a?.diagnosisSummary);
    }
    
    return 0;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(consultations?.map(c => c?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, id]);
    } else {
      onSelectionChange(selectedItems?.filter(item => item !== id));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success text-success-foreground', label: 'Completado' },
      processing: { color: 'bg-accent text-accent-foreground', label: 'Procesando' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pendiente' },
      error: { color: 'bg-error text-error-foreground', label: 'Error' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-medical text-xs font-caption font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getValidationBadge = (validated) => {
    return validated ? (
      <div className="flex items-center space-x-1 text-success">
        <Icon name="CheckCircle" size={16} />
        <span className="text-xs font-caption">Validado</span>
      </div>
    ) : (
      <div className="flex items-center space-x-1 text-warning">
        <Icon name="Clock" size={16} />
        <span className="text-xs font-caption">Pendiente</span>
      </div>
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-foreground" />
      : <Icon name="ArrowDown" size={16} className="text-foreground" />;
  };

  return (
    <div className="bg-card rounded-medical-lg medical-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b medical-border">
            <tr>
              <th className="w-12 px-medical-sm py-medical-sm">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === consultations?.length && consultations?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded medical-border"
                />
              </th>
              <th 
                className="text-left px-medical-sm py-medical-sm cursor-pointer hover:bg-muted-foreground/5 medical-transition"
                onClick={() => handleSort('patient')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-heading font-semibold text-foreground">Paciente</span>
                  {getSortIcon('patient')}
                </div>
              </th>
              <th 
                className="text-left px-medical-sm py-medical-sm cursor-pointer hover:bg-muted-foreground/5 medical-transition"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-heading font-semibold text-foreground">Fecha</span>
                  {getSortIcon('date')}
                </div>
              </th>
              <th 
                className="text-left px-medical-sm py-medical-sm cursor-pointer hover:bg-muted-foreground/5 medical-transition"
                onClick={() => handleSort('diagnosis')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-heading font-semibold text-foreground">Diagnóstico</span>
                  {getSortIcon('diagnosis')}
                </div>
              </th>
              <th className="text-left px-medical-sm py-medical-sm">
                <span className="text-sm font-heading font-semibold text-foreground">Estado</span>
              </th>
              <th className="text-left px-medical-sm py-medical-sm">
                <span className="text-sm font-heading font-semibold text-foreground">Validación</span>
              </th>
              <th className="text-left px-medical-sm py-medical-sm">
                <span className="text-sm font-heading font-semibold text-foreground">Médico</span>
              </th>
              <th className="text-right px-medical-sm py-medical-sm">
                <span className="text-sm font-heading font-semibold text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedConsultations?.map((consultation) => (
              <tr key={consultation?.id} className="border-b medical-border hover:bg-muted/50 medical-transition">
                <td className="px-medical-sm py-medical-sm">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(consultation?.id)}
                    onChange={(e) => handleSelectItem(consultation?.id, e?.target?.checked)}
                    className="rounded medical-border"
                  />
                </td>
                <td className="px-medical-sm py-medical-sm">
                  <div className="flex items-center space-x-medical-sm">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm font-heading font-semibold text-secondary-foreground">
                        {consultation?.patientInitials}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">{consultation?.patientInitials}</p>
                      <p className="text-xs font-caption text-muted-foreground">ID: {consultation?.patientId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-medical-sm py-medical-sm">
                  <div>
                    <p className="text-sm font-body text-foreground">{consultation?.date}</p>
                    <p className="text-xs font-caption text-muted-foreground">{consultation?.time}</p>
                  </div>
                </td>
                <td className="px-medical-sm py-medical-sm">
                  <div className="max-w-xs">
                    <p className="text-sm font-body text-foreground truncate" title={consultation?.diagnosisSummary}>
                      {consultation?.diagnosisSummary}
                    </p>
                    <p className="text-xs font-caption text-muted-foreground">
                      {consultation?.symptoms?.length} síntomas identificados
                    </p>
                  </div>
                </td>
                <td className="px-medical-sm py-medical-sm">
                  {getStatusBadge(consultation?.status)}
                </td>
                <td className="px-medical-sm py-medical-sm">
                  {getValidationBadge(consultation?.validated)}
                </td>
                <td className="px-medical-sm py-medical-sm">
                  <div>
                    <p className="text-sm font-body text-foreground">{consultation?.doctor}</p>
                    <p className="text-xs font-caption text-muted-foreground">{consultation?.specialty}</p>
                  </div>
                </td>
                <td className="px-medical-sm py-medical-sm">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      onClick={() => onViewConsultation(consultation?.id)}
                      className="h-8 w-8"
                      title="Ver consulta"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Download"
                      onClick={() => onDownloadReport(consultation?.id)}
                      className="h-8 w-8"
                      title="Descargar reporte"
                      disabled={consultation?.status !== 'completed'}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="RotateCcw"
                      onClick={() => onReopenConsultation(consultation?.id)}
                      className="h-8 w-8"
                      title="Reabrir consulta"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-medical-sm p-medical-sm">
        {sortedConsultations?.map((consultation) => (
          <div key={consultation?.id} className="bg-card border medical-border rounded-medical p-medical-sm">
            <div className="flex items-start justify-between mb-medical-sm">
              <div className="flex items-center space-x-medical-sm">
                <input
                  type="checkbox"
                  checked={selectedItems?.includes(consultation?.id)}
                  onChange={(e) => handleSelectItem(consultation?.id, e?.target?.checked)}
                  className="rounded medical-border"
                />
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm font-heading font-semibold text-secondary-foreground">
                    {consultation?.patientInitials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-foreground">{consultation?.patientInitials}</p>
                  <p className="text-xs font-caption text-muted-foreground">{consultation?.date} - {consultation?.time}</p>
                </div>
              </div>
              {getStatusBadge(consultation?.status)}
            </div>
            
            <div className="mb-medical-sm">
              <p className="text-sm font-body text-foreground mb-1">{consultation?.diagnosisSummary}</p>
              <p className="text-xs font-caption text-muted-foreground">
                {consultation?.symptoms?.length} síntomas • {consultation?.doctor}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              {getValidationBadge(consultation?.validated)}
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewConsultation(consultation?.id)}
                >
                  Ver
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => onDownloadReport(consultation?.id)}
                  disabled={consultation?.status !== 'completed'}
                >
                  Descargar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationTable;