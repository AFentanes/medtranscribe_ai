import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/ui/AuthForm';
import { useAuth } from '../../context/AuthContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">MedTranscribe AI</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicie sesión para acceder a su cuenta
          </p>
        </div>
        
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <AuthForm 
          onSubmit={handleLogin} 
          formType="login" 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default LoginPage;