import { useState } from "react";
import { useBudget } from "../../context/budgetcontext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddBudgetModal({
  open,
  onClose,
}: Props) {
  const { budgets, addBudget } = useBudget();

  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!limit) return;

    // Prevent duplicate category budgets
    if (budgets.some((b) => b.category === category)) {
      alert("Budget for this category already exists.");
      return;
    }

    addBudget({
      id: Date.now(),
      category,
      limit: Number(limit),
    });

    setCategory("Food");
    setLimit("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Add Budget
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            className="w-full rounded-lg border p-3"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Entertainment</option>
          </select>

          <input
            type="number"
            placeholder="Budget Limit"
            className="w-full rounded-lg border p-3"
            value={limit}
            onChange={(e) =>
              setLimit(e.target.value)
            }
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}