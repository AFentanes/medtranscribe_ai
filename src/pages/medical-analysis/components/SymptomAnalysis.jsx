import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SymptomAnalysis = ({ symptoms, onValidate }) => {
  const [validatedSymptoms, setValidatedSymptoms] = useState(new Set());

  const handleSymptomValidation = (symptomId) => {
    const newValidated = new Set(validatedSymptoms);
    if (newValidated?.has(symptomId)) {
      newValidated?.delete(symptomId);
    } else {
      newValidated?.add(symptomId);
    }
    setValidatedSymptoms(newValidated);
    onValidate('symptoms', Array.from(newValidated));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'crítico': return 'text-error bg-red-50 border-red-200';
      case 'alto': return 'text-warning bg-amber-50 border-amber-200';
      case 'moderado': return 'text-accent bg-yellow-50 border-yellow-200';
      case 'leve': return 'text-success bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getLocationIcon = (location) => {
    const locationMap = {
      'cabeza': 'Brain',
      'pecho': 'Heart',
      'abdomen': 'Circle',
      'extremidades': 'Hand',
      'espalda': 'User',
      'general': 'User'
    };
    return locationMap?.[location] || 'MapPin';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={18} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Análisis de Síntomas
            </h3>
            <p className="text-sm text-muted-foreground">
              {symptoms?.length} síntomas identificados y categorizados
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Validados: {validatedSymptoms?.size}/{symptoms?.length}
          </span>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${(validatedSymptoms?.size / symptoms?.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {symptoms?.map((symptom) => (
          <div
            key={symptom?.id}
            className={`p-4 rounded-lg border medical-transition ${
              validatedSymptoms?.has(symptom?.id)
                ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getLocationIcon(symptom?.location)} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                      {symptom?.location}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-caption border ${getSeverityColor(symptom?.severity)}`}>
                    {symptom?.severity}
                  </div>
                </div>

                <div>
                  <h4 className="font-body font-medium text-foreground mb-1">
                    {symptom?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {symptom?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Duración:</span>
                    <span className="font-medium text-foreground">{symptom?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Frecuencia:</span>
                    <span className="font-medium text-foreground">{symptom?.frequency}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Thermometer" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Intensidad:</span>
                    <span className="font-medium text-foreground">{symptom?.intensity}/10</span>
                  </div>
                </div>

                {symptom?.associatedSymptoms && symptom?.associatedSymptoms?.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Síntomas asociados:</p>
                    <div className="flex flex-wrap gap-1">
                      {symptom?.associatedSymptoms?.map((associated, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                        >
                          {associated}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-2 ml-4">
                <button
                  onClick={() => handleSymptomValidation(symptom?.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                    validatedSymptoms?.has(symptom?.id)
                      ? 'bg-success border-success text-success-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                  title="Validar síntoma"
                >
                  {validatedSymptoms?.has(symptom?.id) && (
                    <Icon name="Check" size={14} />
                  )}
                </button>
                <span className="text-xs text-muted-foreground">
                  {symptom?.confidence}% confianza
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Validación médica requerida para continuar con el diagnóstico
        </div>
        <Button
          variant={validatedSymptoms?.size === symptoms?.length ? "default" : "outline"}
          size="sm"
          iconName="CheckCircle"
          iconPosition="left"
          disabled={validatedSymptoms?.size === 0}
        >
          Validar Todos ({validatedSymptoms?.size}/{symptoms?.length})
        </Button>
      </div>
    </div>
  );
};

export default SymptomAnalysis;