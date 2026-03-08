import React from 'react';
import { useProduct } from "../contextAPI/productProvider";
import { FaShoppingCart, FaStar, FaTag } from "react-icons/fa";

const ProductDetails = ({ proData }) => {
  const {
    category = "General",
    description = "",
    title = "Product Title",
    image = "",
    price = 0,
    rating = { rate: 0 }
  } = proData || {};

  const { addToCart } = useProduct();

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      
      {/* 1. Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center p-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-bold text-indigo-600 uppercase tracking-wider rounded-lg shadow-sm">
            <FaTag size={10} /> {category}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Title & Rating Row */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
            <FaStar size={12} /> {rating?.rate || 0}
          </div>
        </div>

        {/* Description: Truncated to 2 lines for uniform card size */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* 3. Footer Section (Price & Action) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Price</p>
            <p className="text-lg font-black text-slate-900">${price}</p>
          </div>
          
          <button 
            onClick={() => addToCart(proData)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100"
          >
            <FaShoppingCart size={14} />
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;