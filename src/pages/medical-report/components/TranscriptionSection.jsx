import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TranscriptionSection = ({ transcriptionData, isEditing, onUpdate }) => {
  const [expandedSegments, setExpandedSegments] = useState(new Set());

  const toggleSegment = (segmentId) => {
    const newExpanded = new Set(expandedSegments);
    if (newExpanded?.has(segmentId)) {
      newExpanded?.delete(segmentId);
    } else {
      newExpanded?.add(segmentId);
    }
    setExpandedSegments(newExpanded);
  };

  const handleSegmentUpdate = (segmentId, field, value) => {
    if (onUpdate) {
      const updatedSegments = transcriptionData?.segments?.map(segment =>
        segment?.id === segmentId ? { ...segment, [field]: value } : segment
      );
      onUpdate('transcriptionData', { ...transcriptionData, segments: updatedSegments });
    }
  };

  const getSpeakerIcon = (speaker) => {
    return speaker === 'Doctor' ? 'Stethoscope' : 'User';
  };

  const getSpeakerColor = (speaker) => {
    return speaker === 'Doctor' ? 'text-primary' : 'text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;
    return `${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg mb-medical-base medical-shadow">
      <div className="flex items-center justify-between mb-medical-base">
        <div className="flex items-center gap-medical-sm">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Transcripción Completa
          </h2>
        </div>
        
        <div className="flex items-center gap-medical-sm text-sm text-muted-foreground">
          <div className="flex items-center gap-medical-xs">
            <Icon name="Clock" size={16} />
            <span>Duración: {transcriptionData?.duration}</span>
          </div>
          <div className="flex items-center gap-medical-xs">
            <Icon name="Volume2" size={16} />
            <span>Calidad: {transcriptionData?.quality}%</span>
          </div>
        </div>
      </div>
      {/* Transcription Summary */}
      <div className="bg-muted rounded-medical p-medical-sm mb-medical-base">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-medical-base text-sm">
          <div className="flex items-center gap-medical-xs">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Participantes:</span>
            <span className="font-medium text-foreground">{transcriptionData?.speakers?.join(', ')}</span>
          </div>
          <div className="flex items-center gap-medical-xs">
            <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Segmentos:</span>
            <span className="font-medium text-foreground">{transcriptionData?.segments?.length}</span>
          </div>
          <div className="flex items-center gap-medical-xs">
            <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Inaudibles:</span>
            <span className="font-medium text-foreground">{transcriptionData?.inaudibleCount}</span>
          </div>
        </div>
      </div>
      {/* Transcription Segments */}
      <div className="space-y-medical-sm max-h-96 overflow-y-auto">
        {transcriptionData?.segments?.map((segment) => (
          <div
            key={segment?.id}
            className="border medical-border rounded-medical p-medical-sm hover:bg-muted/50 medical-transition"
          >
            <div className="flex items-start gap-medical-sm">
              {/* Speaker Info */}
              <div className="flex-shrink-0 flex items-center gap-medical-xs min-w-0">
                <Icon 
                  name={getSpeakerIcon(segment?.speaker)} 
                  size={16} 
                  className={getSpeakerColor(segment?.speaker)} 
                />
                <span className={`text-sm font-medium ${getSpeakerColor(segment?.speaker)}`}>
                  {segment?.speaker}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(segment?.timestamp)}
                </span>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleSegment(segment?.id)}
                className="flex-shrink-0 p-1 hover:bg-muted rounded-medical medical-transition"
              >
                <Icon 
                  name={expandedSegments?.has(segment?.id) ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>
            </div>

            {/* Content */}
            <div className="mt-medical-xs">
              {isEditing ? (
                <textarea
                  value={segment?.content}
                  onChange={(e) => handleSegmentUpdate(segment?.id, 'content', e?.target?.value)}
                  className="w-full px-medical-sm py-medical-xs text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  rows={expandedSegments?.has(segment?.id) ? 4 : 2}
                />
              ) : (
                <p className={`text-sm font-body text-foreground ${
                  !expandedSegments?.has(segment?.id) ? 'line-clamp-2' : ''
                }`}>
                  {segment?.content}
                </p>
              )}

              {/* Segment Metadata */}
              {expandedSegments?.has(segment?.id) && (
                <div className="mt-medical-xs pt-medical-xs border-t medical-border">
                  <div className="flex flex-wrap items-center gap-medical-base text-xs text-muted-foreground">
                    <div className="flex items-center gap-medical-xs">
                      <Icon name="Zap" size={12} />
                      <span>Confianza: {segment?.confidence}%</span>
                    </div>
                    {segment?.medicalTerms && segment?.medicalTerms?.length > 0 && (
                      <div className="flex items-center gap-medical-xs">
                        <Icon name="BookOpen" size={12} />
                        <span>Términos médicos: {segment?.medicalTerms?.join(', ')}</span>
                      </div>
                    )}
                    {segment?.hasInaudible && (
                      <div className="flex items-center gap-medical-xs text-warning">
                        <Icon name="VolumeX" size={12} />
                        <span>Contiene secciones inaudibles</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Transcription Notes */}
      <div className="mt-medical-base pt-medical-base border-t medical-border">
        <h3 className="text-sm font-heading font-medium text-foreground mb-medical-sm">
          Notas de Transcripción
        </h3>
        {isEditing ? (
          <textarea
            value={transcriptionData?.notes}
            onChange={(e) => onUpdate('transcriptionData', { ...transcriptionData, notes: e?.target?.value })}
            placeholder="Agregar notas adicionales sobre la transcripción..."
            className="w-full px-medical-sm py-medical-xs text-sm border medical-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            rows={3}
          />
        ) : (
          <p className="text-sm font-body text-foreground">
            {transcriptionData?.notes || 'Sin notas adicionales'}
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionSection;