import { useStore } from '../store/useStore';

const CURRENCIES = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'AUD', label: 'Australian Dollar' },
  { code: 'CAD', label: 'Canadian Dollar' },
  { code: 'INR', label: 'Indian Rupee' },
];

export function Settings() {
  const { settings, updateSettings } = useStore();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={settings.currency}
            onChange={(e) => updateSettings({ currency: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {CURRENCIES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label} ({code})
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Choose your preferred currency for displaying amounts
          </p>
        </div>
      </div>
    </div>
  );
}