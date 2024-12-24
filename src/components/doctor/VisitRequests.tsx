import React from 'react';
import { mockVisitRequests, mockPatients } from '../../lib/mockData';
import { format } from 'date-fns';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import { Textarea } from '../ui/textarea';

type VisitRequest = {
	id: string;
	patientId: string;
	reason: string;
	status: string;
	createdAt: string;
};

const columns: ColumnDef<VisitRequest>[] = [
	{
		accessorKey: 'patientName',
		header: 'Patient',
		cell: ({ row }) => {
			const patient = mockPatients.find((p) => p.id === row.original.patientId);
			return <div className='font-medium'>{patient?.name}</div>;
		},
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <StatusBadge status={row.original.status} />,
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'PPp'),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const visit = row.original;
			const patient = mockPatients.find((p) => p.id === visit.patientId);
			const handleFollowUp = (visitId: string) => {
				console.log('Request follow-up for visit:', visitId);
			};

			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline' size='sm'>
							View Details
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Visit Request Details</DialogTitle>
							<DialogDescription>
								View details and manage the visit request
							</DialogDescription>
						</DialogHeader>
						<div className='space-y-4 py-4'>
							<div>
								<h4 className='text-sm font-medium'>Patient</h4>
								<p className='text-sm text-gray-500'>{patient?.name}</p>
							</div>
							<div>
								<h4 className='text-sm font-medium'>Reason</h4>
								<p className='text-sm text-gray-500'>{visit.reason}</p>
							</div>
							<div>
								<h4 className='text-sm font-medium'>Status</h4>
								<StatusBadge status={visit.status} className='mt-1' />
							</div>
							{visit.status === 'completed' && (
								<div>
									<h4 className='text-sm font-medium mb-2'>
										Request Follow-up
									</h4>
									<Textarea
										placeholder='Enter reason for follow-up visit...'
										className='mb-2'
									/>
									<Button onClick={() => handleFollowUp(visit.id)} size='sm'>
										Request Follow-up
									</Button>
								</div>
							)}
						</div>
					</DialogContent>
				</Dialog>
			);
		},
	},
];

export default function VisitRequests() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const data = React.useMemo(() => mockVisitRequests, []);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='space-y-4'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-2xl font-semibold text-gray-900'>
						Visit Requests
					</h1>
					<p className='mt-2 text-sm text-gray-700'>
						A list of all visit requests and their current status.
					</p>
				</div>
			</div>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter patients...'
					value={
						(table.getColumn('patientName')?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table.getColumn('patientName')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
