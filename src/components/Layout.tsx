import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Target,
  Settings as SettingsIcon,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: Receipt, label: 'Transactions' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/settings', icon: SettingsIcon, label: 'Settings' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="fixed z-10 bg-white border-t border-gray-200 bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around md:justify-start md:space-x-8 py-3">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-2 text-xs md:text-sm font-medium',
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  )
                }
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 pb-20 pt-6 md:pt-24 md:pb-6">
        {children}
      </main>
    </div>
  );
}
