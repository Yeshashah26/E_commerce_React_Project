import React, { useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-[100] animate-slide-in">
      <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-700 min-w-[300px]">
        <div className="text-green-400">
          <FaCheckCircle size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">Success!</p>
          <p className="text-xs text-slate-400">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <FaTimes size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;