import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AudioUploadZone from './components/AudioUploadZone';
import LiveAudioRecorder from './components/LiveAudioRecorder';
import ConsultationMetadataForm from './components/ConsultationMetadataForm';
import AudioPreviewPlayer from './components/AudioPreviewPlayer';
import ProcessingStatusPanel from './components/ProcessingStatusPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AudioUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('waiting');
  const [qualityAssessment, setQualityAssessment] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  
  // New states for live recording
  const [inputMode, setInputMode] = useState('upload'); // 'upload' or 'live'
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [liveTranscription, setLiveTranscription] = useState('');
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);

  const [metadata, setMetadata] = useState({
    patientAge: '',
    patientGender: '',
    consultationDate: '',
    consultationType: '',
    patientId: '',
    estimatedDuration: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set current date as default
    const today = new Date()?.toISOString()?.split('T')?.[0];
    setMetadata(prev => ({
      ...prev,
      consultationDate: today
    }));
  }, []);

  // Handle file upload
  const handleFileSelect = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setSelectedFile(file);
          setProcessingStatus('ready');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Handle live recording completion
  const handleRecordingComplete = (audioBlob) => {
    setRecordedAudioBlob(audioBlob);
    
    // Create a File object from the blob
    const recordedFile = new File([audioBlob], 'recorded_consultation.webm', {
      type: 'audio/webm'
    });
    
    setSelectedFile(recordedFile);
    setProcessingStatus('ready');
    
    // Auto-assess quality for recorded audio
    setTimeout(() => {
      handleQualityAssessment({
        overall: 'good',
        clarity: 85,
        volume: 80,
        background_noise: 15,
        recommendations: ['Audio quality is good for transcription']
      });
    }, 1000);
  };

  // Handle real-time transcription updates
  const handleTranscriptionUpdate = (text) => {
    setLiveTranscription(text);
  };

  // Handle recording state changes
  const handleRecordingStateChange = (status) => {
    setRecordingStatus(status);
    if (status === 'recording') {
      setProcessingStatus('recording');
    } else if (status === 'stopped') {
      setProcessingStatus('ready');
    }
  };

  const handleQualityAssessment = (assessment) => {
    setQualityAssessment(assessment);
    
    // Calculate estimated processing time
    let fileSizeMB;
    if (selectedFile) {
      fileSizeMB = selectedFile?.size / (1024 * 1024);
    } else if (recordedAudioBlob) {
      fileSizeMB = recordedAudioBlob?.size / (1024 * 1024);
    }
    
    if (fileSizeMB) {
      const estimatedMinutes = Math.ceil(fileSizeMB * 0.5); // Mock calculation
      setEstimatedTime(`${estimatedMinutes}-${estimatedMinutes + 2} minutos`);
    }
  };

  const validateMetadata = () => {
    const newErrors = {};

    if (!metadata?.patientAge || metadata?.patientAge < 0 || metadata?.patientAge > 120) {
      newErrors.patientAge = 'Edad requerida (0-120 años)';
    }

    if (!metadata?.patientGender) {
      newErrors.patientGender = 'Género requerido';
    }

    if (!metadata?.consultationDate) {
      newErrors.consultationDate = 'Fecha de consulta requerida';
    }

    if (!metadata?.consultationType) {
      newErrors.consultationType = 'Tipo de consulta requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleStartTranscription = () => {
    if (!validateMetadata()) {
      return;
    }

    setProcessingStatus('processing');
    
    // Simulate processing
    setTimeout(() => {
      setProcessingStatus('completed');
      
      // Navigate to transcription monitor after a brief delay
      setTimeout(() => {
        navigate('/transcription-monitor', {
          state: {
            audioFile: selectedFile,
            metadata: metadata,
            qualityAssessment: qualityAssessment,
            inputMode: inputMode,
            liveTranscription: inputMode === 'live' ? liveTranscription : null,
            recordedBlob: recordedAudioBlob
          }
        });
      }, 1500);
    }, 3000);
  };

  const handleCancel = () => {
    setProcessingStatus('ready');
  };

  const handleReset = () => {
    setSelectedFile(null);
    setRecordedAudioBlob(null);
    setUploadProgress(null);
    setIsUploading(false);
    setProcessingStatus('waiting');
    setQualityAssessment(null);
    setEstimatedTime(null);
    setErrors({});
    setRecordingStatus('idle');
    setLiveTranscription('');
    setInputMode('upload');
  };

  const handleModeSwitch = (mode) => {
    if (mode !== inputMode) {
      // Reset current state when switching modes
      setSelectedFile(null);
      setRecordedAudioBlob(null);
      setUploadProgress(null);
      setIsUploading(false);
      setProcessingStatus('waiting');
      setQualityAssessment(null);
      setEstimatedTime(null);
      setRecordingStatus('idle');
      setLiveTranscription('');
      setInputMode(mode);
    }
  };

  const isReadyToProcess = {
    audioFile: !!(selectedFile || recordedAudioBlob),
    metadata: metadata?.patientAge && metadata?.patientGender && metadata?.consultationDate && metadata?.consultationType,
    quality: !!qualityAssessment
  };

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Header />
      
      <main className="pt-medical-3xl">
        <div className="max-w-7xl mx-auto px-medical-lg py-medical-2xl">
          {/* Page Header */}
          <div className="mb-medical-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-medical-sm">
                  Nueva consulta médica
                </h1>
                <p className="text-lg text-muted-foreground">
                  {inputMode === 'upload' ?'Sube el archivo de audio de la consulta para iniciar la transcripción automática' :'Graba la consulta en vivo con transcripción en tiempo real'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-medical-sm">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Volver al dashboard
                </Button>
                
                {(selectedFile || recordedAudioBlob) && (
                  <Button
                    variant="ghost"
                    onClick={handleReset}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Reiniciar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Input Mode Selector */}
          <div className="mb-medical-2xl">
            <div className="flex items-center justify-center">
              <div className="bg-card rounded-medical-lg p-medical-xs medical-border">
                <div className="flex items-center space-x-medical-xs">
                  <Button
                    variant={inputMode === 'upload' ? 'default' : 'ghost'}
                    onClick={() => handleModeSwitch('upload')}
                    iconName="Upload"
                    iconPosition="left"
                    size="sm"
                  >
                    Subir archivo
                  </Button>
                  <Button
                    variant={inputMode === 'live' ? 'default' : 'ghost'}
                    onClick={() => handleModeSwitch('live')}
                    iconName="Mic"
                    iconPosition="left"
                    size="sm"
                  >
                    Grabación en vivo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-medical-2xl">
            {/* Left Column - Upload/Recording and Metadata */}
            <div className="lg:col-span-2 space-y-medical-2xl">
              {/* Audio Input Zone */}
              {inputMode === 'upload' ? (
                <AudioUploadZone
                  onFileSelect={handleFileSelect}
                  uploadProgress={uploadProgress}
                  isUploading={isUploading}
                />
              ) : (
                <LiveAudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  onTranscriptionUpdate={handleTranscriptionUpdate}
                  isRecording={recordingStatus === 'recording'}
                  onRecordingStateChange={handleRecordingStateChange}
                />
              )}

              {/* Metadata Form */}
              <ConsultationMetadataForm
                metadata={metadata}
                onMetadataChange={setMetadata}
                errors={errors}
              />

              {/* Audio Preview */}
              {selectedFile && (
                <AudioPreviewPlayer
                  audioFile={selectedFile}
                  onQualityAssessment={handleQualityAssessment}
                />
              )}
            </div>

            {/* Right Column - Processing Status */}
            <div className="space-y-medical-lg">
              <ProcessingStatusPanel
                processingStatus={processingStatus}
                estimatedTime={estimatedTime}
                onStartTranscription={handleStartTranscription}
                onCancel={handleCancel}
                isReadyToProcess={isReadyToProcess}
              />

              {/* Live Transcription Preview */}
              {inputMode === 'live' && liveTranscription && (
                <div className="bg-card rounded-medical-lg p-medical-lg medical-border">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-medical-lg">
                    Vista previa de transcripción
                  </h3>
                  <div className="bg-muted/50 rounded-medical-sm p-medical-sm max-h-40 overflow-y-auto">
                    <p className="text-sm text-foreground font-body leading-relaxed">
                      {liveTranscription}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-medical-sm">
                    Transcripción en tiempo real - se procesará completamente al finalizar
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-card rounded-medical-lg p-medical-lg medical-border">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-medical-lg">
                  Acciones rápidas
                </h3>
                
                <div className="space-y-medical-sm">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/consultation-history')}
                    iconName="History"
                    iconPosition="left"
                    fullWidth
                  >
                    Ver historial
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    iconName="LayoutDashboard"
                    iconPosition="left"
                    fullWidth
                  >
                    Dashboard
                  </Button>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-muted/50 rounded-medical-lg p-medical-lg">
                <div className="flex items-center space-x-medical-sm mb-medical-sm">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h4 className="font-body font-medium text-foreground">
                    {inputMode === 'upload' ?'Consejos para mejor transcripción' :'Consejos para grabación en vivo'
                    }
                  </h4>
                </div>
                
                <ul className="space-y-medical-xs text-sm text-muted-foreground">
                  {inputMode === 'upload' ? (
                    <>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Use audio de alta calidad (mínimo 44.1kHz)</span>
                      </li>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Evite ruido de fondo excesivo</span>
                      </li>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Hable claramente y a velocidad normal</span>
                      </li>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Complete todos los metadatos requeridos</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Permita acceso al micrófono cuando se solicite</span>
                      </li>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Use audífonos para evitar retroalimentación</span>
                      </li>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>Mantenga el nivel de audio en verde/amarillo</span>
                      </li>
                      <li className="flex items-start space-x-medical-xs">
                        <Icon name="Check" size={14} className="text-success mt-0.5" />
                        <span>La transcripción se actualiza automáticamente</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AudioUpload;