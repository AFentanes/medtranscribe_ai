import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/ui/AuthForm';
import { useAuth } from '../../context/AuthContext';
import hospitalAngelesLogo from '../../assets/hospital-angeles-logo.svg';

const LoginPage = () => {
  const { signIn, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (data) => {
    try {
      setLoginError('');
      await signIn(data);
      // Navigation will happen automatically due to the useEffect above
    } catch (err) {
      setLoginError('Credenciales inválidas. Por favor intente de nuevo.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Hospital Angeles Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src={hospitalAngelesLogo} 
          alt="Hospital Angeles" 
          className="w-96 h-96 object-contain"
        />
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          {/* Hospital Angeles Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={hospitalAngelesLogo} 
              alt="Hospital Angeles" 
              className="w-32 h-auto object-contain"
            />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">MedTranscribe AI</h1>
          <p className="text-sm text-gray-600">
            Inicie sesión para acceder a su cuenta
          </p>
        </div>
        
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm" role="alert">
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-white/20">
          <AuthForm 
            onSubmit={handleLogin} 
            formType="login" 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;