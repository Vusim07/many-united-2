import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <ProfileSettings />
        <NotificationSettings />
      </div>
    </div>
  );
}