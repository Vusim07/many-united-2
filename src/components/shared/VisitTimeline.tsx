import React from 'react';
import { format } from 'date-fns';
import { VisitRequest } from '../../types';
import { mockVisitFeedback, mockUsers } from '../../lib/mockData';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface VisitTimelineProps {
  visits: VisitRequest[];
}

export default function VisitTimeline({ visits }: VisitTimelineProps) {
  const sortedVisits = [...visits].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {sortedVisits.map((visit, visitIdx) => {
          const feedback = mockVisitFeedback.find((f) => f.visitId === visit.id);
          const chw = feedback ? mockUsers.find((u) => u.id === feedback.chwId) : null;
          
          return (
            <li key={visit.id}>
              <div className="relative pb-8">
                {visitIdx !== visits.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
                      visit.status === 'completed' ? 'bg-green-500' :
                      visit.status === 'accepted' ? 'bg-blue-500' :
                      visit.status === 'declined' ? 'bg-red-500' :
                      'bg-yellow-500'
                    )}>
                      <span className="text-white text-sm">{visitIdx + 1}</span>
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {visit.reason}
                        <StatusBadge status={visit.status} className="ml-2" />
                      </p>
                      {feedback && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 font-medium">
                            Feedback from {chw?.name}:
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{feedback.notes}</p>
                        </div>
                      )}
                      {visit.scheduledDate && (
                        <p className="mt-1 text-sm text-gray-500">
                          Scheduled for: {format(new Date(visit.scheduledDate), 'PPp')}
                        </p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={visit.createdAt}>
                        {format(new Date(visit.createdAt), 'MMM d, yyyy')}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}