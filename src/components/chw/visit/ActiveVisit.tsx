import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { VisitDetails } from '@/types/visit';
import { Patient } from '@/types';
import { useVisitStore } from '@/store/visitStore';
import VisitLogForm from './VisitLogForm';
import VisitTimeline from './VisitTimeline';

interface ActiveVisitProps {
  visit: VisitDetails;
  patient: Patient;
  onComplete: () => void;
}

export default function ActiveVisit({ visit, patient, onComplete }: ActiveVisitProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addVisitUpdate, completeVisit } = useVisitStore();

  const handleLogSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      addVisitUpdate(visit.id, {
        type: data.type,
        content: data.notes,
        chwId: '2', // TODO: Get from auth store
      });
      
      if (data.type === 'vital') {
        addVisitUpdate(visit.id, {
          type: 'vital',
          content: `${data.vitalType}: ${data.vitalValue} ${data.vitalUnit}`,
          chwId: '2',
        });
      }
      
      toast({
        title: "Update Added",
        description: "Visit log has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visit log. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async () => {
    try {
      completeVisit(visit.id);
      toast({
        title: "Visit Completed",
        description: "The visit has been marked as completed.",
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete visit. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Active Visit</h2>
          <p className="mt-1 text-sm text-gray-500">
            Patient: {patient.name}
          </p>
        </div>
        <Button onClick={handleComplete}>Complete Visit</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <VisitLogForm onSubmit={handleLogSubmit} isSubmitting={isSubmitting} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Visit Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitTimeline updates={visit.updates} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Medical History</h3>
              <p className="text-sm text-gray-500">{patient.medicalHistory}</p>
            </div>
            <div>
              <h3 className="font-medium">Contact Information</h3>
              <p className="text-sm text-gray-500">{patient.phone}</p>
              <p className="text-sm text-gray-500">{patient.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}