type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        {title}
      </h2>

      {children}
    </div>
  );
}