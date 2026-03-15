import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const SessionTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sessionStart] = useState(new Date(Date.now() - 45 * 60000)); // Dummy start time (45 mins ago)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDuration = (start, end) => {
        const diff = Math.floor((end - start) / 1000);
        const hours = Math.floor(diff / 3600);
        const mins = Math.floor((diff % 3600) / 60);
        const secs = diff % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Session Time</h1>
                <p className="text-slate-500 mt-1">Monitor your active session details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Current Time Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                            <FaClock size={24} />
                        </div>
                        <h2 className="text-lg font-bold opacity-90">Current Time</h2>
                    </div>
                    <div className="text-5xl font-black tracking-tight mb-2 font-mono">
                        {currentTime.toLocaleTimeString()}
                    </div>
                    <p className="text-indigo-200 font-medium flex items-center gap-2 mt-4">
                        <FaCalendarAlt size={14} />
                        {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Session Duration Card */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                            <FaHistory size={24} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Active Session</h2>
                    </div>
                    <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 font-mono">
                        {formatDuration(sessionStart, currentTime)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-6">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        Started at {sessionStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-amber-50 rounded-xl border border-amber-200 p-4 shrink-0 shadow-sm flex items-start gap-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                    <FaClock size={16} />
                </div>
                <div>
                    <h4 className="font-bold text-amber-800 text-sm mb-1">Session Expiry Warning</h4>
                    <p className="text-xs text-amber-600/80">Your session will automatically expire after 2 hours of inactivity. Please save any pending work to avoid data loss.</p>
                </div>
            </div>
        </div>
    );
}

export default SessionTime;
