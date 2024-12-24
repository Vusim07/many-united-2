import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RoleSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RoleSelect({ value, onChange, error }: RoleSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="role">Role</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="role">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="doctor">Doctor</SelectItem>
          <SelectItem value="chw">Community Health Worker</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}