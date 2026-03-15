import React, { useState, useEffect } from "react";
import { FaAngleDoubleLeft, FaChartPie, FaBoxOpen, FaShoppingCart, FaUser, FaClock, FaSignOutAlt, FaCog } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/authProvider";

const SESSION_DURATION = 5 * 60; // 5 minutes in seconds

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);

  useEffect(() => {
    // Only run the timer if there's a logged in user
    if (!user) return;

    let startTimestamp = parseInt(localStorage.getItem('loginTimestamp'), 10);
    if (!startTimestamp) {
      startTimestamp = Date.now();
      localStorage.setItem('loginTimestamp', startTimestamp.toString());
    }

    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);

      if (elapsedSeconds >= SESSION_DURATION) {
        clearInterval(timer);
        alert("Session expired and need to re-login.");
        logout();
        navigate("/");
      } else {
        setProgress((elapsedSeconds / SESSION_DURATION) * 100);
        setTimeLeft(SESSION_DURATION - elapsedSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [logout, user, navigate]);

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { href: "/products", label: "Products", icon: <FaBoxOpen /> },
    { href: "/cart", label: "Cart", icon: <FaShoppingCart /> },
    { href: "/profile", label: "Profile", icon: <FaUser /> },
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
          lg:translate-x-0 lg:sticky lg:block
        `}
      >
        {/* 1. Sidebar Container (The Magic happens here with flex-col) */}
        <div className="flex flex-col h-full">

          {/* Header/Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              {/* <div className="w-8 h-8 bg-indigo-600 rounded shadow-indigo-200 shadow-lg flex items-center justify-center text-white font-bold"></div> */}
              <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-slate-800 tracking-tight">E-Commerce</span>
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

          {/* 3. Bottom Section (Session Time & Logout) */}
          <div className="p-4 border-t border-slate-200 bg-white">

            {/* Session Timeout Progress Bar */}
            <div className="mb-4 px-3">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1.5 uppercase tracking-wider">
                <span>Session</span>
                <span className={timeLeft < 60 ? 'text-red-500 animate-pulse' : ''}>
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 60 ? 'bg-red-500' : 'bg-red-400'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <SidebarLink
              href="/"
              label="Sign Out"
              icon={<FaSignOutAlt />}
              isLogout
              onClick={() => logout()}
            />
          </div>

        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ href, label, icon, isActive, isLogout, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
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