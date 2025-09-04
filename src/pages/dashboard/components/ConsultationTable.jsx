import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConsultationTable = ({ consultations, onStatusUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'completed', label: 'Completado' },
    { value: 'processing', label: 'Procesando' },
    { value: 'pending', label: 'Pendiente de revisión' },
    { value: 'draft', label: 'Borrador' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success border-success/20', label: 'Completado', icon: 'CheckCircle' },
      processing: { color: 'bg-accent/10 text-accent border-accent/20', label: 'Procesando', icon: 'Clock' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pendiente', icon: 'AlertCircle' },
      draft: { color: 'bg-muted text-muted-foreground border-border', label: 'Borrador', icon: 'FileText' }
    };

    const config = statusConfig?.[status] || statusConfig?.draft;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-medical text-xs font-caption border ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const filteredConsultations = consultations?.filter(consultation => {
    const matchesSearch = consultation?.patientInitials?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         consultation?.diagnosis?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewConsultation = (consultation) => {
    if (consultation?.status === 'processing') {
      navigate('/transcription-monitor', { state: { consultationId: consultation?.id } });
    } else if (consultation?.status === 'pending') {
      navigate('/medical-analysis', { state: { consultationId: consultation?.id } });
    } else {
      navigate('/medical-report', { state: { consultationId: consultation?.id } });
    }
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg medical-shadow">
      {/* Header with Search and Filters */}
      <div className="p-medical-lg border-b medical-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Consultas Recientes
          </h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Buscar por iniciales o diagnóstico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filtrar por estado"
              className="w-full sm:w-48"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-medical-sm text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Paciente
              </th>
              <th className="text-left p-medical-sm text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Fecha
              </th>
              <th className="text-left p-medical-sm text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left p-medical-sm text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Diagnóstico
              </th>
              <th className="text-left p-medical-sm text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Duración
              </th>
              <th className="text-right p-medical-sm text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y medical-border">
            {filteredConsultations?.map((consultation) => (
              <tr key={consultation?.id} className="hover:bg-muted/30 medical-transition">
                <td className="p-medical-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-heading font-medium text-primary">
                        {consultation?.patientInitials}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">
                        {consultation?.patientInitials}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground">
                        ID: {consultation?.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-medical-sm">
                  <div>
                    <p className="text-sm font-body text-foreground">{consultation?.date}</p>
                    <p className="text-xs font-caption text-muted-foreground">{consultation?.time}</p>
                  </div>
                </td>
                <td className="p-medical-sm">
                  {getStatusBadge(consultation?.status)}
                </td>
                <td className="p-medical-sm">
                  <p className="text-sm font-body text-foreground max-w-xs truncate">
                    {consultation?.diagnosis}
                  </p>
                </td>
                <td className="p-medical-sm">
                  <p className="text-sm font-body text-foreground">{consultation?.duration}</p>
                </td>
                <td className="p-medical-sm text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => handleViewConsultation(consultation)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => console.log('Export', consultation?.id)}
                    >
                      Exportar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y medical-border">
        {filteredConsultations?.map((consultation) => (
          <div key={consultation?.id} className="p-medical-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-heading font-medium text-primary">
                    {consultation?.patientInitials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-foreground">
                    {consultation?.patientInitials}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {consultation?.date} • {consultation?.time}
                  </p>
                </div>
              </div>
              {getStatusBadge(consultation?.status)}
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm font-body text-foreground">
                <span className="font-medium">Diagnóstico:</span> {consultation?.diagnosis}
              </p>
              <p className="text-sm font-body text-muted-foreground">
                <span className="font-medium">Duración:</span> {consultation?.duration}
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => handleViewConsultation(consultation)}
                fullWidth
              >
                Ver Consulta
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => console.log('Export', consultation?.id)}
              >
                Exportar
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredConsultations?.length === 0 && (
        <div className="p-medical-3xl text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-heading font-medium text-foreground mb-2">
            No se encontraron consultas
          </p>
          <p className="text-sm font-body text-muted-foreground">
            Intenta ajustar los filtros de búsqueda o crear una nueva consulta
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsultationTable;