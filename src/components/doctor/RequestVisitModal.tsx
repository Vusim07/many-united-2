import React from 'react';
import { Patient } from '../../types';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RequestVisitModalProps {
	patient: Patient;
	onClose: () => void;
	open: boolean;
}

export default function RequestVisitModal({
	patient,
	onClose,
	open,
}: RequestVisitModalProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement visit request submission
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Refer {patient.name}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='reason'>Reason for referral</Label>
						<Textarea
							id='reason'
							rows={3}
							placeholder='Enter the reason for referral'
							required
						/>
					</div>
					<DialogFooter>
						<Button type='button' variant='outline' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit'>Submit Request</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
