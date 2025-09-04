import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentRecommendations = ({ medications, nonPharmacological, allergies, onValidate }) => {
  const [validatedMedications, setValidatedMedications] = useState(new Set());
  const [validatedTreatments, setValidatedTreatments] = useState(new Set());
  const [expandedMedication, setExpandedMedication] = useState(null);

  const handleMedicationValidation = (medicationId) => {
    const newValidated = new Set(validatedMedications);
    if (newValidated?.has(medicationId)) {
      newValidated?.delete(medicationId);
    } else {
      newValidated?.add(medicationId);
    }
    setValidatedMedications(newValidated);
    onValidate('medications', Array.from(newValidated));
  };

  const handleTreatmentValidation = (treatmentId) => {
    const newValidated = new Set(validatedTreatments);
    if (newValidated?.has(treatmentId)) {
      newValidated?.delete(treatmentId);
    } else {
      newValidated?.add(treatmentId);
    }
    setValidatedTreatments(newValidated);
    onValidate('treatments', Array.from(newValidated));
  };

  const checkAllergyConflict = (medication) => {
    return allergies?.some(allergy => 
      allergy?.medications && allergy?.medications?.includes(medication?.genericName)
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'text-error bg-red-50 border-red-200';
      case 'media': return 'text-warning bg-amber-50 border-amber-200';
      case 'baja': return 'text-success bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const toggleMedicationExpansion = (medicationId) => {
    setExpandedMedication(expandedMedication === medicationId ? null : medicationId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
            <Icon name="Pill" size={18} className="text-success-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recomendaciones de Tratamiento
            </h3>
            <p className="text-sm text-muted-foreground">
              {medications?.length} medicamentos y {nonPharmacological?.length} tratamientos no farmacológicos
            </p>
          </div>
        </div>
      </div>
      {/* Medications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Pill" size={16} className="text-muted-foreground" />
            <h4 className="font-body font-medium text-foreground">Medicamentos Sugeridos</h4>
            <span className="text-sm text-muted-foreground">
              ({validatedMedications?.size}/{medications?.length} validados)
            </span>
          </div>
          {allergies?.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-error">
              <Icon name="AlertTriangle" size={12} />
              <span>Filtrado por alergias activo</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {medications?.map((medication) => {
            const hasAllergyConflict = checkAllergyConflict(medication);
            
            return (
              <div
                key={medication?.id}
                className={`border rounded-lg medical-transition ${
                  hasAllergyConflict 
                    ? 'bg-error/5 border-error/20' 
                    : validatedMedications?.has(medication?.id)
                    ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-caption border ${getPriorityColor(medication?.priority)}`}>
                          {medication?.priority} prioridad
                        </div>
                        {hasAllergyConflict && (
                          <div className="px-2 py-1 rounded text-xs font-caption bg-error/20 text-error border border-error/20 flex items-center space-x-1">
                            <Icon name="AlertTriangle" size={12} />
                            <span>CONTRAINDICADO</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <h5 className="font-body font-semibold text-foreground">
                          {medication?.commercialName}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {medication?.genericName} - {medication?.concentration}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Dosis:</span>
                          <p className="text-sm font-medium text-foreground">{medication?.dosage}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Frecuencia:</span>
                          <p className="text-sm font-medium text-foreground">{medication?.frequency}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Duración:</span>
                          <p className="text-sm font-medium text-foreground">{medication?.duration}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-xs text-muted-foreground">Indicación:</span>
                        <p className="text-sm text-foreground">{medication?.indication}</p>
                      </div>

                      {expandedMedication === medication?.id && (
                        <div className="pt-3 border-t border-border space-y-3">
                          <div>
                            <span className="text-xs text-muted-foreground">Mecanismo de acción:</span>
                            <p className="text-sm text-foreground">{medication?.mechanism}</p>
                          </div>

                          <div>
                            <span className="text-xs text-muted-foreground">Efectos secundarios comunes:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {medication?.sideEffects?.map((effect, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                                >
                                  {effect}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs text-muted-foreground">Contraindicaciones:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {medication?.contraindications?.map((contra, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-error/10 text-xs text-error rounded border border-error/20"
                                >
                                  {contra}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs text-muted-foreground">Instrucciones especiales:</span>
                            <p className="text-sm text-foreground">{medication?.instructions}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <button
                        onClick={() => handleMedicationValidation(medication?.id)}
                        disabled={hasAllergyConflict}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                          hasAllergyConflict
                            ? 'bg-error/20 border-error/40 cursor-not-allowed'
                            : validatedMedications?.has(medication?.id)
                            ? 'bg-success border-success text-success-foreground'
                            : 'border-border hover:border-primary'
                        }`}
                        title={hasAllergyConflict ? "Medicamento contraindicado" : "Validar medicamento"}
                      >
                        {hasAllergyConflict ? (
                          <Icon name="X" size={14} />
                        ) : validatedMedications?.has(medication?.id) ? (
                          <Icon name="Check" size={14} />
                        ) : null}
                      </button>
                      <button
                        onClick={() => toggleMedicationExpansion(medication?.id)}
                        className="w-6 h-6 rounded border border-border hover:border-primary flex items-center justify-center medical-transition"
                        title="Ver detalles"
                      >
                        <Icon 
                          name={expandedMedication === medication?.id ? "ChevronUp" : "ChevronDown"} 
                          size={14} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Non-Pharmacological Treatments */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={16} className="text-muted-foreground" />
          <h4 className="font-body font-medium text-foreground">Tratamientos No Farmacológicos</h4>
          <span className="text-sm text-muted-foreground">
            ({validatedTreatments?.size}/{nonPharmacological?.length} validados)
          </span>
        </div>

        <div className="grid gap-3">
          {nonPharmacological?.map((treatment) => (
            <div
              key={treatment?.id}
              className={`p-4 rounded-lg border medical-transition ${
                validatedTreatments?.has(treatment?.id)
                  ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={treatment?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                      {treatment?.category}
                    </span>
                    <div className={`px-2 py-1 rounded text-xs font-caption border ${getPriorityColor(treatment?.priority)}`}>
                      {treatment?.priority} prioridad
                    </div>
                  </div>

                  <h5 className="font-body font-medium text-foreground mb-1">
                    {treatment?.name}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    {treatment?.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground">Duración:</span>
                      <p className="text-sm font-medium text-foreground">{treatment?.duration}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Frecuencia:</span>
                      <p className="text-sm font-medium text-foreground">{treatment?.frequency}</p>
                    </div>
                  </div>

                  {treatment?.instructions && (
                    <div className="mt-3 p-3 bg-muted rounded">
                      <span className="text-xs text-muted-foreground">Instrucciones:</span>
                      <p className="text-sm text-foreground mt-1">{treatment?.instructions}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => handleTreatmentValidation(treatment?.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                      validatedTreatments?.has(treatment?.id)
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    title="Validar tratamiento"
                  >
                    {validatedTreatments?.has(treatment?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Validación médica requerida antes de prescripción
        </div>
        <div className="flex space-x-2">
          <Button
            variant={validatedMedications?.size > 0 ? "default" : "outline"}
            size="sm"
            iconName="Pill"
            iconPosition="left"
            disabled={validatedMedications?.size === 0}
          >
            Medicamentos ({validatedMedications?.size})
          </Button>
          <Button
            variant={validatedTreatments?.size > 0 ? "secondary" : "outline"}
            size="sm"
            iconName="Heart"
            iconPosition="left"
            disabled={validatedTreatments?.size === 0}
          >
            Tratamientos ({validatedTreatments?.size})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentRecommendations;