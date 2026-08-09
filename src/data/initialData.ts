import { Product, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'rp-001',
    title: 'Sofa Minimalis Mahkota Teak & Bouclé',
    category: 'Bespoke Furniture',
    price: 34500000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Sofa modular 3-seater dirancang dengan rangka Kayu Jati Perhutani Grade A pilihan dan dilapisi kain premium Bouclé Prancis. Desain ergonomis memberikan kemewahan visual dan kenyamanan tanpa kompromi.',
    features: [
      'Rangka Solid Teakwood Perhutani Finish Natural Matte',
      'Upholstery Premium Bouclé French Fabric (Stain Resistant)',
      'Busa High-Density Ergonomis Memory Foam',
      'Garansi Konstruksi 10 Tahun'
    ],
    dimensions: 'P: 240cm x L: 98cm x T: 78cm (Tinggi Dudukan 42cm)',
    leadTime: '3 - 4 Minggu Pengerjaan',
    featured: true,
    type: 'furniture',
    isAvailable: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'rp-002',
    title: 'Meja Makan Emperium Carrara Marble 8-Seater',
    category: 'Luxury Living',
    price: 58000000,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Meja makan eksklusif dari slab utuh Marmer Carrara Asli Italia dengan aksen brushed brass gold pada struktur dasar metal sculpted. Mahakarya seni arsitektur ruang makan.',
    features: [
      'Top Table Italian Natural Carrara White Marble (Sealed Surface)',
      'Kaki Metal Bespoke dengan Finish Antiqued Brushed Brass',
      'Kapasitas 8-10 Kursi',
      'Pelapis Anti-Noda NANO Guard System'
    ],
    dimensions: 'P: 280cm x L: 110cm x T: 76cm',
    leadTime: '4 - 5 Minggu Pengerjaan',
    featured: true,
    type: 'furniture',
    isAvailable: true,
    createdAt: '2026-01-20'
  },
  {
    id: 'rp-003',
    title: 'Lounge Chair Silhouette Walnut & Nubuck Leather',
    category: 'Bespoke Furniture',
    price: 22800000,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Kursi santai skulptural yang memadukan lengkungan serat Kayu Walnut Amerika dengan kelembutan Kulit Asli Nubuck Italia. Menghadirkan presisi pengerjaan tangan para ahli.',
    features: [
      'Kayu American Black Walnut Solid (FSC Certified)',
      'Kulit Asli Top Grain Italian Nubuck Leather',
      'Joint Mortise & Tenon Tradisional Presisi Tinggi',
      'Bisa Custom Warna Kulit & Finish Kayu'
    ],
    dimensions: 'P: 85cm x L: 90cm x T: 82cm',
    leadTime: '3 Minggu Pengerjaan',
    featured: true,
    type: 'furniture',
    isAvailable: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'rp-004',
    title: 'Kitchen Island Monolith Nero Marquina & Walnut',
    category: 'Modern Kitchen',
    price: 115000000,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Konsep Dapur Dapur Monolitik Mewah dengan material Marmer Hitam Nero Marquina Spanyol terintegrasi dengan lemari penyimpanan kayu walnut tersembunyi dan pencahayaan LED tersembunyi.',
    features: [
      'Dinding & Countertop Natural Nero Marquina Marble',
      'Sistem Soft-Close Blum Motion Heavy Duty Germany',
      'Lampu LED Warm White 2700K Terintegrasi Sensor Hand-Wave',
      'Kompatiil dengan Kompor Induksi & Wastafel Flush Mount'
    ],
    dimensions: 'P: 320cm x L: 120cm x T: 90cm',
    leadTime: '6 - 8 Minggu (Termasuk Pemasangan)',
    featured: true,
    type: 'interior',
    isAvailable: true,
    createdAt: '2026-02-05'
  },
  {
    id: 'rp-005',
    title: 'Credenza & Credenza Bar Brass Fluted Wood',
    category: 'Bespoke Furniture',
    price: 42000000,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Credenza serbaguna dengan detail kayu bergelombang (fluted wood panel) dan engsel kuningan kustom. Sangat anggun untuk ruang tamu mewah atau ruang eksekutif.',
    features: [
      'Kayu Jati Solid dengan Ukiran Fluted Panel Handmade',
      'Top Surface Micro-Cement Concrete / Travertine Stone',
      'Rak Dalam Kayu yang Dapat Disesuaikan',
      'Hardware Brass Custom Signature Ruang Pintar'
    ],
    dimensions: 'P: 210cm x L: 50cm x T: 85cm',
    leadTime: '3 - 4 Minggu Pengerjaan',
    featured: false,
    type: 'furniture',
    isAvailable: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'rp-006',
    title: 'Master Suite Sanctum Sanctuary Bed Frame',
    category: 'Master Bedroom',
    price: 48500000,
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Tempat tidur utama dengan headboard kustom dilapisi beludru premium dan panel kayu ek terintegrasi dengan saklar ambient light & nightstand melayang.',
    features: [
      'Rangka Besi & Kayu Solid Heavy Duty Zero Noise',
      'Headboard Custom Upholstery Italian Velvet',
      'Nightstand Floating Terintegrasi Wireless Charger & USB C',
      'Ukuran King / Super King'
    ],
    dimensions: 'P: 220cm x L: 210cm x T: 145cm (Custom Matras 180x200 / 200x200)',
    leadTime: '4 Minggu Pengerjaan',
    featured: true,
    type: 'furniture',
    isAvailable: true,
    createdAt: '2026-02-12'
  },
  {
    id: 'rp-007',
    title: 'Desain & Konstruksi Villa Tropis Modern Bali (Architectural Project)',
    category: 'Architectural Works',
    price: 1850000000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Proyek arsitektur vila mewah tropis dengan bukaan udara maksimal, Infinity Pool marmer, integrasi bahan lokal batu alam paras & kayu bengkirai tahan cuaca.',
    features: [
      'Studi Tapak & Masterplan Arsitektur Lengkap (Gambar Kerja IMB/PBG)',
      '3D Rendering Ultra Realistis & Animasi Walkthrough',
      'Supervisi Lapangan oleh Principal Architect RUANG PINTAR',
      'Sistem Smart Home & Solar Energy Ready'
    ],
    dimensions: 'Luas Bangunan 450m² - Luas Tanah 600m²',
    leadTime: 'Estimasi Konstruksi 8 - 12 Bulan',
    featured: true,
    type: 'architecture',
    isAvailable: true,
    createdAt: '2026-02-15'
  },
  {
    id: 'rp-008',
    title: 'Executive Boardroom Desk & Acoustical Wall Panel',
    category: 'Executive Office',
    price: 72000000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Set meja direktur dan peredam akustik dinding berdesain avant-garde, menciptakan ruang rapat yang hening, elegan, dan berwibawa.',
    features: [
      'Meja Kayu Oak Asli dengan Inlay Kulit Sapi Hitam',
      'Panel Dinding Akustik Wol Alami Penyerap Gema 85%',
      'Sistem Manajemen Kabel Tersembunyi Motorized Popup Desk',
      'Garansi Aksesoris Elektrikal 3 Tahun'
    ],
    dimensions: 'Meja Utama P: 300cm x L: 120cm x T: 75cm',
    leadTime: '4 - 5 Minggu Pengerjaan',
    featured: false,
    type: 'interior',
    isAvailable: true,
    createdAt: '2026-02-18'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-001',
    customerName: 'Bapak Hendra Wijaya',
    phone: '081298765432',
    address: 'Kawasan Menteng Residen No. 42, Jakarta Pusat',
    notes: 'Mohon survey pengukuran ulang lokasi sebelum produksi meja makan.',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Meja Makan Carrara
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[2], // Lounge Chair
        quantity: 2
      }
    ],
    totalAmount: 103600000,
    status: 'In Consultation',
    createdAt: '2026-03-01 T10:30:00'
  },
  {
    id: 'ORD-2026-002',
    customerName: 'Ibu Clarissa Sastrowardoyo',
    phone: '081188990011',
    address: 'Pondok Indah Executive Residence Tower B Lt 18, Jakarta Selatan',
    notes: 'Inisiasi custom warna kain sofa menjadi Beige Cream Sand.',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Sofa Minimalis Mahkota
        quantity: 1
      }
    ],
    totalAmount: 34500000,
    status: 'Pending',
    createdAt: '2026-03-04 T14:15:00'
  }
];
