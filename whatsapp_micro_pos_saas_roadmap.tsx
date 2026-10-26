import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Receipt, 
  Send, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Layers, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Moon, 
  Sun, 
  MessageSquare, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  Code, 
  Cpu, 
  Share2, 
  Printer, 
  Copy,
  ChevronRight,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

// Sample inventory items
const INITIAL_PRODUCTS = [
  { id: 1, name: 'T-Shirt Coton Bio', price: 8500, category: 'Vêtements' },
  { id: 2, name: 'Baskets Urban White', price: 24500, category: 'Chaussures' },
  { id: 3, name: 'Casquette Classic', price: 4500, category: 'Accessoires' },
  { id: 4, name: 'Sac à Dos Travel Pack', price: 18000, category: 'Maroquinerie' },
  { id: 5, name: 'Montre Minimaliste', price: 32000, category: 'Horlogerie' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pos'); // 'pos' | 'roadmap'
  const [darkMode, setDarkMode] = useState(false);

  // POS State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('Marc Kouassi');
  const [customerPhone, setCustomerPhone] = useState('+2250708091011');
  const [paymentMethod, setPaymentMethod] = useState('Mobile Money');
  const [currency, setCurrency] = useState('FCFA');
  const [salesHistory, setSalesHistory] = useState([
    { id: 'REC-9821', date: '2026-10-26 10:15', customer: 'Awa Diallo', amount: 13000, itemsCount: 2, method: 'Orange Money' },
    { id: 'REC-9820', date: '2026-10-26 09:40', customer: 'Koffi Serge', amount: 24500, itemsCount: 1, method: 'Wave' },
    { id: 'REC-9819', date: '2026-10-25 18:22', customer: 'Fatou Ndiaye', amount: 43000, itemsCount: 3, method: 'Espèces' },
  ]);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [copiedText, setCopiedText] = useState(false);

  // Toggle Dark Mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart operations
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Generate Receipt Function
  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newReceipt = {
      id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
      customer: customerName || 'Client Passage',
      phone: customerPhone || 'N/A',
      items: [...cart],
      total: totalAmount,
      method: paymentMethod,
    };

    setActiveReceipt(newReceipt);
    setSalesHistory([
      {
        id: newReceipt.id,
        date: newReceipt.date,
        customer: newReceipt.customer,
        amount: newReceipt.total,
        itemsCount: newReceipt.items.length,
        method: newReceipt.method,
      },
      ...salesHistory,
    ]);
    setCart([]);
  };

  // Format currency output
  const formatPrice = (val) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ` ${currency}`;
  };

  // Generate WhatsApp message preview link
  const getWhatsAppMessage = () => {
    if (!activeReceipt) return '';
    const itemsList = activeReceipt.items.map(i => `• ${i.name} x${i.qty} (${formatPrice(i.price * i.qty)})`).join('\n');
    return `Bonjour ${activeReceipt.customer},\n\nMerci pour votre achat chez *MaBoutique POS* !\n\n🧾 *Reçu N° ${activeReceipt.id}*\n📅 Date: ${activeReceipt.date}\n\n*Détails des articles :*\n${itemsList}\n\n💰 *Total Payé :* ${formatPrice(activeReceipt.total)}\n💳 *Mode de paiement :* ${activeReceipt.method}\n\n🔗 Télécharger votre reçu PDF officiel: https://wa-pos.app/receipt/${activeReceipt.id}\n\nÀ bientôt !`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Top Header Navigation */}
      <header className={`sticky top-0 z-40 border-b ${darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight flex items-center gap-2">
                WhatsApp Micro-POS
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-medium">
                  SaaS Edition
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">POS Instantané & Reçus Automatiques</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex space-x-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('pos')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                  activeTab === 'pos'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Simulateur POS</span>
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                  activeTab === 'roadmap'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Architecture & Apps Mobile</span>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Changer de thème"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: POS SIMULATION */}
        {activeTab === 'pos' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-sm font-medium">Chiffre d'Affaires du jour</span>
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold">
                  {formatPrice(salesHistory.reduce((acc, s) => acc + s.amount, 0) + (activeReceipt ? 0 : 0))}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3 h-3" /> +18.4% par rapport à hier
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-sm font-medium">Ventes effectuées</span>
                  <Receipt className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold">{salesHistory.length} reçus</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle className="w-3 h-3" /> WhatsApp Webhook actif
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-sm font-medium">Taux de Délivrabilité WA</span>
                  <Send className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold">99.8%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reçus délivrés sans erreur
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-sm font-medium">Clients Enregistrés</span>
                  <Users className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold">142</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                  Fichiers synchronisés
                </div>
              </div>
            </div>

            {/* POS Grid View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Product Catalog & Cart Creation (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Catalog Card */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-emerald-600" />
                      Catalogue Produits
                    </h2>
                    <span className="text-xs text-slate-500">Cliquez pour ajouter au panier</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => addToCart(product)}
                        className={`p-4 rounded-xl text-left border transition-all duration-150 hover:border-emerald-500 active:scale-95 flex flex-col justify-between ${
                          darkMode ? 'bg-slate-900/60 border-slate-700 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                            {product.category}
                          </span>
                          <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Cart Card */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-emerald-600" />
                    Commande en cours
                  </h2>

                  {/* Customer Information Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Nom du Client</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full text-sm px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                        }`}
                        placeholder="Ex: Marc Kouassi"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Téléphone WhatsApp</label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className={`w-full text-sm px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                        }`}
                        placeholder="Ex: +2250708091011"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Mode de Paiement</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Mobile Money', 'Wave', 'Espèces'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            paymentMethod === method
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : darkMode
                              ? 'bg-slate-900 border-slate-700 text-slate-300'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cart Items Table */}
                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
                      Le panier est vide. Sélectionnez des produits ci-dessus.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-3 rounded-xl border ${
                            darkMode ? 'bg-slate-900/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500">{formatPrice(item.price)} / unité</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center border rounded-lg bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-bold">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Order Total & Checkout CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Total à payer</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {formatPrice(totalAmount)}
                      </span>
                    </div>

                    <button
                      disabled={cart.length === 0}
                      onClick={handleCheckout}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      Valider & Générer Reçu WA
                    </button>
                  </div>
                </div>

              </div>

              {/* Simulation Output: Receipt Preview & WhatsApp Bot View (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Live WhatsApp Bot Simulation Window */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-600" />
                      Aperçu Envoi WhatsApp Bot
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                      Live Sandbox
                    </span>
                  </div>

                  {activeReceipt ? (
                    <div className="space-y-4">
                      {/* Fake WhatsApp Message Bubble */}
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl text-xs space-y-2 relative">
                        <div className="flex justify-between text-slate-400 text-[10px] mb-1">
                          <span>Boutique POS System</span>
                          <span>{activeReceipt.date}</span>
                        </div>
                        <p className="whitespace-pre-line font-mono text-slate-700 dark:text-slate-200">
                          {getWhatsAppMessage()}
                        </p>
                      </div>

                      {/* Control Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={copyToClipboard}
                          className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedText ? 'Copié dans le presse-papier !' : 'Copier le message textuel'}
                        </button>
                        
                        <a
                          href={`https://wa.me/${activeReceipt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWhatsAppMessage())}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20"
                        >
                          <Share2 className="w-4 h-4" />
                          Simuler l'ouverture dans WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
                      Générez un reçu en créant une commande à gauche pour visualiser la simulation de bot WhatsApp.
                    </div>
                  )}
                </div>

                {/* Digital Thermal Receipt Preview Card */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                  <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Printer className="w-5 h-5 text-emerald-600" />
                    Reçu Numérique (Format Ticket PDF)
                  </h2>

                  {activeReceipt ? (
                    <div className="bg-amber-50/50 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-700 p-6 rounded-xl font-mono text-xs shadow-inner">
                      <div className="text-center border-b border-dashed border-slate-300 dark:border-slate-700 pb-4 mb-4">
                        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 uppercase">MA BOUTIQUE POS</h3>
                        <p className="text-[10px] text-slate-500">Abidjan, Côte d'Ivoire • Tel: +225 0102030405</p>
                        <p className="text-[10px] text-slate-500">N° Reçu: {activeReceipt.id}</p>
                        <p className="text-[10px] text-slate-500">Date: {activeReceipt.date}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-slate-500">Client: <span className="text-slate-800 dark:text-slate-200 font-bold">{activeReceipt.customer}</span></p>
                        <p className="text-slate-500">Mode: <span className="text-slate-800 dark:text-slate-200 font-bold">{activeReceipt.method}</span></p>
                      </div>

                      <div className="space-y-2 border-b border-dashed border-slate-300 dark:border-slate-700 pb-4 mb-4">
                        {activeReceipt.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.name} x{item.qty}</span>
                            <span className="font-bold">{formatPrice(item.price * item.qty)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                        <span>TOTAL PAYÉ:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{formatPrice(activeReceipt.total)}</span>
                      </div>

                      <div className="text-center text-[10px] text-slate-400 mt-6 pt-2 border-t border-slate-200 dark:border-slate-800">
                        Merci pour votre confiance ! <br />
                        Généré automatiquement par WhatsApp Micro-POS SaaS.
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
                      Aucun reçu actif pour le moment.
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Sales History Log */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Historique Récent des Reçus WhatsApp Générés
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-400 uppercase">
                      <th className="py-3 px-4">ID Reçu</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Paiement</th>
                      <th className="py-3 px-4">Articles</th>
                      <th className="py-3 px-4 text-right">Montant Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                    {salesHistory.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{sale.id}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs">{sale.date}</td>
                        <td className="py-3 px-4 font-medium">{sale.customer}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                            {sale.method}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{sale.itemsCount} article(s)</td>
                        <td className="py-3 px-4 text-right font-bold">{formatPrice(sale.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ARCHITECTURE & MOBILE ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-10">
            
            {/* Header Banner */}
            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-emerald-900 to-slate-900 text-white'} shadow-xl`}>
              <div className="max-w-3xl space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
                  Feuille de Route Technique & Production
                </span>
                <h2 className="text-3xl font-black text-white">
                  Comment transformer ce projet en SaaS Mobile & Web commercialisable ?
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Guide complet pour le développement d'une application mobile cross-platform (iOS / Android) téléchargeable sur l'App Store & Google Play Store, couplée à une architecture backend évolutive et sécurisée.
                </p>
              </div>
            </div>

            {/* Step 1: Mobile App Architecture */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold">Développement Mobile Cross-Platform (iOS & Android)</h3>
                  <p className="text-xs text-slate-500">Frameworks recommandés et publication sur les stores</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                  <h4 className="font-bold text-base flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Code className="w-5 h-5" />
                    Option 1: React Native avec Expo (Recommandé)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Utilisez <strong>Expo / React Native</strong> pour réutiliser l'intégralité du code React du Web Dashboard tout en générant un code natif pour Android (.apk / .aab) et iOS (.ipa).
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                    <li>Un seul codebase TypeScript pour Web, iOS et Android</li>
                    <li>Impression thermique Bluetooth directe via packages Expo (ex: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">react-native-bluetooth-escpos-printer</code>)</li>
                    <li>Mises à jour instantanées de l'application sans re-validation Store via Expo EAS Over-The-Air (OTA)</li>
                  </ul>
                </div>

                <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                  <h4 className="font-bold text-base flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Globe className="w-5 h-5" />
                    Option 2: Progressive Web App (PWA) + PWABuilder
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    La méthode la plus rapide pour tester le marché sans repasser par du code natif.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                    <li>Transformez le dashboard web React en PWA installable sur l'écran d'accueil du smartphone</li>
                    <li>Utilisez <strong>PWABuilder.com</strong> pour encapsuler le site web dans un paquet Android TWA (Trusted Web Activity) pour soumission directe sur Google Play Store</li>
                    <li>Fonctionnement Hors-Ligne (Offline First) avec Service Workers et IndexedDB local</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Fullstack Architecture Diagram */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold">Architecture Cloud Backend & Intégrations API</h3>
                  <p className="text-xs text-slate-500">Composants système requis pour automatiser les envois WhatsApp</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Node / Database */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Cpu className="w-4 h-4" /> Backend & DB Multi-Tenant
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>Node.js / Express</strong> ou <strong>Supabase (PostgreSQL)</strong>. 
                  </p>
                  <ul className="list-disc list-inside text-slate-500 space-y-1">
                    <li>Isolation des données commerçants (Row Level Security)</li>
                    <li>Stockage des PDF sur AWS S3 / Cloudflare R2</li>
                    <li>Authentification sécurisée JWT</li>
                  </ul>
                </div>

                {/* WhatsApp Cloud API */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <MessageSquare className="w-4 h-4" /> WhatsApp Business API
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Intégration via <strong>Meta Cloud API</strong> officielle ou <strong>Twilio WhatsApp</strong>.
                  </p>
                  <ul className="list-disc list-inside text-slate-500 space-y-1">
                    <li>Modèles de messages approuvés par Meta (Template Messages)</li>
                    <li>Webhooks pour la réception des accusés de lecture</li>
                    <li>Génération automatique de liens PDF dynamique</li>
                  </ul>
                </div>

                {/* Mobile Money Integration */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" /> Paiements & Abonnements
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Passerelles Mobile Money (Wave, Orange, MTN) & Stripe.
                  </p>
                  <ul className="list-disc list-inside text-slate-500 space-y-1">
                    <li>API CinetPay / FedaPay / Wave Business</li>
                    <li>Facturation d'abonnement SaaS récurrent (ex: 10.000 FCFA/mois)</li>
                    <li>Paiements par QR Code imprimables sur reçu</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Step 3: Deployment Roadmap Timeline */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold">Plan d'Action pour la Mise en Ligne</h3>
                  <p className="text-xs text-slate-500">Étapes recommandées de la conception au lancement</p>
                </div>
              </div>

              <div className="space-y-4">
                
                {/* Phase 1 */}
                <div className="flex gap-4 items-start">
                  <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                    Semaines 1-2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">PWA Web Dashboard MVP</h4>
                    <p className="text-xs text-slate-500">
                      Déployez l'interface Web actuelle sur Vercel/Netlify. Connectez une base de données Supabase pour enregistrer le catalogue produit et les transactions clients.
                    </p>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex gap-4 items-start">
                  <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                    Semaines 3-4
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Intégration WhatsApp Cloud API & PDF Engine</h4>
                    <p className="text-xs text-slate-500">
                      Configurez votre compte Facebook Business Manager et activez l'API WhatsApp Cloud. Connectez un microservice (Puppeteer ou PDFKit) pour générer les reçus PDF automatiques stockés en cloud.
                    </p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex gap-4 items-start">
                  <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                    Semaines 5-6
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Build Mobile Native avec React Native / Expo EAS</h4>
                    <p className="text-xs text-slate-500">
                      Initialisez le projet Expo Mobile avec le support du Bluetooth (pour l'impression de ticket physique sur place) et des notifications Push.
                    </p>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="flex gap-4 items-start">
                  <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                    Semaine 7+
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Publication Play Store & App Store</h4>
                    <p className="text-xs text-slate-500">
                      Soumettez l'application sur Google Play Console ($25 à vie) et Apple Developer Program ($99/an). Lancement commercial avec offre Freemium pour les commerçants.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`border-t py-6 mt-12 ${darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">
          © 2026 WhatsApp Micro-POS SaaS Prototype. Prêt pour conversion vers React Native & Mobile Stores.
        </div>
      </footer>

    </div>
  );
}