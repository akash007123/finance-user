import { useEffect } from "react";
import { useStore } from "../store/useStore";

const CURRENCIES = [
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "AED", label: "UAE Dirham", symbol: "د.إ" },
  { code: "AFN", label: "Afghan Afghani", symbol: "؋" },
  { code: "ALL", label: "Albanian Lek", symbol: "L" },
  { code: "DZD", label: "Algerian Dinar", symbol: "د.ج" },
  { code: "ARS", label: "Argentine Peso", symbol: "$" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "BHD", label: "Bahraini Dinar", symbol: "BD" },
  { code: "BDT", label: "Bangladeshi Taka", symbol: "৳" },
  { code: "BRL", label: "Brazilian Real", symbol: "R$" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "BGN", label: "Bulgarian Lev", symbol: "лв" },
  { code: "MMK", label: "Burmese Kyat", symbol: "K" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$" },
  { code: "XAF", label: "Central African CFA Franc", symbol: "FCFA" },
  { code: "CLP", label: "Chilean Peso", symbol: "$" },
  { code: "CNY", label: "Chinese Yuan", symbol: "¥" },
  { code: "COP", label: "Colombian Peso", symbol: "$" },
  { code: "CZK", label: "Czech Koruna", symbol: "Kč" },
  { code: "DKK", label: "Danish Krone", symbol: "kr" },
  { code: "EGP", label: "Egyptian Pound", symbol: "£" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GHS", label: "Ghanaian Cedi", symbol: "₵" },
  { code: "HKD", label: "Hong Kong Dollar", symbol: "HK$" },
  { code: "HUF", label: "Hungarian Forint", symbol: "Ft" },
  { code: "ISK", label: "Icelandic Krona", symbol: "kr" },
  { code: "IDR", label: "Indonesian Rupiah", symbol: "Rp" },
  { code: "ILS", label: "Israeli New Shekel", symbol: "₪" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  { code: "JOD", label: "Jordanian Dinar", symbol: "JD" },
  { code: "KES", label: "Kenyan Shilling", symbol: "KSh" },
  { code: "KRW", label: "South Korean Won", symbol: "₩" },
  { code: "KWD", label: "Kuwaiti Dinar", symbol: "KD" },
  { code: "LKR", label: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "MAD", label: "Moroccan Dirham", symbol: "د.م." },
  { code: "MYR", label: "Malaysian Ringgit", symbol: "RM" },
  { code: "MXN", label: "Mexican Peso", symbol: "$" },
  { code: "MAD", label: "Moroccan Dirham", symbol: "د.م." },
  { code: "MMK", label: "Burmese Kyat", symbol: "K" },
  { code: "NOK", label: "Norwegian Krone", symbol: "kr" },
  { code: "NZD", label: "New Zealand Dollar", symbol: "NZ$" },
  { code: "TWD", label: "New Taiwan Dollar", symbol: "NT$" },
  { code: "NGN", label: "Nigerian Naira", symbol: "₦" },
  { code: "OMR", label: "Omani Rial", symbol: "﷼" },
  { code: "PKR", label: "Pakistani Rupee", symbol: "₨" },
  { code: "PEN", label: "Peruvian Sol", symbol: "S/." },
  { code: "PHP", label: "Philippine Peso", symbol: "₱" },
  { code: "PLN", label: "Polish Zloty", symbol: "zł" },
  { code: "QAR", label: "Qatari Riyal", symbol: "﷼" },
  { code: "RON", label: "Romanian Leu", symbol: "lei" },
  { code: "RUB", label: "Russian Ruble", symbol: "₽" },
  { code: "SAR", label: "Saudi Riyal", symbol: "﷼" },
  { code: "SGD", label: "Singapore Dollar", symbol: "S$" },
  { code: "ZAR", label: "South African Rand", symbol: "R" },
  { code: "LKR", label: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "SEK", label: "Swedish Krona", symbol: "kr" },
  { code: "CHF", label: "Swiss Franc", symbol: "CHF" },
  { code: "THB", label: "Thai Baht", symbol: "฿" },
  { code: "TRY", label: "Turkish Lira", symbol: "₺" },
  { code: "TZS", label: "Tanzanian Shilling", symbol: "TSh" },
  { code: "TND", label: "Tunisian Dinar", symbol: "د.ت" },
  { code: "UAH", label: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "VND", label: "Vietnamese Dong", symbol: "₫" },
  { code: "XOF", label: "West African CFA Franc", symbol: "CFA" }
];



export function Settings() {
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
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
          Preferences
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8 transition-all">
          {/* Currency Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Preferred Currency
            </label>
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Choose your currency for displaying amounts.
            </p>
          </div>

          <button></button>
        </div>
      </div>
    </>
  );
}
