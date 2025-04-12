// First Design 

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Receipt,
//   Target,
//   Settings as SettingsIcon,
//   CalendarDays,
// } from "lucide-react";
// import clsx from "clsx";

// import { Settings1 } from "../pages/Settings1";

// const navItems = [
//   { to: "/", icon: LayoutDashboard, label: "Dashboard" },
//   { to: "/transactions", icon: Receipt, label: "Transactions" },
//   { to: "/goals", icon: Target, label: "Goals" },
//   { to: "/settings", icon: SettingsIcon, label: "Settings" },
//   { to: "/calendar", icon: CalendarDays, label: "Calender" },
// ];

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       {/* Navbar */}
//       <nav className="fixed z-20 backdrop-blur-md bg-white/80 border-t border-gray-200 bottom-0 left-0 right-0 shadow-t md:top-0 md:bottom-auto md:border-t-0 md:border-b md:shadow-sm">
//         <div className="max-w-screen-xl mx-auto px-4">
//           <div className="flex justify-around md:justify-start md:space-x-10 py-4">
//             {navItems.map(({ to, icon: Icon, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   clsx(
//                     "transition-all duration-200 flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-2 text-xs md:text-base font-medium rounded-lg px-3 py-1.5",
//                     isActive
//                       ? "text-blue-600 bg-blue-50 md:bg-transparent md:border-b-2 md:border-blue-600"
//                       : "text-gray-600 hover:text-blue-500 hover:bg-blue-50 md:hover:bg-transparent"
//                   )
//                 }
//               >
//                 <Icon className="h-5 w-5 md:h-6 md:w-6" />
//                 <span>{label}</span>
//               </NavLink>
//             ))}
//             <Settings1 />
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 pt-6 pb-24 md:pt-24 md:pb-10">
//         {children}
//       </main>
//     </div>
//   );
// }


// Second Design

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Receipt,
//   Target,
//   Settings as SettingsIcon,
//   CalendarDays,
//   Menu,
//   X,
// } from "lucide-react";
// import clsx from "clsx";
// import { Settings1 } from "../pages/Settings1";

// const navItems = [
//   { to: "/", icon: LayoutDashboard, label: "Dashboard" },
//   { to: "/transactions", icon: Receipt, label: "Transactions" },
//   { to: "/goals", icon: Target, label: "Goals" },
//   { to: "/settings", icon: SettingsIcon, label: "Settings" },
//   { to: "/calendar", icon: CalendarDays, label: "Calendar" },  
// ];

// export function Layout({ children }: { children: React.ReactNode }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <div
//         className={clsx(
//           "fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 sm:block md:hidden",
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">Menu</h2>
//           <button onClick={() => setMenuOpen(false)}>
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="flex flex-col p-4 space-y-3">
//           {navItems.map(({ to, icon: Icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "flex items-center space-x-3 p-2 rounded-md transition-all",
//                   isActive
//                     ? "bg-blue-100 text-blue-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 )
//               }
//             >
//               <Icon className="w-5 h-5" />
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </div>
//       </div>

//       {!menuOpen && (
//         <button
//           className="fixed z-50 top-4 left-4 bg-white p-2 rounded-md shadow-md sm:block md:hidden"
//           onClick={() => setMenuOpen(true)}
//         >
//           <Menu className="w-6 h-6 text-gray-700" />
//         </button>
//       )}

//       <nav className="fixed z-30 bottom-0 left-0 right-0 sm:flex md:hidden bg-white border-t border-gray-200 shadow-t">
//         <div className="flex justify-around py-2">
//           {navItems.map(({ to, icon: Icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 clsx(
//                   "flex flex-col items-center text-xs font-medium",
//                   isActive
//                     ? "text-blue-600"
//                     : "text-gray-600 hover:text-blue-500"
//                 )
//               }
//             >
//               <Icon className="h-5 w-5" />
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </div>
//       </nav>

//       <nav className="hidden md:block fixed z-20 top-0 left-0 right-0 bg-white border-b shadow-sm">
//         <div className="max-w-screen-xl mx-auto px-4">
//           <div className="flex justify-start space-x-10 py-4">
//             {navItems.map(({ to, icon: Icon, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   clsx(
//                     "transition-all duration-200 flex items-center space-x-2 text-base font-medium rounded-lg px-3 py-1.5",
//                     isActive
//                       ? "text-blue-600 border-b-2 border-blue-600"
//                       : "text-gray-600 hover:text-blue-500"
//                   )
//                 }
//               >
//                 <Icon className="h-6 w-6" />
//                 <span>{label}</span>
//               </NavLink>
//             ))}
//             <Settings1 />
//           </div>
//         </div>
//       </nav>

//       <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 pt-6 pb-24 md:pt-24 md:pb-10">
//         {children}
//       </main>
//     </div>
//   );
// }




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
import Footer from "../pages/Footer";

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
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white shadow-lg z-30">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-blue-600"><img src="https://media-hosting.imagekit.io/e6930ba272704ac4/Screenshot_2025-04-11_225758-removebg-preview.png?Expires=1839000545&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=khZe1ted-7GKvZPxu1iq833jr1TtePsVChdhjAjXaI-7GS6PSgcAt2YuBJmnL4eETD5bB08wKg2d64QSxkpWOL~K8xdWxhbHafpwcKfJrmXgW3g7nk3sU13qdFhx5PS4BwRG83dyI~3IZOm5cYnOtveQddTn3L~MLpGAausBYfyokLoOArUqg7ECBhYMY57aRkMI4UfGRSRPMoXmfkLpw0njcsikdn0TAjQzzGGcvenEQAz07zDpm5rP0QT5antgFnqGMWxIY9ZExhjY~B-cWzDcKWbWsoEmaY9ooEFmVH2W5sg3FTGMlyCOpmiN97McQoH~nXvb4w~769luS4J6vQ__" alt="logo" /></h1>
        </div>
        <div className="flex flex-col p-4 space-y-3 flex-grow">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
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
          <div className="mt-auto pt-4 border-t">
            <Settings1 />
          </div>
          
        </div>
        <Footer/>
      </div>
      

      <div
        className={clsx(
          "fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 sm:block md:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold"><img src="https://media-hosting.imagekit.io/e6930ba272704ac4/Screenshot_2025-04-11_225758-removebg-preview.png?Expires=1839000545&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=khZe1ted-7GKvZPxu1iq833jr1TtePsVChdhjAjXaI-7GS6PSgcAt2YuBJmnL4eETD5bB08wKg2d64QSxkpWOL~K8xdWxhbHafpwcKfJrmXgW3g7nk3sU13qdFhx5PS4BwRG83dyI~3IZOm5cYnOtveQddTn3L~MLpGAausBYfyokLoOArUqg7ECBhYMY57aRkMI4UfGRSRPMoXmfkLpw0njcsikdn0TAjQzzGGcvenEQAz07zDpm5rP0QT5antgFnqGMWxIY9ZExhjY~B-cWzDcKWbWsoEmaY9ooEFmVH2W5sg3FTGMlyCOpmiN97McQoH~nXvb4w~769luS4J6vQ__" alt="logo" /></h2>
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

      {!menuOpen && (
        <button
          className="fixed z-50 top-4 left-4 bg-white p-2 rounded-md shadow-md sm:block md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}

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

      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 pt-6 pb-24 md:pl-72 md:pt-10">
        {children}
      </main>
    </div>
  );
}
