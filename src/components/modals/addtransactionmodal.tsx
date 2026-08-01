import { useEffect, useState } from "react";
import { useFinance } from "../../context/financecontext";
import type { Transaction } from "../../context/financecontext";

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
};

export default function AddTransactionModal({
  open,
  onClose,
  transaction,
}: Props) {
  const { addTransaction, editTransaction } = useFinance();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState<"income" | "expense">("expense");

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setType(transaction.type);
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setType("expense");
    }
  }, [transaction, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !amount) return;

    if (transaction) {
      editTransaction({
        ...transaction,
        title,
        amount: Number(amount),
        category,
        type,
      });
    } else {
      addTransaction({
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        type,
        date: new Date().toLocaleDateString(),
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="w-full rounded-lg border p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Entertainment</option>
            <option>Salary</option>
          </select>

          <select
            className="w-full rounded-lg border p-3"
            value={type}
            onChange={(e) =>
              setType(e.target.value as "income" | "expense")
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
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
              {transaction ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}