import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  authLoading: boolean;
  signIn: (email: string, role?: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'visitor',
  authLoading: false,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('visitor');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setRole(parsed.role || 'mentee');
      } catch {
        localStorage.removeItem('mock_user');
      }
    }
    setAuthLoading(false);
  }, []);

  const signIn = (email: string, userRole: UserRole = 'mentee') => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      full_name: email.split('@')[0],
      role: userRole,
      created_at: new Date().toISOString()
    };
    setUser(mockUser);
    setRole(userRole);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    setRole('visitor');
    localStorage.removeItem('mock_user');
  };

  const value = React.useMemo(() => ({ 
    user, 
    role, 
    authLoading, 
    signIn, 
    signOut 
  }), [user, role, authLoading, signIn, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);