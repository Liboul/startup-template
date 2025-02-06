import { CreateOrganizationForm } from '@/components/organization/create-organization-form';

export default function OrganizationOnboardingPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Welcome to Startup Template</h1>
      <p className="text-muted-foreground">
        {
          "Let's create your organization, unless you are expecting an invitation?"
        }
      </p>
      <CreateOrganizationForm />
    </div>
  );
}
