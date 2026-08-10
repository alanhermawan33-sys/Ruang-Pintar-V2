import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Plus, Edit3, Trash2, Eye, CheckCircle2, Clock, AlertCircle, ShoppingBag, Layers, LayoutDashboard, DollarSign, LogOut, Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Product, Order, OrderStatus, ProductCategory } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onRefreshProducts?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onRefreshProducts
}) => {
  if (!isOpen) return null;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'orders'>('overview');

  // Product Form Modal State
  const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Bespoke Furniture');
  const [prodPrice, setProdPrice] = useState<number>(0);
  const [prodImage, setProdImage] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');
  const [prodDimensions, setProdDimensions] = useState('');
  const [prodLeadTime, setProdLeadTime] = useState('');
  const [prodFeatured, setProdFeatured] = useState<boolean>(false);

  // Uploading & Saving State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Search
  const [catalogSearch, setCatalogSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Username atau Password Admin salah! (Gunakan: admin / admin123)');
    }
  };

  // Upload Gambar ke Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setProdImage(data.publicUrl);
    } catch (error: any) {
      alert('Gagal mengunggah gambar: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const openCreateProduct = () => {
    setEditingProduct(null);
    setProdTitle('');
    setProdCategory('Bespoke Furniture');
    setProdPrice(15000000);
    setProdImage('');
    setProdDescription('');
    setProdFeatures('Rangka Kayu Jati Perhutani\nFinishing Matte Premium\nGaransi 5 Tahun');
    setProdDimensions('P: 200cm x L: 90cm x T: 75cm');
    setProdLeadTime('3 - 4 Minggu Pengerjaan');
    setProdFeatured(false);
    setIsEditingProduct(true);
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdTitle(prod.title);
    setProdCategory(prod.category);
    setProdPrice(prod.price);
    setProdImage(prod.image);
    setProdDescription(prod.description);
    setProdFeatures(prod.features ? prod.features.join('\n') : '');
    setProdDimensions(prod.dimensions);
    setProdLeadTime(prod.leadTime);
    setProdFeatured(!!prod.featured);
    setIsEditingProduct(true);
  };

  // SIMPAN PRODUK LANGSUNG KE SUPABASE DATABASE
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim() || !prodImage.trim() || prodPrice <= 0) {
      alert('Silakan upload/isi gambar produk terlebih dahulu!');
      return;
    }

    const featureList = prodFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    try {
      setIsSaving(true);

      const dbData = {
        title: prodTitle.trim(),
        category: prodCategory,
        price: Number(prodPrice),
        image: prodImage.trim(),
        description: prodDescription.trim(),
        features: featureList,
        dimensions: prodDimensions.trim() || 'P: 200cm x L: 90cm',
        lead_time: prodLeadTime.trim() || '3 Minggu',
        featured: prodFeatured,
      };

      if (editingProduct) {
        // UPDATE
        const { error } = await supabase
          .from('products')
          .update(dbData)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        // INSERT NEW
        const { error } = await supabase
          .from('products')
          .insert([dbData]);
        if (error) throw error;
      }

      if (onRefreshProducts) onRefreshProducts();
      setIsEditingProduct(false);
      alert('Produk berhasil disimpan ke Supabase Database!');
    } catch (err: any) {
      alert('Gagal menyimpan produk ke database: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // HAPUS PRODUK DARI SUPABASE DATABASE
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      if (onRefreshProducts) onRefreshProducts();
    } catch (err: any) {
      alert('Gagal menghapus produk: ' + err.message);
    }
  };

  const totalSalesValue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const inConsultationOrdersCount = orders.filter((o) => o.status === 'In Consultation').length;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#171818]/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl bg-[#FAF9F7] text-[#171818] rounded-3xl shadow-2xl overflow-hidden border border-[#6A5D43]/40 z-10 my-auto min-h-[600px] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-[#171818] text-[#FAF9F7] flex items-center justify-between border-b border-[#6A5D43]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6A5D43]/30 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-extrabold text-lg text-[#FAF9F7] tracking-wider uppercase">
                    RUANG PINTAR
                  </h3>
                  <span className="text-[10px] bg-[#6A5D43] text-[#FAF9F7] px-2 py-0.5 rounded-md font-bold tracking-widest uppercase">
                    CONTROL CENTER
                  </span>
                </div>
                <p className="text-xs text-[#C5A880]">
                  {isAuthenticated ? 'Panel Administrator Resmi Studio' : 'Akses Rahasia Pengelolaan System'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-700/50 text-red-200 text-xs rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#FAF9F7]/10 hover:bg-[#FAF9F7]/20 text-[#FAF9F7] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="flex-1 flex items-center justify-center p-6 bg-[#F2EFE9]">
              <div className="w-full max-w-md bg-[#FAF9F7] p-8 rounded-2xl border border-[#6A5D43]/30 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#171818] text-[#C5A880] flex items-center justify-center mx-auto border border-[#6A5D43]">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-[#171818]">
                    Login Administrator
                  </h4>
                  <p className="text-xs text-[#171818]/60">
                    Masukkan kredensial khusus untuk mengakses panel pengelolaan studio.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#171818] mb-1 uppercase tracking-wider">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-white text-xs rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171818] mb-1 uppercase tracking-wider">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white text-xs rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43]"
                      required
                    />
                  </div>

                  {loginError && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#171818] hover:bg-[#262727] text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-[0.15em] rounded-xl transition-all shadow-lg"
                  >
                    Masuk ke Control Center
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              <div className="w-full md:w-64 bg-[#171818] text-[#FAF9F7] p-4 border-r border-[#6A5D43]/30 flex md:flex-col justify-between shrink-0">
                <div className="space-y-2 w-full flex md:flex-col gap-2 md:gap-0">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-heading font-bold tracking-wider uppercase transition-all ${
                      activeTab === 'overview'
                        ? 'bg-[#6A5D43] text-[#FAF9F7] shadow-lg'
                        : 'text-[#FAF9F7]/70 hover:bg-[#FAF9F7]/10'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Overview Ringkasan
                  </button>

                  <button
                    onClick={() => setActiveTab('catalog')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-heading font-bold tracking-wider uppercase transition-all ${
                      activeTab === 'catalog'
                        ? 'bg-[#6A5D43] text-[#FAF9F7] shadow-lg'
                        : 'text-[#FAF9F7]/70 hover:bg-[#FAF9F7]/10'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    Kelola Katalog ({products.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-heading font-bold tracking-wider uppercase transition-all ${
                      activeTab === 'orders'
                        ? 'bg-[#6A5D43] text-[#FAF9F7] shadow-lg'
                        : 'text-[#FAF9F7]/70 hover:bg-[#FAF9F7]/10'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Monitor Pesanan ({orders.length})
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#FAF9F7]">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-[#171818]">
                        Ringkasan Performa Studio
                      </h3>
                      <p className="text-xs text-[#171818]/70">
                        Statistik nilai proyek, pesanan masuk, dan ketersediaan barang.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-5 bg-white rounded-2xl border border-[#6A5D43]/20 shadow-md">
                        <div className="flex items-center justify-between text-[#6A5D43] mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider">Total Nilai Proyek</span>
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div className="text-xl font-heading font-bold text-[#171818]">
                          {formatRupiah(totalSalesValue)}
                        </div>
                      </div>

                      <div className="p-5 bg-white rounded-2xl border border-[#6A5D43]/20 shadow-md">
                        <div className="flex items-center justify-between text-[#6A5D43] mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider">Item Katalog</span>
                          <Layers className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-heading font-bold text-[#171818]">
                          {products.length}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'catalog' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-[#171818]">
                          Kelola Katalog Produk & Karya
                        </h3>
                      </div>

                      <button
                        onClick={openCreateProduct}
                        className="px-4 py-2.5 bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-md shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah Produk Baru
                      </button>
                    </div>

                    <div className="relative max-w-sm">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-[#6A5D43]" />
                      <input
                        type="text"
                        placeholder="Cari nama produk / kategori..."
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#6A5D43]/30"
                      />
                    </div>

                    <div className="bg-white rounded-2xl border border-[#6A5D43]/20 shadow-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="bg-[#F2EFE9] border-b border-[#6A5D43]/20 text-[#6A5D43] font-bold uppercase tracking-wider">
                              <th className="p-3.5">Gambar</th>
                              <th className="p-3.5">Nama Produk</th>
                              <th className="p-3.5">Kategori</th>
                              <th className="p-3.5">Harga</th>
                              <th className="p-3.5 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#6A5D43]/10">
                            {filteredProducts.map((p) => (
                              <tr key={p.id} className="hover:bg-[#FAF9F7]">
                                <td className="p-3.5">
                                  <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-12 h-12 rounded-lg object-cover border border-[#6A5D43]/20"
                                  />
                                </td>
                                <td className="p-3.5 font-bold text-[#171818] max-w-xs">{p.title}</td>
                                <td className="p-3.5 font-semibold text-[#6A5D43]">{p.category}</td>
                                <td className="p-3.5 font-extrabold text-[#171818]">{formatRupiah(p.price)}</td>
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => openEditProduct(p)}
                                      className="p-2 bg-[#F2EFE9] hover:bg-[#6A5D43] hover:text-white text-[#171818] rounded-lg transition-colors"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(p.id)}
                                      className="p-2 bg-red-100 hover:bg-red-700 hover:text-white text-red-700 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {isEditingProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#FAF9F7] text-[#171818] p-6 sm:p-8 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 border border-[#6A5D43]">
              <div className="flex items-center justify-between border-b border-[#6A5D43]/20 pb-3">
                <h4 className="font-heading font-bold text-lg text-[#171818]">
                  {editingProduct ? 'Edit Produk Katalog' : 'Tambah Produk Baru'}
                </h4>
                <button onClick={() => setIsEditingProduct(false)} className="p-1 text-gray-500 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">Judul Produk / Proyek *</label>
                  <input
                    type="text"
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#6A5D43]/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Kategori *</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as ProductCategory)}
                      className="w-full p-2.5 bg-white rounded-xl border border-[#6A5D43]/30"
                    >
                      <option value="Bespoke Furniture">Bespoke Furniture</option>
                      <option value="Luxury Living">Luxury Living</option>
                      <option value="Modern Kitchen">Modern Kitchen</option>
                      <option value="Executive Office">Executive Office</option>
                      <option value="Master Bedroom">Master Bedroom</option>
                      <option value="Architectural Works">Architectural Works</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Harga (Rupiah IDR) *</label>
                    <input
                      type="number"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-white rounded-xl border border-[#6A5D43]/30"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-bold mb-1">Foto Produk *</label>
                  <div className="p-3 bg-white rounded-xl border border-[#6A5D43]/30 space-y-2">
                    <span className="text-[10px] font-bold text-[#6A5D43] uppercase tracking-wider block">
                      📁 Pilih File dari Perangkat
                    </span>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#6A5D43] file:text-white hover:file:bg-[#8C7853] cursor-pointer"
                      />
                      {isUploading && (
                        <div className="flex items-center gap-1.5 text-[#6A5D43] text-xs font-bold shrink-0">
                          <Loader2 className="animate-spin w-4 h-4" />
                          <span>Uploading...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {prodImage && (
                    <div className="flex items-center gap-3 p-2 bg-[#F2EFE9] rounded-xl border border-[#6A5D43]/20">
                      <img src={prodImage} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                      <span className="text-[10px] text-emerald-700 font-bold">✓ Foto Siap Digunakan</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold mb-1">Deskripsi Lengkap</label>
                  <textarea
                    rows={3}
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#6A5D43]/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#6A5D43]/20">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-4 py-2 bg-gray-200 rounded-xl font-bold text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || isSaving}
                    className="px-5 py-2 bg-[#6A5D43] text-white rounded-xl font-bold text-xs flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving && <Loader2 className="animate-spin w-3.5 h-3.5" />}
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
