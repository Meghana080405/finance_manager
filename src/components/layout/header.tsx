import { Bell, Menu, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Icon */}
        <button className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden">
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-xl border border-slate-200 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500 md:w-72 lg:w-80"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        <Bell
          className="text-slate-500"
          size={22}
        />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          M
        </div>
      </div>
    </header>
  );
}