import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RoleSelect } from '../RoleSelect';
import type { SignUpFormData } from './types';

interface FormFieldsProps {
  form: UseFormReturn<SignUpFormData>;
}

export function FormFields({ form }: FormFieldsProps) {
  const { register, formState: { errors }, watch, setValue } = form;
  const role = watch('role');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            className="mt-1"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            className="mt-1"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

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

      <div>
        <Label htmlFor="password">Password</Label>
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

      <RoleSelect
        value={role || ''}
        onChange={(value) => setValue('role', value as 'doctor' | 'chw')}
        error={errors.role?.message}
      />
    </div>
  );
}