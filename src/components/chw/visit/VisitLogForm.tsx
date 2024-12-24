import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const logSchema = z.object({
  type: z.enum(['vital', 'note', 'medication']),
  notes: z.string().min(1, 'Notes are required'),
  vitalType: z.string().optional(),
  vitalValue: z.string().optional(),
  vitalUnit: z.string().optional(),
});

type LogForm = z.infer<typeof logSchema>;

interface VisitLogFormProps {
  onSubmit: (data: LogForm) => void;
  isSubmitting?: boolean;
}

export default function VisitLogForm({ onSubmit, isSubmitting }: VisitLogFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LogForm>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      type: 'note',
    },
  });

  const updateType = watch('type');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Visit Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Select
              onValueChange={(value: any) => register('type').onChange({ target: { value } })}
              defaultValue="note"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select update type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">General Note</SelectItem>
                <SelectItem value="vital">Vital Signs</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
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

          <div>
            <Textarea
              {...register('notes')}
              placeholder="Enter visit notes..."
              className="min-h-[100px]"
            />
            {errors.notes && (
              <p className="text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Add Update'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}