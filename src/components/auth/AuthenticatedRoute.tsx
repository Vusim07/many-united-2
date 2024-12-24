import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useClerkUser } from '@/lib/auth/hooks/useClerkUser';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function AuthenticatedRoute({ children, allowedRoles }: AuthenticatedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoading } = useClerkUser();
  const location = useLocation();

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles && (!user?.role || !allowedRoles.includes(user.role))) {
    const fallbackPath = user?.role ? `/${user.role}` : '/sign-in';
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}