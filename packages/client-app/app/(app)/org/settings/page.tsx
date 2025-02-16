import { OrganizationSettings } from '@/components/organization/settings';

export default function OrganizationSettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Organization Settings</h1>
      <p className="mt-2 text-gray-500">
        Manage your organization settings here.
      </p>
      <div className="mt-8 max-w-2xl">
        <OrganizationSettings />
      </div>
    </div>
  );
}
