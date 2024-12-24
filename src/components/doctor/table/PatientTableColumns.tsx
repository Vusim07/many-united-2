import { format } from 'date-fns';
import { NavigateFunction } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types';

export const PatientTableColumns = (navigate: NavigateFunction): ColumnDef<Patient>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => format(new Date(row.getValue('dateOfBirth')), 'PP'),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'medicalHistory',
    header: 'Medical History',
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue('medicalHistory')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/doctor/patients/${row.original.id}`)}
      >
        View
      </Button>
    ),
  },
];