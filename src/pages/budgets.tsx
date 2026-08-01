import { useState } from "react";

import BudgetCard from "../components/budgets/budgetcard";
import AddBudgetModal from "../components/modals/addbudgetmodal";

import { useBudget } from "../context/budgetcontext";
import { useFinance } from "../context/financecontext";

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
];

export default function Budgets() {
  const { budgets } = useBudget();
  const { transactions } = useFinance();

  const [open, setOpen] = useState(false);

  const categoryTotals: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Budgets
          </h1>

          <p className="mt-2 text-slate-500">
            Track your monthly spending limits.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Add Budget
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No budgets added yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {budgets.map((budget, index) => (
            <BudgetCard
              key={budget.id}
              category={budget.category}
              spent={categoryTotals[budget.category] || 0}
              limit={budget.limit}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
      )}

      <AddBudgetModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}