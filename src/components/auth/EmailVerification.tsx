import { useSignUp } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function EmailVerification() {
  const { isLoaded, signUp } = useSignUp();
  const { toast } = useToast();

  const resendVerificationEmail = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification();
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox for the verification link.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to send verification email. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Verify your email</h2>
      <p className="text-gray-600 mb-6">
        We've sent a verification email to your inbox. Please verify your email to continue.
      </p>
      <Button onClick={resendVerificationEmail}>
        Resend verification email
      </Button>
    </div>
  );
}