import { AccountSettings } from '@/components/account/settings';

export default function AccountSettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <p className="mt-2 text-gray-500">Manage your account settings here.</p>
      <div className="mt-8 max-w-2xl">
        <AccountSettings />
      </div>
    </div>
  );
}
