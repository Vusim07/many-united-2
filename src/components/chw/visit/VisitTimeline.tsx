import React from 'react';
import { format } from 'date-fns';
import { VisitUpdate } from '@/types/visit';
import { cn } from '@/lib/utils';

interface VisitTimelineProps {
  updates: VisitUpdate[];
}

export default function VisitTimeline({ updates }: VisitTimelineProps) {
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {sortedUpdates.map((update, updateIdx) => (
          <li key={update.id}>
            <div className="relative pb-8">
              {updateIdx !== updates.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
                      update.type === 'vital' ? 'bg-blue-500' :
                      update.type === 'medication' ? 'bg-purple-500' :
                      update.type === 'status' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    )}
                  >
                    <span className="text-white text-sm">
                      {update.type.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {update.content}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={update.timestamp}>
                      {format(new Date(update.timestamp), 'PPp')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}