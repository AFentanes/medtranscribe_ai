import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const consultationTypes = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'general', label: 'Consulta General' },
    { value: 'followup', label: 'Seguimiento' },
    { value: 'emergency', label: 'Urgencia' },
    { value: 'specialist', label: 'Especialista' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'completed', label: 'Completado' },
    { value: 'processing', label: 'Procesando' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'error', label: 'Error' }
  ];

  const validationOptions = [
    { value: 'all', label: 'Todas las validaciones' },
    { value: 'validated', label: 'Validado' },
    { value: 'pending', label: 'Pendiente de validación' }
  ];

  const doctorOptions = [
    { value: 'all', label: 'Todos los médicos' },
    { value: 'dr-garcia', label: 'Dr. María García' },
    { value: 'dr-rodriguez', label: 'Dr. Carlos Rodríguez' },
    { value: 'dr-martinez', label: 'Dra. Ana Martínez' },
    { value: 'dr-lopez', label: 'Dr. Luis López' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...dateRange, [type]: value };
    setDateRange(newDateRange);
    onFiltersChange({
      ...filters,
      dateRange: newDateRange
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.searchTerm) count++;
    if (filters?.consultationType && filters?.consultationType !== 'all') count++;
    if (filters?.status && filters?.status !== 'all') count++;
    if (filters?.validation && filters?.validation !== 'all') count++;
    if (filters?.doctor && filters?.doctor !== 'all') count++;
    if (filters?.dateRange && (filters?.dateRange?.start || filters?.dateRange?.end)) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card rounded-medical-lg medical-border p-medical-lg">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-medical-sm space-y-medical-sm lg:space-y-0 mb-medical-lg">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Buscar por paciente, diagnóstico o ID de consulta..."
            value={filters?.searchTerm || ''}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-medical-sm">
          <Button
            variant="outline"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Filtros Avanzados
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t medical-border pt-medical-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-medical-lg">
            {/* Date Range */}
            <div className="space-y-medical-sm">
              <label className="text-sm font-heading font-semibold text-foreground">
                Rango de Fechas
              </label>
              <div className="space-y-medical-xs">
                <Input
                  type="date"
                  placeholder="Fecha inicio"
                  value={dateRange?.start}
                  onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
                />
                <Input
                  type="date"
                  placeholder="Fecha fin"
                  value={dateRange?.end}
                  onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
                />
              </div>
            </div>

            {/* Consultation Type */}
            <div className="space-y-medical-sm">
              <label className="text-sm font-heading font-semibold text-foreground">
                Tipo de Consulta
              </label>
              <select
                value={filters?.consultationType || 'all'}
                onChange={(e) => handleFilterChange('consultationType', e?.target?.value)}
                className="w-full px-3 py-2 border medical-border rounded-medical bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {consultationTypes?.map((type) => (
                  <option key={type?.value} value={type?.value}>
                    {type?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-medical-sm">
              <label className="text-sm font-heading font-semibold text-foreground">
                Estado
              </label>
              <select
                value={filters?.status || 'all'}
                onChange={(e) => handleFilterChange('status', e?.target?.value)}
                className="w-full px-3 py-2 border medical-border rounded-medical bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {statusOptions?.map((status) => (
                  <option key={status?.value} value={status?.value}>
                    {status?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Validation Status */}
            <div className="space-y-medical-sm">
              <label className="text-sm font-heading font-semibold text-foreground">
                Estado de Validación
              </label>
              <select
                value={filters?.validation || 'all'}
                onChange={(e) => handleFilterChange('validation', e?.target?.value)}
                className="w-full px-3 py-2 border medical-border rounded-medical bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {validationOptions?.map((validation) => (
                  <option key={validation?.value} value={validation?.value}>
                    {validation?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div className="space-y-medical-sm">
              <label className="text-sm font-heading font-semibold text-foreground">
                Médico Asignado
              </label>
              <select
                value={filters?.doctor || 'all'}
                onChange={(e) => handleFilterChange('doctor', e?.target?.value)}
                className="w-full px-3 py-2 border medical-border rounded-medical bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {doctorOptions?.map((doctor) => (
                  <option key={doctor?.value} value={doctor?.value}>
                    {doctor?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Filters */}
            <div className="space-y-medical-sm">
              <label className="text-sm font-heading font-semibold text-foreground">
                Filtros Rápidos
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDateRangeChange('start', new Date()?.toISOString()?.split('T')?.[0])}
                >
                  Hoy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const weekAgo = new Date();
                    weekAgo?.setDate(weekAgo?.getDate() - 7);
                    handleDateRangeChange('start', weekAgo?.toISOString()?.split('T')?.[0]);
                  }}
                >
                  Última semana
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const monthAgo = new Date();
                    monthAgo?.setMonth(monthAgo?.getMonth() - 1);
                    handleDateRangeChange('start', monthAgo?.toISOString()?.split('T')?.[0]);
                  }}
                >
                  Último mes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;