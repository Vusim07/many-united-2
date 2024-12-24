export default function CareTeamUpdates() {
	const updates = [
		{
			id: 1,
			name: 'John Doe (CHW)',
			message:
				'Completed the home visit for Patient A. Patient seems stable but requires follow-up for medication refill.',
			time: '2 hours ago',
		},
		{
			id: 2,
			name: 'Jane Smith (CHW)',
			message: 'Scheduled a visit with Patient B for tomorrow at 10 AM.',
			time: '5 hours ago',
		},
	];

	return (
		<div className='space-y-4'>
			<h2 className='text-lg font-semibold text-gray-800'>Recent Updates</h2>
			<ul className='space-y-2'>
				{updates.map((update) => (
					<li
						key={update.id}
						className='p-4 border rounded-lg bg-white shadow-sm'
					>
						<p className='font-semibold text-gray-900'>{update.name}</p>
						<p className='text-sm text-gray-600 mt-1'>{update.message}</p>
						<span className='text-xs text-gray-500 mt-2 block'>
							{update.time}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
