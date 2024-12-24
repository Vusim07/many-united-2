import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const patientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  medical_history: z.string().nullable(),
  gender: z.string().optional(),
  emergency_contact: z.string().optional(),
  preferred_language: z.string().optional(),
  notes: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => Promise<void>;
  isSubmitting?: boolean;
  defaultValues?: Partial<PatientFormData>;
}

export function PatientForm({ onSubmit, isSubmitting, defaultValues }: PatientFormProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: PatientFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save patient. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <Input id="date_of_birth" type="date" {...register('date_of_birth')} />
          {errors.date_of_birth && (
            <p className="text-sm text-red-600">{errors.date_of_birth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" {...register('gender')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register('phone')} />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register('address')} />
          {errors.address && (
            <p className="text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency_contact">Emergency Contact</Label>
          <Input id="emergency_contact" {...register('emergency_contact')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferred_language">Preferred Language</Label>
          <Input id="preferred_language" {...register('preferred_language')} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="medical_history">Medical History</Label>
          <Textarea 
            id="medical_history" 
            {...register('medical_history')} 
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea 
            id="notes" 
            {...register('notes')} 
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Patient'}
        </Button>
      </div>
    </form>
  );
}