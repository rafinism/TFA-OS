export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage TFA system settings and administrative preferences.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">
          Settings modules will be built here.
        </p>
      </div>
    </div>
  );
}