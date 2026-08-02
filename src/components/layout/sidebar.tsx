import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PieChart,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: Receipt,
  },
  {
    name: "Budgets",
    path: "/budgets",
    icon: Wallet,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: PieChart,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64 border-r border-slate-200 bg-white
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:relative
          lg:translate-x-0
          lg:flex
          lg:flex-col
          lg:min-h-screen
          lg:shrink-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              FinFlow
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Personal Finance
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}