import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Send, ArrowRight, User, Phone, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNewOrderCreated: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNewOrderCreated,
}) => {
  if (!isOpen) return null;

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) errs.customerName = 'Nama lengkap wajib diisi';
    if (!phone.trim()) errs.phone = 'Nomor WhatsApp / HP wajib diisi';
    if (!address.trim()) errs.address = 'Alamat proyek wajib diisi';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (!validateForm()) return;
    if (cartItems.length === 0) return;

    // Create Order Object for Admin persistence
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      items: [...cartItems],
      totalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save order in admin state & localstorage
    onNewOrderCreated(newOrder);

    // Format WhatsApp Message
    const studioPhone = '6281234567890'; // Studio WhatsApp Number
    
    let message = `*PEMESANAN & KONSULTASI - RUANG PINTAR STUDIO*\n`;
    message += `-----------------------------------------------\n`;
    message += `*DATA PEMESAN:*\n`;
    message += `• *Nama Lengkap:* ${customerName.trim()}\n`;
    message += `• *No. WhatsApp:* ${phone.trim()}\n`;
    message += `• *Alamat Proyek:* ${address.trim()}\n`;
    if (notes.trim()) {
      message += `• *Catatan Khusus:* ${notes.trim()}\n`;
    }
    message += `\n*DAFTAR PRODUK & SPESIFIKASI:*\n`;

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.product.title}*\n`;
      message += `   - Jumlah: ${item.quantity} unit\n`;
      message += `   - Dimensi: ${item.product.dimensions}\n`;
      message += `   - Harga Satuan: ${formatRupiah(item.product.price)}\n`;
      message += `   - Subtotal: ${formatRupiah(item.product.price * item.quantity)}\n`;
    });

    message += `\n-----------------------------------------------\n`;
    message += `*TOTAL ESTIMASI:* ${formatRupiah(totalAmount)}\n`;
    message += `-----------------------------------------------\n\n`;
    message += `Halo Admin RUANG PINTAR, saya telah melengkapi data pesanan di atas. Mohon konfirmasi ketersediaan & jadwal konsultasi proyek saya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${studioPhone}?text=${encodedMessage}`;

    // Clear cart & close drawer
    onClearCart();
    onClose();

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#171818]/70 backdrop-blur-sm"
        />

        {/* Slide-over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md md:max-w-lg bg-[#FAF9F7] text-[#171818] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden border-l border-[#6A5D43]/30"
        >
          {/* Header */}
          <div className="p-6 bg-[#171818] text-[#FAF9F7] flex items-center justify-between border-b border-[#6A5D43]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6A5D43]/30 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#FAF9F7] tracking-wide">
                  Keranjang Belanja
                </h3>
                <p className="text-xs text-[#C5A880]">
                  {cartItems.length} Item Terpilih
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAF9F7]/10 hover:bg-[#FAF9F7]/20 text-[#FAF9F7] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items & Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#6A5D43]/20">
            {/* Cart Items List */}
            <div>
              <h4 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#6A5D43] mb-4">
                Daftar Produk/Karya
              </h4>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-[#F2EFE9] rounded-2xl border border-dashed border-[#6A5D43]/30 p-6">
                  <ShoppingBag className="w-12 h-12 text-[#6A5D43]/40 mx-auto" />
                  <p className="text-sm font-semibold text-[#171818]/70">
                    Keranjang belanja Anda masih kosong.
                  </p>
                  <p className="text-xs text-[#171818]/50">
                    Pilih produk bespoke or orisinil karya arsitektur di katalog kami.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 bg-[#F2EFE9] p-3.5 rounded-xl border border-[#6A5D43]/20"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#6A5D43]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading font-bold text-xs text-[#171818] truncate">
                          {item.product.title}
                        </h5>
                        <p className="text-xs font-semibold text-[#6A5D43] mt-0.5">
                          {formatRupiah(item.product.price)}
                        </p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-[#6A5D43]/30 rounded-md bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs font-bold hover:bg-[#FAF9F7]"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-[#171818]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs font-bold hover:bg-[#FAF9F7]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-red-700 hover:text-red-900 text-xs flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase tracking-wider font-semibold">Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Information Form */}
            {cartItems.length > 0 && (
              <div className="pt-6 space-y-4">
                <h4 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#6A5D43] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Form Data Pemesan Proyek
                </h4>

                <div className="space-y-3">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-xs font-bold text-[#171818] mb-1">
                      Nama Lengkap <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-[#6A5D43]" />
                      <input
                        type="text"
                        placeholder="Contoh: Bapak Hendra Wijaya"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43] focus:ring-1 focus:ring-[#6A5D43]"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#171818] mb-1">
                      Nomor WhatsApp / HP <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-[#6A5D43]" />
                      <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43] focus:ring-1 focus:ring-[#6A5D43]"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#171818] mb-1">
                      Alamat Proyek / Pengiriman <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#6A5D43]" />
                      <textarea
                        rows={2}
                        placeholder="Alamat lengkap lokasi proyek / hunian..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43] focus:ring-1 focus:ring-[#6A5D43]"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-[#171818] mb-1">
                      Catatan Khusus (Dimensi/Warna/Request)
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3 top-3 text-[#6A5D43]" />
                      <input
                        type="text"
                        placeholder="Contoh: Request custom warna kain cream beige"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43] focus:ring-1 focus:ring-[#6A5D43]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer: Total & Direct WA Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#171818] text-[#FAF9F7] space-y-4 border-t border-[#6A5D43]/40">
              <div className="flex items-center justify-between text-sm font-heading">
                <span className="text-[#C5A880] uppercase tracking-wider font-semibold text-xs">
                  Total Estimasi Nilai
                </span>
                <span className="text-xl font-bold text-[#FAF9F7]">
                  {formatRupiah(totalAmount)}
                </span>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-4 px-6 rounded-xl bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl group"
              >
                <Send className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                Kirim Pesanan via WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-[#FAF9F7]/60 italic">
                *Pesanan akan langsung terhubung dengan Principal Studio Advisor kami di WhatsApp.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
