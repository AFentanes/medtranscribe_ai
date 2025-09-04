import React from 'react';
import Icon from '../../../components/AppIcon';

const DiagnosisSection = ({ diagnosisData, isEditing, onUpdate }) => {
  const handleDiagnosisUpdate = (diagnosisId, field, value) => {
    if (onUpdate) {
      const updatedDiagnoses = diagnosisData?.differentialDiagnoses?.map(diagnosis =>
        diagnosis?.id === diagnosisId ? { ...diagnosis, [field]: value } : diagnosis
      );
      onUpdate('diagnosisData', { ...diagnosisData, differentialDiagnoses: updatedDiagnoses });
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-success bg-success/10 border-success/20';
    if (probability >= 60) return 'text-warning bg-warning/10 border-warning/20';
    if (probability >= 40) return 'text-accent bg-accent/10 border-accent/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const getProbabilityIcon = (probability) => {
    if (probability >= 80) return 'CheckCircle';
    if (probability >= 60) return 'AlertCircle';
    if (probability >= 40) return 'HelpCircle';
    return 'Circle';
  };

  const getConfidenceLevel = (probability) => {
    if (probability >= 80) return 'Alta';
    if (probability >= 60) return 'Media';
    if (probability >= 40) return 'Baja';
    return 'Muy Baja';
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg mb-medical-base medical-shadow">
      <div className="flex items-center gap-medical-sm mb-medical-base">
        <Icon name="Brain" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Diagnóstico Diferencial
        </h2>
      </div>
      {/* Diagnosis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-medical-base mb-medical-base">
        <div className="bg-muted rounded-medical p-medical-sm">
          <div className="flex items-center gap-medical-xs mb-medical-xs">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Diagnóstico Principal</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={diagnosisData?.primaryDiagnosis}
              onChange={(e) => onUpdate('diagnosisData', { ...diagnosisData, primaryDiagnosis: e?.target?.value })}
              className="w-full px-medical-sm py-1 text-sm font-medium border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="text-sm font-medium text-foreground">{diagnosisData?.primaryDiagnosis}</p>
          )}
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-foreground">
            {diagnosisData?.differentialDiagnoses?.length}
          </div>
          <div className="text-sm text-muted-foreground">Diagnósticos Considerados</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-primary">
            {Math.max(...diagnosisData?.differentialDiagnoses?.map(d => d?.probability))}%
          </div>
          <div className="text-sm text-muted-foreground">Probabilidad Máxima</div>
        </div>
      </div>
      {/* Differential Diagnoses */}
      <div className="space-y-medical-sm">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Diagnósticos Diferenciales (Ordenados por Probabilidad)
        </h3>
        
        {diagnosisData?.differentialDiagnoses?.sort((a, b) => b?.probability - a?.probability)?.map((diagnosis, index) => (
          <div
            key={diagnosis?.id}
            className={`border rounded-medical p-medical-sm ${getProbabilityColor(diagnosis?.probability)}`}
          >
            <div className="flex items-start gap-medical-sm">
              {/* Ranking and Probability */}
              <div className="flex-shrink-0 flex items-center gap-medical-sm">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="text-center">
                  <div className="text-lg font-heading font-bold">
                    {diagnosis?.probability}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getConfidenceLevel(diagnosis?.probability)}
                  </div>
                </div>
              </div>

              {/* Diagnosis Details */}
              <div className="flex-1">
                <div className="flex items-center gap-medical-sm mb-medical-xs">
                  <Icon name={getProbabilityIcon(diagnosis?.probability)} size={16} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={diagnosis?.name}
                      onChange={(e) => handleDiagnosisUpdate(diagnosis?.id, 'name', e?.target?.value)}
                      className="flex-1 px-medical-sm py-1 text-sm font-medium border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                    />
                  ) : (
                    <h4 className="text-sm font-heading font-medium text-foreground">
                      {diagnosis?.name}
                    </h4>
                  )}
                  
                  {diagnosis?.icd10 && (
                    <span className="px-medical-xs py-0.5 bg-accent/20 text-accent text-xs rounded font-mono">
                      {diagnosis?.icd10}
                    </span>
                  )}
                </div>

                {/* Description */}
                {isEditing ? (
                  <textarea
                    value={diagnosis?.description}
                    onChange={(e) => handleDiagnosisUpdate(diagnosis?.id, 'description', e?.target?.value)}
                    className="w-full px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none bg-background"
                    rows={2}
                  />
                ) : (
                  <p className="text-sm font-body text-foreground mb-medical-sm">
                    {diagnosis?.description}
                  </p>
                )}

                {/* Supporting Evidence */}
                <div className="mb-medical-sm">
                  <h5 className="text-xs font-medium text-foreground mb-1">Evidencia de Apoyo:</h5>
                  <div className="flex flex-wrap gap-1">
                    {diagnosis?.supportingEvidence?.map((evidence, evidenceIndex) => (
                      <span
                        key={evidenceIndex}
                        className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded"
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Tests */}
                {diagnosis?.recommendedTests && diagnosis?.recommendedTests?.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-foreground mb-1">Pruebas Recomendadas:</h5>
                    <div className="flex flex-wrap gap-1">
                      {diagnosis?.recommendedTests?.map((test, testIndex) => (
                        <span
                          key={testIndex}
                          className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded"
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Probability Adjustment */}
              {isEditing && (
                <div className="flex-shrink-0">
                  <label className="text-xs text-muted-foreground">Probabilidad</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={diagnosis?.probability}
                    onChange={(e) => handleDiagnosisUpdate(diagnosis?.id, 'probability', parseInt(e?.target?.value))}
                    className="w-20 mt-1"
                  />
                  <div className="text-xs text-center mt-1">{diagnosis?.probability}%</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Clinical Reasoning */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
          <Icon name="Lightbulb" size={16} />
          Razonamiento Clínico
        </h3>
        {isEditing ? (
          <textarea
            value={diagnosisData?.clinicalReasoning}
            onChange={(e) => onUpdate('diagnosisData', { ...diagnosisData, clinicalReasoning: e?.target?.value })}
            className="w-full px-medical-sm py-medical-xs text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            rows={4}
            placeholder="Explicación del proceso de razonamiento clínico y correlación de síntomas..."
          />
        ) : (
          <p className="text-sm font-body text-foreground">
            {diagnosisData?.clinicalReasoning}
          </p>
        )}
      </div>
      {/* Additional Considerations */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
          <Icon name="AlertTriangle" size={16} />
          Consideraciones Adicionales
        </h3>
        {isEditing ? (
          <textarea
            value={diagnosisData?.additionalConsiderations}
            onChange={(e) => onUpdate('diagnosisData', { ...diagnosisData, additionalConsiderations: e?.target?.value })}
            className="w-full px-medical-sm py-medical-xs text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            rows={3}
            placeholder="Factores de riesgo, comorbilidades, consideraciones especiales..."
          />
        ) : (
          <p className="text-sm font-body text-foreground">
            {diagnosisData?.additionalConsiderations || 'Sin consideraciones adicionales'}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiagnosisSection;