import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import ReportHeader from './components/ReportHeader';
import PatientDataSection from './components/PatientDataSection';
import TranscriptionSection from './components/TranscriptionSection';
import SymptomAnalysisSection from './components/SymptomAnalysisSection';
import DiagnosisSection from './components/DiagnosisSection';
import TreatmentSection from './components/TreatmentSection';
import ReportFooter from './components/ReportFooter';
import ReportSidebar from './components/ReportSidebar';

const MedicalReport = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('patient');
  const [showSidebar, setShowSidebar] = useState(false);

  const getFormattedCurrentDate = (includeTime = false) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    return new Date().toLocaleString('es-MX', options);
  };

  const [reportData, setReportData] = useState({
    consultationId: "CONS-2024-001847",
    consultationDate: getFormattedCurrentDate(),
    generatedDate: getFormattedCurrentDate(true),
    lastModified: getFormattedCurrentDate(true),
    lastModifiedBy: user ? `Dr. ${user.name}` : 'Sistema IA', 
    version: "1.0",
    patientName: "Ana Sofía Martínez López",
    doctorName: user ? user.name : 'N/A', 
    doctorLicense: "4567890",
    validationStatus: "pending",
    validatedBy: null,
    validationDate: null,
    verificationHash: "SHA256:a1b2c3d4e5f6...",
    wordCount: 2847,
    audioDuration: "18:32",
    aiAccuracy: "94.2%",
    medicalTermsCount: 47,
    pageCount: 1,
    validationHistory: [
      {
        action: "created",
        doctor: "Sistema IA",
        date: getFormattedCurrentDate(true),
        notes: "Reporte generado automáticamente"
      }
    ],
    relatedConsultations: [
      {
        date: "28/08/2024",
        summary: "Consulta de seguimiento - Dolor abdominal recurrente"
      },
      {
        date: "15/08/2024", 
        summary: "Primera consulta - Síntomas gastrointestinales"
      }
    ]
  });

  const [patientData, setPatientData] = useState({
    fullName: "Ana Sofía Martínez López",
    age: 34,
    gender: "Femenino",
    phone: "+52 55 1234-5678",
    email: "ana.martinez@email.com",
    address: "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX",
    bloodType: "O+",
    insurance: "Seguro Popular",
    policyNumber: "SP-2024-789456",
    emergencyContact: {
      name: "Carlos Martínez",
      relationship: "Esposo",
      phone: "+52 55 9876-5432"
    }
  });

  const [transcriptionData, setTranscriptionData] = useState({
    duration: "18:32",
    quality: 94,
    speakers: ["Doctor", "Paciente"],
    inaudibleCount: 3,
    notes: "Transcripción realizada con alta precisión. Se detectaron algunos términos médicos especializados que fueron verificados automáticamente.",
    segments: [
      {
        id: 1,
        speaker: "Doctor",
        timestamp: 15,
        content: "Buenos días, señora Martínez. ¿Cómo se encuentra hoy? Me puede contar qué síntomas ha estado experimentando desde nuestra última consulta.",
        confidence: 96,
        medicalTerms: [],
        hasInaudible: false
      },
      {
        id: 2,
        speaker: "Paciente",
        timestamp: 28,
        content: "Buenos días, doctor. He estado sintiendo un dolor muy fuerte en el abdomen, especialmente en la parte superior derecha. El dolor comenzó hace tres días y ha empeorado progresivamente.",
        confidence: 92,
        medicalTerms: ["dolor abdominal", "cuadrante superior derecho"],
        hasInaudible: false
      },
      {
        id: 3,
        speaker: "Doctor",
        timestamp: 45,
        content: "Entiendo. ¿Puede describir el tipo de dolor? ¿Es punzante, sordo, constante o intermitente? ¿Y hay algo que lo mejore o lo empeore?",
        confidence: 98,
        medicalTerms: ["dolor punzante", "dolor sordo"],
        hasInaudible: false
      },
      {
        id: 4,
        speaker: "Paciente",
        timestamp: 62,
        content: "Es un dolor punzante que viene en oleadas. Empeora cuando como, especialmente comidas grasosas. También he tenido náuseas y vómitos en las últimas 24 horas.",
        confidence: 89,
        medicalTerms: ["dolor punzante", "náuseas", "vómitos", "intolerancia a grasas"],
        hasInaudible: false
      },
      {
        id: 5,
        speaker: "Doctor",
        timestamp: 85,
        content: "¿Ha tenido fiebre? ¿Y el dolor se irradia hacia alguna otra parte del cuerpo, como la espalda o el hombro?",
        confidence: 95,
        medicalTerms: ["fiebre", "dolor irradiado"],
        hasInaudible: false
      },
      {
        id: 6,
        speaker: "Paciente",
        timestamp: 98,
        content: "Sí, he tenido fiebre de aproximadamente 38.5°C desde ayer. Y sí, el dolor se extiende hacia mi espalda, justo debajo del omóplato derecho.",
        confidence: 91,
        medicalTerms: ["fiebre", "dolor referido", "omóplato"],
        hasInaudible: false
      }
    ]
  });

  const [symptomsData, setSymptomsData] = useState({
    symptoms: [
      {
        id: 1,
        name: "Dolor Abdominal Superior Derecho",
        description: "Dolor punzante en cuadrante superior derecho del abdomen, que se intensifica con la ingesta de alimentos grasos",
        severity: "Severo",
        duration: "3 días",
        location: "Cuadrante superior derecho del abdomen",
        frequency: "Constante",
        intensity: 8,
        associatedFactors: ["Ingesta de grasas", "Movimiento", "Palpación"]
      },
      {
        id: 2,
        name: "Náuseas y Vómitos",
        description: "Episodios de náuseas constantes acompañados de vómitos, especialmente después de las comidas",
        severity: "Moderado",
        duration: "24 horas",
        location: "Epigastrio",
        frequency: "Intermitente",
        intensity: 6,
        associatedFactors: ["Ingesta de alimentos", "Dolor abdominal"]
      },
      {
        id: 3,
        name: "Fiebre",
        description: "Temperatura corporal elevada de 38.5°C, acompañada de malestar general",
        severity: "Moderado",
        duration: "24 horas",
        location: "Sistémico",
        frequency: "Constante",
        intensity: 5,
        associatedFactors: ["Escalofríos", "Malestar general"]
      },
      {
        id: 4,
        name: "Dolor Referido",
        description: "Dolor que se irradia desde el abdomen hacia la región escapular derecha",
        severity: "Leve",
        duration: "2 días",
        location: "Omóplato derecho",
        frequency: "Intermitente",
        intensity: 4,
        associatedFactors: ["Dolor abdominal primario", "Respiración profunda"]
      }
    ],
    medicalHistory: `La paciente refiere antecedentes de colelitiasis diagnosticada hace 2 años mediante ultrasonido abdominal. Ha presentado episodios similares de dolor abdominal en el pasado, pero de menor intensidad y duración. No refiere antecedentes de cirugías abdominales previas. Antecedente familiar de colelitiasis en madre y hermana mayor.`,
    allergies: [
      {
        substance: "Penicilina",
        reaction: "Erupción cutánea y dificultad respiratoria",
        severity: "Severa"
      },
      {
        substance: "Ibuprofeno",
        reaction: "Dolor epigástrico y náuseas",
        severity: "Moderada"
      }
    ]
  });

  const [diagnosisData, setDiagnosisData] = useState({
    primaryDiagnosis: "Colecistitis Aguda",
    differentialDiagnoses: [
      {
        id: 1,
        name: "Colecistitis Aguda",
        description: "Inflamación aguda de la vesícula biliar, probablemente secundaria a obstrucción del conducto cístico por cálculo biliar",
        probability: 85,
        icd10: "K80.0",
        supportingEvidence: [
          "Dolor en cuadrante superior derecho",
          "Signo de Murphy positivo",
          "Fiebre",
          "Náuseas y vómitos",
          "Antecedente de colelitiasis"
        ],
        recommendedTests: [
          "Ultrasonido abdominal",
          "Biometría hemática completa",
          "Química sanguínea",
          "Pruebas de función hepática"
        ]
      },
      {
        id: 2,
        name: "Coledocolitiasis",
        description: "Presencia de cálculos en el conducto biliar común que pueden causar obstrucción e inflamación",
        probability: 65,
        icd10: "K80.5",
        supportingEvidence: [
          "Dolor abdominal tipo cólico",
          "Antecedente de colelitiasis",
          "Náuseas y vómitos"
        ],
        recommendedTests: [
          "Colangioresonancia magnética",
          "CPRE",
          "Bilirrubinas séricas"
        ]
      },
      {
        id: 3,
        name: "Pancreatitis Aguda",
        description: "Inflamación aguda del páncreas que puede ser secundaria a obstrucción biliar",
        probability: 45,
        icd10: "K85.9",
        supportingEvidence: [
          "Dolor abdominal severo",
          "Náuseas y vómitos",
          "Dolor irradiado a espalda"
        ],
        recommendedTests: [
          "Lipasa sérica",
          "Amilasa sérica",
          "Tomografía abdominal"
        ]
      },
      {
        id: 4,
        name: "Hepatitis Aguda",
        description: "Inflamación del hígado que puede causar dolor en hipocondrio derecho",
        probability: 25,
        icd10: "K72.0",
        supportingEvidence: [
          "Dolor abdominal superior",
          "Náuseas",
          "Malestar general"
        ],
        recommendedTests: [
          "Transaminasas",
          "Bilirrubinas",
          "Serología viral"
        ]
      }
    ],
    clinicalReasoning: `Basándose en la presentación clínica de la paciente, que incluye dolor en cuadrante superior derecho de inicio agudo, fiebre, náuseas, vómitos e intolerancia a alimentos grasos, junto con el antecedente conocido de colelitiasis, el diagnóstico más probable es colecistitis aguda. La tríada clásica de dolor, fiebre y leucocitosis, junto con el signo de Murphy positivo durante la exploración física, apoyan fuertemente este diagnóstico. La irradiación del dolor hacia el omóplato derecho es característica de la patología biliar.`,
    additionalConsiderations: `Se debe considerar la posibilidad de complicaciones como empiema vesicular, perforación o gangrena, especialmente si los síntomas persisten o empeoran. La edad de la paciente y el género femenino son factores de riesgo conocidos para enfermedad biliar. Es importante descartar coledocolitiasis concomitante mediante estudios de imagen apropiados.`
  });

  const [treatmentData, setTreatmentData] = useState({
    medications: [
      {
        id: 1,
        name: "Metamizol Sódico",
        genericName: "Dipirona",
        dosage: "500 mg",
        frequency: "Cada 8 horas",
        duration: "5 días",
        route: "Oral",
        instructions: "Tomar con alimentos para reducir irritación gástrica. Suspender si presenta erupción cutánea o fiebre.",
        hasAllergicRisk: false,
        hasInteractions: false,
        sideEffects: ["Somnolencia", "Náuseas leves", "Mareos"]
      },
      {
        id: 2,
        name: "Omeprazol",
        genericName: "Inhibidor de bomba de protones",
        dosage: "40 mg",
        frequency: "Una vez al día",
        duration: "10 días",
        route: "Oral",
        instructions: "Tomar en ayunas, 30 minutos antes del desayuno. No masticar la cápsula.",
        hasAllergicRisk: false,
        hasInteractions: false,
        sideEffects: ["Cefalea", "Diarrea", "Dolor abdominal"]
      },
      {
        id: 3,
        name: "Ciprofloxacino",
        genericName: "Fluoroquinolona",
        dosage: "500 mg",
        frequency: "Cada 12 horas",
        duration: "7 días",
        route: "Oral",
        instructions: "Tomar con abundante agua. Evitar productos lácteos 2 horas antes y después de la toma. Completar todo el tratamiento.",
        hasAllergicRisk: false,
        hasInteractions: true,
        sideEffects: ["Náuseas", "Diarrea", "Mareos", "Fotosensibilidad"]
      },
      {
        id: 4,
        name: "Ondansetrón",
        genericName: "Antiemético",
        dosage: "8 mg",
        frequency: "Cada 8 horas si es necesario",
        duration: "3 días",
        route: "Oral",
        instructions: "Tomar solo en caso de náuseas o vómitos persistentes. Puede causar somnolencia.",
        hasAllergicRisk: false,
        hasInteractions: false,
        sideEffects: ["Somnolencia", "Cefalea", "Estreñimiento"]
      }
    ],
    nonPharmacological: [
      {
        id: 1,
        title: "Dieta Baja en Grasas",
        description: "Evitar alimentos ricos en grasas saturadas, frituras, lácteos enteros y carnes grasas. Preferir alimentos cocidos al vapor, hervidos o a la plancha.",
        priority: "Alta",
        expectedOutcome: "Reducción del dolor abdominal y prevención de nuevos episodios"
      },
      {
        id: 2,
        title: "Hidratación Adecuada",
        description: "Mantener ingesta de líquidos de al menos 2 litros al día. Preferir agua natural, tés de hierbas sin azúcar y caldos claros.",
        priority: "Alta",
        expectedOutcome: "Prevención de deshidratación y mejora del estado general"
      },
      {
        id: 3,
        title: "Reposo Relativo",
        description: "Evitar actividades físicas intensas durante los primeros días. Mantener reposo en cama durante los episodios de dolor agudo.",
        priority: "Media",
        expectedOutcome: "Reducción del dolor y aceleración de la recuperación"
      },
      {
        id: 4,
        title: "Aplicación de Calor Local",
        description: "Aplicar compresas tibias en la región abdominal superior derecha por 15-20 minutos, 3 veces al día para alivio del dolor.",
        priority: "Baja",
        expectedOutcome: "Alivio temporal del dolor y relajación muscular"
      }
    ],
    followUpInstructions: `La paciente debe regresar a consulta en 48-72 horas para evaluación de la respuesta al tratamiento. Si presenta empeoramiento del dolor, fiebre persistente mayor a 39°C, vómitos incoercibles o ictericia, debe acudir inmediatamente al servicio de urgencias. Se programará ultrasonido abdominal de control en 1 semana. Si no hay mejoría clínica en 5 días, se considerará manejo quirúrgico (colecistectomía laparoscópica). Mantener seguimiento con gastroenterología para evaluación de tratamiento definitivo.`
  });

  const [validationStatus, setValidationStatus] = useState('pending');

  useEffect(() => {
    // Simulate loading report data
    const timer = setTimeout(() => {
      setValidationStatus(reportData?.validationStatus);
    }, 1000);

    return () => clearTimeout(timer);
  }, [reportData?.validationStatus]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    setReportData(prev => ({
      ...prev,
      lastModified: new Date()?.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      lastModifiedBy: user ? `Dr. ${user.name}` : 'Usuario',
      version: (parseFloat(prev?.version) + 0.1)?.toFixed(1)
    }));
  };

  const handleValidate = () => {
    setValidationStatus('validated');
    setReportData(prev => ({
      ...prev,
      validationStatus: 'validated',
      validatedBy: user ? `Dr. ${user.name}` : 'Usuario',
      validationDate: new Date()?.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      validationHistory: [
        ...prev?.validationHistory,
        {
          action: "validated",
          doctor: user ? `Dr. ${user.name}` : 'Usuario',
          date: new Date()?.toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          notes: "Reporte validado y aprobado para uso clínico"
        }
      ]
    }));
  };

  const handleExport = () => {
    // Simulate PDF export
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Reporte_Medico_${reportData?.consultationId}.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // Simulate secure sharing
    if (navigator.share) {
      navigator.share({
        title: 'Reporte Médico',
        text: `Reporte médico - ${reportData?.patientName}`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handleSectionNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleDataUpdate = (section, data) => {
    switch (section) {
      case 'patientData':
        setPatientData(data);
        break;
      case 'transcriptionData':
        setTranscriptionData(data);
        break;
      case 'symptomsData':
        setSymptomsData(data);
        break;
      case 'diagnosisData':
        setDiagnosisData(data);
        break;
      case 'treatmentData':
        setTreatmentData(data);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Header />
      
      <div className="pt-medical-3xl">
        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 ${showSidebar ? 'lg:mr-80' : ''} transition-all duration-300`}>
            <div className="max-w-5xl mx-auto p-medical-lg">
              {/* Report Header */}
              <ReportHeader
                reportData={reportData}
                onEdit={handleEdit}
                onExport={handleExport}
                onPrint={handlePrint}
                isEditing={isEditing}
                validationStatus={validationStatus}
              />

              {/* Report Sections */}
              <div className="space-y-medical-base">
                <div id="section-patient">
                  <PatientDataSection
                    patientData={patientData}
                    isEditing={isEditing}
                    onUpdate={handleDataUpdate}
                  />
                </div>

                <div id="section-transcription">
                  <TranscriptionSection
                    transcriptionData={transcriptionData}
                    isEditing={isEditing}
                    onUpdate={handleDataUpdate}
                  />
                </div>

                <div id="section-symptoms">
                  <SymptomAnalysisSection
                    symptomsData={symptomsData}
                    isEditing={isEditing}
                    onUpdate={handleDataUpdate}
                  />
                </div>

                <div id="section-diagnosis">
                  <DiagnosisSection
                    diagnosisData={diagnosisData}
                    isEditing={isEditing}
                    onUpdate={handleDataUpdate}
                  />
                </div>

                <div id="section-treatment">
                  <TreatmentSection
                    treatmentData={treatmentData}
                    isEditing={isEditing}
                    onUpdate={handleDataUpdate}
                  />
                </div>
              </div>

              {/* Report Footer */}
              <ReportFooter
                reportData={reportData}
                validationStatus={validationStatus}
                onValidate={handleValidate}
                onSave={handleSave}
                onNavigate={handleNavigate}
                isEditing={isEditing}
              />
            </div>
          </div>

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-primary text-primary-foreground p-medical-xs rounded-l-medical medical-shadow hover:bg-primary/90 medical-transition lg:hidden"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${showSidebar ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Sidebar */}
          <div className={`fixed right-0 top-medical-3xl bottom-0 z-40 transform transition-transform duration-300 ${
            showSidebar ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 lg:relative lg:top-0`}>
            <ReportSidebar
              reportData={reportData}
              validationStatus={validationStatus}
              onSectionNavigate={handleSectionNavigate}
              activeSection={activeSection}
              onExport={handleExport}
              onPrint={handlePrint}
              onShare={handleShare}
            />
          </div>

          {/* Sidebar Overlay */}
          {showSidebar && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReport;