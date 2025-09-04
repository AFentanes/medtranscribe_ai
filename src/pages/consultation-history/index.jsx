import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConsultationTable from './components/ConsultationTable';
import SearchFilters from './components/SearchFilters';
import StatisticsPanel from './components/StatisticsPanel';
import BulkActions from './components/BulkActions';

const ConsultationHistory = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    consultationType: 'all',
    status: 'all',
    validation: 'all',
    doctor: 'all',
    dateRange: { start: '', end: '' }
  });
  const [showStatistics, setShowStatistics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock consultation data
  const mockConsultations = [
    {
      id: 'CONS-2024-001',
      patientInitials: 'MG',
      patientId: 'PAT-001',
      date: '04/09/2024',
      time: '09:30',
      diagnosisSummary: 'Hipertensión arterial sistémica con control subóptimo',
      symptoms: ['Cefalea', 'Mareos', 'Fatiga'],
      status: 'completed',
      validated: true,
      doctor: 'Dr. María García',
      specialty: 'Medicina Interna',
      consultationType: 'followup',
      duration: '15 min',
      transcriptionAccuracy: 98.5
    },
    {
      id: 'CONS-2024-002',
      patientInitials: 'JR',
      patientId: 'PAT-002',
      date: '04/09/2024',
      time: '10:15',
      diagnosisSummary: 'Infección respiratoria aguda de vías superiores',
      symptoms: ['Tos seca', 'Dolor de garganta', 'Congestión nasal'],
      status: 'processing',
      validated: false,
      doctor: 'Dr. Carlos Rodríguez',
      specialty: 'Medicina General',
      consultationType: 'general',
      duration: '12 min',
      transcriptionAccuracy: 96.2
    },
    {
      id: 'CONS-2024-003',
      patientInitials: 'AM',
      patientId: 'PAT-003',
      date: '03/09/2024',
      time: '14:45',
      diagnosisSummary: 'Diabetes mellitus tipo 2 con neuropatía periférica',
      symptoms: ['Poliuria', 'Polidipsia', 'Parestesias en extremidades'],
      status: 'completed',
      validated: true,
      doctor: 'Dra. Ana Martínez',
      specialty: 'Endocrinología',
      consultationType: 'specialist',
      duration: '22 min',
      transcriptionAccuracy: 99.1
    },
    {
      id: 'CONS-2024-004',
      patientInitials: 'LL',
      patientId: 'PAT-004',
      date: '03/09/2024',
      time: '16:20',
      diagnosisSummary: 'Gastritis aguda por estrés con síndrome dispéptico',
      symptoms: ['Dolor epigástrico', 'Náuseas', 'Pirosis'],
      status: 'completed',
      validated: true,
      doctor: 'Dr. Luis López',
      specialty: 'Gastroenterología',
      consultationType: 'general',
      duration: '18 min',
      transcriptionAccuracy: 97.8
    },
    {
      id: 'CONS-2024-005',
      patientInitials: 'CR',
      patientId: 'PAT-005',
      date: '02/09/2024',
      time: '11:30',
      diagnosisSummary: 'Migraña con aura, episodio agudo',
      symptoms: ['Cefalea pulsátil', 'Fotofobia', 'Náuseas'],
      status: 'pending',
      validated: false,
      doctor: 'Dr. María García',
      specialty: 'Neurología',
      consultationType: 'emergency',
      duration: '25 min',
      transcriptionAccuracy: 94.5
    },
    {
      id: 'CONS-2024-006',
      patientInitials: 'PH',
      patientId: 'PAT-006',
      date: '02/09/2024',
      time: '13:15',
      diagnosisSummary: 'Artritis reumatoide en actividad moderada',
      symptoms: ['Dolor articular', 'Rigidez matutina', 'Inflamación'],
      status: 'completed',
      validated: true,
      doctor: 'Dr. Carlos Rodríguez',
      specialty: 'Reumatología',
      consultationType: 'followup',
      duration: '20 min',
      transcriptionAccuracy: 98.9
    },
    {
      id: 'CONS-2024-007',
      patientInitials: 'SF',
      patientId: 'PAT-007',
      date: '01/09/2024',
      time: '08:45',
      diagnosisSummary: 'Asma bronquial parcialmente controlada',
      symptoms: ['Disnea de esfuerzo', 'Tos nocturna', 'Sibilancias'],
      status: 'error',
      validated: false,
      doctor: 'Dra. Ana Martínez',
      specialty: 'Neumología',
      consultationType: 'specialist',
      duration: '16 min',
      transcriptionAccuracy: 89.3
    },
    {
      id: 'CONS-2024-008',
      patientInitials: 'MT',
      patientId: 'PAT-008',
      date: '01/09/2024',
      time: '15:00',
      diagnosisSummary: 'Síndrome de intestino irritable con predominio de diarrea',
      symptoms: ['Dolor abdominal', 'Diarrea', 'Distensión abdominal'],
      status: 'completed',
      validated: true,
      doctor: 'Dr. Luis López',
      specialty: 'Gastroenterología',
      consultationType: 'general',
      duration: '14 min',
      transcriptionAccuracy: 96.7
    }
  ];

  const [consultations, setConsultations] = useState(mockConsultations);
  const [filteredConsultations, setFilteredConsultations] = useState(mockConsultations);

  // Filter consultations based on current filters
  useEffect(() => {
    let filtered = [...consultations];

    // Search term filter
    if (filters?.searchTerm) {
      const searchLower = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(consultation =>
        consultation?.patientInitials?.toLowerCase()?.includes(searchLower) ||
        consultation?.diagnosisSummary?.toLowerCase()?.includes(searchLower) ||
        consultation?.id?.toLowerCase()?.includes(searchLower) ||
        consultation?.doctor?.toLowerCase()?.includes(searchLower)
      );
    }

    // Consultation type filter
    if (filters?.consultationType && filters?.consultationType !== 'all') {
      filtered = filtered?.filter(consultation => 
        consultation?.consultationType === filters?.consultationType
      );
    }

    // Status filter
    if (filters?.status && filters?.status !== 'all') {
      filtered = filtered?.filter(consultation => 
        consultation?.status === filters?.status
      );
    }

    // Validation filter
    if (filters?.validation && filters?.validation !== 'all') {
      if (filters?.validation === 'validated') {
        filtered = filtered?.filter(consultation => consultation?.validated);
      } else if (filters?.validation === 'pending') {
        filtered = filtered?.filter(consultation => !consultation?.validated);
      }
    }

    // Doctor filter
    if (filters?.doctor && filters?.doctor !== 'all') {
      const doctorMap = {
        'dr-garcia': 'Dr. María García',
        'dr-rodriguez': 'Dr. Carlos Rodríguez',
        'dr-martinez': 'Dra. Ana Martínez',
        'dr-lopez': 'Dr. Luis López'
      };
      const doctorName = doctorMap?.[filters?.doctor];
      if (doctorName) {
        filtered = filtered?.filter(consultation => 
          consultation?.doctor === doctorName
        );
      }
    }

    // Date range filter
    if (filters?.dateRange && (filters?.dateRange?.start || filters?.dateRange?.end)) {
      filtered = filtered?.filter(consultation => {
        const consultationDate = new Date(consultation.date.split('/').reverse().join('-'));
        const startDate = filters?.dateRange?.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters?.dateRange?.end ? new Date(filters.dateRange.end) : null;

        if (startDate && consultationDate < startDate) return false;
        if (endDate && consultationDate > endDate) return false;
        return true;
      });
    }

    setFilteredConsultations(filtered);
  }, [filters, consultations]);

  const handleViewConsultation = (consultationId) => {
    // Navigate to consultation detail view
    navigate(`/medical-report?consultation=${consultationId}`);
  };

  const handleDownloadReport = async (consultationId) => {
    setIsLoading(true);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Downloading report for consultation: ${consultationId}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReopenConsultation = (consultationId) => {
    // Navigate to transcription monitor to reopen consultation
    navigate(`/transcription-monitor?reopen=${consultationId}`);
  };

  const handleExportSelected = async (selectedIds, format) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting ${selectedIds?.length} consultations as ${format}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReports = async (selectedIds) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log(`Generating reports for ${selectedIds?.length} consultations`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateSelected = async (selectedIds) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Update consultation validation status
      setConsultations(prev => 
        prev?.map(consultation => 
          selectedIds?.includes(consultation?.id) 
            ? { ...consultation, validated: true }
            : consultation
        )
      );
      setSelectedItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSelected = async (selectedIds) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Remove selected consultations
      setConsultations(prev => 
        prev?.filter(consultation => !selectedIds?.includes(consultation?.id))
      );
      setSelectedItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      consultationType: 'all',
      status: 'all',
      validation: 'all',
      doctor: 'all',
      dateRange: { start: '', end: '' }
    });
  };

  const mockStatistics = {
    totalConsultations: 1247,
    completedConsultations: 1189,
    averageTime: 14,
    validationRate: 97.2
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-medical-3xl">
        <div className="max-w-7xl mx-auto px-medical-lg py-medical-lg">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-medical-lg">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Historial de Consultas
              </h1>
              <p className="text-lg font-body text-muted-foreground">
                Gestiona y revisa el historial completo de consultas médicas
              </p>
            </div>
            
            <div className="flex items-center space-x-medical-sm mt-medical-sm lg:mt-0">
              <Button
                variant="outline"
                iconName="BarChart3"
                iconPosition="left"
                onClick={() => setShowStatistics(!showStatistics)}
              >
                {showStatistics ? 'Ocultar' : 'Mostrar'} Estadísticas
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/audio-upload')}
              >
                Nueva Consulta
              </Button>
            </div>
          </div>

          {/* Statistics Panel */}
          {showStatistics && (
            <div className="mb-medical-lg">
              <StatisticsPanel statistics={mockStatistics} />
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-medical-lg">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Bulk Actions */}
          <div className="mb-medical-lg">
            <BulkActions
              selectedItems={selectedItems}
              onExportSelected={handleExportSelected}
              onGenerateReports={handleGenerateReports}
              onValidateSelected={handleValidateSelected}
              onDeleteSelected={handleDeleteSelected}
            />
          </div>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-medical-lg">
            <div className="flex items-center space-x-medical-sm mb-medical-sm sm:mb-0">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">
                Mostrando {filteredConsultations?.length} de {consultations?.length} consultas
              </span>
            </div>
            
            <div className="flex items-center space-x-medical-sm">
              <span className="text-sm font-body text-muted-foreground">Ordenar por:</span>
              <select className="px-3 py-1 border medical-border rounded-medical bg-input text-foreground text-sm">
                <option value="date-desc">Fecha (más reciente)</option>
                <option value="date-asc">Fecha (más antigua)</option>
                <option value="patient">Paciente</option>
                <option value="doctor">Médico</option>
                <option value="status">Estado</option>
              </select>
            </div>
          </div>

          {/* Consultation Table */}
          <div className="mb-medical-lg">
            <ConsultationTable
              consultations={filteredConsultations}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              onViewConsultation={handleViewConsultation}
              onDownloadReport={handleDownloadReport}
              onReopenConsultation={handleReopenConsultation}
            />
          </div>

          {/* Empty State */}
          {filteredConsultations?.length === 0 && (
            <div className="bg-card rounded-medical-lg medical-border p-medical-2xl text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-medical-lg">
                <Icon name="Search" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-medical-sm">
                No se encontraron consultas
              </h3>
              <p className="text-sm font-body text-muted-foreground mb-medical-lg max-w-md mx-auto">
                No hay consultas que coincidan con los filtros aplicados. 
                Intenta ajustar los criterios de búsqueda o crear una nueva consulta.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-medical-sm sm:space-y-0 sm:space-x-medical-sm">
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleClearFilters}
                >
                  Limpiar Filtros
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/audio-upload')}
                >
                  Nueva Consulta
                </Button>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal">
              <div className="bg-card rounded-medical-lg p-medical-lg flex items-center space-x-medical-sm">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-body text-foreground">Procesando...</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConsultationHistory;