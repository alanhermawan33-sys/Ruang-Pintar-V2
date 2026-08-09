import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Send, CheckCircle2, Ruler, Clock, Layers, Sparkles, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectOrder: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1800);
  };

  const handleDirect = () => {
    onAddToCart(product, quantity);
    onDirectOrder(product);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#171818]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#FAF9F7] text-[#171818] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#6A5D43]/30 z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#171818]/70 hover:bg-[#171818] text-[#FAF9F7] flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left: Image Gallery (Lg 7 col) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F2EFE9] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#6A5D43]/20">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#171818]/10 group shadow-lg">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#171818]/85 backdrop-blur-md text-[#C5A880] px-3.5 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-widest border border-[#6A5D43]/40">
                  {product.category}
                </div>
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                        selectedImage === imgUrl 
                          ? 'border-[#6A5D43] scale-105 shadow-md' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Craft Tag */}
              <div className="mt-6 pt-4 border-t border-[#6A5D43]/20 flex items-center justify-between text-xs text-[#6A5D43] font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  Original Studio Craftsmanship
                </span>
                <span>ID: {product.id}</span>
              </div>
            </div>

            {/* Right: Specifications & Purchasing (Lg 5 col) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF9F7]">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-heading font-bold text-[#6A5D43] tracking-[0.2em] uppercase">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="text-[10px] font-bold bg-[#6A5D43] text-[#FAF9F7] px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                      Flagship
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#171818] leading-tight">
                  {product.title}
                </h2>

                {/* Price */}
                <div className="mt-3 text-2xl font-heading font-extrabold text-[#6A5D43]">
                  {formatRupiah(product.price)}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-[#171818]/80 leading-relaxed font-body">
                  {product.description}
                </p>

                {/* Key Specs: Dimensions & Lead Time */}
                <div className="mt-6 space-y-3 bg-[#F2EFE9] p-4 rounded-xl border border-[#6A5D43]/20">
                  <div className="flex items-start gap-3">
                    <Ruler className="w-4 h-4 text-[#6A5D43] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#171818] uppercase tracking-wider block">
                        Dimensi Ukuran
                      </span>
                      <span className="text-xs text-[#171818]/80 font-medium">
                        {product.dimensions}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-[#6A5D43]/15">
                    <Clock className="w-4 h-4 text-[#6A5D43] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#171818] uppercase tracking-wider block">
                        Estimasi Pengerjaan
                      </span>
                      <span className="text-xs text-[#171818]/80 font-medium">
                        {product.leadTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Material & Features */}
                <div className="mt-6">
                  <h4 className="text-xs font-heading font-bold uppercase tracking-[0.15em] text-[#171818] flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-[#6A5D43]" />
                    Spesifikasi Material & Fitur Utama:
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#171818]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#6A5D43] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantity & Action Buttons */}
              <div className="space-y-4 pt-6 border-t border-[#6A5D43]/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#171818]">
                    Jumlah Item:
                  </span>
                  <div className="flex items-center border border-[#6A5D43]/30 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm font-bold hover:bg-[#F2EFE9] text-[#171818] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-heading font-bold text-[#171818]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-sm font-bold hover:bg-[#F2EFE9] text-[#171818] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Cart */}
                  <button
                    onClick={handleAdd}
                    className={`relative py-3.5 px-4 rounded-xl text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border ${
                      addedAnimation
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-[#171818] hover:bg-[#262727] text-[#FAF9F7] border-[#171818] shadow-md hover:shadow-xl'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Berhasil Ditambahkan!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                        Tambah ke Keranjang
                      </>
                    )}
                  </button>

                  {/* Pesan Langsung */}
                  <button
                    onClick={handleDirect}
                    className="py-3.5 px-4 rounded-xl bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    Pesan Langsung
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
