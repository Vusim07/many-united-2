import React from 'react';

export default function TelehealthQuickAccess() {
	const telehealthAppointments = [
		{
			id: 1,
			patient: 'Patient C',
			time: 'Today at 3:00 PM',
		},
		{
			id: 2,
			patient: 'Patient D',
			time: 'Tomorrow at 11:00 AM',
		},
	];

	return (
		<div className='space-y-4'>
			<h2 className='text-lg font-semibold text-gray-800'>
				Telehealth Quick Access
			</h2>
			<ul className='space-y-2'>
				{telehealthAppointments.map((appointment) => (
					<li
						key={appointment.id}
						className='p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center'
					>
						<div>
							<p className='font-semibold text-gray-900'>
								{appointment.patient}
							</p>
							<p className='text-sm text-gray-600'>{appointment.time}</p>
						</div>
						<button className='px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow'>
							Join Call
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
