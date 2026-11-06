import React, { useEffect } from 'react';
import { MenuItem } from '../types/menu';
import { X, Sparkles, Clock, Flame, ShieldAlert, ShoppingBag, Check } from 'lucide-react';
import { audio } from '../utils/audio';

interface ProductLookbookModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  onAddToCart: (
    item: MenuItem,
    selectedSize: { id: string; nameAr: string; nameEn: string; priceDiff: number },
    selectedExtras: { id: string; nameAr: string; nameEn: string; price: number }[],
    quantity: number
  ) => void;
}

export const ProductLookbookModal: React.FC<ProductLookbookModalProps> = ({
  item,
  isOpen,
  onClose,
  lang,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleQuickAdd = () => {
    audio.playAddToCart();
    onAddToCart(item, item.sizes[0], [], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Container Box */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0C0C0C] border border-white/10 rounded-2xl overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          aria-label="Close Lookbook"
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2.5 rounded-full bg-black/70 border border-white/10 text-stone-300 hover:text-white hover:border-[#D4AF37] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Cinematic Visual Presentation */}
        <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-[600px] bg-black">
          <img
            src={item.image}
            alt={lang === 'ar' ? item.nameAr : item.nameEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0C0C0C] opacity-80" />
          
          {/* Subtle gold badge in photo */}
          <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 flex items-center gap-2 text-xs text-[#F3E5AB] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'تصوير حصري لمطعم ثريا' : 'Curated Studio Archive'}</span>
          </div>
        </div>

        {/* Right Column: Gastronomic Editorial Text & Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Top Minimal Kicker */}
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] tracking-widest uppercase mb-2">
              <span>{item.category}</span>
              <span>·</span>
              <span>{lang === 'ar' ? item.originAr : item.originEn}</span>
            </div>

            {/* Title Lockup */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F2EB] font-editorial-ar leading-tight mb-1">
              {item.nameAr}
            </h2>
            <p className="text-sm text-[#AA8022] font-editorial-en tracking-wider mb-4">
              {item.nameEn}
            </p>

            {/* Price */}
            <div className="text-2xl font-bold text-[#F3E5AB] font-cinzel mb-6 pb-4 border-b border-white/5">
              {item.price}{' '}
              <span className="text-sm font-sans font-normal text-[#D4AF37]">
                {lang === 'ar' ? 'ريال سعودي' : 'SAR'}
              </span>
            </div>

            {/* Detailed Description */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                {lang === 'ar' ? 'وصف التجربة' : 'Culinary Description'}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
              </p>
            </div>

            {/* Curator Philosophy & Sourcing */}
            <div className="mb-6 bg-[#141414] border border-white/5 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'فلسفة الطهي ومصدر المكونات' : 'Sourcing & Technique'}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'ar' ? item.curatorNotesAr : item.curatorNotesEn}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-stone-400">
              <div className="flex items-center gap-2 bg-[#121212] p-2.5 rounded border border-white/5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">{lang === 'ar' ? 'مدة التحضير' : 'Prep Time'}</div>
                  <div className="text-stone-200 font-medium">{item.prepTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#121212] p-2.5 rounded border border-white/5">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">{lang === 'ar' ? 'السعرات الحرارية' : 'Calories'}</div>
                  <div className="text-stone-200 font-medium">{item.calories} {lang === 'ar' ? 'سعرة' : 'kcal'}</div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6 text-xs">
              <span className="text-stone-500 uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'المكونات الأصيلة' : 'Ingredients'}
              </span>
              <div className="text-stone-300 leading-relaxed">
                {(lang === 'ar' ? item.ingredientsAr : item.ingredientsEn).join(' · ')}
              </div>
            </div>

            {/* Allergens warning */}
            {item.allergensAr.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-amber-300/80 mb-6 bg-amber-950/20 p-2.5 rounded border border-amber-800/20">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  {lang === 'ar'
                    ? `تنبيه الحساسية: يحتوي على ${item.allergensAr.join('، ')}`
                    : `Allergens: Contains ${item.allergensEn.join(', ')}`}
                </span>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-white/5 flex items-center gap-3">
            <button
              onClick={handleQuickAdd}
              disabled={!item.isAvailable}
              className={`flex-1 py-3.5 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2.5 transition-all ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black hover:brightness-110 active:scale-95 shadow-xl shadow-[#D4AF37]/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{lang === 'ar' ? 'تمت الإضافة للسلة' : 'Added to Cart'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'طلب فوري وإضافة للسلة' : 'Add to Order Now'} · {item.price}{' '}
                    {lang === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
