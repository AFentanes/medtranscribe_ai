import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TranscriptionDisplay = ({ 
  transcriptionData, 
  currentTime, 
  onTextEdit, 
  isEditing, 
  onToggleEdit 
}) => {
  const [editingSegment, setEditingSegment] = useState(null);
  const [editText, setEditText] = useState('');
  const transcriptionRef = useRef(null);

  // Mock transcription data with medical terminology
  const mockTranscription = transcriptionData || [
    {
      id: 1,
      speaker: 'Doctor',
      timestamp: 0,
      duration: 15,
      text: `Buenos días, señora Martínez. ¿Cómo se encuentra hoy? Veo en su expediente que viene por dolor abdominal.`,
      confidence: 0.95,
      medicalTerms: ['dolor abdominal'],
      isHighlighted: false
    },
    {
      id: 2,
      speaker: 'Paciente',
      timestamp: 15,
      duration: 20,
      text: `Buenos días, doctor. Sí, desde hace tres días tengo un dolor muy fuerte en el lado derecho del abdomen, especialmente cuando toso o me muevo.`,
      confidence: 0.92,
      medicalTerms: ['dolor', 'abdomen'],
      isHighlighted: false
    },
    {
      id: 3,
      speaker: 'Doctor',
      timestamp: 35,
      duration: 25,
      text: `Entiendo. ¿El dolor es constante o intermitente? ¿Ha presentado náuseas, vómitos o fiebre? También necesito saber si ha tenido cambios en sus hábitos intestinales.`,
      confidence: 0.97,
      medicalTerms: ['dolor', 'náuseas', 'vómitos', 'fiebre', 'hábitos intestinales'],
      isHighlighted: false
    },
    {
      id: 4,
      speaker: 'Paciente',
      timestamp: 60,
      duration: 18,
      text: `El dolor es constante, pero empeora cuando me muevo. Sí, he tenido náuseas desde ayer y un poco de fiebre. No he podido evacuar bien desde que empezó el dolor.`,
      confidence: 0.89,
      medicalTerms: ['dolor', 'náuseas', 'fiebre'],
      isHighlighted: false,
      hasNoise: true
    },
    {
      id: 5,
      speaker: 'Doctor',
      timestamp: 78,
      duration: 30,
      text: `Muy bien. Ahora voy a examinarla. Por favor, recuéstese en la camilla. Voy a palpar su abdomen para evaluar la sensibilidad y detectar cualquier masa o inflamación.`,
      confidence: 0.94,
      medicalTerms: ['examinar', 'palpar', 'abdomen', 'sensibilidad', 'masa', 'inflamación'],
      isHighlighted: false
    },
    {
      id: 6,
      speaker: 'Doctor',
      timestamp: 108,
      duration: 22,
      text: `[INAUDIBLE] ...presenta dolor a la palpación en fosa ilíaca derecha, compatible con apendicitis aguda. Vamos a solicitar análisis de sangre y ultrasonido abdominal.`,
      confidence: 0.76,
      medicalTerms: ['palpación', 'fosa ilíaca derecha', 'apendicitis aguda', 'análisis de sangre', 'ultrasonido abdominal'],
      isHighlighted: false,
      hasInaudible: true
    }
  ];

  const formatTimestamp = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleEditSegment = (segment) => {
    setEditingSegment(segment?.id);
    setEditText(segment?.text);
  };

  const handleSaveEdit = (segmentId) => {
    onTextEdit(segmentId, editText);
    setEditingSegment(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingSegment(null);
    setEditText('');
  };

  const highlightMedicalTerms = (text, medicalTerms) => {
    if (!medicalTerms || medicalTerms?.length === 0) return text;
    
    let highlightedText = text;
    medicalTerms?.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText?.replace(regex, '<mark class="bg-accent/20 text-accent-foreground px-1 rounded">$1</mark>');
    });
    
    return highlightedText;
  };

  const isCurrentSegment = (segment) => {
    return currentTime >= segment?.timestamp && currentTime < (segment?.timestamp + segment?.duration);
  };

  useEffect(() => {
    // Auto-scroll to current segment
    const currentSegment = mockTranscription?.find(segment => isCurrentSegment(segment));
    if (currentSegment && transcriptionRef?.current) {
      const segmentElement = document.getElementById(`segment-${currentSegment?.id}`);
      if (segmentElement) {
        segmentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime]);

  return (
    <div className="bg-card border medical-border rounded-medical-lg medical-shadow h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-medical-lg border-b medical-border">
        <div className="flex items-center space-x-medical-sm">
          <div className="w-8 h-8 bg-secondary/10 rounded-medical flex items-center justify-center">
            <Icon name="FileText" size={16} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground">
              Transcripción en Tiempo Real
            </h3>
            <p className="text-xs font-caption text-muted-foreground">
              Consulta médica - 04/09/2024 02:49
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-medical-sm">
          <div className="flex items-center space-x-medical-xs">
            <div className="w-2 h-2 bg-success rounded-full medical-pulse" />
            <span className="text-xs font-caption text-success">Transcribiendo</span>
          </div>
          
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            iconName="Edit3"
            onClick={onToggleEdit}
          >
            {isEditing ? 'Finalizar' : 'Editar'}
          </Button>
        </div>
      </div>
      {/* Transcription Content */}
      <div 
        ref={transcriptionRef}
        className="flex-1 overflow-y-auto p-medical-lg space-y-medical-base"
      >
        {mockTranscription?.map((segment) => (
          <div
            key={segment?.id}
            id={`segment-${segment?.id}`}
            className={`group relative p-medical-base rounded-medical-lg border transition-all duration-200 ${
              isCurrentSegment(segment)
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-transparent hover:border-muted hover:bg-muted/30'
            }`}
          >
            {/* Speaker and Timestamp */}
            <div className="flex items-center justify-between mb-medical-sm">
              <div className="flex items-center space-x-medical-sm">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-caption font-medium ${
                  segment?.speaker === 'Doctor' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
                }`}>
                  {segment?.speaker === 'Doctor' ? 'Dr' : 'P'}
                </div>
                <span className="text-sm font-body font-medium text-foreground">
                  {segment?.speaker}
                </span>
                <span className="text-xs font-caption text-muted-foreground">
                  {formatTimestamp(segment?.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center space-x-medical-xs">
                {/* Quality Indicators */}
                {segment?.hasInaudible && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 rounded text-warning">
                    <Icon name="AlertTriangle" size={12} />
                    <span className="text-xs font-caption">Inaudible</span>
                  </div>
                )}
                
                {segment?.hasNoise && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 rounded text-accent">
                    <Icon name="Volume1" size={12} />
                    <span className="text-xs font-caption">Ruido</span>
                  </div>
                )}
                
                <div className={`px-2 py-1 rounded text-xs font-caption ${
                  segment?.confidence >= 0.9 ? 'bg-success/10 text-success' :
                  segment?.confidence >= 0.8 ? 'bg-accent/10 text-accent': 'bg-warning/10 text-warning'
                }`}>
                  {Math.round(segment?.confidence * 100)}%
                </div>
                
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Edit2"
                    onClick={() => handleEditSegment(segment)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            </div>

            {/* Text Content */}
            {editingSegment === segment?.id ? (
              <div className="space-y-medical-sm">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e?.target?.value)}
                  className="w-full p-medical-sm border medical-border rounded-medical resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
                <div className="flex space-x-medical-xs">
                  <Button
                    variant="default"
                    size="xs"
                    iconName="Check"
                    onClick={() => handleSaveEdit(segment?.id)}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="X"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="text-sm font-body text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: highlightMedicalTerms(segment?.text, segment?.medicalTerms)
                }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Footer Stats */}
      <div className="border-t medical-border p-medical-base">
        <div className="grid grid-cols-4 gap-medical-sm text-center">
          <div>
            <span className="text-xs font-caption text-muted-foreground">Segmentos</span>
            <p className="text-sm font-body font-medium text-foreground">{mockTranscription?.length}</p>
          </div>
          <div>
            <span className="text-xs font-caption text-muted-foreground">Términos Médicos</span>
            <p className="text-sm font-body font-medium text-foreground">
              {mockTranscription?.reduce((acc, seg) => acc + (seg?.medicalTerms?.length || 0), 0)}
            </p>
          </div>
          <div>
            <span className="text-xs font-caption text-muted-foreground">Confianza Promedio</span>
            <p className="text-sm font-body font-medium text-foreground">
              {Math.round(mockTranscription?.reduce((acc, seg) => acc + seg?.confidence, 0) / mockTranscription?.length * 100)}%
            </p>
          </div>
          <div>
            <span className="text-xs font-caption text-muted-foreground">Estado</span>
            <p className="text-sm font-body font-medium text-success">Activo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;