import HeaderBar from "./headerbar"
import { FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart, FaTags, FaClock, FaPercent, FaGift } from "react-icons/fa";

const Dashboard = () => {
    const userData = JSON.parse(localStorage.getItem('user')) || { username: 'Admin' };

    const upcomingSales = [
        { id: 1, name: "Summer Clearance Mega Sale", date: "Starts Tomorrow", discount: "Up to 70% Off", status: "Upcoming", color: "text-amber-600 bg-amber-50 border-amber-200" },
        { id: 2, name: "Electronics Flash Sale", date: "Ends in 12h:30m", discount: "Flat 40% Off", status: "Active", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
        { id: 3, name: "Back to School Promo", date: "Aug 15 - Aug 30", discount: "Extra 20% on Laptops", status: "Upcoming", color: "text-indigo-600 bg-indigo-50 border-indigo-200" }
    ];

    const bigOffers = [
        { id: 1, code: "WELCOME50", desc: "First-time buyers save half price on carts over $100", icon: <FaGift size={20} /> },
        { id: 2, code: "FREESHIP", desc: "Free overnight delivery available for premium subscribers", icon: <FaBoxOpen size={20} /> }
    ];

    return (
        <div className="flex flex-col min-h-screen border-l border-slate-200">
            {/* <HeaderBar categories={[]} onSearch={() => { }} onFilter={() => { }} /> */}
            <div className="flex-1 p-6 lg:p-8 bg-slate-50">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, {userData.username}!</p>
                </div>

                {/* Advanced Dashboard Sections (Sales & Offers) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Active and Upcoming Sales List */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <FaTags className="text-indigo-500" /> Active & Upcoming Sales
                            </h2>
                            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider">View All</button>
                        </div>
                        <div className="p-6 space-y-5 flex-1 bg-slate-50/30">
                            {upcomingSales.map(sale => (
                                <div key={sale.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 shadow-sm rounded-xl hover:border-indigo-200 transition-all group relative overflow-hidden">
                                    {/* Decorative side accent */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${sale.color.split(' ')[1]}`}></div>

                                    <div className="pl-2">
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{sale.name}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-widest ${sale.color}`}>
                                                {sale.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                            <p className="flex items-center gap-1.5"><FaClock className="text-slate-400" /> {sale.date}</p>
                                            <p className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded"><FaPercent size={10} /> {sale.discount}</p>
                                        </div>
                                    </div>

                                    <button className="mt-4 sm:mt-0 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                                        Manage
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Big Offers Banner */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg border border-indigo-500 overflow-hidden relative text-white flex flex-col">
                        {/* Decorative Background Circles */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-12 -left-12 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>

                        <div className="p-6 lg:p-8 relative z-10 flex-1 flex flex-col">
                            <h2 className="text-2xl font-black mb-2 drop-shadow-sm">BIG OFFERS 🔥</h2>
                            <p className="text-indigo-100 text-sm font-medium mb-8">Share these exclusive promo codes with your users to boost your store revenue.</p>

                            <div className="space-y-4 flex-1">
                                {bigOffers.map(offer => (
                                    <div key={offer.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                                        <div className="w-10 h-10 mt-1 bg-white/20 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
                                            {offer.icon}
                                        </div>
                                        <div>
                                            <div className="inline-block px-2 py-1 bg-white text-indigo-700 rounded font-black tracking-widest text-sm mb-2 shadow-sm">
                                                {offer.code}
                                            </div>
                                            <p className="text-sm font-medium leading-snug text-indigo-50">{offer.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                Generate New Promo Code
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;