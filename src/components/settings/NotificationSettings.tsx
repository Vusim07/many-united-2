import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [visitReminders, setVisitReminders] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-gray-500">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Visit Reminders</Label>
            <p className="text-sm text-gray-500">
              Get reminded about upcoming visits
            </p>
          </div>
          <Switch
            checked={visitReminders}
            onCheckedChange={setVisitReminders}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Status Updates</Label>
            <p className="text-sm text-gray-500">
              Receive updates about visit status changes
            </p>
          </div>
          <Switch
            checked={statusUpdates}
            onCheckedChange={setStatusUpdates}
          />
        </div>
      </CardContent>
    </Card>
  );
}