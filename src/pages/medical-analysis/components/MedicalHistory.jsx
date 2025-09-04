import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalHistory = ({ history, allergies, onValidate }) => {
  const [validatedHistory, setValidatedHistory] = useState(new Set());
  const [validatedAllergies, setValidatedAllergies] = useState(new Set());

  const handleHistoryValidation = (historyId) => {
    const newValidated = new Set(validatedHistory);
    if (newValidated?.has(historyId)) {
      newValidated?.delete(historyId);
    } else {
      newValidated?.add(historyId);
    }
    setValidatedHistory(newValidated);
    onValidate('history', Array.from(newValidated));
  };

  const handleAllergyValidation = (allergyId) => {
    const newValidated = new Set(validatedAllergies);
    if (newValidated?.has(allergyId)) {
      newValidated?.delete(allergyId);
    } else {
      newValidated?.add(allergyId);
    }
    setValidatedAllergies(newValidated);
    onValidate('allergies', Array.from(newValidated));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'grave': return 'text-error bg-red-50 border-red-200';
      case 'moderada': return 'text-warning bg-amber-50 border-amber-200';
      case 'leve': return 'text-accent bg-yellow-50 border-yellow-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getHistoryIcon = (category) => {
    const iconMap = {
      'cardiovascular': 'Heart',
      'respiratorio': 'Wind',
      'digestivo': 'Circle',
      'neurológico': 'Brain',
      'endocrino': 'Zap',
      'quirúrgico': 'Scissors',
      'familiar': 'Users',
      'medicamentos': 'Pill'
    };
    return iconMap?.[category] || 'FileText';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={18} className="text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Historial Médico y Alergias
            </h3>
            <p className="text-sm text-muted-foreground">
              {history?.length} antecedentes y {allergies?.length} alergias identificadas
            </p>
          </div>
        </div>
      </div>
      {/* Medical History Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <h4 className="font-body font-medium text-foreground">Antecedentes Médicos</h4>
          <span className="text-sm text-muted-foreground">
            ({validatedHistory?.size}/{history?.length} validados)
          </span>
        </div>

        <div className="grid gap-3">
          {history?.map((item) => (
            <div
              key={item?.id}
              className={`p-4 rounded-lg border medical-transition ${
                validatedHistory?.has(item?.id)
                  ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon 
                      name={getHistoryIcon(item?.category)} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                      {item?.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item?.year}
                    </span>
                  </div>

                  <h5 className="font-body font-medium text-foreground mb-1">
                    {item?.condition}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item?.description}
                  </p>

                  {item?.treatment && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tratamiento: </span>
                      <span className="text-foreground">{item?.treatment}</span>
                    </div>
                  )}

                  {item?.status && (
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-xs font-caption ${
                        item?.status === 'activo' ? 'bg-warning/20 text-warning' :
                        item?.status === 'resuelto'? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {item?.status}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => handleHistoryValidation(item?.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                      validatedHistory?.has(item?.id)
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    title="Validar antecedente"
                  >
                    {validatedHistory?.has(item?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {item?.confidence}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Allergies Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-error" />
          <h4 className="font-body font-medium text-foreground">Alergias Detectadas</h4>
          <span className="text-sm text-muted-foreground">
            ({validatedAllergies?.size}/{allergies?.length} validadas)
          </span>
        </div>

        <div className="grid gap-3">
          {allergies?.map((allergy) => (
            <div
              key={allergy?.id}
              className={`p-4 rounded-lg border medical-transition ${
                validatedAllergies?.has(allergy?.id)
                  ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Shield" size={16} className="text-error" />
                    <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                      {allergy?.type}
                    </span>
                    <div className={`px-2 py-1 rounded text-xs font-caption border ${getSeverityColor(allergy?.severity)}`}>
                      {allergy?.severity}
                    </div>
                  </div>

                  <h5 className="font-body font-medium text-foreground mb-1">
                    {allergy?.allergen}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {allergy?.reaction}
                  </p>

                  {allergy?.medications && allergy?.medications?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Medicamentos contraindicados:</p>
                      <div className="flex flex-wrap gap-1">
                        {allergy?.medications?.map((med, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-error/10 text-error text-xs rounded border border-error/20"
                          >
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {allergy?.lastReaction && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Última reacción: </span>
                      <span className="text-foreground">{allergy?.lastReaction}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => handleAllergyValidation(allergy?.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                      validatedAllergies?.has(allergy?.id)
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    title="Validar alergia"
                  >
                    {validatedAllergies?.has(allergy?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {allergy?.confidence}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Validación crítica para seguridad del paciente y prescripción médica
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="History"
            iconPosition="left"
            disabled={validatedHistory?.size === 0}
          >
            Historial ({validatedHistory?.size})
          </Button>
          <Button
            variant={validatedAllergies?.size > 0 ? "destructive" : "outline"}
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            disabled={validatedAllergies?.size === 0}
          >
            Alergias ({validatedAllergies?.size})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;