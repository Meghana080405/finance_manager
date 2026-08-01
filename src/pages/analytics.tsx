import Card from "../components/ui/card";
import ExpensePieChart from "../components/analytics/expensepiechart";
import { useFinance } from "../context/financecontext";

export default function Analytics() {
  const {
    totalIncome,
    totalExpense,
    totalBalance,
    transactions,
  } = useFinance();

  const budgetLimit = 50000;

  const budgetUsed =
    totalExpense === 0
      ? 0
      : Math.min(
          100,
          Math.round((totalExpense / budgetLimit) * 100)
        );

  const totalTransactions = transactions.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Understand your spending habits.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card title="Expense Breakdown">
          <ExpensePieChart />
        </Card>

        {/* Summary */}
        <Card title="Financial Summary">
          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Income</span>

              <span className="font-semibold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Expenses</span>

              <span className="font-semibold text-red-500">
                ₹{totalExpense.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Current Balance</span>

              <span className="font-semibold text-blue-600">
                ₹{totalBalance.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Transactions</span>

              <span className="font-semibold">
                {totalTransactions}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Budget Used</span>

              <span
                className={`font-semibold ${
                  budgetUsed >= 80
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {budgetUsed}%
              </span>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}