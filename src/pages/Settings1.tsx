import { useEffect } from "react";
import { useStore } from "../store/useStore";

const CURRENCIES = [
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$" },
  { code: "CNY", label: "Chinese Yuan", symbol: "¥" },
  { code: "CHF", label: "Swiss Franc", symbol: "CHF" },
  { code: "SGD", label: "Singapore Dollar", symbol: "S$" },
  { code: "NZD", label: "New Zealand Dollar", symbol: "NZ$" },
  { code: "HKD", label: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SEK", label: "Swedish Krona", symbol: "kr" },
  { code: "NOK", label: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", label: "Danish Krone", symbol: "kr" },
  { code: "RUB", label: "Russian Ruble", symbol: "₽" },
  { code: "ZAR", label: "South African Rand", symbol: "R" },
  { code: "BRL", label: "Brazilian Real", symbol: "R$" },
  { code: "MXN", label: "Mexican Peso", symbol: "$" },
  { code: "KRW", label: "South Korean Won", symbol: "₩" },
  { code: "THB", label: "Thai Baht", symbol: "฿" },
  { code: "MYR", label: "Malaysian Ringgit", symbol: "RM" },
  { code: "IDR", label: "Indonesian Rupiah", symbol: "Rp" },
  { code: "PHP", label: "Philippine Peso", symbol: "₱" },
  { code: "AED", label: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", label: "Saudi Riyal", symbol: "﷼" },
  { code: "TRY", label: "Turkish Lira", symbol: "₺" },
];

export function Settings1() {
  const { settings, updateSettings } = useStore();

  useEffect(() => {
    const root = document.documentElement;

    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  return (
    <>
      <div>
        <select
          value={settings.currency}
          onChange={(e) => updateSettings({ currency: e.target.value })}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CURRENCIES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label} ({code})
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
