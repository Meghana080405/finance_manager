import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useFinance } from "../../context/financecontext";

export default function CashFlowChart() {
  const { transactions } = useFinance();

  const monthMap: Record<
    string,
    { month: string; income: number; expense: number }
  > = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const month = date.toLocaleString("default", {
      month: "short",
    });

    if (!monthMap[month]) {
      monthMap[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "income") {
      monthMap[month].income += transaction.amount;
    } else {
      monthMap[month].expense += transaction.amount;
    }
  });

  const data = Object.values(monthMap);

  if (data.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center text-slate-500">
        No transaction data available.
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
            ]}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#2563EB"
            fill="#93C5FD"
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            fill="#FECACA"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}