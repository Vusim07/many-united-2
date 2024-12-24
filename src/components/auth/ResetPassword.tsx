import { useSignIn } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const resetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetForm = z.infer<typeof resetSchema>;

export function ResetPassword() {
  const { isLoaded, signIn } = useSignIn();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetForm) => {
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      });

      toast({
        title: 'Reset email sent',
        description: 'Check your email for password reset instructions.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to send reset email. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send reset instructions'}
      </Button>
    </form>
  );
}