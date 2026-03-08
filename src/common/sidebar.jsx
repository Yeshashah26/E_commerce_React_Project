import React, { useState } from "react";
import { FaAngleDoubleLeft, FaChartPie, FaBoxOpen, FaShoppingCart, FaUser, FaClock, FaSignOutAlt, FaCog } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { href: "/products", label: "Products", icon: <FaBoxOpen /> },
    { href: "/cart", label: "Cart", icon: <FaShoppingCart /> },
    { href: "/profile", label: "Profile", icon: <FaUser /> },
    { href: "/session_time", label: "Session Time", icon: <FaClock /> },
  ];

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">R</div>
          <span className="font-bold text-slate-800">React Admin</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <HiMenuAlt2 size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-slate-50 border-r border-slate-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        {/* 1. Sidebar Container (The Magic happens here with flex-col) */}
        <div className="flex flex-col h-full">
          
          {/* Header/Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded shadow-indigo-200 shadow-lg flex items-center justify-center text-white font-bold">R</div>
              <span className="font-bold text-slate-800 tracking-tight">React E-Commerce</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
              <FaAngleDoubleLeft size={18} />
            </button>
          </div>

          {/* 2. Main Menu (flex-1 pushes everything else down) */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Overview
            </p>
            {menuItems.map((item) => (
              <SidebarLink 
                key={item.href} 
                {...item} 
                isActive={location.pathname === item.href} 
              />
            ))}
          </nav>

          {/* 3. Bottom Section (Logout & User Profile) */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <SidebarLink 
              href="/logout" 
              label="Sign Out" 
              icon={<FaSignOutAlt />} 
              isLogout 
            />
          </div>

        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ href, label, icon, isActive, isLogout }) => (
  <Link
    to={href}
    className={`
      group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
      ${isActive 
        ? "bg-indigo-50 text-indigo-700 border border-indigo-100" 
        : isLogout 
          ? "text-slate-600 hover:bg-red-50 hover:text-red-600" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }
    `}
  >
    <span className={`${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`}>
      {icon}
    </span>
    {label}
  </Link>
);

export default Sidebar;