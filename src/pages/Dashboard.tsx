import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useStore } from "../store/useStore";
import { formatCurrency } from "../utils/format";

const COLORS = [
  "#FF6F61",
  "#6C5CE7",
  "#00B894",
  "#FDCB6E",
  "#E17055",
  "#0984E3",
  "#D63031",
  "#00CEC9",
  "#B53471",
  "#6AB04C",
  "#2D3436",
];

export function Dashboard() {
  const { transactions, settings } = useStore();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpenses;

  const categoryData = Object.entries(
    transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-10 px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Income",
            value: totalIncome,
            color: "text-green-500",
          },
          {
            title: "Total Expenses",
            value: totalExpenses,
            color: "text-red-500",
          },
          {
            title: "Savings",
            value: savings,
            color: savings >= 0 ? "text-blue-500" : "text-red-500",
          },
        ].map(({ title, value, color }) => (
          <div
            key={title}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h3 className="text-gray-700 text-base font-semibold">{title}</h3>
            <p className={`mt-2 text-3xl font-bold ${color}`}>
              {formatCurrency(value, settings.currency)}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">
            Monthly Overview
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "#4B5563" }}
                />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">
            Expense Categories
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#6366F1"
                  label={({ name }) => name}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "#4B5563" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
