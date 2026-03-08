import { useProduct } from "../contextAPI/productProvider";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useProduct();

  const getGrandTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-slate-500 mt-1">Review your items before checkout</p>
        </div>

        {(!cart || cart.length === 0) ? (
          <div className="bg-white border border-slate-200 p-16 rounded-3xl shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <FaShoppingCart size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SECTION - CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 space-y-0 divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center py-6 gap-6 first:pt-0 last:pb-0">
                      
                      {/* Product Info Section - Added min-w-0 to allow truncation */}
                      <div className="flex items-center gap-4 flex-1 w-full min-w-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl p-2 flex-shrink-0 border border-slate-100">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                        
                        {/* Title Container - Added min-w-0 */}
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="font-bold text-slate-800 truncate leading-tight mb-1" 
                            title={item.title} // Shows full title on hover
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded uppercase tracking-wider">
                            ${item.price}
                          </p>
                        </div>
                      </div>

                      {/* Controls Group - Fixed widths ensure alignment */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-8 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shrink-0">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-white text-slate-600 rounded-lg hover:text-indigo-600 shadow-sm transition-all active:scale-90"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="w-10 text-center font-bold text-slate-800 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-white text-slate-600 rounded-lg hover:text-indigo-600 shadow-sm transition-all active:scale-90"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>

                        {/* Item Total - Fixed min-width prevents buttons jumping */}
                        <div className="text-right min-w-[85px] shrink-0">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Total</p>
                          <p className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">${getGrandTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase tracking-widest text-[10px] bg-green-50 px-2 py-1 rounded">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Tax Estimate</span>
                    <span className="font-semibold text-slate-800">$0.00</span>
                  </div>
                </div>

                <div className="my-6 border-t border-slate-100 pt-6">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-500 text-sm">Total Amount</span>
                    <span className="text-2xl font-black text-slate-900">${getGrandTotal()}</span>
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
                  Proceed to Checkout
                </button>
                
                <p className="text-center text-[11px] text-slate-400 mt-4 uppercase tracking-wider font-medium">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};