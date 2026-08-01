type BudgetCardProps = {
  category: string;
  spent: number;
  limit: number;
  color: string;
};

export default function BudgetCard({
  category,
  spent,
  limit,
  color,
}: BudgetCardProps) {
  const percentage = (spent / limit) * 100;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {category}
        </h2>

        <span className="text-sm text-slate-500">
          ₹{spent} / ₹{limit}
        </span>
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-200">
        <div
          className={`${color} h-3 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {percentage.toFixed(0)}% used
      </p>
    </div>
  );
}