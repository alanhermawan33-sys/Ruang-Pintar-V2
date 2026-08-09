import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface CatalogViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories: ProductCategory[] = [
    'All',
    'Bespoke Furniture',
    'Luxury Living',
    'Modern Kitchen',
    'Executive Office',
    'Master Bedroom',
    'Architectural Works'
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      {/* Header Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
          GALERI & KATALOG KATALOG
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#171818]">
          Karya Furniture & Proyek Arsitektur
        </h1>
        <p className="text-xs sm:text-sm text-[#171818]/70 font-body">
          Setiap produk dibuat khusus secara kustom (bespoke) dengan presisi desain tertinggi. Klik pada produk untuk melihat spesifikasi detail dan dimensi.
        </p>
      </div>

      {/* Search & Filter Bar Controls */}
      <div className="bg-[#F2EFE9] p-4 sm:p-6 rounded-2xl border border-[#6A5D43]/20 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6A5D43]" />
            <input
              type="text"
              placeholder="Cari sofa, meja makan, dapur, villa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43] focus:ring-1 focus:ring-[#6A5D43] text-[#171818]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#6A5D43]" />
            <span className="text-xs font-bold text-[#171818] whitespace-nowrap uppercase tracking-wider">
              Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-bold bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none text-[#171818]"
            >
              <option value="featured">Unggulan Studio</option>
              <option value="price-asc">Harga: Terendah ke Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Terendah</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#6A5D43] text-[#FAF9F7] shadow-md scale-105'
                  : 'bg-white/80 hover:bg-white text-[#171818]/80 border border-[#6A5D43]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid Results */}
      <div>
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-[#F2EFE9] rounded-3xl border border-dashed border-[#6A5D43]/30 p-8">
            <Search className="w-12 h-12 text-[#6A5D43]/40 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-[#171818]">
              Tidak ditemukan hasil katalog.
            </h3>
            <p className="text-xs text-[#171818]/60">
              Coba gunakan kata kunci pencarian lain atau ganti filter kategori.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#6A5D43]/20 hover:border-[#6A5D43] transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] overflow-hidden bg-[#171818]/10 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#171818]/85 backdrop-blur-md text-[#C5A880] px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider border border-[#6A5D43]/30">
                    {product.category}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-[#171818]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="px-4 py-2 bg-[#FAF9F7] text-[#171818] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-3.5 h-3.5 text-[#6A5D43]" />
                      Lihat Spesifikasi Detail
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-[#FAF9F7]">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-heading font-bold text-base text-[#171818] hover:text-[#6A5D43] transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.title}
                    </h3>
                    <p className="text-xs text-[#171818]/70 line-clamp-2 mt-2 font-body">
                      {product.description}
                    </p>
                  </div>

                  {/* Specs Pill */}
                  <div className="text-[11px] text-[#6A5D43] bg-[#F2EFE9] p-2 rounded-lg border border-[#6A5D43]/15 truncate">
                    📏 {product.dimensions}
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-4 border-t border-[#6A5D43]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6A5D43] font-bold block">
                        Harga Resmi
                      </span>
                      <span className="text-sm font-heading font-extrabold text-[#171818]">
                        {formatRupiah(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="p-3 rounded-xl bg-[#171818] hover:bg-[#6A5D43] text-[#FAF9F7] transition-colors duration-300 shadow-md"
                      title="Tambah ke Keranjang Belanja"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
