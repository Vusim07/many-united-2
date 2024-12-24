import { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import type { PatientFormData } from '../forms/PatientForm';
import { validatePatientData } from './validation';

interface PatientImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (patients: PatientFormData[]) => Promise<void>;
}

export function PatientImportDialog({ 
  open, 
  onOpenChange,
  onImport 
}: PatientImportDialogProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const patients = results.data as PatientFormData[];
          const validationResults = patients.map(validatePatientData);
          
          const errors = validationResults.filter(r => !r.isValid);
          if (errors.length > 0) {
            toast({
              title: "Validation Error",
              description: `${errors.length} records contain errors. Please check your CSV file.`,
              variant: "destructive",
            });
            return;
          }

          await onImport(patients);
          toast({
            title: "Success",
            description: `${patients.length} patients imported successfully`,
          });
          onOpenChange(false);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to import patients. Please check your CSV file format.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      error: () => {
        toast({
          title: "Error",
          description: "Failed to parse CSV file",
          variant: "destructive",
        });
        setIsProcessing(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Patients</DialogTitle>
          <DialogDescription>
            Upload a CSV file containing patient information. The file should have the following columns:
            name, date_of_birth, address, phone, medical_history, gender, emergency_contact, preferred_language, notes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isProcessing}
          />
          <div className="text-sm text-gray-500">
            <p>Required columns:</p>
            <ul className="list-disc list-inside">
              <li>name</li>
              <li>date_of_birth (YYYY-MM-DD)</li>
              <li>address</li>
              <li>phone</li>
            </ul>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}