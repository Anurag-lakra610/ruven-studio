"use client";

import React, { useState, useEffect } from "react";
import { getProducts, getCategories, MockProduct, MockCategory } from "@/lib/db";
import { Search, Plus, Edit2, Check, X, ShieldAlert, ShoppingBag, Eye, Trash2, ArrowUpDown } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [categories, setCategories] = useState<MockCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    base_price: 0,
    status: "Published" as "Published" | "Draft" | "Archived",
    description: "",
    variants: [] as any[]
  });

  // Load catalog
  useEffect(() => {
    getProducts({ status: "all" }).then(res => setProducts(res));
    getCategories().then(res => setCategories(res));
  }, []);

  const handleEditClick = (product: MockProduct) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      base_price: product.base_price,
      status: product.status as any,
      description: product.description,
      variants: product.variants ? [...product.variants] : []
    });
    setEditModalOpen(true);
  };

  const handleVariantStockChange = (idx: number, newStock: number) => {
    setEditForm(prev => {
      const updated = [...prev.variants];
      updated[idx] = { ...updated[idx], stock: Math.max(0, newStock) };
      return { ...prev, variants: updated };
    });
  };

  const handleSaveChanges = () => {
    if (!selectedProduct) return;

    // Update in-memory state
    setProducts(prev =>
      prev.map(p =>
        p.id === selectedProduct.id
          ? {
              ...p,
              name: editForm.name,
              base_price: Number(editForm.base_price),
              status: editForm.status,
              description: editForm.description,
              variants: editForm.variants
            }
          : p
      )
    );
    setEditModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "all" || p.category_slug === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* Search and Action Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-4 shadow-sm">
        <div className="flex flex-1 gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex items-center border border-border-warm rounded px-3 py-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-text-muted mr-2" />
            <input
              type="text"
              placeholder="Search SKU name, slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs bg-transparent border-none p-0 focus:outline-none text-text-primary placeholder:text-text-muted w-full"
            />
          </div>
          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-transparent border border-border-warm rounded px-3 py-2 text-text-primary cursor-pointer focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="px-5 py-2.5 bg-brand-burgundy hover:bg-brand-gold text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* TanStack-like Product Grid Table */}
      <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-card border-b border-border-warm text-[10px] font-bold uppercase tracking-widest text-text-muted">
                <th className="p-5 w-16">Image</th>
                <th className="p-5">Name & SKU</th>
                <th className="p-5">Category</th>
                <th className="p-5">Base Price</th>
                <th className="p-5">Total Stock</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs text-text-primary font-medium">
              {filteredProducts.map((p) => {
                const totalStock = p.variants ? p.variants.reduce((acc, v) => acc + v.stock, 0) : 0;
                return (
                  <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors">
                    {/* Image */}
                    <td className="p-5">
                      <div className="relative w-10 h-12 bg-bg-card rounded overflow-hidden border border-border-warm">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    {/* Name & SKU */}
                    <td className="p-5">
                      <div className="space-y-1">
                        <span className="font-bold text-text-primary block">{p.name}</span>
                        <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider block">
                          Slug: {p.slug}
                        </span>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="p-5 uppercase text-[10px] tracking-wide text-text-muted">
                      {p.category_slug}
                    </td>
                    {/* Base Price */}
                    <td className="p-5 font-mono text-brand-burgundy font-bold">
                      ₹{p.base_price}
                    </td>
                    {/* Total Stock */}
                    <td className="p-5">
                      <div className="space-y-1">
                        <span className="font-bold">{totalStock} Units</span>
                        {totalStock < 200 ? (
                          <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest block">Low stock</span>
                        ) : (
                          <span className="text-[8px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest block">Healthy</span>
                        )}
                      </div>
                    </td>
                    {/* Status */}
                    <td className="p-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        p.status === "Published"
                          ? "bg-green-50 border border-green-200 text-green-600 dark:bg-green-950/20 dark:border-green-900/30"
                          : p.status === "Draft"
                          ? "bg-zinc-100 border border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700"
                          : "bg-red-50 border border-red-200 text-red-600 dark:bg-red-950/20 dark:border-red-900/30"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="p-5 text-right space-x-2">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="p-1.5 border border-border-warm hover:border-brand-burgundy text-text-muted hover:text-brand-burgundy rounded transition-colors"
                        title="Edit details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT AUTOSAVE DETAILS MODAL */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div onClick={() => setEditModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-border-warm rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-border-warm">
              <div className="space-y-1 text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">Product details</span>
                <h3 className="text-base font-bold uppercase text-text-primary tracking-wide">
                  Edit {selectedProduct.name}
                </h3>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="p-1 hover:text-brand-burgundy transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-left">
              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Base Price (INR)</label>
                  <input
                    type="number"
                    value={editForm.base_price}
                    onChange={(e) => setEditForm(prev => ({ ...prev, base_price: Number(e.target.value) }))}
                    className="w-full text-xs border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Publication Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e: any) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full text-xs border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Description Details</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full text-xs border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary leading-relaxed"
                />
              </div>

              {/* Variants inventory management */}
              <div className="space-y-3 pt-4 border-t border-border-warm">
                <h4 className="text-xs font-bold uppercase tracking-wide text-text-primary">Warehouse Variant Inventory</h4>
                <div className="space-y-3">
                  {editForm.variants.map((v, idx) => (
                    <div key={v.id} className="flex justify-between items-center gap-4 bg-bg-card dark:bg-zinc-800 p-3 rounded-lg border border-border-warm">
                      <div className="text-[10px] font-mono text-left">
                        <span className="font-bold text-text-primary block">Size: {v.size} ({v.color})</span>
                        <span className="text-text-muted uppercase tracking-wider block mt-0.5">SKU: {v.sku}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-text-muted">Stock:</span>
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => handleVariantStockChange(idx, Number(e.target.value))}
                          className="w-20 text-xs border border-border-warm rounded bg-white dark:bg-zinc-950 p-1 text-center font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-warm flex gap-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="flex-1 py-2.5 border border-border-warm rounded text-xs font-bold uppercase text-text-primary hover:bg-bg-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex-1 py-2.5 bg-brand-burgundy hover:bg-brand-gold text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Save Catalog Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MOCK PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div onClick={() => setAddModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-border-warm rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border-warm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Add New Product Drop</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 hover:text-brand-burgundy transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-left text-xs text-text-muted leading-relaxed">
              <ShieldAlert className="w-8 h-8 text-brand-gold mx-auto" />
              <p className="text-center font-semibold text-text-primary uppercase tracking-wide">
                Product discovery is governed by DB Migrations
              </p>
              <p>
                To create a new product layout, we recommend deploying a new SQL migration script containing the product DDL INSERT commands. The backend schema enforces strict integrity checks on SKU patterns, variant weights, and categories.
              </p>
            </div>

            <button
              onClick={() => setAddModalOpen(false)}
              className="w-full py-2.5 bg-brand-burgundy hover:bg-brand-gold text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              Understand & Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
