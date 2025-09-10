import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AudioControls from './components/AudioControls';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import ProcessingStatus from './components/ProcessingStatus';
import NavigationActions from './components/NavigationActions';

import Button from '../../components/ui/Button';

const TranscriptionMonitor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Audio state
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Mock 3-minute consultation
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  
  // Transcription state
  const [transcriptionData, setTranscriptionData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(85);
  const [isTranscriptionComplete, setIsTranscriptionComplete] = useState(false);
  
  // WebSocket simulation
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const intervalRef = useRef(null);

  // Initialize with mock data from navigation state
  useEffect(() => {
    const uploadedFile = location?.state?.audioFile;
    if (uploadedFile) {
      setAudioFile(uploadedFile);
    } else {
      // Mock file if none provided
      setAudioFile({
        name: 'consulta_medica_20240904.wav',
        size: 15728640, // ~15MB
        type: 'audio/wav',
        duration: 180
      });
    }

    // Simulate real-time processing progress
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          setIsTranscriptionComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + Math.random() * 2, 100);
      });
    }, 2000);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [location?.state]);

  // Audio playback simulation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + playbackSpeed;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
    }

    return () => {
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
    };
  }, [isPlaying, playbackSpeed, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    setCurrentTime(Math.max(0, Math.min(time, duration)));
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleTextEdit = (segmentId, newText) => {
    // Handle transcription text editing
    console.log('Editing segment:', segmentId, 'New text:', newText);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleRetryProcessing = () => {
    setProcessingProgress(0);
    setIsTranscriptionComplete(false);
    // Restart processing simulation
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          setIsTranscriptionComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + Math.random() * 3, 100);
      });
    }, 1500);
  };

  const handleExportTranscription = () => {
    // Mock export functionality
    const transcriptionText = `TRANSCRIPCIÓN MÉDICA\n\nFecha: 04/09/2024 02:49\nArchivo: ${audioFile?.name}\n\n[Contenido de la transcripción...]`;
    
    const blob = new Blob([transcriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcripcion_${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveTranscription = () => {
    // Mock save functionality
    console.log('Saving transcription...');
    // Show success message or navigate
  };

  const handleNavigateToAnalysis = () => {
    if (processingProgress >= 85) {
      navigate('/medical-analysis', {
        state: {
          transcriptionData,
          audioFile,
          processingComplete: isTranscriptionComplete
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Header />
      
      <main className="pt-medical-3xl">
        <div className="max-w-7xl mx-auto px-medical-lg py-medical-xl">
          {/* Page Header */}
          <div className="mb-medical-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-medical-base">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowLeft"
                  onClick={() => navigate('/audio-upload')}
                  className="mr-medical-sm"
                />
                
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Monitor de Transcripción
                  </h1>
                  <p className="text-sm font-body text-muted-foreground mt-1">
                    Procesamiento en tiempo real de consulta médica
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-medical-sm">
                <div className={`flex items-center space-x-medical-xs px-medical-sm py-medical-xs rounded-medical ${
                  connectionStatus === 'connected' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-success medical-pulse' : 'bg-error'
                  }`} />
                  <span className="text-xs font-caption font-medium">
                    {connectionStatus === 'connected' ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  onClick={() => {/* Open settings */}}
                />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-medical-lg">
            {/* Left Column - Audio Controls & Navigation */}
            <div className="lg:col-span-1 space-y-medical-lg">
              <AudioControls
                audioFile={audioFile}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                playbackSpeed={playbackSpeed}
                onPlayPause={handlePlayPause}
                onSeek={handleSeek}
                onSpeedChange={handleSpeedChange}
                onTimeUpdate={setCurrentTime}
              />
              
              <NavigationActions
                transcriptionComplete={isTranscriptionComplete}
                processingProgress={processingProgress}
                onSaveTranscription={handleSaveTranscription}
              />
            </div>

            {/* Center Column - Transcription Display */}
            <div className="lg:col-span-1">
              <div className="h-[600px]">
                <TranscriptionDisplay
                  transcriptionData={transcriptionData}
                  currentTime={currentTime}
                  onTextEdit={handleTextEdit}
                  isEditing={isEditing}
                  onToggleEdit={handleToggleEdit}
                />
              </div>
            </div>

            {/* Right Column - Processing Status */}
            <div className="lg:col-span-1">
              <ProcessingStatus
                processingData={{
                  overallProgress: processingProgress,
                  currentStage: processingProgress < 100 ? 'medical_analysis' : 'completed'
                }}
                onRetryProcessing={handleRetryProcessing}
                onExportTranscription={handleExportTranscription}
              />
            </div>
          </div>

          {/* Mobile Action Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t medical-border p-medical-base">
            <div className="flex space-x-medical-sm">
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                onClick={handleSaveTranscription}
                disabled={processingProgress < 50}
                className="flex-1"
              >
                Guardar
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Stethoscope"
                onClick={handleNavigateToAnalysis}
                disabled={processingProgress < 85}
                className="flex-1"
              >
                Análisis
              </Button>
            </div>
          </div>

          {/* Progress Indicator for Mobile */}
          <div className="lg:hidden fixed top-medical-3xl left-0 right-0 bg-card border-b medical-border px-medical-base py-medical-xs">
            <div className="flex items-center justify-between text-xs font-caption">
              <span className="text-muted-foreground">Progreso:</span>
              <span className="text-secondary font-medium">{Math.round(processingProgress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1 mt-1">
              <div
                className="bg-secondary h-1 rounded-full transition-all duration-500"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranscriptionMonitor;