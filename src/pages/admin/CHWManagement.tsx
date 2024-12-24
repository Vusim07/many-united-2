import React from 'react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCHWStore } from '@/store/chwStore';
import CHWUploadDialog from './components/CHWUploadDialog';
import AddCHWDialog from './components/AddCHWDialog';

export default function CHWManagement() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { chws, addCHW, importCHWs } = useCHWStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">CHW Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage Community Health Workers and their assignments
          </p>
        </div>
        <div className="space-x-3">
          <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add CHW
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chws.map((chw) => (
            <TableRow key={chw.id}>
              <TableCell className="font-medium">{chw.name}</TableCell>
              <TableCell>{chw.email}</TableCell>
              <TableCell>{chw.phone}</TableCell>
              <TableCell>{chw.area}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  chw.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {chw.status}
                </span>
              </TableCell>
              <TableCell>{new Date(chw.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {chws.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No CHWs added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CHWUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUploadComplete={importCHWs}
      />

      <AddCHWDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addCHW}
      />
    </div>
  );
}