import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Product, CartItem, Order, OrderStatus } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/initialData';
import { supabase } from './lib/supabaseClient';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProfileView } from './views/ProfileView';
import { ContactView } from './views/ContactView';

export default function App() {
  // Active Page Tab State
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'profile' | 'contact'>('home');

  // Products State (Real-time dari Supabase Database)
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  // Orders State (Persisted in localStorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ruang_pintar_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved orders:', e);
      }
    }
    return INITIAL_ORDERS;
  });

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ruang_pintar_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved cart:', e);
      }
    }
    return [];
  });

  // Selected Product for Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Hidden Admin Control Center State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // ----------------------------------------------------
  // FUNGSI UTAMA: AMBIL DATA PRODUK DARI SUPABASE DATABASE
  // ----------------------------------------------------
  const fetchProductsFromSupabase = async () => {
    try {
      setIsLoadingProducts(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedProducts: Product[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: Number(item.price),
          image: item.image,
          description: item.description || '',
          features: item.features || [],
          dimensions: item.dimensions || '',
          leadTime: item.lead_time || '',
          featured: !!item.featured,
          gallery: [item.image],
          type: 'furniture',
          isAvailable: true
        }));
        setProducts(mappedProducts);
      } else {
        // Jika database Supabase masih kosong, tampilkan INITIAL_PRODUCTS sebagai cadangan
        setProducts(INITIAL_PRODUCTS);
      }
    } catch (err) {
      console.error('Gagal mengambil produk dari Supabase, menggunakan data awal:', err);
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Panggil data produk saat aplikasi pertama dibuka
  useEffect(() => {
    fetchProductsFromSupabase();
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Check URL parameters for ?admin or #admin hidden trigger
  useEffect(() => {
    const checkAdminTrigger = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('admin') || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);
    return () => window.removeEventListener('hashchange', checkAdminTrigger);
  }, []);

  // Keyboard shortcut Ctrl+Shift+A for Admin access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save Orders to localStorage
  useEffect(() => {
    localStorage.setItem('ruang_pintar_orders', JSON.stringify(orders));
  }, [orders]);

  // Save Cart to localStorage
  useEffect(() => {
    localStorage.setItem('ruang_pintar_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll to top on view change
  const handleTabChange = (tab: 'home' | 'catalog' | 'profile' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNewOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Admin Catalog CRUD Operations
  const handleAddProduct = (newProdData: Omit<Product, 'id' | 'createdAt'>) => {
    fetchProductsFromSupabase();
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    fetchProductsFromSupabase();
  };

  const handleDeleteProduct = (productId: string) => {
    fetchProductsFromSupabase();
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const totalCartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#171818] font-sans antialiased flex flex-col justify-between selection:bg-[#6A5D43] selection:text-[#FAF9F7]">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main View Display */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            products={products}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onNavigate={handleTabChange}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogView
            products={products}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'profile' && <ProfileView />}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectOrder={() => {
          setIsCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onNewOrderCreated={handleNewOrderCreated}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onRefreshProducts={fetchProductsFromSupabase}
      />
    </div>
  );
}
