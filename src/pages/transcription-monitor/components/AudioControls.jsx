import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioControls = ({ 
  audioFile, 
  isPlaying, 
  currentTime, 
  duration, 
  playbackSpeed, 
  onPlayPause, 
  onSeek, 
  onSpeedChange,
  onTimeUpdate 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (!progressRef?.current || !duration) return;
    
    const rect = progressRef?.current?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const percentage = clickX / rect?.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const handleProgressDrag = (e) => {
    if (!isDragging || !progressRef?.current || !duration) return;
    
    const rect = progressRef?.current?.getBoundingClientRect();
    const dragX = e?.clientX - rect?.left;
    const percentage = Math.max(0, Math.min(1, dragX / rect?.width));
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  // Auto-update time when playing
  useEffect(() => {
    let interval = null;
    
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        const newTime = currentTime + (playbackSpeed * 0.1); // Update every 100ms
        if (newTime >= duration) {
          onTimeUpdate(duration);
          onPlayPause(); // Auto-pause when reaching end
        } else {
          onTimeUpdate(newTime);
        }
      }, 100);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentTime, duration, playbackSpeed, onTimeUpdate, onPlayPause]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow">
      <div className="flex items-center justify-between mb-medical-base">
        <div className="flex items-center space-x-medical-sm">
          <div className="w-10 h-10 bg-primary/10 rounded-medical flex items-center justify-center">
            <Icon name="AudioWaveform" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground">
              Control de Audio
            </h3>
            <p className="text-xs font-caption text-muted-foreground">
              {audioFile?.name || 'consulta_medica_20240904.wav'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-medical-xs">
          <span className="text-xs font-caption text-muted-foreground">
            Velocidad:
          </span>
          <select
            value={playbackSpeed}
            onChange={(e) => onSpeedChange(parseFloat(e?.target?.value))}
            className="text-xs font-caption bg-muted border medical-border rounded px-2 py-1 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {speedOptions?.map(speed => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-medical-base">
        <div
          ref={progressRef}
          className="relative h-2 bg-muted rounded-full cursor-pointer group"
          onClick={handleProgressClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseMove={handleProgressDrag}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>
        
        <div className="flex justify-between mt-medical-xs">
          <span className="text-xs font-caption text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-medical-sm">
        <Button
          variant="outline"
          size="sm"
          iconName="SkipBack"
          onClick={() => onSeek(Math.max(0, currentTime - 10))}
          className="w-10 h-10"
        />
        
        <Button
          variant="default"
          size="lg"
          iconName={isPlaying ? "Pause" : "Play"}
          onClick={onPlayPause}
          className="w-12 h-12"
        />
        
        <Button
          variant="outline"
          size="sm"
          iconName="SkipForward"
          onClick={() => onSeek(Math.min(duration, currentTime + 10))}
          className="w-10 h-10"
        />
      </div>
      {/* Audio Quality Indicators */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <div className="grid grid-cols-3 gap-medical-sm text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-success/10 rounded-medical flex items-center justify-center mb-medical-xs">
              <Icon name="Volume2" size={16} className="text-success" />
            </div>
            <span className="text-xs font-caption text-muted-foreground">Calidad</span>
            <span className="text-xs font-body font-medium text-success">Excelente</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-accent/10 rounded-medical flex items-center justify-center mb-medical-xs">
              <Icon name="Users" size={16} className="text-accent" />
            </div>
            <span className="text-xs font-caption text-muted-foreground">Hablantes</span>
            <span className="text-xs font-body font-medium text-foreground">2 detectados</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-secondary/10 rounded-medical flex items-center justify-center mb-medical-xs">
              <Icon name="Zap" size={16} className="text-secondary" />
            </div>
            <span className="text-xs font-caption text-muted-foreground">Ruido</span>
            <span className="text-xs font-body font-medium text-secondary">Mínimo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;