import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestResults = ({ testResults, examFindings, onValidate }) => {
  const [validatedTests, setValidatedTests] = useState(new Set());
  const [validatedFindings, setValidatedFindings] = useState(new Set());
  const [expandedTest, setExpandedTest] = useState(null);

  const handleTestValidation = (testId) => {
    const newValidated = new Set(validatedTests);
    if (newValidated?.has(testId)) {
      newValidated?.delete(testId);
    } else {
      newValidated?.add(testId);
    }
    setValidatedTests(newValidated);
    onValidate('tests', Array.from(newValidated));
  };

  const handleFindingValidation = (findingId) => {
    const newValidated = new Set(validatedFindings);
    if (newValidated?.has(findingId)) {
      newValidated?.delete(findingId);
    } else {
      newValidated?.add(findingId);
    }
    setValidatedFindings(newValidated);
    onValidate('findings', Array.from(newValidated));
  };

  const getResultColor = (status) => {
    switch (status) {
      case 'anormal': return 'text-error bg-red-50 border-red-200';
      case 'límite': return 'text-warning bg-amber-50 border-amber-200';
      case 'normal': return 'text-success bg-green-50 border-green-200';
      case 'pendiente': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSignificanceColor = (significance) => {
    switch (significance) {
      case 'crítico': return 'text-error bg-red-50 border-red-200';
      case 'importante': return 'text-warning bg-amber-50 border-amber-200';
      case 'relevante': return 'text-accent bg-yellow-50 border-yellow-200';
      case 'menor': return 'text-success bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTestIcon = (category) => {
    const iconMap = {
      'laboratorio': 'TestTube',
      'imagen': 'Camera',
      'cardiología': 'Heart',
      'neurología': 'Brain',
      'respiratorio': 'Wind',
      'endoscopia': 'Eye',
      'biopsia': 'Microscope'
    };
    return iconMap?.[category] || 'FileText';
  };

  const toggleTestExpansion = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="TestTube" size={18} className="text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Resultados de Estudios y Hallazgos
            </h3>
            <p className="text-sm text-muted-foreground">
              {testResults?.length} estudios y {examFindings?.length} hallazgos de exploración
            </p>
          </div>
        </div>
      </div>
      {/* Test Results Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="TestTube" size={16} className="text-muted-foreground" />
          <h4 className="font-body font-medium text-foreground">Resultados de Estudios</h4>
          <span className="text-sm text-muted-foreground">
            ({validatedTests?.size}/{testResults?.length} validados)
          </span>
        </div>

        <div className="space-y-3">
          {testResults?.map((test) => (
            <div
              key={test?.id}
              className={`border rounded-lg medical-transition ${
                validatedTests?.has(test?.id)
                  ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon 
                        name={getTestIcon(test?.category)} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                      <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                        {test?.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {test?.date}
                      </span>
                      <div className={`px-2 py-1 rounded text-xs font-caption border ${getResultColor(test?.status)}`}>
                        {test?.status}
                      </div>
                    </div>

                    <h5 className="font-body font-semibold text-foreground mb-2">
                      {test?.name}
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {test?.values?.map((value, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm text-muted-foreground">{value?.parameter}:</span>
                          <div className="text-right">
                            <span className={`text-sm font-medium ${
                              value?.status === 'anormal' ? 'text-error' :
                              value?.status === 'límite'? 'text-warning' : 'text-foreground'
                            }`}>
                              {value?.result}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              ({value?.reference})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {expandedTest === test?.id && (
                      <div className="pt-3 border-t border-border space-y-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Interpretación clínica:</span>
                          <p className="text-sm text-foreground mt-1">{test?.interpretation}</p>
                        </div>

                        <div>
                          <span className="text-xs text-muted-foreground">Recomendaciones:</span>
                          <div className="space-y-1 mt-1">
                            {test?.recommendations?.map((rec, index) => (
                              <div key={index} className="flex items-start space-x-2 text-sm">
                                <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5" />
                                <span className="text-foreground">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {test?.followUp && (
                          <div>
                            <span className="text-xs text-muted-foreground">Seguimiento requerido:</span>
                            <p className="text-sm text-foreground mt-1">{test?.followUp}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <button
                      onClick={() => handleTestValidation(test?.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                        validatedTests?.has(test?.id)
                          ? 'bg-success border-success text-success-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                      title="Validar resultado"
                    >
                      {validatedTests?.has(test?.id) && (
                        <Icon name="Check" size={14} />
                      )}
                    </button>
                    <button
                      onClick={() => toggleTestExpansion(test?.id)}
                      className="w-6 h-6 rounded border border-border hover:border-primary flex items-center justify-center medical-transition"
                      title="Ver detalles"
                    >
                      <Icon 
                        name={expandedTest === test?.id ? "ChevronUp" : "ChevronDown"} 
                        size={14} 
                      />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {test?.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Examination Findings Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-muted-foreground" />
          <h4 className="font-body font-medium text-foreground">Hallazgos de Exploración</h4>
          <span className="text-sm text-muted-foreground">
            ({validatedFindings?.size}/{examFindings?.length} validados)
          </span>
        </div>

        <div className="grid gap-3">
          {examFindings?.map((finding) => (
            <div
              key={finding?.id}
              className={`p-4 rounded-lg border medical-transition ${
                validatedFindings?.has(finding?.id)
                  ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Search" size={16} className="text-muted-foreground" />
                    <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                      {finding?.system}
                    </span>
                    <div className={`px-2 py-1 rounded text-xs font-caption border ${getSignificanceColor(finding?.significance)}`}>
                      {finding?.significance}
                    </div>
                  </div>

                  <h5 className="font-body font-medium text-foreground mb-1">
                    {finding?.finding}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {finding?.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Localización:</span>
                      <span className="font-medium text-foreground ml-2">{finding?.location}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Características:</span>
                      <span className="font-medium text-foreground ml-2">{finding?.characteristics}</span>
                    </div>
                  </div>

                  {finding?.clinicalRelevance && (
                    <div className="mt-3 p-3 bg-muted rounded">
                      <span className="text-xs text-muted-foreground">Relevancia clínica:</span>
                      <p className="text-sm text-foreground mt-1">{finding?.clinicalRelevance}</p>
                    </div>
                  )}

                  {finding?.differentialConsiderations && finding?.differentialConsiderations?.length > 0 && (
                    <div className="mt-3">
                      <span className="text-xs text-muted-foreground">Consideraciones diferenciales:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {finding?.differentialConsiderations?.map((consideration, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20"
                          >
                            {consideration}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => handleFindingValidation(finding?.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center medical-transition ${
                      validatedFindings?.has(finding?.id)
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    title="Validar hallazgo"
                  >
                    {validatedFindings?.has(finding?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {finding?.confidence}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Validación de estudios y hallazgos para correlación diagnóstica
        </div>
        <div className="flex space-x-2">
          <Button
            variant={validatedTests?.size > 0 ? "default" : "outline"}
            size="sm"
            iconName="TestTube"
            iconPosition="left"
            disabled={validatedTests?.size === 0}
          >
            Estudios ({validatedTests?.size})
          </Button>
          <Button
            variant={validatedFindings?.size > 0 ? "secondary" : "outline"}
            size="sm"
            iconName="Eye"
            iconPosition="left"
            disabled={validatedFindings?.size === 0}
          >
            Hallazgos ({validatedFindings?.size})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;