import { useSignIn } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const updatePasswordSchema = z.object({
  code: z.string().min(6, 'Invalid verification code'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;

export function UpdatePassword() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordForm) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast({
          title: 'Success',
          description: 'Your password has been updated.',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          {...register('code')}
          className="mt-1"
        />
        {errors.code && (
          <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="mt-1"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}