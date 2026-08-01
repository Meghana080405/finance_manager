import StatCard from "../components/ui/statcard";
import Card from "../components/ui/card";
import CashFlowChart from "../components/charts/cashflowchart";
import TransactionItem from "../components/dashboard/transactionitem";

import { useFinance } from "../context/financecontext";
import { useBudget } from "../context/budgetcontext";

export default function Dashboard() {
  const {
    transactions,
    totalBalance,
    totalIncome,
    totalExpense,
  } = useFinance();

  const { budgets } = useBudget();

  // Top Categories
  const categoryTotals: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    });

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your finances.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Balance"
          value={`₹${totalBalance.toLocaleString()}`}
          change=""
        />

        <StatCard
          title="Income"
          value={`₹${totalIncome.toLocaleString()}`}
          change=""
        />

        <StatCard
          title="Expenses"
          value={`₹${totalExpense.toLocaleString()}`}
          change=""
          positive={false}
        />

        <StatCard
          title="Transactions"
          value={transactions.length.toString()}
          change=""
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <Card title="Cash Flow">
            <CashFlowChart />
          </Card>
        </div>

        <Card title="Budget Progress">
          <div className="space-y-6">

            {budgets.length === 0 ? (
              <p className="py-6 text-center text-slate-500">
                No budgets created yet.
              </p>
            ) : (
              budgets.map((budget) => {
                const spent =
                  categoryTotals[budget.category] || 0;

                const percent =
                  budget.limit > 0
                    ? Math.min(
                        Math.round(
                          (spent / budget.limit) * 100
                        ),
                        100
                      )
                    : 0;

                return (
                  <div key={budget.id}>

                    <div className="flex justify-between text-sm">
                      <span>{budget.category}</span>
                      <span>{percent}%</span>
                    </div>

                    <div className="mt-2 h-3 rounded-full bg-slate-200">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          percent >= 100
                            ? "bg-red-500"
                            : percent >= 80
                            ? "bg-yellow-500"
                            : "bg-blue-600"
                        }`}
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      ₹{spent.toLocaleString()} / ₹
                      {budget.limit.toLocaleString()}
                    </p>

                  </div>
                );
              })
            )}

          </div>
        </Card>

      </div>

      {/* Recent Transactions & Top Categories */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <Card title="Recent Transactions">

            <div className="space-y-2">

              {transactions.length === 0 ? (
                <p className="py-6 text-center text-slate-500">
                  No transactions yet.
                </p>
              ) : (
                transactions
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((item) => (
                    <TransactionItem
                      key={item.id}
                      title={item.title}
                      category={item.category}
                      amount={`₹${item.amount.toLocaleString()}`}
                      date={item.date}
                      income={item.type === "income"}
                    />
                  ))
              )}

            </div>

          </Card>
        </div>

        <Card title="Top Categories">

          <div className="space-y-5">

            {topCategories.length === 0 ? (
              <p className="text-slate-500">
                No expense data.
              </p>
            ) : (
              topCategories.map(([category, amount]) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span>{category}</span>

                  <span className="font-medium">
                    ₹{amount.toLocaleString()}
                  </span>
                </div>
              ))
            )}

          </div>

        </Card>

      </div>

    </div>
  );
}