import { useFinance } from "../../context/financecontext";
import type { Transaction } from "../../context/financecontext";

type Props = {
  onEdit: (transaction: Transaction) => void;
};

export default function TransactionTable({
  onEdit,
}: Props) {
  const { transactions, deleteTransaction } =
    useFinance();

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[750px] w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Title
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Category
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Date
            </th>

            <th className="px-4 py-3 text-right text-sm font-semibold">
              Amount
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions
            .slice()
            .reverse()
            .map((item) => (
              <tr
                key={item.id}
                className="border-t transition hover:bg-slate-50"
              >
                <td className="px-4 py-4 font-medium whitespace-nowrap">
                  {item.title}
                </td>

                <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                  {item.category}
                </td>

                <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                  {item.date}
                </td>

                <td
                  className={`px-4 py-4 text-right font-semibold whitespace-nowrap ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"} ₹
                  {item.amount.toLocaleString()}
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white transition hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTransaction(item.id)
                      }
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition hover:bg-red-600"
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