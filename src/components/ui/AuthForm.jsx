import React from 'react';
import { useForm } from 'react-hook-form';

/**
 * Reusable authentication form component for login and signup
 */
const AuthForm = ({ onSubmit, formType = 'login', loading = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {formType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formType === 'signup' && (
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'El nombre es requerido' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. Juan Pérez"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}
        
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Dirección de correo inválida'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="doctor@ejemplo.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password', { 
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        
        {formType === 'signup' && (
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { 
                required: 'Por favor confirme su contraseña',
                validate: (value, formValues) => 
                  value === formValues.password || 'Las contraseñas no coinciden'
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </span>
          ) : formType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </button>
      </form>
      
      <div className="text-center text-sm">
        {formType === 'login' ? (
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        ) : (
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;