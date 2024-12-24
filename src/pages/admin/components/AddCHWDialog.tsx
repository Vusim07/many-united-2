import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const chwSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  area: z.string().min(1, 'Service area is required'),
});

type CHWForm = z.infer<typeof chwSchema>;

interface AddCHWDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: CHWForm) => void;
}

export default function AddCHWDialog({ open, onOpenChange, onAdd }: AddCHWDialogProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CHWForm>({
    resolver: zodResolver(chwSchema),
  });

  const onSubmit = async (data: CHWForm) => {
    try {
      await onAdd(data);
      reset();
      onOpenChange(false);
      toast({
        title: "Success",
        description: "CHW added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add CHW. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New CHW</DialogTitle>
          <DialogDescription>
            Add a new Community Health Worker to the system
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Service Area</Label>
            <Input
              id="area"
              {...register('area')}
            />
            {errors.area && (
              <p className="text-sm text-red-600">{errors.area.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add CHW
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}