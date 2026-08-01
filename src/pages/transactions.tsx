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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Transactions
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all your transactions.
          </p>

          <p className="mt-3 text-lg font-semibold text-blue-600">
            Total Transactions: {transactions.length}
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Transaction
        </button>
      </div>

      <TransactionTable
        onEdit={handleEdit}
      />

      <AddTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}