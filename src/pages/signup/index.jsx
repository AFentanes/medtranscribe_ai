import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/ui/AuthForm';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
  const { signUp, user, loading, error, registrationSuccess, setRegistrationSuccess } = useAuth();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState('');

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Redirect to login page after successful registration
  useEffect(() => {
    if (registrationSuccess) {
      // Show success message and redirect after a delay
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
        navigate('/login');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate, setRegistrationSuccess]);

  const handleSignup = async (data) => {
    try {
      setSignupError('');
      
      // Validate password match
      if (data.password !== data.confirmPassword) {
        setSignupError('Las contraseñas no coinciden');
        return;
      }
      
      await signUp(data);
      // Registration success will trigger the redirect useEffect
    } catch (err) {
      setSignupError('Error al crear la cuenta. Por favor intente de nuevo.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">MedTranscribe AI</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Cree una cuenta para comenzar
          </p>
        </div>
        
        {signupError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{signupError}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {registrationSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">
              ¡Cuenta creada exitosamente! Redirigiendo a la página de inicio de sesión...
            </span>
          </div>
        )}
        
        <AuthForm 
          onSubmit={handleSignup} 
          formType="signup" 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default SignupPage;