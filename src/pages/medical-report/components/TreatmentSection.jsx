import React from 'react';
import Icon from '../../../components/AppIcon';

const TreatmentSection = ({ treatmentData, isEditing, onUpdate }) => {
  const handleMedicationUpdate = (medicationId, field, value) => {
    if (onUpdate) {
      const updatedMedications = treatmentData?.medications?.map(medication =>
        medication?.id === medicationId ? { ...medication, [field]: value } : medication
      );
      onUpdate('treatmentData', { ...treatmentData, medications: updatedMedications });
    }
  };

  const handleRecommendationUpdate = (recId, field, value) => {
    if (onUpdate) {
      const updatedRecommendations = treatmentData?.nonPharmacological?.map(rec =>
        rec?.id === recId ? { ...rec, [field]: value } : rec
      );
      onUpdate('treatmentData', { ...treatmentData, nonPharmacological: updatedRecommendations });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta': return 'text-error bg-error/10 border-error/20';
      case 'media': return 'text-warning bg-warning/10 border-warning/20';
      case 'baja': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta': return 'AlertTriangle';
      case 'media': return 'AlertCircle';
      case 'baja': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg mb-medical-base medical-shadow">
      <div className="flex items-center gap-medical-sm mb-medical-base">
        <Icon name="Pill" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Plan de Tratamiento
        </h2>
      </div>
      {/* Treatment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-medical-base mb-medical-base">
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-foreground">
            {treatmentData?.medications?.length}
          </div>
          <div className="text-sm text-muted-foreground">Medicamentos</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-foreground">
            {treatmentData?.nonPharmacological?.length}
          </div>
          <div className="text-sm text-muted-foreground">Recomendaciones</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-error">
            {treatmentData?.medications?.filter(m => m?.hasAllergicRisk)?.length}
          </div>
          <div className="text-sm text-muted-foreground">Alertas Alérgicas</div>
        </div>
        
        <div className="bg-muted rounded-medical p-medical-sm text-center">
          <div className="text-2xl font-heading font-bold text-warning">
            {treatmentData?.medications?.filter(m => m?.hasInteractions)?.length}
          </div>
          <div className="text-sm text-muted-foreground">Interacciones</div>
        </div>
      </div>
      {/* Medications Section */}
      <div className="mb-medical-base">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
          <Icon name="Pill" size={16} />
          Medicamentos Prescritos
        </h3>
        
        <div className="space-y-medical-sm">
          {treatmentData?.medications?.map((medication) => (
            <div
              key={medication?.id}
              className="border medical-border rounded-medical p-medical-sm hover:bg-muted/50 medical-transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-medical-sm">
                {/* Medication Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-medical-sm mb-medical-xs">
                    {isEditing ? (
                      <input
                        type="text"
                        value={medication?.name}
                        onChange={(e) => handleMedicationUpdate(medication?.id, 'name', e?.target?.value)}
                        className="flex-1 px-medical-sm py-1 text-sm font-medium border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <h4 className="text-sm font-heading font-medium text-foreground">
                        {medication?.name}
                      </h4>
                    )}
                    
                    {medication?.genericName && (
                      <span className="px-medical-xs py-0.5 bg-secondary/10 text-secondary text-xs rounded">
                        {medication?.genericName}
                      </span>
                    )}
                  </div>

                  {/* Dosage and Instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-medical-sm mb-medical-sm">
                    <div>
                      <label className="text-xs text-muted-foreground">Dosis</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={medication?.dosage}
                          onChange={(e) => handleMedicationUpdate(medication?.id, 'dosage', e?.target?.value)}
                          className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        <p className="text-sm font-body text-foreground mt-1">{medication?.dosage}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-xs text-muted-foreground">Frecuencia</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={medication?.frequency}
                          onChange={(e) => handleMedicationUpdate(medication?.id, 'frequency', e?.target?.value)}
                          className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        <p className="text-sm font-body text-foreground mt-1">{medication?.frequency}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-medical-sm">
                    <div>
                      <label className="text-xs text-muted-foreground">Duración</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={medication?.duration}
                          onChange={(e) => handleMedicationUpdate(medication?.id, 'duration', e?.target?.value)}
                          className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        <p className="text-sm font-body text-foreground mt-1">{medication?.duration}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-xs text-muted-foreground">Vía de Administración</label>
                      {isEditing ? (
                        <select
                          value={medication?.route}
                          onChange={(e) => handleMedicationUpdate(medication?.id, 'route', e?.target?.value)}
                          className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="Oral">Oral</option>
                          <option value="Intravenosa">Intravenosa</option>
                          <option value="Intramuscular">Intramuscular</option>
                          <option value="Tópica">Tópica</option>
                          <option value="Sublingual">Sublingual</option>
                        </select>
                      ) : (
                        <p className="text-sm font-body text-foreground mt-1">{medication?.route}</p>
                      )}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-medical-sm">
                    <label className="text-xs text-muted-foreground">Instrucciones Especiales</label>
                    {isEditing ? (
                      <textarea
                        value={medication?.instructions}
                        onChange={(e) => handleMedicationUpdate(medication?.id, 'instructions', e?.target?.value)}
                        className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                        rows={2}
                      />
                    ) : (
                      <p className="text-sm font-body text-foreground mt-1">{medication?.instructions}</p>
                    )}
                  </div>
                </div>

                {/* Alerts and Warnings */}
                <div className="lg:w-64 space-y-medical-xs">
                  {medication?.hasAllergicRisk && (
                    <div className="flex items-center gap-medical-xs p-medical-xs bg-error/10 border border-error/20 rounded-medical">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <div>
                        <div className="text-xs font-medium text-error">Riesgo Alérgico</div>
                        <div className="text-xs text-muted-foreground">Verificar alergias</div>
                      </div>
                    </div>
                  )}
                  
                  {medication?.hasInteractions && (
                    <div className="flex items-center gap-medical-xs p-medical-xs bg-warning/10 border border-warning/20 rounded-medical">
                      <Icon name="AlertCircle" size={16} className="text-warning" />
                      <div>
                        <div className="text-xs font-medium text-warning">Interacciones</div>
                        <div className="text-xs text-muted-foreground">Revisar medicamentos</div>
                      </div>
                    </div>
                  )}
                  
                  {medication?.sideEffects && medication?.sideEffects?.length > 0 && (
                    <div className="p-medical-xs bg-muted rounded-medical">
                      <div className="text-xs font-medium text-foreground mb-1">Efectos Secundarios</div>
                      <div className="text-xs text-muted-foreground">
                        {medication?.sideEffects?.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Non-Pharmacological Recommendations */}
      <div className="mb-medical-base">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
          <Icon name="Heart" size={16} />
          Recomendaciones No Farmacológicas
        </h3>
        
        <div className="space-y-medical-sm">
          {treatmentData?.nonPharmacological?.map((recommendation) => (
            <div
              key={recommendation?.id}
              className={`border rounded-medical p-medical-sm ${getPriorityColor(recommendation?.priority)}`}
            >
              <div className="flex items-start gap-medical-sm">
                <Icon name={getPriorityIcon(recommendation?.priority)} size={16} />
                
                <div className="flex-1">
                  <div className="flex items-center gap-medical-sm mb-medical-xs">
                    {isEditing ? (
                      <input
                        type="text"
                        value={recommendation?.title}
                        onChange={(e) => handleRecommendationUpdate(recommendation?.id, 'title', e?.target?.value)}
                        className="flex-1 px-medical-sm py-1 text-sm font-medium border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      />
                    ) : (
                      <h4 className="text-sm font-heading font-medium text-foreground">
                        {recommendation?.title}
                      </h4>
                    )}
                    
                    <span className="px-medical-xs py-0.5 text-xs font-medium rounded">
                      Prioridad {recommendation?.priority}
                    </span>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={recommendation?.description}
                      onChange={(e) => handleRecommendationUpdate(recommendation?.id, 'description', e?.target?.value)}
                      className="w-full px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none bg-background"
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm font-body text-foreground">
                      {recommendation?.description}
                    </p>
                  )}

                  {recommendation?.expectedOutcome && (
                    <div className="mt-medical-xs">
                      <span className="text-xs text-muted-foreground">Resultado esperado: </span>
                      <span className="text-xs text-foreground">{recommendation?.expectedOutcome}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Follow-up Instructions */}
      <div className="pt-medical-base border-t medical-border">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm flex items-center gap-medical-xs">
          <Icon name="Calendar" size={16} />
          Instrucciones de Seguimiento
        </h3>
        {isEditing ? (
          <textarea
            value={treatmentData?.followUpInstructions}
            onChange={(e) => onUpdate('treatmentData', { ...treatmentData, followUpInstructions: e?.target?.value })}
            className="w-full px-medical-sm py-medical-xs text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            rows={4}
            placeholder="Instrucciones para el seguimiento del tratamiento, próximas citas, monitoreo..."
          />
        ) : (
          <p className="text-sm font-body text-foreground">
            {treatmentData?.followUpInstructions}
          </p>
        )}
      </div>
    </div>
  );
};

export default TreatmentSection;