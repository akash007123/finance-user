import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Target,
  Settings as SettingsIcon,
  CalendarDays,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: Receipt, label: 'Transactions' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/settings', icon: SettingsIcon, label: 'Settings' },
  { to: '/calendar', icon: CalendarDays, label: 'Calender' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Navbar */}
      <nav className="fixed z-20 backdrop-blur-md bg-white/80 border-t border-gray-200 bottom-0 left-0 right-0 shadow-t md:top-0 md:bottom-auto md:border-t-0 md:border-b md:shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around md:justify-start md:space-x-10 py-4">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'transition-all duration-200 flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-2 text-xs md:text-base font-medium rounded-lg px-3 py-1.5',
                    isActive
                      ? 'text-blue-600 bg-blue-50 md:bg-transparent md:border-b-2 md:border-blue-600'
                      : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50 md:hover:bg-transparent'
                  )
                }
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                <span>{label}</span>
              </NavLink>
            ))}
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
