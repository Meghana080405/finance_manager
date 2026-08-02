import { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PieChart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm lg:hidden">
        <h1 className="text-xl font-bold text-blue-600">
          FinFlow
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between border-b p-6 lg:hidden">
          <h1 className="text-2xl font-bold text-blue-600">
            FinFlow
          </h1>

          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden border-b p-6 lg:block">
          <h1 className="text-2xl font-bold text-blue-600">
            FinFlow
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Personal Finance
          </p>
        </div>

        <nav className="mt-6 px-4">
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