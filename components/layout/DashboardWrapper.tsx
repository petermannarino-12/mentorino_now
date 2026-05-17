import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole, User } from '../../src/types';
import { useAuth } from '../../src/contexts/AuthContext';

interface DashboardWrapperProps {
  currentRole: UserRole;
  currentUser: User | null;
  MentorDashboard: React.ElementType;
  UserDashboard: React.ElementType;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ 
  currentRole, currentUser, ...props 
}) => {
  const { signOut } = useAuth();
  if (currentRole === 'visitor') return <Navigate to="/auth" />;
  
  const Component = currentRole === 'mentor' ? props.MentorDashboard : props.UserDashboard;

  return (
    <Component 
      currentUser={currentUser} 
      onLogout={signOut} 
    />
  );
};

export default DashboardWrapper;

