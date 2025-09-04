import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientDataSection = ({ patientData, isEditing, onUpdate }) => {
  const handleFieldUpdate = (field, value) => {
    if (onUpdate) {
      onUpdate('patientData', { ...patientData, [field]: value });
    }
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg mb-medical-base medical-shadow">
      <div className="flex items-center gap-medical-sm mb-medical-base">
        <Icon name="User" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Datos del Paciente
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-medical-base">
        {/* Basic Information */}
        <div className="space-y-medical-sm">
          <h3 className="text-sm font-heading font-medium text-foreground mb-medical-xs">
            Información Básica
          </h3>
          
          <div className="space-y-medical-xs">
            <div>
              <label className="text-xs font-caption text-muted-foreground">Nombre Completo</label>
              {isEditing ? (
                <input
                  type="text"
                  value={patientData?.fullName}
                  onChange={(e) => handleFieldUpdate('fullName', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.fullName}</p>
              )}
            </div>
            
            <div>
              <label className="text-xs font-caption text-muted-foreground">Edad</label>
              {isEditing ? (
                <input
                  type="number"
                  value={patientData?.age}
                  onChange={(e) => handleFieldUpdate('age', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.age} años</p>
              )}
            </div>
            
            <div>
              <label className="text-xs font-caption text-muted-foreground">Género</label>
              {isEditing ? (
                <select
                  value={patientData?.gender}
                  onChange={(e) => handleFieldUpdate('gender', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.gender}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-medical-sm">
          <h3 className="text-sm font-heading font-medium text-foreground mb-medical-xs">
            Información de Contacto
          </h3>
          
          <div className="space-y-medical-xs">
            <div>
              <label className="text-xs font-caption text-muted-foreground">Teléfono</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={patientData?.phone}
                  onChange={(e) => handleFieldUpdate('phone', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.phone}</p>
              )}
            </div>
            
            <div>
              <label className="text-xs font-caption text-muted-foreground">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={patientData?.email}
                  onChange={(e) => handleFieldUpdate('email', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.email}</p>
              )}
            </div>
            
            <div>
              <label className="text-xs font-caption text-muted-foreground">Dirección</label>
              {isEditing ? (
                <textarea
                  value={patientData?.address}
                  onChange={(e) => handleFieldUpdate('address', e?.target?.value)}
                  rows={2}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-medical-sm">
          <h3 className="text-sm font-heading font-medium text-foreground mb-medical-xs">
            Información Médica
          </h3>
          
          <div className="space-y-medical-xs">
            <div>
              <label className="text-xs font-caption text-muted-foreground">Tipo de Sangre</label>
              {isEditing ? (
                <select
                  value={patientData?.bloodType}
                  onChange={(e) => handleFieldUpdate('bloodType', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.bloodType}</p>
              )}
            </div>
            
            <div>
              <label className="text-xs font-caption text-muted-foreground">Seguro Médico</label>
              {isEditing ? (
                <input
                  type="text"
                  value={patientData?.insurance}
                  onChange={(e) => handleFieldUpdate('insurance', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.insurance}</p>
              )}
            </div>
            
            <div>
              <label className="text-xs font-caption text-muted-foreground">Número de Póliza</label>
              {isEditing ? (
                <input
                  type="text"
                  value={patientData?.policyNumber}
                  onChange={(e) => handleFieldUpdate('policyNumber', e?.target?.value)}
                  className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : (
                <p className="text-sm font-body text-foreground mt-1">{patientData?.policyNumber}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Contacto de Emergencia
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-medical-base">
          <div>
            <label className="text-xs font-caption text-muted-foreground">Nombre</label>
            {isEditing ? (
              <input
                type="text"
                value={patientData?.emergencyContact?.name}
                onChange={(e) => handleFieldUpdate('emergencyContact', { 
                  ...patientData?.emergencyContact, 
                  name: e?.target?.value 
                })}
                className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
              />
            ) : (
              <p className="text-sm font-body text-foreground mt-1">{patientData?.emergencyContact?.name}</p>
            )}
          </div>
          
          <div>
            <label className="text-xs font-caption text-muted-foreground">Relación</label>
            {isEditing ? (
              <input
                type="text"
                value={patientData?.emergencyContact?.relationship}
                onChange={(e) => handleFieldUpdate('emergencyContact', { 
                  ...patientData?.emergencyContact, 
                  relationship: e?.target?.value 
                })}
                className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
              />
            ) : (
              <p className="text-sm font-body text-foreground mt-1">{patientData?.emergencyContact?.relationship}</p>
            )}
          </div>
          
          <div>
            <label className="text-xs font-caption text-muted-foreground">Teléfono</label>
            {isEditing ? (
              <input
                type="tel"
                value={patientData?.emergencyContact?.phone}
                onChange={(e) => handleFieldUpdate('emergencyContact', { 
                  ...patientData?.emergencyContact, 
                  phone: e?.target?.value 
                })}
                className="w-full mt-1 px-medical-sm py-1 text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary"
              />
            ) : (
              <p className="text-sm font-body text-foreground mt-1">{patientData?.emergencyContact?.phone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDataSection;