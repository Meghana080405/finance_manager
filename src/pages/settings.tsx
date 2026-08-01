import Card from "../components/ui/card";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account preferences.
        </p>
      </div>

      {/* Profile */}
      <Card title="Profile">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
            M
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Meghana
            </h2>

            <p className="text-slate-500">
              me@example.com
            </p>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card title="Preferences">
        <div className="space-y-6">

          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input type="checkbox" className="h-5 w-5" />
          </div>

          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </div>

          <div className="flex items-center justify-between">
            <span>Currency</span>

            <select className="rounded-lg border border-slate-300 px-3 py-2">
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>

        </div>
      </Card>

      {/* Save Button */}
      <div>
        <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  );
}