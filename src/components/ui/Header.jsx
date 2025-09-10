import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      tooltip: 'Vista general del sistema'
    },
    { 
      label: 'Nueva Consulta', 
      path: '/audio-upload', 
      icon: 'Upload',
      tooltip: 'Iniciar nueva consulta médica'
    },
    { 
      label: 'Transcripción', 
      path: '/transcription-monitor', 
      icon: 'Activity',
      tooltip: 'Monitor de transcripción en tiempo real'
    },
    { 
      label: 'Análisis Médico', 
      path: '/medical-analysis', 
      icon: 'Stethoscope',
      tooltip: 'Análisis clínico y diagnóstico'
    },
    { 
      label: 'Reporte', 
      path: '/medical-report', 
      icon: 'FileText',
      tooltip: 'Generación de reportes médicos'
    }
  ];

  const secondaryItems = [
    { 
      label: 'Historial', 
      path: '/consultation-history', 
      icon: 'History',
      tooltip: 'Historial de consultas'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getCurrentConsultationStatus = () => {
    const path = location?.pathname;
    if (path === '/transcription-monitor') return 'processing';
    if (path === '/medical-analysis') return 'analyzing';
    if (path === '/medical-report') return 'generating';
    return 'idle';
  };

  const status = getCurrentConsultationStatus();

  return (
  <header className="fixed top-0 left-0 right-0 z-[10] bg-primary border-b border-primary h-medical-3xl" style={{position: 'relative', zIndex: 10}}>
  <div className="flex items-center justify-between h-full px-medical-lg">
        {/* Logo Section */}
  <div className="flex items-center space-x-medical-lg">
          <div className="flex items-center space-x-medical-sm">
            <div className="w-10 h-10 bg-white rounded-medical flex items-center justify-center">
              <img src="/assets/images/hospital_angeles_logo.png" alt="Hospital Angeles Logo" className="w-14 h-14 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-semibold text-white drop-shadow-sm">
                MedTranscribe AI
              </span>
              <span className="text-base font-caption text-white">
                Hospital Ángeles
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          {status !== 'idle' && (
            <div className="hidden md:flex items-center space-x-medical-sm px-medical-sm py-1 bg-white/20 rounded-medical">
              <div className={`w-2 h-2 rounded-full border border-white ${
                status === 'processing' ? 'bg-accent medical-pulse' :
                status === 'analyzing'? 'bg-secondary medical-pulse' : 'bg-success medical-pulse'
              }`} />
              <span className="text-sm font-caption text-white">
                {status === 'processing' ? 'Transcribiendo...' :
                 status === 'analyzing' ? 'Analizando...' :
                 'Generando reporte...'}
              </span>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
  <nav className="hidden lg:flex items-center space-x-medical-base">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-medical-xs px-medical-sm py-medical-xs rounded-medical medical-transition group relative ${
                isActivePath(item?.path)
                  ? 'bg-white text-primary'
                  : 'text-white/80 hover:text-primary hover:bg-white/80'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span className="text-sm font-body font-medium">{item?.label}</span>
              {isActivePath(item?.path) && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-medical-xs px-medical-sm py-medical-xs rounded-medical text-white/80 hover:text-primary hover:bg-white/80 medical-transition"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span className="text-sm font-body font-medium">Más</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-medical-xs w-48 bg-white border medical-border rounded-medical-lg medical-shadow-elevated z-dropdown">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-medical-sm px-medical-sm py-medical-xs text-left hover:bg-primary/10 medical-transition first:rounded-t-medical-lg last:rounded-b-medical-lg ${
                      isActivePath(item?.path) ? 'bg-primary/10 text-primary' : 'text-primary'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span className="text-sm font-body">{item?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Quick Actions & Profile */}
  <div className="flex items-center space-x-medical-sm">
          {/* Quick Action - Nueva Consulta */}
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => handleNavigation('/audio-upload')}
            className="hidden md:flex bg-white text-primary hover:bg-primary hover:text-white border border-white"
          >
            Nueva Consulta
          </Button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-medical-xs p-medical-xs rounded-medical hover:bg-white/20 medical-transition"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-body font-medium text-white">{user?.name || 'Usuario'}</span>
                <span className="text-xs font-caption text-white/80">Medicina Interna</span>
              </div>
              <Icon name="ChevronDown" size={16} className="text-white/80 hidden md:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-medical-xs w-56 bg-white border medical-border rounded-medical-lg medical-shadow-elevated z-dropdown">
                <div className="p-medical-sm border-b medical-border">
                  <div className="flex items-center space-x-medical-sm">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-primary">{user?.name || 'Usuario'}</p>
                      <p className="text-xs font-caption text-black/80">Medicina Interna</p>
                      <p className="text-xs font-caption text-black/60">ID: MED-2024-001</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-medical-xs">
                  <button className="w-full flex items-center space-x-medical-sm px-medical-sm py-medical-xs text-left hover:bg-primary/10 medical-transition">
                    <Icon name="Settings" size={16} />
                    <span className="text-sm font-body text-primary">Configuración</span>
                  </button>
                  <button className="w-full flex items-center space-x-medical-sm px-medical-sm py-medical-xs text-left hover:bg-primary/10 medical-transition">
                    <Icon name="HelpCircle" size={16} />
                    <span className="text-sm font-body text-primary">Ayuda</span>
                  </button>
                  <div className="border-t medical-border my-medical-xs" />
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-medical-sm px-medical-sm py-medical-xs text-left hover:bg-destructive hover:text-destructive-foreground medical-transition"
                  >
                    <Icon name="LogOut" size={16} />
                    <span className="text-sm font-body">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-medical-xs rounded-medical hover:bg-white/20 medical-transition text-white"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary border-b border-white medical-shadow z-dropdown">
          <nav className="p-medical-sm space-y-medical-xs">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-medical-sm p-medical-sm rounded-medical medical-transition ${
                  isActivePath(item?.path)
                    ? 'bg-white text-primary'
                    : 'text-white/80 hover:text-primary hover:bg-white/80'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="text-sm font-body font-medium">{item?.label}</span>
              </button>
            ))}
            
            <div className="pt-medical-sm border-t border-white">
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => handleNavigation('/audio-upload')}
                fullWidth
                className="bg-white text-primary hover:bg-primary hover:text-white border border-white"
              >
                Nueva Consulta
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

