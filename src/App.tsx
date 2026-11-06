import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, SavedOrder } from './types/menu';
import {
  loadMenuItems,
  saveMenuItems,
  loadRestaurantSettings,
  saveRestaurantSettings,
  RestaurantSettings,
} from './data/initialMenu';
import { Header } from './components/Header';
import { InteractiveFoodShowcase } from './components/InteractiveFoodShowcase';
import { ProductInfoPanel } from './components/ProductInfoPanel';
import { ProductLookbookModal } from './components/ProductLookbookModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';
import { StoryAndHeritage } from './components/StoryAndHeritage';
import { Footer } from './components/Footer';
import { Sparkles, ArrowDown, MessageSquare } from 'lucide-react';
import { audio } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [items, setItems] = useState<MenuItem[]>(() => loadMenuItems());
  const [activeItem, setActiveItem] = useState<MenuItem>(() => items[0]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('orzr_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [settings, setSettings] = useState<RestaurantSettings>(() => loadRestaurantSettings());

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [lookbookItem, setLookbookItem] = useState<MenuItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('orzr_cart_items', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync document language and direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Keep activeItem valid if items array changes
  useEffect(() => {
    const found = items.find((it) => it.id === activeItem.id);
    if (found) {
      setActiveItem(found);
    } else if (items.length > 0) {
      setActiveItem(items[0]);
    }
  }, [items]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleAddToCart = (
    item: MenuItem,
    selectedSize: { id: string; nameAr: string; nameEn: string; priceDiff: number },
    selectedExtras: { id: string; nameAr: string; nameEn: string; price: number }[],
    quantity: number
  ) => {
    const extraTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = item.price + (selectedSize?.priceDiff || 0) + extraTotal;
    const cartItemId = `${item.id}-${selectedSize.id}-${selectedExtras.map((e) => e.id).sort().join('_')}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            selectedSize,
            selectedExtras,
            quantity,
            unitPrice,
          },
        ];
      }
    });

    // Auto-open drawer briefly or allow user to inspect
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((c) => (c.cartItemId === cartItemId ? { ...c, quantity: newQty } : c))
      );
    }
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((c) => c.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenLookbook = (item: MenuItem) => {
    setLookbookItem(item);
    setIsLookbookOpen(true);
  };

  const handleSaveItems = (updated: MenuItem[]) => {
    setItems(updated);
    saveMenuItems(updated);
  };

  const handleSaveSettings = (updated: RestaurantSettings) => {
    setSettings(updated);
    saveRestaurantSettings(updated);
  };

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F2EB] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      
      {/* Universal Luxury Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavClick={handleNavClick}
      />

      {/* Hero Exhibition Banner (Minimalist Japanese Editorial) */}
      <section id="hero" className="relative pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-gradient-to-b from-[#0B0B0B] to-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Subtle minimal text kicker */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-[0.25em] mb-3">
            <span>RIYADH</span>
            <span aria-hidden="true">·</span>
            <span>GASTRONOMIC ARCHIVE</span>
            <span aria-hidden="true">·</span>
            <span>EST. 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial-ar tracking-tight text-[#F5F2EB] mb-4 max-w-4xl text-balance">
            {lang === 'ar' ? (
              <>
                معرض الطهي الرقمي الفاخر <span className="gold-gradient-text">ثُـريّـا</span>
              </>
            ) : (
              <>
                ORZR Al-Thuraya <span className="gold-gradient-text">Culinary Archive</span>
              </>
            )}
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-sm sm:text-base text-[#C8C2B7]/80 max-w-2xl font-light leading-relaxed mb-6">
            {lang === 'ar'
              ? 'مستوحى من فلسفة الأرشيف الرقمي الياباني وممزوج بكرم الضيافة السعودية المعاصرة. استكشف الأطباق ثلاثية الأبعاد واطلب مباشرة مع خيارات الدفع عبر الواتساب.'
              : 'Inspired by Japanese digital archive philosophy and steeped in Saudi hospitality. Experience floating 3D dishes, bespoke customizations, and direct WhatsApp ordering.'}
          </p>

          {/* Quick direct WhatsApp assistance banner */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 text-[#F3E5AB]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'ألوان الأسود والذهب الفاخر' : 'Obsidian & Gold Aesthetics'}</span>
            </span>
            <span className="text-stone-600">·</span>
            <a
              href={`https://wa.me/${settings.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#D4AF37]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'خدمة الطلبات والدفع عبر الواتساب' : 'WhatsApp Orders & Direct Settlement'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Interactive Food Showcase Section (Desktop Split-Layout) */}
      <main id="showcase" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* Central 3D Interactive Showcase Area */}
          <InteractiveFoodShowcase
            items={items}
            activeItem={activeItem}
            onSelectItem={(it) => setActiveItem(it)}
            onOpenLookbook={handleOpenLookbook}
            lang={lang}
          />

          {/* Dynamic Right-Side Product Info Panel */}
          <ProductInfoPanel
            item={activeItem}
            lang={lang}
            onAddToCart={handleAddToCart}
            onOpenLookbook={handleOpenLookbook}
          />
        </div>
      </main>

      {/* Our Story & Culinary Philosophy */}
      <StoryAndHeritage lang={lang} />

      {/* Luxury Footer */}
      <Footer
        settings={settings}
        lang={lang}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductLookbookModal
        item={lookbookItem}
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        lang={lang}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        settings={settings}
        lang={lang}
        onOrderCompleted={(ord) => {
          // Keep cart updated
        }}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        items={items}
        onSaveItems={handleSaveItems}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        lang={lang}
      />
    </div>
  );
}
