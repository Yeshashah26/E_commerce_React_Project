import { useState, useEffect } from "react";
import { useAuth } from "../contextAPI/authProvider";
import { FaUserCircle, FaEnvelope, FaKey, FaEdit, FaEye, FaEyeSlash, FaBox, FaCheckCircle, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Local state for editing user data
  const [editData, setEditData] = useState({ username: "", email: "" });

  useEffect(() => {
    if (user) {
      setEditData({ username: user.username || "User", email: user.email });
    }
  }, [user]);

  if (!user) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <FaUserCircle size={48} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">No user logged in</h2>
        <p className="text-slate-500 mt-2">Please sign in to view your profile.</p>
      </div>
    </div>
  );

  const handleSave = () => {
    // In a real app, you would call an API or update context here
    console.log("Saved Data:", editData);
    setIsEditing(false);
  };

  const dummyOrders = [
    { id: "ORD-9432", date: "Oct 24, 2023", total: "$124.50", status: "Delivered", items: 3 },
    { id: "ORD-8921", date: "Sep 12, 2023", total: "$59.99", status: "Shipped", items: 1 },
    { id: "ORD-7104", date: "Aug 05, 2023", total: "$210.00", status: "Delivered", items: 5 }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Hello, {isEditing ? editData.username : (user.username || "User")}
        </h1>
        <p className="text-slate-500 mt-1">Manage your account information and orders</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        {/* Banner Section */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

        <div className="px-6 sm:px-8 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg flex-shrink-0">
              <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <FaUserCircle size={64} />
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                title="Edit Username and Email"
              >
                <FaEdit size={14} /> <span className="hidden sm:inline">Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 font-semibold rounded-xl hover:bg-rose-100 transition-colors"
                >
                  <FaTimes size={14} /> <span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                >
                  <FaSave size={14} /> <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 mb-6 space-x-8 px-2">
        <button
          onClick={() => setActiveTab("personal")}
          className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'personal' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'orders' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          My Orders
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "personal" && (
        <div className="grid md:grid-cols-2 gap-8 animation-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Account Details</h3>

            {/* Username Field (Editable) */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                <FaUserCircle size={18} />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-sm font-medium text-slate-500 mb-1">Username</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-900"
                  />
                ) : (
                  <p className="font-bold text-slate-900 truncate">{user.username || "User"}</p>
                )}
              </div>
            </div>

            {/* Email Field (Editable) */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                <FaEnvelope size={18} />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-sm font-medium text-slate-500 mb-1">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-900"
                  />
                ) : (
                  <p className="font-bold text-slate-900 truncate">{user.email}</p>
                )}
              </div>
            </div>

            {/* Password Field (Viewable) */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                <FaKey size={18} />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-sm font-medium text-slate-500 mb-1">Password</p>
                <div className="flex items-center gap-3">
                  <p className="font-mono font-bold text-slate-900 truncate bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    {showPassword ? user.password : "••••••••"}
                  </p>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8 animation-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800">Order History</h3>
            <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-wider">
              {dummyOrders.length} Orders
            </span>
          </div>

          <div className="space-y-4">
            {dummyOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-100 rounded-xl hover:border-indigo-100 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                    <FaBox size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{order.id}</h4>
                    <p className="text-xs text-slate-500 font-medium">Placed on {order.date} • {order.items} Items</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Total</p>
                    <p className="font-black text-slate-900">{order.total}</p>
                  </div>

                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
                    ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}
                  `}>
                    {order.status === 'Delivered' && <FaCheckCircle size={10} />}
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
            Load More Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;