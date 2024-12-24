import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" placeholder="smtp.example.com" />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" placeholder="587" />
            </div>
            <Button>Save Email Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Clear System Cache
            </Button>
            <Button variant="outline" className="w-full">
              Download System Logs
            </Button>
            <Button variant="destructive" className="w-full">
              Reset System
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}