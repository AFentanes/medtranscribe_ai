import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConsultationMetadataForm = ({ metadata, onMetadataChange, errors }) => {
  const consultationTypes = [
    { value: 'primera-vez', label: 'Primera vez' },
    { value: 'seguimiento', label: 'Seguimiento' },
    { value: 'urgencia', label: 'Urgencia' },
    { value: 'control', label: 'Control' },
    { value: 'interconsulta', label: 'Interconsulta' }
  ];

  const genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' }
  ];

  const handleInputChange = (field, value) => {
    onMetadataChange({
      ...metadata,
      [field]: value
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-card rounded-medical-lg p-medical-lg medical-border">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-medical-lg">
        Información de la consulta
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-medical-lg">
        <div className="space-y-medical-lg">
          <Input
            label="Edad del paciente"
            type="number"
            placeholder="Ej: 45"
            value={metadata?.patientAge}
            onChange={(e) => handleInputChange('patientAge', e?.target?.value)}
            error={errors?.patientAge}
            required
            min="0"
            max="120"
            className="w-full"
          />

          <Select
            label="Género del paciente"
            placeholder="Seleccionar género"
            options={genderOptions}
            value={metadata?.patientGender}
            onChange={(value) => handleInputChange('patientGender', value)}
            error={errors?.patientGender}
            required
          />

          <Input
            label="Fecha de consulta"
            type="date"
            value={metadata?.consultationDate || getCurrentDate()}
            onChange={(e) => handleInputChange('consultationDate', e?.target?.value)}
            error={errors?.consultationDate}
            required
            description={`Formato: ${formatDate(metadata?.consultationDate || getCurrentDate())}`}
          />
        </div>

        <div className="space-y-medical-lg">
          <Select
            label="Tipo de consulta"
            placeholder="Seleccionar tipo"
            options={consultationTypes}
            value={metadata?.consultationType}
            onChange={(value) => handleInputChange('consultationType', value)}
            error={errors?.consultationType}
            required
          />

          <Input
            label="Número de expediente (opcional)"
            type="text"
            placeholder="Ej: EXP-2024-001234"
            value={metadata?.patientId}
            onChange={(e) => handleInputChange('patientId', e?.target?.value)}
            error={errors?.patientId}
            description="Identificador único del paciente"
          />

          <Input
            label="Duración estimada (minutos)"
            type="number"
            placeholder="Ej: 30"
            value={metadata?.estimatedDuration}
            onChange={(e) => handleInputChange('estimatedDuration', e?.target?.value)}
            error={errors?.estimatedDuration}
            min="1"
            max="180"
            description="Duración aproximada de la consulta"
          />
        </div>
      </div>
      <div className="mt-medical-lg">
        <Input
          label="Notas adicionales (opcional)"
          type="text"
          placeholder="Información relevante sobre la consulta..."
          value={metadata?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          error={errors?.notes}
          description="Contexto adicional que pueda ayudar en la transcripción"
        />
      </div>
    </div>
  );
};

export default ConsultationMetadataForm;