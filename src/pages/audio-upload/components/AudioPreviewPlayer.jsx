import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPreviewPlayer = ({ audioFile, onQualityAssessment }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [qualityMetrics, setQualityMetrics] = useState(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      audioRef.current.src = url;
      
      // Initialize audio analysis
      initializeAudioAnalysis();

      return () => {
        URL.revokeObjectURL(url);
        if (audioContextRef?.current) {
          audioContextRef?.current?.close();
        }
      };
    }
  }, [audioFile]);

  const initializeAudioAnalysis = async () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext?.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      // Mock quality assessment for demo
      setTimeout(() => {
        const mockMetrics = {
          quality: 'Buena',
          noiseLevel: 'Bajo',
          speakerCount: 2,
          clarity: 85,
          recommendations: [
            'Audio claro detectado',
            'Dos hablantes identificados',
            'Nivel de ruido aceptable'
          ]
        };
        setQualityMetrics(mockMetrics);
        onQualityAssessment(mockMetrics);
      }, 2000);
    } catch (error) {
      console.error('Error initializing audio analysis:', error);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef?.current?.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef?.current?.duration);
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const getFileSizeFormatted = () => {
    const sizeInMB = (audioFile?.size / (1024 * 1024))?.toFixed(2);
    return `${sizeInMB} MB`;
  };

  if (!audioFile) return null;

  return (
    <div className="bg-card rounded-medical-lg p-medical-lg medical-border">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-medical-lg">
        Vista previa del audio
      </h3>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      <div className="space-y-medical-lg">
        {/* File Info */}
        <div className="flex items-center justify-between p-medical-sm bg-muted rounded-medical">
          <div className="flex items-center space-x-medical-sm">
            <Icon name="Music" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-body font-medium text-foreground">
                {audioFile?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {getFileSizeFormatted()} • {formatTime(duration)}
              </p>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="space-y-medical-sm">
          <div className="flex items-center space-x-medical-sm">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              iconName={isPlaying ? "Pause" : "Play"}
              disabled={!duration}
            />
            
            <div className="flex-1 space-y-medical-xs">
              <div
                className="w-full h-2 bg-muted rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-2 bg-primary rounded-full medical-transition"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-medical-xs">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-muted rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quality Assessment */}
        {qualityMetrics ? (
          <div className="p-medical-sm bg-success/10 rounded-medical border border-success/20">
            <div className="flex items-center space-x-medical-sm mb-medical-sm">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <h4 className="font-body font-medium text-foreground">
                Análisis de calidad completado
              </h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-medical-sm mb-medical-sm">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Calidad</p>
                <p className="text-sm font-medium text-foreground">{qualityMetrics?.quality}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Ruido</p>
                <p className="text-sm font-medium text-foreground">{qualityMetrics?.noiseLevel}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Hablantes</p>
                <p className="text-sm font-medium text-foreground">{qualityMetrics?.speakerCount}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Claridad</p>
                <p className="text-sm font-medium text-foreground">{qualityMetrics?.clarity}%</p>
              </div>
            </div>

            <div className="space-y-medical-xs">
              {qualityMetrics?.recommendations?.map((rec, index) => (
                <div key={index} className="flex items-center space-x-medical-xs">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-xs text-muted-foreground">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-medical-sm bg-accent/10 rounded-medical border border-accent/20">
            <div className="flex items-center space-x-medical-sm">
              <Icon name="Loader2" size={20} className="text-accent animate-spin" />
              <span className="text-sm text-muted-foreground">
                Analizando calidad del audio...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPreviewPlayer;