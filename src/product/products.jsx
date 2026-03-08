import React, { useState } from 'react';
import HeaderBar from '../common/headerbar';
import ProductDetails from './ProductDetails';
import { useProduct } from '../contextAPI/productProvider';

export const Products = () => {
  const { productData } = useProduct();
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
          <p className="text-sm text-slate-500">Showing {filteredProducts.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductDetails key={item?.id} proData={item} />
          ))}
        </div>
      </main>
    </div>
  );
};