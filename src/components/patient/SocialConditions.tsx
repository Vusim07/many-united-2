import React from 'react';
import { Home, Users, Bus, Briefcase, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SocialCondition {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'stable' | 'at-risk' | 'critical';
}

interface SocialConditionsProps {
  conditions: SocialCondition[];
}

const statusColors = {
  stable: 'text-green-600 bg-green-50',
  'at-risk': 'text-yellow-600 bg-yellow-50',
  critical: 'text-red-600 bg-red-50',
};

export default function SocialConditions({ conditions }: SocialConditionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Social Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="mr-3">{condition.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{condition.label}</p>
                  <p className="text-sm text-gray-500">{condition.value}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[condition.status]}`}>
                {condition.status.charAt(0).toUpperCase() + condition.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}