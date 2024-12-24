import { cn } from '../../lib/utils';

interface StatusBadgeProps {
	status: 'pending' | 'accepted' | 'completed' | 'declined';
	className?: string;
}

const statusStyles = {
	pending: 'bg-yellow-100 text-yellow-800',
	accepted: 'bg-blue-100 text-blue-800',
	completed: 'bg-green-100 text-green-800',
	declined: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
				statusStyles[status],
				className,
			)}
		>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}
