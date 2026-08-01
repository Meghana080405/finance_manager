import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useFinance } from "../../context/financecontext";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#A855F7",
  "#F97316",
  "#EC4899",
  "#FACC15",
  "#06B6D4",
];

export default function ExpensePieChart() {
  const { transactions } = useFinance();

  const categoryTotals: Record<string, number> = {};

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        transaction.amount;
    });

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  if (data.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center text-slate-500">
        No expense data available.
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
  formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]}
/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}