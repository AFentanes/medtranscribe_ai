import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DifferentialDiagnosis = ({ diagnoses, onValidate }) => {
  const [validatedDiagnoses, setValidatedDiagnoses] = useState(new Set());
  const [expandedDiagnosis, setExpandedDiagnosis] = useState(null);

  const handleDiagnosisValidation = (diagnosisId) => {
    const newValidated = new Set(validatedDiagnoses);
    if (newValidated?.has(diagnosisId)) {
      newValidated?.delete(diagnosisId);
    } else {
      newValidated?.add(diagnosisId);
    }
    setValidatedDiagnoses(newValidated);
    onValidate('diagnoses', Array.from(newValidated));
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-success bg-green-50 border-green-200';
    if (probability >= 60) return 'text-accent bg-yellow-50 border-yellow-200';
    if (probability >= 40) return 'text-warning bg-amber-50 border-amber-200';
    return 'text-error bg-red-50 border-red-200';
  };

  const getProbabilityIcon = (probability) => {
    if (probability >= 80) return 'TrendingUp';
    if (probability >= 60) return 'Minus';
    if (probability >= 40) return 'TrendingDown';
    return 'AlertTriangle';
  };

  const toggleExpansion = (diagnosisId) => {
    setExpandedDiagnosis(expandedDiagnosis === diagnosisId ? null : diagnosisId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="Stethoscope" size={18} className="text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Diagnóstico Diferencial
            </h3>
            <p className="text-sm text-muted-foreground">
              {diagnoses?.length} posibilidades diagnósticas ordenadas por probabilidad
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Revisados: {validatedDiagnoses?.size}/{diagnoses?.length}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {diagnoses?.map((diagnosis, index) => (
          <div
            key={diagnosis?.id}
            className={`border rounded-lg medical-transition ${
              validatedDiagnoses?.has(diagnosis?.id)
                ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <h4 className="font-body font-semibold text-foreground">
                        {diagnosis?.name}
                      </h4>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getProbabilityColor(diagnosis?.probability)}`}>
                      <Icon name={getProbabilityIcon(diagnosis?.probability)} size={14} />
                      <span>{diagnosis?.probability}%</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {diagnosis?.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-1">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span>Síntomas que coinciden</span>
                      </h5>
                      <div className="space-y-1">
                        {diagnosis?.matchingSymptoms?.map((symptom, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-success rounded-full" />
                            <span className="text-muted-foreground">{symptom}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} className="text-warning" />
                        <span>Factores de riesgo</span>
                      </h5>
                      <div className="space-y-1">
                        {diagnosis?.riskFactors?.map((factor, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                            <span className="text-muted-foreground">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {expandedDiagnosis === diagnosis?.id && (
                    <div className="pt-3 border-t border-border space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Explicación basada en evidencia
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {diagnosis?.evidenceExplanation}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Estudios recomendados
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {diagnosis?.recommendedTests?.map((test, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-2 bg-muted rounded text-sm">
                              <Icon name="FileText" size={14} className="text-muted-foreground" />
                              <span className="text-foreground">{test}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Criterios diagnósticos
                        </h5>
                        <div className="space-y-2">
                          {diagnosis?.diagnosticCriteria?.map((criteria, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm">
                              <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5" />
                              <span className="text-muted-foreground">{criteria}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => handleDiagnosisValidation(diagnosis?.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                      validatedDiagnoses?.has(diagnosis?.id)
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    title="Validar diagnóstico"
                  >
                    {validatedDiagnoses?.has(diagnosis?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => toggleExpansion(diagnosis?.id)}
                    className="w-6 h-6 rounded border border-border hover:border-primary flex items-center justify-center medical-transition"
                    title="Ver detalles"
                  >
                    <Icon 
                      name={expandedDiagnosis === diagnosis?.id ? "ChevronUp" : "ChevronDown"} 
                      size={14} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Revisión médica requerida para validar diagnósticos diferenciales
        </div>
        <Button
          variant={validatedDiagnoses?.size > 0 ? "default" : "outline"}
          size="sm"
          iconName="Stethoscope"
          iconPosition="left"
          disabled={validatedDiagnoses?.size === 0}
        >
          Confirmar Diagnósticos ({validatedDiagnoses?.size})
        </Button>
      </div>
    </div>
  );
};

export default DifferentialDiagnosis;