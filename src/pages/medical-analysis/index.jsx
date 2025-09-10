import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SymptomAnalysis from './components/SymptomAnalysis';
import DifferentialDiagnosis from './components/DifferentialDiagnosis';
import MedicalHistory from './components/MedicalHistory';
import TreatmentRecommendations from './components/TreatmentRecommendations';
import TestResults from './components/TestResults';
import AnalysisProgress from './components/AnalysisProgress';

const MedicalAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('symptoms');
  const [validationData, setValidationData] = useState({});
  const [analysisProgress, setAnalysisProgress] = useState({
    symptoms: { completed: false, inProgress: true, validated: 0, total: 8 },
    diagnosis: { completed: false, inProgress: false, validated: 0, total: 4 },
    history: { completed: false, inProgress: false, validated: 0, total: 6 },
    treatment: { completed: false, inProgress: false, validated: 0, total: 12 },
    tests: { completed: false, inProgress: false, validated: 0, total: 5 }
  });

  // Mock data for medical analysis
  const mockSymptoms = [
    {
      id: 'sym1',
      name: 'Dolor torácico',
      description: 'Dolor opresivo en región precordial que se irradia al brazo izquierdo',
      location: 'pecho',
      severity: 'alto',
      duration: '2 horas',
      frequency: 'Continuo',
      intensity: 8,
      confidence: 92,
      associatedSymptoms: ['Disnea', 'Sudoración', 'Náuseas']
    },
    {
      id: 'sym2',
      name: 'Disnea de esfuerzo',
      description: 'Dificultad respiratoria que aparece con actividad física mínima',
      location: 'pecho',
      severity: 'moderado',
      duration: '3 semanas',
      frequency: 'Con esfuerzo',
      intensity: 6,
      confidence: 88,
      associatedSymptoms: ['Fatiga', 'Palpitaciones']
    },
    {
      id: 'sym3',
      name: 'Palpitaciones',
      description: 'Sensación de latidos cardíacos irregulares y acelerados',
      location: 'pecho',
      severity: 'moderado',
      duration: '1 semana',
      frequency: 'Intermitente',
      intensity: 5,
      confidence: 85,
      associatedSymptoms: ['Mareo', 'Ansiedad']
    },
    {
      id: 'sym4',
      name: 'Edema en miembros inferiores',
      description: 'Hinchazón bilateral en tobillos y piernas que empeora al final del día',
      location: 'extremidades',
      severity: 'moderado',
      duration: '2 semanas',
      frequency: 'Diario',
      intensity: 4,
      confidence: 90,
      associatedSymptoms: ['Pesadez en piernas']
    },
    {
      id: 'sym5',
      name: 'Fatiga',
      description: 'Cansancio extremo que no mejora con el reposo',
      location: 'general',
      severity: 'moderado',
      duration: '1 mes',
      frequency: 'Constante',
      intensity: 7,
      confidence: 82,
      associatedSymptoms: ['Debilidad', 'Somnolencia']
    },
    {
      id: 'sym6',
      name: 'Sudoración nocturna',
      description: 'Episodios de sudoración profusa durante la noche',
      location: 'general',
      severity: 'leve',
      duration: '1 semana',
      frequency: 'Nocturno',
      intensity: 3,
      confidence: 75,
      associatedSymptoms: ['Escalofríos']
    },
    {
      id: 'sym7',
      name: 'Mareo',
      description: 'Sensación de inestabilidad y vértigo ocasional',
      location: 'cabeza',
      severity: 'leve',
      duration: '5 días',
      frequency: 'Ocasional',
      intensity: 4,
      confidence: 78,
      associatedSymptoms: ['Náuseas leves']
    },
    {
      id: 'sym8',
      name: 'Tos seca',
      description: 'Tos irritativa sin expectoración, principalmente nocturna',
      location: 'pecho',
      severity: 'leve',
      duration: '1 semana',
      frequency: 'Nocturno',
      intensity: 3,
      confidence: 80,
      associatedSymptoms: ['Irritación de garganta']
    }
  ];

  const mockDiagnoses = [
    {
      id: 'diag1',
      name: 'Insuficiencia Cardíaca Congestiva',
      description: 'Síndrome clínico caracterizado por la incapacidad del corazón para bombear sangre de manera eficiente',
      probability: 85,
      matchingSymptoms: ['Dolor torácico', 'Disnea de esfuerzo', 'Edema en MMII', 'Fatiga'],
      riskFactors: ['Hipertensión arterial', 'Diabetes mellitus', 'Edad avanzada'],
      evidenceExplanation: `La combinación de disnea de esfuerzo progresiva, edema bilateral en miembros inferiores y fatiga son altamente sugestivos de insuficiencia cardíaca. El dolor torácico puede indicar isquemia miocárdica subyacente como causa de la disfunción ventricular.`,
      recommendedTests: ['Ecocardiograma', 'BNP o NT-proBNP', 'Radiografía de tórax', 'ECG'],
      diagnosticCriteria: [
        'Síntomas de insuficiencia cardíaca (disnea, fatiga, edema)',
        'Evidencia objetiva de disfunción cardíaca estructural o funcional',
        'Respuesta a tratamiento dirigido para insuficiencia cardíaca'
      ]
    },
    {
      id: 'diag2',
      name: 'Síndrome Coronario Agudo',
      description: 'Espectro de condiciones causadas por isquemia miocárdica aguda',
      probability: 72,
      matchingSymptoms: ['Dolor torácico', 'Sudoración', 'Náuseas', 'Disnea'],
      riskFactors: ['Tabaquismo', 'Hipertensión', 'Dislipidemia', 'Diabetes'],
      evidenceExplanation: `El dolor torácico opresivo con irradiación al brazo izquierdo, acompañado de síntomas neurovegetativos como sudoración y náuseas, es característico de isquemia miocárdica aguda.`,
      recommendedTests: ['ECG seriados', 'Troponinas cardíacas', 'Radiografía de tórax', 'Ecocardiograma'],
      diagnosticCriteria: [
        'Síntomas compatibles con isquemia miocárdica',
        'Cambios electrocardiográficos sugestivos',
        'Elevación de biomarcadores cardíacos'
      ]
    },
    {
      id: 'diag3',
      name: 'Fibrilación Auricular',
      description: 'Arritmia cardíaca caracterizada por activación auricular desorganizada',
      probability: 58,
      matchingSymptoms: ['Palpitaciones', 'Disnea', 'Fatiga', 'Mareo'],
      riskFactors: ['Edad avanzada', 'Hipertensión', 'Cardiopatía estructural'],
      evidenceExplanation: `Las palpitaciones irregulares asociadas con disnea y fatiga pueden indicar fibrilación auricular, especialmente en pacientes con factores de riesgo cardiovascular.`,
      recommendedTests: ['ECG', 'Holter 24 horas', 'Ecocardiograma', 'TSH'],
      diagnosticCriteria: [
        'ECG que muestre ausencia de ondas P',
        'Intervalos RR irregularmente irregulares',
        'Duración del episodio mayor a 30 segundos'
      ]
    },
    {
      id: 'diag4',
      name: 'Hipertensión Pulmonar',
      description: 'Aumento de la presión arterial en las arterias pulmonares',
      probability: 45,
      matchingSymptoms: ['Disnea de esfuerzo', 'Fatiga', 'Edema', 'Palpitaciones'],
      riskFactors: ['Enfermedad pulmonar crónica', 'Tromboembolismo pulmonar', 'Cardiopatía izquierda'],
      evidenceExplanation: `La disnea de esfuerzo progresiva con edema y fatiga puede sugerir hipertensión pulmonar, aunque requiere confirmación con estudios específicos.`,
      recommendedTests: ['Ecocardiograma Doppler', 'Cateterismo cardíaco derecho', 'TC de tórax', 'Pruebas de función pulmonar'],
      diagnosticCriteria: [
        'Presión arterial pulmonar media ≥20 mmHg en reposo',
        'Síntomas compatibles con hipertensión pulmonar',
        'Exclusión de otras causas de disnea'
      ]
    }
  ];

  const mockHistory = [
    {
      id: 'hist1',
      category: 'cardiovascular',
      condition: 'Hipertensión Arterial',
      description: 'Diagnóstico de hipertensión arterial sistémica hace 5 años',
      year: '2019',
      treatment: 'Enalapril 10mg cada 12 horas',
      status: 'activo',
      confidence: 95
    },
    {
      id: 'hist2',
      category: 'endocrino',
      condition: 'Diabetes Mellitus Tipo 2',
      description: 'Diabetes mellitus tipo 2 diagnosticada hace 3 años',
      year: '2021',
      treatment: 'Metformina 850mg cada 12 horas',
      status: 'activo',
      confidence: 92
    },
    {
      id: 'hist3',
      category: 'quirúrgico',
      condition: 'Colecistectomía',
      description: 'Colecistectomía laparoscópica por colelitiasis',
      year: '2018',
      treatment: 'Cirugía laparoscópica',
      status: 'resuelto',
      confidence: 88
    },
    {
      id: 'hist4',
      category: 'familiar',
      condition: 'Cardiopatía Isquémica',
      description: 'Padre falleció por infarto agudo de miocardio a los 65 años',
      year: '2015',
      status: 'familiar',
      confidence: 90
    },
    {
      id: 'hist5',
      category: 'medicamentos',
      condition: 'Tratamiento Anticoagulante',
      description: 'Warfarina por fibrilación auricular paroxística',
      year: '2022',
      treatment: 'Warfarina 5mg diarios',
      status: 'activo',
      confidence: 87
    },
    {
      id: 'hist6',
      category: 'respiratorio',
      condition: 'Tabaquismo',
      description: 'Antecedente de tabaquismo 20 cigarrillos/día por 15 años',
      year: '1990-2020',
      treatment: 'Cesación tabáquica',
      status: 'resuelto',
      confidence: 93
    }
  ];

  const mockAllergies = [
    {
      id: 'all1',
      type: 'medicamento',
      allergen: 'Penicilina',
      reaction: 'Erupción cutánea generalizada con prurito intenso',
      severity: 'moderada',
      lastReaction: 'Hace 2 años',
      medications: ['Penicilina', 'Amoxicilina', 'Ampicilina'],
      confidence: 95
    },
    {
      id: 'all2',
      type: 'medicamento',
      allergen: 'AINEs',
      reaction: 'Broncoespasmo y dificultad respiratoria',
      severity: 'grave',
      lastReaction: 'Hace 6 meses',
      medications: ['Ibuprofeno', 'Diclofenaco', 'Naproxeno', 'Aspirina'],
      confidence: 90
    },
    {
      id: 'all3',
      type: 'alimento',
      allergen: 'Mariscos',
      reaction: 'Urticaria y edema facial',
      severity: 'moderada',
      lastReaction: 'Hace 1 año',
      medications: [],
      confidence: 85
    }
  ];

  const mockMedications = [
    {
      id: 'med1',
      genericName: 'Furosemida',
      commercialName: 'Lasix',
      concentration: '40mg',
      dosage: '40mg',
      frequency: 'Cada 12 horas',
      duration: '7 días',
      indication: 'Tratamiento del edema y congestión pulmonar',
      priority: 'alta',
      mechanism: 'Diurético de asa que inhibe la reabsorción de sodio y cloro en el asa de Henle',
      sideEffects: ['Hipopotasemia', 'Deshidratación', 'Hipotensión', 'Ototoxicidad'],
      contraindications: ['Anuria', 'Hipersensibilidad a sulfonamidas', 'Depleción severa de electrolitos'],
      instructions: 'Tomar en ayunas, monitorear electrolitos y función renal'
    },
    {
      id: 'med2',
      genericName: 'Enalapril',
      commercialName: 'Renitec',
      concentration: '10mg',
      dosage: '10mg',
      frequency: 'Cada 12 horas',
      duration: 'Indefinido',
      indication: 'Control de hipertensión arterial y protección cardiovascular',
      priority: 'alta',
      mechanism: 'Inhibidor de la enzima convertidora de angiotensina (IECA)',
      sideEffects: ['Tos seca', 'Hiperpotasemia', 'Angioedema', 'Hipotensión'],
      contraindications: ['Embarazo', 'Angioedema previo', 'Estenosis bilateral de arteria renal'],
      instructions: 'Tomar con o sin alimentos, monitorear presión arterial y función renal'
    },
    {
      id: 'med3',
      genericName: 'Metoprolol',
      commercialName: 'Lopressor',
      concentration: '50mg',
      dosage: '25mg',
      frequency: 'Cada 12 horas',
      duration: 'Indefinido',
      indication: 'Control de frecuencia cardíaca y protección miocárdica',
      priority: 'alta',
      mechanism: 'Betabloqueador selectivo β1 que reduce la frecuencia y contractilidad cardíaca',
      sideEffects: ['Bradicardia', 'Fatiga', 'Broncoespasmo', 'Hipotensión'],
      contraindications: ['Asma bronquial', 'Bloqueo AV avanzado', 'Shock cardiogénico'],
      instructions: 'Tomar con alimentos, no suspender abruptamente'
    },
    {
      id: 'med4',
      genericName: 'Atorvastatina',
      commercialName: 'Lipitor',
      concentration: '20mg',
      dosage: '20mg',
      frequency: 'Una vez al día',
      duration: 'Indefinido',
      indication: 'Control de dislipidemia y prevención cardiovascular',
      priority: 'media',
      mechanism: 'Inhibidor de HMG-CoA reductasa que reduce la síntesis de colesterol',
      sideEffects: ['Mialgia', 'Elevación de transaminasas', 'Cefalea', 'Dispepsia'],
      contraindications: ['Enfermedad hepática activa', 'Embarazo', 'Lactancia'],
      instructions: 'Tomar por la noche, monitorear función hepática'
    },
    {
      id: 'med5',
      genericName: 'Clopidogrel',
      commercialName: 'Plavix',
      concentration: '75mg',
      dosage: '75mg',
      frequency: 'Una vez al día',
      duration: '12 meses',
      indication: 'Prevención de eventos trombóticos cardiovasculares',
      priority: 'alta',
      mechanism: 'Inhibidor irreversible del receptor P2Y12 plaquetario',
      sideEffects: ['Sangrado', 'Dispepsia', 'Cefalea', 'Mareo'],
      contraindications: ['Sangrado activo', 'Úlcera péptica activa', 'Hipersensibilidad'],
      instructions: 'Tomar con alimentos, evitar cirugías electivas'
    }
  ];

  const mockNonPharmacological = [
    {
      id: 'treat1',
      name: 'Restricción de Sodio',
      category: 'dietética',
      description: 'Dieta hiposódica estricta para reducir retención de líquidos',
      duration: 'Permanente',
      frequency: 'Diario',
      priority: 'alta',
      icon: 'Utensils',
      instructions: 'Limitar ingesta de sodio a menos de 2g/día. Evitar alimentos procesados, embutidos y conservas. Usar especias naturales para condimentar.'
    },
    {
      id: 'treat2',
      name: 'Restricción Hídrica',
      category: 'dietética',
      description: 'Limitación de ingesta de líquidos para prevenir sobrecarga',
      duration: '2 semanas',
      frequency: 'Diario',
      priority: 'alta',
      icon: 'Droplets',
      instructions: 'Limitar ingesta total de líquidos a 1.5 litros por día incluyendo agua, jugos, sopas y otros líquidos.'
    },
    {
      id: 'treat3',
      name: 'Ejercicio Cardiovascular Supervisado',
      category: 'rehabilitación',
      description: 'Programa de ejercicio aeróbico de baja intensidad',
      duration: '12 semanas',
      frequency: '3 veces por semana',
      priority: 'media',
      icon: 'Activity',
      instructions: 'Caminata de 20-30 minutos a intensidad moderada. Iniciar gradualmente y aumentar según tolerancia.'
    },
    {
      id: 'treat4',
      name: 'Monitoreo de Peso Diario',
      category: 'seguimiento',
      description: 'Control diario del peso para detectar retención de líquidos',
      duration: 'Permanente',
      frequency: 'Diario',
      priority: 'alta',
      icon: 'Scale',
      instructions: 'Pesarse diariamente en ayunas, misma hora y ropa. Reportar aumento >2kg en 3 días.'
    },
    {
      id: 'treat5',
      name: 'Educación sobre Signos de Alarma',
      category: 'educación',
      description: 'Capacitación para reconocer síntomas de descompensación',
      duration: '1 sesión',
      frequency: 'Una vez',
      priority: 'alta',
      icon: 'BookOpen',
      instructions: 'Reconocer signos de alarma: aumento súbito de peso, disnea en reposo, edema progresivo, dolor torácico.'
    },
    {
      id: 'treat6',
      name: 'Cesación Tabáquica Completa',
      category: 'estilo de vida',
      description: 'Abandono definitivo del hábito tabáquico',
      duration: 'Permanente',
      frequency: 'Continuo',
      priority: 'alta',
      icon: 'Ban',
      instructions: 'Evitar completamente el tabaco y exposición al humo. Considerar apoyo psicológico si es necesario.'
    }
  ];

  const mockTestResults = [
    {
      id: 'test1',
      name: 'Química Sanguínea Completa',
      category: 'laboratorio',
      date: '04/09/2024',
      status: 'anormal',
      confidence: 95,
      values: [
        { parameter: 'Glucosa', result: '145 mg/dL', reference: '70-100', status: 'anormal' },
        { parameter: 'Creatinina', result: '1.8 mg/dL', reference: '0.7-1.3', status: 'anormal' },
        { parameter: 'BUN', result: '35 mg/dL', reference: '7-20', status: 'anormal' },
        { parameter: 'Sodio', result: '135 mEq/L', reference: '136-145', status: 'límite' }
      ],
      interpretation: 'Evidencia de disfunción renal leve con hiperglucemia. Compatible con nefropatía diabética.',
      recommendations: [
        'Control estricto de glucemia',
        'Monitoreo de función renal',
        'Evaluación por nefrología',
        'Ajuste de medicamentos nefrotóxicos'
      ],
      followUp: 'Repetir en 1 semana'
    },
    {
      id: 'test2',
      name: 'Péptido Natriurético Tipo B (BNP)',
      category: 'laboratorio',
      date: '04/09/2024',
      status: 'anormal',
      confidence: 98,
      values: [
        { parameter: 'BNP', result: '850 pg/mL', reference: '<100', status: 'anormal' }
      ],
      interpretation: 'Elevación significativa de BNP altamente sugestiva de insuficiencia cardíaca.',
      recommendations: [
        'Confirma diagnóstico de insuficiencia cardíaca',
        'Iniciar tratamiento específico',
        'Ecocardiograma urgente',
        'Monitoreo de respuesta al tratamiento'
      ],
      followUp: 'Control en 2 semanas'
    },
    {
      id: 'test3',
      name: 'Electrocardiograma',
      category: 'cardiología',
      date: '04/09/2024',
      status: 'anormal',
      confidence: 90,
      values: [
        { parameter: 'Ritmo', result: 'Fibrilación auricular', reference: 'Sinusal', status: 'anormal' },
        { parameter: 'FC', result: '110 lpm', reference: '60-100', status: 'anormal' },
        { parameter: 'QRS', result: '0.08 seg', reference: '<0.12', status: 'normal' }
      ],
      interpretation: 'Fibrilación auricular con respuesta ventricular rápida. No evidencia de isquemia aguda.',
      recommendations: [
        'Control de frecuencia cardíaca',
        'Anticoagulación según CHA2DS2-VASc',
        'Ecocardiograma para evaluar función ventricular',
        'Considerar cardioversión si es de inicio reciente'
      ],
      followUp: 'Holter 24 horas'
    },
    {
      id: 'test4',
      name: 'Radiografía de Tórax',
      category: 'imagen',
      date: '04/09/2024',
      status: 'anormal',
      confidence: 85,
      values: [
        { parameter: 'Cardiomegalia', result: 'Presente', reference: 'Ausente', status: 'anormal' },
        { parameter: 'Congestión pulmonar', result: 'Leve', reference: 'Ausente', status: 'anormal' },
        { parameter: 'Derrame pleural', result: 'Ausente', reference: 'Ausente', status: 'normal' }
      ],
      interpretation: 'Cardiomegalia con signos de congestión pulmonar leve. Compatible con insuficiencia cardíaca.',
      recommendations: [
        'Correlacionar con clínica',
        'Ecocardiograma para evaluar función sistólica',
        'Tratamiento diurético',
        'Control radiológico post-tratamiento'
      ],
      followUp: 'Control en 1 semana'
    },
    {
      id: 'test5',
      name: 'Perfil Lipídico',
      category: 'laboratorio',
      date: '03/09/2024',
      status: 'anormal',
      confidence: 92,
      values: [
        { parameter: 'Colesterol total', result: '245 mg/dL', reference: '<200', status: 'anormal' },
        { parameter: 'LDL', result: '165 mg/dL', reference: '<100', status: 'anormal' },
        { parameter: 'HDL', result: '35 mg/dL', reference: '>40', status: 'anormal' },
        { parameter: 'Triglicéridos', result: '220 mg/dL', reference: '<150', status: 'anormal' }
      ],
      interpretation: 'Dislipidemia mixta con riesgo cardiovascular elevado.',
      recommendations: [
        'Iniciar estatina de alta intensidad',
        'Dieta cardioprotectora',
        'Ejercicio regular',
        'Control en 6-8 semanas'
      ],
      followUp: 'Repetir en 2 meses'
    }
  ];

  const mockExamFindings = [
    {
      id: 'find1',
      system: 'cardiovascular',
      finding: 'Soplo sistólico grado III/VI',
      description: 'Soplo sistólico audible en foco mitral con irradiación a axila',
      location: 'Ápex cardíaco',
      characteristics: 'Holosistólico, intensidad III/VI',
      significance: 'importante',
      confidence: 88,
      clinicalRelevance: 'Sugiere insuficiencia mitral funcional secundaria a dilatación ventricular',
      differentialConsiderations: ['Insuficiencia mitral', 'Miocardiopatía dilatada']
    },
    {
      id: 'find2',
      system: 'respiratorio',
      finding: 'Estertores crepitantes bibasales',
      description: 'Ruidos adventicios húmedos en bases pulmonares bilaterales',
      location: 'Bases pulmonares',
      characteristics: 'Crepitantes finos, no se modifican con la tos',
      significance: 'importante',
      confidence: 92,
      clinicalRelevance: 'Indica congestión pulmonar por insuficiencia cardíaca izquierda',
      differentialConsiderations: ['Edema pulmonar', 'Neumonía', 'Fibrosis pulmonar']
    },
    {
      id: 'find3',
      system: 'cardiovascular',
      finding: 'Ingurgitación yugular',
      description: 'Distensión de venas yugulares visible con paciente a 45 grados',
      location: 'Cuello',
      characteristics: 'Visible hasta 8 cm por encima del ángulo esternal',
      significance: 'importante',
      confidence: 85,
      clinicalRelevance: 'Refleja aumento de presión venosa central por insuficiencia cardíaca derecha',
      differentialConsiderations: ['Insuficiencia cardíaca', 'Pericarditis constrictiva']
    },
    {
      id: 'find4',
      system: 'extremidades',
      finding: 'Edema con fóvea bilateral',
      description: 'Edema que deja huella a la presión en ambos tobillos',
      location: 'Tobillos y piernas',
      characteristics: 'Bilateral, simétrico, con fóvea',
      significance: 'importante',
      confidence: 95,
      clinicalRelevance: 'Signo de retención de líquidos por insuficiencia cardíaca congestiva',
      differentialConsiderations: ['Insuficiencia cardíaca', 'Insuficiencia venosa', 'Nefropatía']
    },
    {
      id: 'find5',
      system: 'cardiovascular',
      finding: 'Pulso irregular',
      description: 'Ritmo cardíaco irregularmente irregular a la palpación',
      location: 'Pulso radial',
      characteristics: 'Irregularmente irregular, frecuencia 110 lpm',
      significance: 'crítico',
      confidence: 90,
      clinicalRelevance: 'Altamente sugestivo de fibrilación auricular',
      differentialConsiderations: ['Fibrilación auricular', 'Extrasístoles múltiples']
    }
  ];

  const tabs = [
    { id: 'symptoms', name: 'Síntomas', icon: 'Activity', count: mockSymptoms?.length },
    { id: 'diagnosis', name: 'Diagnóstico', icon: 'Stethoscope', count: mockDiagnoses?.length },
    { id: 'history', name: 'Historial', icon: 'FileText', count: mockHistory?.length + mockAllergies?.length },
    { id: 'treatment', name: 'Tratamiento', icon: 'Pill', count: mockMedications?.length + mockNonPharmacological?.length },
    { id: 'tests', name: 'Estudios', icon: 'TestTube', count: mockTestResults?.length + mockExamFindings?.length }
  ];

  useEffect(() => {
    // Simulate analysis progress
    const timer = setTimeout(() => {
      setAnalysisProgress(prev => ({
        ...prev,
        symptoms: { ...prev?.symptoms, inProgress: false, completed: true }
      }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleValidation = (section, validatedItems) => {
    setValidationData(prev => ({
      ...prev,
      [section]: validatedItems
    }));

    // Update progress
    setAnalysisProgress(prev => {
      const sectionKey = section === 'medications' || section === 'treatments' ? 'treatment' :
                        section === 'tests' || section === 'findings' ? 'tests' :
                        section === 'history' || section === 'allergies' ? 'history' :
                        section === 'diagnoses' ? 'diagnosis' : section;
      
      const currentSection = prev?.[sectionKey];
      const newValidated = section === 'medications' ? validatedItems?.length :
                          section === 'treatments' ? validatedItems?.length :
                          section === 'tests' ? validatedItems?.length :
                          section === 'findings' ? validatedItems?.length :
                          section === 'history' ? validatedItems?.length :
                          section === 'allergies' ? validatedItems?.length :
                          validatedItems?.length;

      return {
        ...prev,
        [sectionKey]: {
          ...currentSection,
          validated: newValidated,
          completed: newValidated === currentSection?.total
        }
      };
    });
  };

  const handleProceedToReport = () => {
    navigate('/medical-report', { 
      state: { 
        analysisData: {
          symptoms: mockSymptoms,
          diagnoses: mockDiagnoses,
          history: mockHistory,
          allergies: mockAllergies,
          medications: mockMedications,
          treatments: mockNonPharmacological,
          testResults: mockTestResults,
          examFindings: mockExamFindings,
          validationData
        }
      }
    });
  };

  const handleBackToTranscription = () => {
    navigate('/transcription-monitor');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'symptoms':
        return (
          <SymptomAnalysis 
            symptoms={mockSymptoms}
            onValidate={handleValidation}
          />
        );
      case 'diagnosis':
        return (
          <DifferentialDiagnosis 
            diagnoses={mockDiagnoses}
            onValidate={handleValidation}
          />
        );
      case 'history':
        return (
          <MedicalHistory 
            history={mockHistory}
            allergies={mockAllergies}
            onValidate={handleValidation}
          />
        );
      case 'treatment':
        return (
          <TreatmentRecommendations 
            medications={mockMedications}
            nonPharmacological={mockNonPharmacological}
            allergies={mockAllergies}
            onValidate={handleValidation}
          />
        );
      case 'tests':
        return (
          <TestResults 
            testResults={mockTestResults}
            examFindings={mockExamFindings}
            onValidate={handleValidation}
          />
        );
      default:
        return null;
    }
  };

  const getTotalValidated = () => {
    return Object.values(analysisProgress)?.reduce((acc, section) => acc + section?.validated, 0);
  };

  const getTotalItems = () => {
    return Object.values(analysisProgress)?.reduce((acc, section) => acc + section?.total, 0);
  };

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToTranscription}
                  className="p-2 rounded-lg border border-border hover:bg-muted medical-transition"
                  title="Volver a transcripción"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    Análisis Médico
                  </h1>
                  <p className="text-muted-foreground">
                    Procesamiento inteligente de consulta médica - Paciente: María González
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Progreso total</div>
                  <div className="text-lg font-semibold text-foreground">
                    {getTotalValidated()}/{getTotalItems()} validados
                  </div>
                </div>
                <Button
                  variant="default"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={handleProceedToReport}
                  disabled={getTotalValidated() === 0}
                >
                  Generar Reporte
                </Button>
              </div>
            </div>

            {/* Progress Overview */}
            <AnalysisProgress 
              progress={analysisProgress}
              currentStep={activeTab}
              totalSteps={tabs?.length}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border medical-border rounded-lg p-4 sticky top-24">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Secciones de Análisis
                </h3>
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left medical-transition ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={tab?.icon} size={18} />
                        <span className="font-medium">{tab?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-background/20 px-2 py-1 rounded">
                          {tab?.count}
                        </span>
                        {analysisProgress?.[tab?.id]?.completed && (
                          <Icon name="CheckCircle" size={16} className="text-success" />
                        )}
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Resumen</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total elementos:</span>
                      <span className="font-medium text-foreground">{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Validados:</span>
                      <span className="font-medium text-success">{getTotalValidated()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pendientes:</span>
                      <span className="font-medium text-warning">{getTotalItems() - getTotalValidated()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-card border medical-border rounded-lg p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalAnalysis;