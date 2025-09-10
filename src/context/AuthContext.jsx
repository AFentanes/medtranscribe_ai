import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Initialize auth state on component mount
  useEffect(() => {
    // Simulate checking for a stored user session
    const checkUserSession = async () => {
      try {
        // In a real app, you would check localStorage, cookies, or make an API call
        const storedUser = localStorage.getItem('medtranscribe_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to restore authentication session');
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Sign in function
  const signIn = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to authenticate
      // Check if there's a registered user with this email
      const registeredUsers = JSON.parse(localStorage.getItem('medtranscribe_registered_users') || '[]');
      const foundUser = registeredUsers.find(user => user.email === credentials.email);
      
      // Only allow login for registered users
      if (!foundUser) {
        setError('Usuario no registrado. Por favor regístrate primero.');
        throw new Error('User not registered');
      }
      
      // Verify password (in a real app, you would hash and compare passwords)
      // For now, we'll just check if the user exists
      
      // Store user in localStorage
      localStorage.setItem('medtranscribe_user', JSON.stringify(foundUser));
      
      setUser(foundUser);
      return foundUser;
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear stored user data
      localStorage.removeItem('medtranscribe_user');
      
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      setRegistrationSuccess(false);
      
      // In a real app, you would make an API call to register the user
      // This is a mock implementation
      // Extract name from email if no name provided
      const extractedName = userData.name || userData.email.split('@')[0];
      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
      
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Dr. ${formattedName}`,
        email: userData.email,
        role: 'doctor',
        createdAt: new Date().toISOString()
      };
      
      // Store registered users in localStorage for login reference
      const registeredUsers = JSON.parse(localStorage.getItem('medtranscribe_registered_users') || '[]');
      registeredUsers.push(mockUser);
      localStorage.setItem('medtranscribe_registered_users', JSON.stringify(registeredUsers));
      
      console.log('User registered:', mockUser);
      
      // Set registration success flag
      setRegistrationSuccess(true);
      return true;
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Value object that will be passed to consumers of this context
  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
    signUp,
    registrationSuccess,
    setRegistrationSuccess,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext as default };