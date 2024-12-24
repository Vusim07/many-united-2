import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
}

export function MetricCard({ title, value, icon: Icon, description }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="mt-1">
            <p className="text-3xl font-semibold text-blue-600">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}