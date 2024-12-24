import React, { useState } from 'react';
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
import { CHWData } from '@/types/admin';

interface CHWUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: (data: CHWData[]) => void;
}

export default function CHWUploadDialog({ 
  open, 
  onOpenChange,
  onUploadComplete 
}: CHWUploadDialogProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const chws = results.data as CHWData[];
        onUploadComplete(chws);
        toast({
          title: "Success",
          description: `${chws.length} CHWs imported successfully`,
        });
        onOpenChange(false);
      },
      error: () => {
        toast({
          title: "Error",
          description: "Failed to parse CSV file",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload CHWs</DialogTitle>
          <DialogDescription>
            Upload a CSV file containing CHW information.
            The file should have the following columns: name, email, phone, area
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}