import { useState } from "react";
import { useFinance } from "../context/financecontext";
import type { Transaction } from "../context/financecontext";
import TransactionTable from "../components/transactions/transactiontable";
import AddTransactionModal from "../components/modals/addtransactionmodal";

export default function Transactions() {
  const { transactions } = useFinance();

  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  function handleAdd() {
    setSelectedTransaction(null);
    setOpen(true);
  }

  function handleEdit(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setOpen(true);
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all your transactions.
          </p>

          <p className="mt-3 text-base font-semibold text-blue-600 sm:text-lg">
            Total Transactions: {transactions.length}
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          + Add Transaction
        </button>
      </div>

      <TransactionTable onEdit={handleEdit} />

      <AddTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}