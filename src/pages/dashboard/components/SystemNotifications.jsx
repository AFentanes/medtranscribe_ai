import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemNotifications = ({ notifications, onMarkAsRead, onClearAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getNotificationIcon = (type) => {
    const iconMap = {
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      info: 'Info',
      update: 'Download',
      processing: 'Clock'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-primary',
      update: 'text-accent',
      processing: 'text-secondary'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;
  const displayNotifications = isExpanded ? notifications : notifications?.slice(0, 3);

  return (
    <div className="bg-card border medical-border rounded-medical-lg medical-shadow">
      <div className="p-medical-lg border-b medical-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Notificaciones del Sistema
            </h3>
            {unreadCount > 0 && (
              <div className="bg-error text-error-foreground text-xs font-caption px-2 py-1 rounded-full">
                {unreadCount}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {notifications?.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Menos' : 'Más'}
              </Button>
            )}
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="CheckCheck"
                onClick={onClearAll}
              >
                Marcar todas
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="divide-y medical-border max-h-96 overflow-y-auto">
        {displayNotifications?.length > 0 ? (
          displayNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-medical-lg hover:bg-muted/30 medical-transition ${
                !notification?.read ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${getNotificationColor(notification?.type)}`}>
                  <Icon name={getNotificationIcon(notification?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-body ${
                        !notification?.read ? 'font-medium text-foreground' : 'text-foreground'
                      }`}>
                        {notification?.title}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground mt-1">
                        {notification?.message}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground mt-2">
                        {notification?.timestamp}
                      </p>
                    </div>
                    {!notification?.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Check"
                        onClick={() => onMarkAsRead(notification?.id)}
                        className="ml-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-medical-3xl text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-heading font-medium text-foreground mb-2">
              No hay notificaciones
            </p>
            <p className="text-sm font-body text-muted-foreground">
              Las actualizaciones del sistema aparecerán aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemNotifications;