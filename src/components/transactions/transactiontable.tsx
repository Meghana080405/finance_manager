import { useFinance } from "../../context/financecontext";
import type { Transaction } from "../../context/financecontext";

type Props = {
  onEdit: (transaction: Transaction) => void;
};

export default function TransactionTable({ onEdit }: Props) {
  const { transactions, deleteTransaction } = useFinance();

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 font-medium">{item.title}</td>

              <td className="p-4 text-slate-500">
                {item.category}
              </td>

              <td className="p-4 text-slate-500">
                {item.date}
              </td>

              <td
                className={`p-4 text-right font-semibold ${
                  item.type === "income"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {item.type === "income" ? "+" : "-"}₹
                {item.amount}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTransaction(item.id)}
                    className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}