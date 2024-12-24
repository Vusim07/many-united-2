import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const chwProfileSchema = z.object({
  area: z.string().min(1, 'Service area is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

type CHWProfileForm = z.infer<typeof chwProfileSchema>;

interface CHWProfileFormProps {
  onSubmit: (data: CHWProfileForm) => Promise<void>;
  isSubmitting?: boolean;
}

export function CHWProfileForm({ onSubmit, isSubmitting }: CHWProfileFormProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CHWProfileForm>({
    resolver: zodResolver(chwProfileSchema),
  });

  const handleFormSubmit = async (data: CHWProfileForm) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="area">Service Area</Label>
        <Input
          id="area"
          {...register('area')}
          className="mt-1"
        />
        {errors.area && (
          <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          className="mt-1"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Complete Profile'}
      </Button>
    </form>
  );
}