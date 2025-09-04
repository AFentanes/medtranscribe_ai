import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioUploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = ['MP3', 'WAV', 'M4A'];
  const maxFileSize = 100; // MB

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const audioFile = files?.find(file => file?.type?.startsWith('audio/'));
    
    if (audioFile) {
      validateAndSelectFile(audioFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const validateAndSelectFile = (file) => {
    const fileSizeMB = file?.size / (1024 * 1024);
    
    if (fileSizeMB > maxFileSize) {
      alert(`El archivo es demasiado grande. Tamaño máximo: ${maxFileSize}MB`);
      return;
    }

    const fileExtension = file?.name?.split('.')?.pop()?.toUpperCase();
    if (!supportedFormats?.includes(fileExtension)) {
      alert(`Formato no soportado. Use: ${supportedFormats?.join(', ')}`);
      return;
    }

    onFileSelect(file);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-medical-lg p-medical-2xl text-center medical-transition ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : isUploading
            ? 'border-accent bg-accent/5' :'border-muted-foreground/30 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-medical-lg">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isUploading ? 'bg-accent/20' : 'bg-primary/10'
          }`}>
            <Icon 
              name={isUploading ? "Upload" : "Mic"} 
              size={32} 
              className={isUploading ? 'text-accent' : 'text-primary'} 
            />
          </div>

          <div className="space-y-medical-sm">
            <h3 className="text-xl font-heading font-semibold text-foreground">
              {isUploading ? 'Subiendo archivo...' : 'Subir archivo de audio'}
            </h3>
            <p className="text-muted-foreground font-body">
              Arrastra y suelta tu archivo aquí o haz clic para seleccionar
            </p>
          </div>

          {!isUploading && (
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="Upload"
              iconPosition="left"
            >
              Seleccionar archivo
            </Button>
          )}

          {isUploading && uploadProgress !== null && (
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-muted-foreground mb-medical-xs">
                <span>Progreso</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full medical-transition"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-medical-sm text-sm text-muted-foreground">
            <span>Formatos soportados:</span>
            {supportedFormats?.map((format) => (
              <span key={format} className="px-medical-xs py-1 bg-muted rounded text-xs font-mono">
                {format}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Tamaño máximo: {maxFileSize}MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioUploadZone;