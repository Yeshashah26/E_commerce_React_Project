import React, { useState } from 'react';
import HeaderBar from '../common/headerbar';
import ProductDetails from './ProductDetails';
import { useProduct } from '../contextAPI/productProvider';

// Skeleton Component
const ProductSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[380px]">
    <div className="relative aspect-[4/3] bg-slate-100 animate-pulse"></div>
    <div className="p-5 flex flex-col flex-1 space-y-4">
      <div className="flex justify-between items-start gap-2">
        <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-8 animate-pulse"></div>
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-slate-100 rounded w-full animate-pulse"></div>
        <div className="h-3 bg-slate-100 rounded w-4/5 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <div className="space-y-1">
          <div className="h-2 bg-slate-100 rounded w-10 animate-pulse"></div>
          <div className="h-5 bg-slate-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="h-8 bg-slate-200 rounded-xl w-24 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export const Products = () => {
  const { productData, isLoading } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories for the dropdown
  const categories = [...new Set(productData.map(p => p.category))];

  // Filtering Logic
  const filteredProducts = productData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* The Header Bar */}
      <HeaderBar
        categories={categories}
        onSearch={setSearchTerm}
        onFilter={setCategoryFilter}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-800">
            {categoryFilter === "all" ? "All Products" : categoryFilter.toUpperCase()}
          </h1>
          <p className="text-sm text-slate-500">
            {isLoading ? "Loading items..." : `Showing ${filteredProducts.length} items`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Render 8 skeletons as placeholders
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            filteredProducts.map((item) => (
              <ProductDetails key={item?.id} proData={item} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};