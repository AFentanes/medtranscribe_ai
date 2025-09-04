import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAudioRecorder = ({ 
  onRecordingComplete, 
  onTranscriptionUpdate, 
  isRecording, 
  onRecordingStateChange 
}) => {
  const [recordingStatus, setRecordingStatus] = useState('idle'); // idle, recording, paused, stopped
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const durationIntervalRef = useRef(null);
  const levelIntervalRef = useRef(null);
  const transcriptionIntervalRef = useRef(null);

  // Request microphone permission on component mount
  useEffect(() => {
    requestMicrophonePermission();
    return () => {
      cleanupResources();
    };
  }, []);

  // Duration timer
  useEffect(() => {
    if (recordingStatus === 'recording') {
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (durationIntervalRef?.current) {
        clearInterval(durationIntervalRef?.current);
      }
    }

    return () => {
      if (durationIntervalRef?.current) {
        clearInterval(durationIntervalRef?.current);
      }
    };
  }, [recordingStatus]);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator?.mediaDevices?.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      setPermissionGranted(true);
      setupAudioAnalysis(stream);
      streamRef.current = stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setPermissionGranted(false);
    }
  };

  const setupAudioAnalysis = (stream) => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef?.current?.createAnalyser();
      const source = audioContextRef?.current?.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      source?.connect(analyserRef?.current);
      
      startAudioLevelMonitoring();
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
    }
  };

  const startAudioLevelMonitoring = () => {
    const dataArray = new Uint8Array(analyserRef.current?.frequencyBinCount || 128);
    
    const updateLevel = () => {
      if (analyserRef?.current && recordingStatus === 'recording') {
        analyserRef?.current?.getByteFrequencyData(dataArray);
        const average = dataArray?.reduce((a, b) => a + b, 0) / dataArray?.length;
        setAudioLevel(Math.min(100, (average / 255) * 100));
      }
      
      if (recordingStatus === 'recording') {
        requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  const startRecording = async () => {
    if (!permissionGranted || !streamRef?.current) {
      await requestMicrophonePermission();
      if (!permissionGranted) return;
    }

    try {
      const chunks = [];
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event?.data?.size > 0) {
          chunks?.push(event?.data);
          setRecordedChunks(prev => [...prev, event?.data]);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        onRecordingComplete?.(audioBlob);
      };

      mediaRecorderRef?.current?.start(1000); // Collect data every second
      setRecordingStatus('recording');
      setRecordingDuration(0);
      setRecordedChunks([]);
      onRecordingStateChange?.('recording');
      
      // Start real-time transcription simulation
      startRealTimeTranscription();
      startAudioLevelMonitoring();
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef?.current && recordingStatus === 'recording') {
      mediaRecorderRef?.current?.pause();
      setRecordingStatus('paused');
      onRecordingStateChange?.('paused');
      
      if (transcriptionIntervalRef?.current) {
        clearInterval(transcriptionIntervalRef?.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef?.current && recordingStatus === 'paused') {
      mediaRecorderRef?.current?.resume();
      setRecordingStatus('recording');
      onRecordingStateChange?.('recording');
      
      startRealTimeTranscription();
      startAudioLevelMonitoring();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current) {
      mediaRecorderRef?.current?.stop();
      setRecordingStatus('stopped');
      onRecordingStateChange?.('stopped');
      
      if (transcriptionIntervalRef?.current) {
        clearInterval(transcriptionIntervalRef?.current);
      }
    }
  };

  const startRealTimeTranscription = () => {
    // Simulate real-time transcription
    const phrases = [
      'El paciente refiere dolor abdominal...',
      'Síntomas iniciaron hace aproximadamente 3 días...',
      'Dolor localizado en epigastrio...',
      'Intensidad del dolor: 7/10...',
      'No presenta fiebre ni vómitos...',
      'Antecedentes de gastritis...',
      'Tratamiento actual con omeprazol...',
      'Exploración física: abdomen blando...',
      'Ruidos intestinales presentes...',
      'Recomiendo estudios complementarios...'
    ];

    let phraseIndex = 0;
    transcriptionIntervalRef.current = setInterval(() => {
      if (phraseIndex < phrases?.length && recordingStatus === 'recording') {
        const newPhrase = phrases?.[phraseIndex];
        setTranscriptionText(prev => prev + (prev ? ' ' : '') + newPhrase);
        onTranscriptionUpdate?.(transcriptionText + ' ' + newPhrase);
        phraseIndex++;
      }
    }, 3000);
  };

  const cleanupResources = () => {
    if (durationIntervalRef?.current) {
      clearInterval(durationIntervalRef?.current);
    }
    if (transcriptionIntervalRef?.current) {
      clearInterval(transcriptionIntervalRef?.current);
    }
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
    }
    if (audioContextRef?.current) {
      audioContextRef?.current?.close();
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getRecordingStatusColor = () => {
    switch (recordingStatus) {
      case 'recording': return 'text-red-500';
      case 'paused': return 'text-yellow-500';
      case 'stopped': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRecordingStatusText = () => {
    switch (recordingStatus) {
      case 'recording': return 'Grabando...';
      case 'paused': return 'Pausado';
      case 'stopped': return 'Grabación completada';
      default: return 'Listo para grabar';
    }
  };

  if (!permissionGranted) {
    return (
      <div className="w-full">
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-medical-lg p-medical-2xl text-center">
          <div className="flex flex-col items-center space-y-medical-lg">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <Icon name="MicOff" size={32} className="text-red-500" />
            </div>
            
            <div className="space-y-medical-sm">
              <h3 className="text-xl font-heading font-semibold text-foreground">
                Permisos de micrófono requeridos
              </h3>
              <p className="text-muted-foreground font-body">
                Necesitamos acceso a tu micrófono para realizar la grabación en vivo
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={requestMicrophonePermission}
              iconName="Mic"
              iconPosition="left"
            >
              Permitir acceso al micrófono
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-medical-lg">
      {/* Recording Controls */}
      <div className="border-2 border-dashed border-muted-foreground/30 rounded-medical-lg p-medical-2xl">
        <div className="flex flex-col items-center space-y-medical-lg">
          {/* Status Indicator */}
          <div className="flex items-center space-x-medical-sm">
            <div className={`w-3 h-3 rounded-full ${
              recordingStatus === 'recording' ?'bg-red-500 animate-pulse' 
                : recordingStatus === 'paused' ?'bg-yellow-500'
                : recordingStatus === 'stopped' ?'bg-green-500' :'bg-gray-400'
            }`} />
            <span className={`font-medium ${getRecordingStatusColor()}`}>
              {getRecordingStatusText()}
            </span>
            {recordingDuration > 0 && (
              <span className="text-muted-foreground">
                - {formatDuration(recordingDuration)}
              </span>
            )}
          </div>

          {/* Audio Level Meter */}
          {recordingStatus === 'recording' && (
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-muted-foreground mb-medical-xs">
                <span>Nivel de audio</span>
                <span>{Math.round(audioLevel)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-100 ${
                    audioLevel > 80 ? 'bg-red-500' : 
                    audioLevel > 50 ? 'bg-yellow-500': 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(audioLevel, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex items-center space-x-medical-sm">
            {recordingStatus === 'idle' && (
              <Button
                variant="default"
                onClick={startRecording}
                iconName="Mic"
                iconPosition="left"
                className="bg-red-500 hover:bg-red-600"
              >
                Iniciar grabación
              </Button>
            )}
            
            {recordingStatus === 'recording' && (
              <>
                <Button
                  variant="outline"
                  onClick={pauseRecording}
                  iconName="Pause"
                  iconPosition="left"
                >
                  Pausar
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                  iconName="Square"
                  iconPosition="left"
                >
                  Detener
                </Button>
              </>
            )}
            
            {recordingStatus === 'paused' && (
              <>
                <Button
                  variant="default"
                  onClick={resumeRecording}
                  iconName="Play"
                  iconPosition="left"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Continuar
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                  iconName="Square"
                  iconPosition="left"
                >
                  Detener
                </Button>
              </>
            )}
            
            {recordingStatus === 'stopped' && (
              <Button
                variant="outline"
                onClick={() => {
                  setRecordingStatus('idle');
                  setRecordingDuration(0);
                  setTranscriptionText('');
                  onRecordingStateChange?.('idle');
                }}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Nueva grabación
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Transcription */}
      {transcriptionText && (
        <div className="bg-card rounded-medical-lg p-medical-lg medical-border">
          <div className="flex items-center space-x-medical-sm mb-medical-sm">
            <Icon name="FileText" size={20} className="text-primary" />
            <h4 className="font-heading font-semibold text-foreground">
              Transcripción en tiempo real
            </h4>
          </div>
          
          <div className="bg-muted/50 rounded-medical-sm p-medical-sm max-h-32 overflow-y-auto">
            <p className="text-sm text-foreground font-body leading-relaxed">
              {transcriptionText}
              {recordingStatus === 'recording' && (
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
              )}
            </p>
          </div>
          
          {recordingStatus === 'recording' && (
            <p className="text-xs text-muted-foreground mt-medical-xs">
              La transcripción se actualiza automáticamente durante la grabación
            </p>
          )}
        </div>
      )}

      {/* Recording Tips */}
      <div className="bg-muted/30 rounded-medical-lg p-medical-lg">
        <div className="flex items-center space-x-medical-sm mb-medical-sm">
          <Icon name="Lightbulb" size={16} className="text-amber-500" />
          <h5 className="font-body font-medium text-foreground text-sm">
            Consejos para una mejor grabación
          </h5>
        </div>
        
        <ul className="space-y-medical-xs text-xs text-muted-foreground">
          <li className="flex items-center space-x-medical-xs">
            <Icon name="Check" size={12} className="text-green-500" />
            <span>Mantén el micrófono a 15-20cm de distancia</span>
          </li>
          <li className="flex items-center space-x-medical-xs">
            <Icon name="Check" size={12} className="text-green-500" />
            <span>Habla claramente y a velocidad normal</span>
          </li>
          <li className="flex items-center space-x-medical-xs">
            <Icon name="Check" size={12} className="text-green-500" />
            <span>Evita ruidos de fondo y interrupciones</span>
          </li>
          <li className="flex items-center space-x-medical-xs">
            <Icon name="Check" size={12} className="text-green-500" />
            <span>El nivel de audio debe estar en verde o amarillo</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LiveAudioRecorder;