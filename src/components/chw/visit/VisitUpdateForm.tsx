import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const updateSchema = z.object({
  type: z.enum(['note', 'vital', 'medication', 'status']),
  content: z.string().min(1, 'Content is required'),
  vitalType: z.string().optional(),
  vitalValue: z.string().optional(),
  vitalUnit: z.string().optional(),
});

type UpdateForm = z.infer<typeof updateSchema>;

interface VisitUpdateFormProps {
  onSubmit: (data: UpdateForm) => void;
  isSubmitting?: boolean;
}

export default function VisitUpdateForm({ onSubmit, isSubmitting }: VisitUpdateFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdateForm>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      type: 'note',
    },
  });

  const updateType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Select
          onValueChange={(value) => register('type').onChange({ target: { value } })}
          defaultValue="note"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select update type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="note">Note</SelectItem>
            <SelectItem value="vital">Vital Signs</SelectItem>
            <SelectItem value="medication">Medication</SelectItem>
            <SelectItem value="status">Status Update</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {updateType === 'vital' && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Select
              onValueChange={(value) => register('vitalType').onChange({ target: { value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vital sign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood_pressure">Blood Pressure</SelectItem>
                <SelectItem value="heart_rate">Heart Rate</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="blood_sugar">Blood Sugar</SelectItem>
                <SelectItem value="oxygen">Oxygen Saturation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input {...register('vitalValue')} placeholder="Value" />
          <Input {...register('vitalUnit')} placeholder="Unit" />
        </div>
      )}

      <Textarea
        {...register('content')}
        placeholder="Enter your update..."
        className="min-h-[100px]"
      />
      {errors.content && (
        <p className="text-sm text-red-600">{errors.content.message}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Update'}
        </Button>
      </div>
    </form>
  );
}