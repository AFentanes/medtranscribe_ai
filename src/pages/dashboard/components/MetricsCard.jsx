import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card border medical-border rounded-medical-lg p-medical-lg medical-shadow medical-transition hover:medical-shadow-elevated">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-caption text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-heading font-semibold text-foreground mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs font-caption text-muted-foreground">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center mt-2 space-x-1">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={14} 
                className={trendColors?.[trend]} 
              />
              <span className={`text-xs font-caption ${trendColors?.[trend]}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-medical ${colorClasses?.[color]}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;