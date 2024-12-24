import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerkUser } from './useClerkUser';
import { useToast } from '@/components/ui/use-toast';

export function useAuthRedirect() {
  const { user, isLoading, error } = useClerkUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load your account. Please try signing in again.',
          variant: 'destructive',
        });
        navigate('/sign-in');
        return;
      }

      if (user?.role) {
        const redirectMap = {
          doctor: '/doctor',
          chw: '/chw',
          admin: '/admin'
        };

        const redirectPath = redirectMap[user.role];
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          toast({
            title: 'Invalid Role',
            description: 'Your account has an invalid role. Please contact support.',
            variant: 'destructive',
          });
          navigate('/sign-in');
        }
      } else {
        navigate('/sign-in');
      }
    }
  }, [user, isLoading, error, navigate, toast]);

  return { isLoading };
}