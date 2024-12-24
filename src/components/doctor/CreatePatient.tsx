import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload } from 'lucide-react';
import { createPatient } from '@/lib/api/patients/mutations';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { PatientForm, PatientFormData } from './forms/PatientForm';
import { PatientImportDialog } from './import/PatientImportDialog';
import { usePatientStore } from '@/store/patientStore';

export default function CreatePatient() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { fetchPatients } = usePatientStore();

  const handleSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    try {
      await createPatient(data);
      await fetchPatients();
      
      toast({
        title: 'Success',
        description: 'Patient created successfully',
      });
      
      navigate('/doctor/patients');
    } catch (error) {
      console.error('Error creating patient:', error);
      toast({
        title: 'Error',
        description: 'Failed to create patient. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImport = async (patients: PatientFormData[]) => {
    setIsSubmitting(true);
    try {
      await Promise.all(patients.map(createPatient));
      await fetchPatients();
      
      toast({
        title: 'Success',
        description: `${patients.length} patients imported successfully`,
      });
      
      navigate('/doctor/patients');
    } catch (error) {
      console.error('Error importing patients:', error);
      toast({
        title: 'Error',
        description: 'Failed to import patients. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Patient</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add a new patient to your practice or import multiple patients
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsImportDialogOpen(true)}
          disabled={isSubmitting}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import CSV
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <PatientForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      <PatientImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
      />
    </div>
  );
}