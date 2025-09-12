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
  const [realTimeText, setRealTimeText] = useState('');
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const transcriptionRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Mock transcription data with realistic medical consultation
  const mockTranscription = transcriptionData || [
    {
      id: 1,
      speaker: 'Doctor',
      timestamp: 0,
      duration: 18,
      text: `Buenos días, señora García. Soy el Dr. Rodríguez. Por favor, tome asiento. Veo en su expediente que viene derivada por dolor abdominal de tres días de evolución. ¿Podría contarme cómo comenzó todo?`,
      confidence: 0.97,
      medicalTerms: ['dolor abdominal', 'evolución'],
      isHighlighted: false
    },
    {
      id: 2,
      speaker: 'Paciente',
      timestamp: 18,
      duration: 25,
      text: `Buenos días, doctor. Muchas gracias por recibirme. Todo comenzó el lunes por la noche después de cenar. Sentí como una punzada muy fuerte en el lado derecho del abdomen, aquí en la fosa ilíaca derecha. El dolor es muy intenso, diría que un ocho de diez, y empeora cuando camino o toso.`,
      confidence: 0.94,
      medicalTerms: ['punzada', 'fosa ilíaca derecha', 'dolor intenso'],
      isHighlighted: false
    },
    {
      id: 3,
      speaker: 'Doctor',
      timestamp: 43,
      duration: 22,
      text: `Entiendo perfectamente. Ese tipo de dolor en fosa ilíaca derecha con esas características nos hace pensar en varias posibilidades. ¿Ha presentado náuseas, vómitos, fiebre o escalofríos? ¿Ha notado cambios en sus deposiciones o en la micción?`,
      confidence: 0.97,
        medicalTerms: ['fosa ilíaca derecha', 'náuseas', 'vómitos', 'fiebre', 'escalofríos', 'deposiciones', 'micción'],
        isHighlighted: false
      },
      {
        id: 4,
        speaker: 'Paciente',
        timestamp: 65,
        duration: 20,
        text: `Sí, doctor. He tenido náuseas desde ayer, especialmente después de intentar comer algo. No he vomitado, pero tengo la sensación constante. En cuanto a la fiebre, esta mañana me tomé la temperatura y tenía 37.8 grados. Las deposiciones han sido normales, pero orino con más frecuencia.`,
        confidence: 0.91,
        medicalTerms: ['náuseas', 'vómitos', 'fiebre', 'temperatura', 'deposiciones', 'micción'],
        isHighlighted: false
      },
      {
        id: 5,
        speaker: 'Doctor',
        timestamp: 85,
        duration: 24,
        text: `Muy bien, señora García. Esos síntomas son muy orientativos. Ahora necesito examinarla físicamente. Por favor, recuéstese en la camilla y relájese. Voy a realizar una palpación abdominal sistemática. Es importante que me diga exactamente dónde siente más molestias.`,
        confidence: 0.96,
        medicalTerms: ['examen físico', 'palpación abdominal', 'sistemática'],
        isHighlighted: false
      },
      {
        id: 6,
        speaker: 'Paciente',
        timestamp: 109,
        duration: 15,
        text: `¡Ay, doctor! Justo ahí donde está presionando. Es como si me clavaran un cuchillo. El dolor se irradia hacia la espalda también. No puedo soportarlo cuando presiona fuerte.`,
        confidence: 0.93,
        medicalTerms: ['dolor', 'irradia', 'espalda'],
        isHighlighted: false
      },
      {
        id: 7,
        speaker: 'Doctor',
        timestamp: 124,
        duration: 28,
        text: `Entiendo perfectamente. Tenemos dolor intenso en punto de McBurney, signo de Blumberg positivo y signo del psoas también positivo. La combinación de sus síntomas clínicos y estos hallazgos en el examen físico me hacen sospechar fuertemente de apendicitis aguda. Vamos a solicitar inmediatamente una analítica completa, hemograma y una tomografía computarizada abdominal.`,
        confidence: 0.98,
        medicalTerms: ['punto de McBurney', 'signo de Blumberg', 'signo del psoas', 'apendicitis aguda', 'analítica', 'hemograma', 'tomografía computarizada'],
        isHighlighted: false
      },
      {
        id: 8,
        speaker: 'Paciente',
        timestamp: 152,
        duration: 16,
        text: `¿Es grave, doctor? ¿Necesito operarme? Estoy muy preocupada porque tengo que cuidar a mis hijos pequeños. ¿Cuánto tiempo estaré en el hospital?`,
        confidence: 0.89,
        medicalTerms: [],
        isHighlighted: false
      },
      {
        id: 9,
        speaker: 'Doctor',
        timestamp: 168,
        duration: 30,
        text: `Comprendo perfectamente su preocupación, señora García. La apendicitis aguda es una condición seria pero muy tratable. Si se confirma el diagnóstico, efectivamente necesitaremos realizar una apendicectomía, que es la extirpación quirúrgica del apéndice. Es una cirugía de rutina que realizamos frecuentemente. Por laparoscopia, la recuperación es más rápida, generalmente entre 2 a 3 días de hospitalización.`,
        confidence: 0.97,
        medicalTerms: ['apendicitis aguda', 'apendicectomía', 'extirpación quirúrgica', 'apéndice', 'laparoscopia', 'hospitalización'],
        isHighlighted: false
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

  // Efecto de escritura progresiva
  const startTypingEffect = (text, onComplete) => {
    setIsTyping(true);
    setTypingText('');
    let currentIndex = 0;
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypingText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 50); // Velocidad de escritura
  };

  // Real-time transcription simulation
  useEffect(() => {
    // Find the current active segment
    const currentSegment = mockTranscription?.find(segment => 
      currentTime >= segment?.timestamp && currentTime < (segment?.timestamp + segment?.duration)
    );
    
    if (currentSegment) {
      // Calculate how much of the segment has been played
      const segmentProgress = (currentTime - currentSegment.timestamp) / currentSegment.duration;
      const words = currentSegment.text.split(' ');
      const totalWords = words.length;
      
      // Show words progressively based on time with typing effect
      const wordsToShow = Math.max(1, Math.floor(segmentProgress * totalWords) + 1);
      const partialText = words.slice(0, Math.min(wordsToShow, totalWords)).join(' ');
      
      // Start typing effect for new text
      if (partialText !== realTimeText) {
        startTypingEffect(partialText);
      }
      
      setRealTimeText(partialText);
      setCurrentSegmentIndex(currentSegment.id);
      setWordIndex(wordsToShow);
    } else {
      // No active segment
      setRealTimeText('');
      setCurrentSegmentIndex(0);
      setWordIndex(0);
      setTypingText('');
      setIsTyping(false);
    }
    
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [currentTime]);

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
    <div className="h-full space-y-medical-sm">
      {/* HIS/EHR Send Button */}
      <div className="flex justify-end">
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            iconName="Send"
            className="bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-sm"
            onClick={() => {
              // Handle HIS/EHR send functionality
              console.log('Enviando transcripción a HIS/EHR...');
            }}
          >
            Enviar a HIS/EHR
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
            Se enviará la transcripción final al sistema hospitalario
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
      
      {/* Transcription Container */}
      <div className="bg-card border medical-border rounded-medical-lg medical-shadow h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-medical-lg border-b medical-border transition-all duration-300 hover:bg-muted/20">
        <div className="flex items-center space-x-medical-sm">
          <div className="w-8 h-8 bg-secondary/10 rounded-medical flex items-center justify-center transition-all duration-300 hover:bg-secondary/20 hover:scale-110">
            <Icon name="FileText" size={16} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground transition-colors duration-300">
              Transcripción en Tiempo Real
            </h3>
            <p className="text-xs font-caption text-muted-foreground">
              Consulta médica - 04/09/2024 02:49
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-medical-sm">
          <div className="flex items-center space-x-medical-xs px-3 py-1 bg-success/10 border border-success/20 rounded-full transition-all duration-300 hover:bg-success/20">
            <div className="w-2 h-2 bg-success rounded-full medical-pulse animate-pulse" />
            <span className="text-xs font-caption text-success font-semibold">TRANSCRIBIENDO</span>
          </div>
          
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            iconName="Edit3"
            onClick={onToggleEdit}
            className="transition-all duration-300 hover:scale-105"
          >
            {isEditing ? 'Finalizar' : 'Editar'}
          </Button>
        </div>
      </div>
      {/* Transcription Content */}
      <div 
        ref={transcriptionRef}
        className="flex-1 overflow-y-auto p-medical-lg space-y-medical-base scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {mockTranscription?.map((segment, index) => (
          <div
            key={segment?.id}
            id={`segment-${segment?.id}`}
            className={`group relative p-medical-base rounded-medical-lg border transition-all duration-500 transform ${
              isCurrentSegment(segment)
                ? 'border-primary bg-primary/5 shadow-lg scale-[1.02] ring-1 ring-primary/20'
                : 'border-transparent hover:border-muted hover:bg-muted/30 hover:scale-[1.01]'
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              transform: isCurrentSegment(segment) ? 'translateX(4px)' : 'translateX(0)'
            }}
          >
            {/* Speaker and Timestamp */}
            <div className="flex items-center justify-between mb-medical-sm">
              <div className="flex items-center space-x-medical-sm">
                <div className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-caption font-medium transition-all duration-300 ${
                  segment?.speaker === 'Doctor' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
                } ${
                  isCurrentSegment(segment) ? 'ring-2 ring-primary/30 shadow-lg scale-110' : ''
                }`}>
                  {segment?.speaker === 'Doctor' ? 'Dr' : 'P'}
                  {isCurrentSegment(segment) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span className={`text-sm font-body font-medium transition-all duration-300 ${
                  isCurrentSegment(segment) ? 'text-primary font-semibold' : 'text-foreground'
                }`}>
                  {segment?.speaker}
                  {isCurrentSegment(segment) && (
                    <span className="ml-2 text-xs text-red-600 font-semibold animate-pulse">EN VIVO</span>
                  )}
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
                
                <div className={`flex items-center space-x-2 px-2 py-1 rounded text-xs font-caption transition-all duration-300 ${
                  segment?.confidence >= 0.9 ? 'bg-success/10 text-success' :
                  segment?.confidence >= 0.8 ? 'bg-accent/10 text-accent': 'bg-warning/10 text-warning'
                }`}>
                  <div className="flex items-center space-x-1">
                    {segment?.confidence >= 0.9 ? (
                      <Icon name="CheckCircle" size={12} />
                    ) : (
                      <Icon name="AlertCircle" size={12} />
                    )}
                    <span className="font-semibold">{Math.round(segment?.confidence * 100)}%</span>
                  </div>
                  <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        segment?.confidence >= 0.9 ? 'bg-success' :
                        segment?.confidence >= 0.8 ? 'bg-accent' : 'bg-warning'
                      }`}
                      style={{ width: `${segment?.confidence * 100}%` }}
                    />
                  </div>
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
              <div className="space-y-medical-sm animate-in fade-in duration-300">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e?.target?.value)}
                  className="w-full p-medical-sm border medical-border rounded-medical resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  rows={3}
                />
                <div className="flex space-x-medical-xs">
                  <Button
                    variant="default"
                    size="xs"
                    iconName="Check"
                    onClick={() => handleSaveEdit(segment?.id)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="X"
                    onClick={handleCancelEdit}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm font-body text-foreground leading-relaxed">
                {isCurrentSegment(segment) ? (
                  // Show real-time transcription for current segment with typing effect
                  <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 p-medical-sm rounded-medical border-l-4 border-primary shadow-inner">
                    {realTimeText ? (
                      <>
                        <span 
                          className="transition-all duration-300"
                          dangerouslySetInnerHTML={{
                            __html: highlightMedicalTerms(typingText || realTimeText, segment?.medicalTerms)
                          }}
                        />
                        {(isTyping || realTimeText.length < segment?.text.length) && (
                          <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-pulse shadow-sm" />
                        )}
                        {/* Efecto de ondas de sonido */}
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <div className="w-1 h-3 bg-primary/30 rounded-full animate-pulse" style={{animationDelay: '0ms'}} />
                          <div className="w-1 h-4 bg-primary/50 rounded-full animate-pulse" style={{animationDelay: '150ms'}} />
                          <div className="w-1 h-2 bg-primary/30 rounded-full animate-pulse" style={{animationDelay: '300ms'}} />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        <span className="text-muted-foreground italic">
                          [Transcribiendo...]
                        </span>
                        <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-pulse" />
                      </div>
                    )}
                  </div>
                ) : currentTime >= (segment?.timestamp + segment?.duration) ? (
                  // Show complete text for past segments with fade-in effect
                  <span 
                    className="transition-opacity duration-500 opacity-90 hover:opacity-100"
                    dangerouslySetInnerHTML={{
                      __html: highlightMedicalTerms(segment?.text, segment?.medicalTerms)
                    }}
                  />
                ) : (
                  // Show placeholder for future segments
                  <span className="text-muted-foreground italic transition-all duration-300">
                    [Esperando transcripción...]
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Footer Stats */}
      <div className="border-t medical-border p-medical-base bg-muted/20 transition-all duration-300 hover:bg-muted/30">
        <div className="grid grid-cols-4 gap-medical-sm text-center">
          <div className="transition-all duration-300 hover:scale-105">
            <span className="text-xs font-caption text-muted-foreground">Segmentos</span>
            <p className="text-sm font-body font-medium text-foreground transition-colors duration-300">{mockTranscription?.length}</p>
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <span className="text-xs font-caption text-muted-foreground">Términos Médicos</span>
            <p className="text-sm font-body font-medium text-foreground transition-colors duration-300">
              {mockTranscription?.reduce((acc, seg) => acc + (seg?.medicalTerms?.length || 0), 0)}
            </p>
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <span className="text-xs font-caption text-muted-foreground">Confianza Promedio</span>
            <p className="text-sm font-body font-medium text-foreground transition-colors duration-300">
              {Math.round(mockTranscription?.reduce((acc, seg) => acc + seg?.confidence, 0) / mockTranscription?.length * 100)}%
            </p>
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <span className="text-xs font-caption text-muted-foreground">Estado</span>
            <p className="text-sm font-body font-medium text-success transition-colors duration-300 flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>Activo</span>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;