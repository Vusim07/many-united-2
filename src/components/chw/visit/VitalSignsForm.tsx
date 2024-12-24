import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface VitalSignsFormProps {
  register: any;
}

export default function VitalSignsForm({ register }: VitalSignsFormProps) {
  return (
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
  );
}