type TransactionItemProps = {
  title: string;
  category: string;
  amount: string;
  date: string;
  income?: boolean;
};

export default function TransactionItem({
  title,
  category,
  amount,
  date,
  income = false,
}: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl p-3 hover:bg-slate-50 transition">
      <div>
        <h4 className="font-medium text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500">
          {category} • {date}
        </p>
      </div>

      <span
        className={`font-semibold ${
          income ? "text-green-600" : "text-red-500"
        }`}
      >
        {income ? "+" : "-"}
        {amount}
      </span>
    </div>
  );
}