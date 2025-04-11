import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Target,
  Settings as SettingsIcon,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import { Settings1 } from "../pages/Settings1";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/transactions", icon: Receipt, label: "Transactions" },
  { to: "/goals", icon: Target, label: "Goals" },
  { to: "/settings", icon: SettingsIcon, label: "Settings" },
  { to: "/calendar", icon: CalendarDays, label: "Calendar" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Sidebar Drawer (Slide-in from Left) */}
      <div
        className={clsx(
          "fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 sm:block md:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                clsx(
                  "flex items-center space-x-3 p-2 rounded-md transition-all",
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Hamburger Menu Button (only when menu is closed) */}
      {!menuOpen && (
        <button
          className="fixed z-50 top-4 left-4 bg-white p-2 rounded-md shadow-md sm:block md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Bottom Navbar (Mobile Only) */}
      <nav className="fixed z-30 bottom-0 left-0 right-0 sm:flex md:hidden bg-white border-t border-gray-200 shadow-t">
        <div className="flex justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center text-xs font-medium",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Top Navbar (Desktop Only) */}
      <nav className="hidden md:block fixed z-20 top-0 left-0 right-0 bg-white border-b shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-start space-x-10 py-4">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    "transition-all duration-200 flex items-center space-x-2 text-base font-medium rounded-lg px-3 py-1.5",
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  )
                }
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </NavLink>
            ))}
            <Settings1 />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 pt-6 pb-24 md:pt-24 md:pb-10">
        {children}
      </main>
    </div>
  );
}
