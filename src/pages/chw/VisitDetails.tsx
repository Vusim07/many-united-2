import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVisitRequests, mockPatients } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VisitTimeline from '@/components/shared/VisitTimeline';
import PatientInfo from './components/PatientInfo';
import VisitInfo from './components/VisitInfo';

export default function VisitDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [declineReason, setDeclineReason] = useState('');
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  
  const visit = mockVisitRequests.find(v => v.id === id);
  const patient = visit ? mockPatients.find(p => p.id === visit.patientId) : null;
  
  if (!visit || !patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Visit not found</h2>
        <p className="mt-2 text-gray-500">The requested visit could not be found.</p>
      </div>
    );
  }

  const patientVisits = mockVisitRequests.filter(v => v.patientId === patient.id);

  const handleAccept = () => {
    toast({
      title: "Visit Accepted",
      description: "The visit has been added to your schedule.",
    });
    navigate('/chw/schedule');
  };

  const handleDecline = () => {
    if (!declineReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for declining the visit.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Visit Declined",
      description: "The visit request has been declined.",
    });
    setIsDeclineDialogOpen(false);
    navigate('/chw');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Visit Details</h1>
        <div className="space-x-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          {visit.status === 'pending' && (
            <>
              <Button onClick={handleAccept}>Accept Visit</Button>
              <Button 
                variant="destructive" 
                onClick={() => setIsDeclineDialogOpen(true)}
              >
                Decline Visit
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientInfo patient={patient} />
        <VisitInfo visit={visit} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visit History</CardTitle>
        </CardHeader>
        <CardContent>
          <VisitTimeline visits={patientVisits} />
        </CardContent>
      </Card>

      <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Visit Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for declining this visit request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Enter reason for declining the visit..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeclineDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDecline}
              >
                Decline Visit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}