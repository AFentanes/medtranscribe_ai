import React from 'react';
import Icon from '../../../components/AppIcon';

const SymptomAnalysisSection = ({ symptomsData, isEditing, onUpdate }) => {
  const handleSymptomUpdate = (symptomId, field, value) => {
    if (onUpdate) {
      const updatedSymptoms = symptomsData?.symptoms?.map(symptom =>
        symptom?.id === symptomId ? { ...symptom, [field]: value } : symptom
      );
      onUpdate('symptomsData', { ...symptomsData, symptoms: updatedSymptoms });
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'leve': return 'text-success bg-success/10';
      case 'moderado': return 'text-warning bg-warning/10';
      case 'severo': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDurationIcon = (duration) => {
    if (duration?.includes('día')) return 'Calendar';
    if (duration?.includes('semana')) return 'CalendarDays';
    if (duration?.includes('mes')) return 'CalendarRange';
    return 'Clock';
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg mb-medical-base medical-shadow">
      <div className="flex items-center gap-medical-sm mb-medical-base">
        <Icon name="Activity" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Análisis de Síntomas
        </h2>
      </div>
      {/* Symptoms Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-medical-base mb-medical-base">
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-foreground">
            {symptomsData?.symptoms?.length}
          </div>
          <div className="text-sm text-muted-foreground">Síntomas Identificados</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-error">
            {symptomsData?.symptoms?.filter(s => s?.severity === 'Severo')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Severos</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-warning">
            {symptomsData?.symptoms?.filter(s => s?.severity === 'Moderado')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Moderados</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-success">
            {symptomsData?.symptoms?.filter(s => s?.severity === 'Leve')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Leves</div>
        </div>
      </div>
      {/* Symptoms List */}
      <div className="space-y-medical-sm">
        {symptomsData?.symptoms?.map((symptom) => (
          <div
            key={symptom?.id}
            className="border medical-border rounded-medical p-medical-sm hover:bg-muted/50 medical-transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-medical-sm">
              {/* Symptom Name and Severity */}
              <div className="flex-1">
                <div className="flex items-center gap-medical-sm mb-medical-xs">
                  {isEditing ? (
                    <input
                      type="text"
                      value={symptom?.name}
                      onChange={(e) => handleSymptomUpdate(symptom?.id, 'name', e?.target?.value)}
                      className="flex-1 px-medical-sm py-1 text-sm font-medium border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  ) : (
                    <h3 className="text-sm font-heading font-medium text-foreground">
                      {symptom?.name}
                    </h3>
                  )}
                  
                  <span className={`px-medical-xs py-0.5 rounded-medical text-xs font-caption font-medium ${getSeverityColor(symptom?.severity)}`}>
                    {symptom?.severity}
                  </span>
                </div>

                {/* Description */}
                {isEditing ? (
                  <textarea
                    value={symptom?.description}
                    onChange={(e) => handleSymptomUpdate(symptom?.id, 'description', e?.target?.value)}
                    className="w-full px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-sm font-body text-muted-foreground mb-medical-sm">
                    {symptom?.description}
                  </p>
                )}
              </div>

              {/* Symptom Details */}
              <div className="lg:w-80 space-y-medical-xs">
                <div className="grid grid-cols-2 gap-medical-sm">
                  {/* Duration */}
                  <div className="flex items-center gap-medical-xs">
                    <Icon name={getDurationIcon(symptom?.duration)} size={14} className="text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Duración</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={symptom?.duration}
                          onChange={(e) => handleSymptomUpdate(symptom?.id, 'duration', e?.target?.value)}
                          className="w-full px-1 py-0.5 text-xs border medical-border rounded focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        <div className="text-xs font-medium text-foreground">{symptom?.duration}</div>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-medical-xs">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Ubicación</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={symptom?.location}
                          onChange={(e) => handleSymptomUpdate(symptom?.id, 'location', e?.target?.value)}
                          className="w-full px-1 py-0.5 text-xs border medical-border rounded focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        <div className="text-xs font-medium text-foreground">{symptom?.location}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Frequency and Triggers */}
                <div className="grid grid-cols-2 gap-medical-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Frecuencia</div>
                    {isEditing ? (
                      <select
                        value={symptom?.frequency}
                        onChange={(e) => handleSymptomUpdate(symptom?.id, 'frequency', e?.target?.value)}
                        className="w-full px-1 py-0.5 text-xs border medical-border rounded focus:ring-1 focus:ring-primary focus:border-primary"
                      >
                        <option value="Constante">Constante</option>
                        <option value="Intermitente">Intermitente</option>
                        <option value="Ocasional">Ocasional</option>
                        <option value="Raro">Raro</option>
                      </select>
                    ) : (
                      <div className="text-xs font-medium text-foreground">{symptom?.frequency}</div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Intensidad (1-10)</div>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={symptom?.intensity}
                        onChange={(e) => handleSymptomUpdate(symptom?.id, 'intensity', e?.target?.value)}
                        className="w-full px-1 py-0.5 text-xs border medical-border rounded focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="text-xs font-medium text-foreground">{symptom?.intensity}/10</div>
                    )}
                  </div>
                </div>

                {/* Associated Factors */}
                {symptom?.associatedFactors && symptom?.associatedFactors?.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Factores Asociados</div>
                    <div className="flex flex-wrap gap-1">
                      {symptom?.associatedFactors?.map((factor, index) => (
                        <span
                          key={index}
                          className="px-1.5 py-0.5 bg-accent/10 text-accent text-xs rounded"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Medical History and Allergies */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-medical-base">
          {/* Medical History */}
          <div>
            <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
              <Icon name="FileText" size={16} />
              Antecedentes Médicos
            </h3>
            {isEditing ? (
              <textarea
                value={symptomsData?.medicalHistory}
                onChange={(e) => onUpdate('symptomsData', { ...symptomsData, medicalHistory: e?.target?.value })}
                className="w-full px-medical-sm py-medical-xs text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={4}
                placeholder="Antecedentes médicos relevantes..."
              />
            ) : (
              <p className="text-sm font-body text-foreground">
                {symptomsData?.medicalHistory || 'Sin antecedentes médicos relevantes registrados'}
              </p>
            )}
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
              <Icon name="AlertTriangle" size={16} />
              Alergias Detectadas
            </h3>
            {symptomsData?.allergies && symptomsData?.allergies?.length > 0 ? (
              <div className="space-y-medical-xs">
                {symptomsData?.allergies?.map((allergy, index) => (
                  <div key={index} className="flex items-center gap-medical-sm p-medical-xs bg-error/10 border border-error/20 rounded-medical">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-error">{allergy?.substance}</div>
                      <div className="text-xs text-muted-foreground">{allergy?.reaction}</div>
                    </div>
                    <span className="text-xs px-medical-xs py-0.5 bg-error text-error-foreground rounded">
                      {allergy?.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm font-body text-muted-foreground">
                No se detectaron alergias en la consulta
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomAnalysisSection;