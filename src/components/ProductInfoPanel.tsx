import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/menu';
import { Plus, Minus, ShoppingBag, Eye, Sparkles, Check } from 'lucide-react';
import { audio } from '../utils/audio';

interface ProductInfoPanelProps {
  item: MenuItem;
  lang: 'ar' | 'en';
  onAddToCart: (
    item: MenuItem,
    selectedSize: { id: string; nameAr: string; nameEn: string; priceDiff: number },
    selectedExtras: { id: string; nameAr: string; nameEn: string; price: number }[],
    quantity: number
  ) => void;
  onOpenLookbook: (item: MenuItem) => void;
}

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  item,
  lang,
  onAddToCart,
  onOpenLookbook,
}) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0] || { id: 'std', nameAr: 'قياسي', nameEn: 'Standard', priceDiff: 0 });
  const [selectedExtras, setSelectedExtras] = useState<{ id: string; nameAr: string; nameEn: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset variant selections when active item changes
  useEffect(() => {
    setSelectedSize(item.sizes[0] || { id: 'std', nameAr: 'قياسي', nameEn: 'Standard', priceDiff: 0 });
    setSelectedExtras([]);
    setQuantity(1);
    setJustAdded(false);
  }, [item]);

  const toggleExtra = (extra: { id: string; nameAr: string; nameEn: string; price: number }) => {
    audio.playClick();
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleQuantity = (diff: number) => {
    audio.playClick();
    setQuantity((q) => Math.max(1, Math.min(20, q + diff)));
  };

  const extraTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + (selectedSize?.priceDiff || 0) + extraTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    if (!item.isAvailable) return;
    audio.playAddToCart();
    onAddToCart(item, selectedSize, selectedExtras, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <aside className="w-full lg:w-[420px] xl:w-[460px] shrink-0 bg-[#0E0E0E] border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative">
      {/* Top Section */}
      <div>
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-xs text-[#C8C2B7]/70 mb-3 tracking-wider">
          <div className="flex items-center gap-2">
            <span>{item.category.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'ar' ? item.originAr : item.originEn}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D4AF37]">
            {item.isAvailable ? (
              <span>{lang === 'ar' ? 'جاهز للتحضير الفوري' : 'Available'}</span>
            ) : (
              <span className="text-red-400">{lang === 'ar' ? 'غير متوفر حالياً' : 'Sold Out'}</span>
            )}
          </div>
        </div>

        {/* Product Names */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F5F2EB] leading-snug font-editorial-ar tracking-wide">
            {item.nameAr}
          </h2>
          <p className="text-sm text-[#AA8022] font-editorial-en tracking-wider mt-0.5">
            {item.nameEn}
          </p>
        </div>

        {/* Price in Saudi Riyals */}
        <div className="flex items-baseline gap-2 mb-5 pb-4 border-b border-white/5">
          <span className="text-3xl font-bold text-[#F3E5AB] font-cinzel tabular-nums">
            {unitPrice}
          </span>
          <span className="text-sm font-medium text-[#D4AF37] tracking-wider">
            {lang === 'ar' ? 'ريال سعودي' : 'SAR'}
          </span>
          {selectedSize?.priceDiff !== 0 && (
            <span className="text-xs text-stone-500 tabular-nums">
              ({lang === 'ar' ? 'الأساس' : 'Base'}: {item.price} SAR)
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#C8C2B7] mb-5">
          {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
        </p>

        {/* Size Selection (if multiple sizes available) */}
        {item.sizes.length > 1 && (
          <div className="mb-5">
            <span className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
              {lang === 'ar' ? 'اختر الحجم أو الحصة' : 'Select Portion'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {item.sizes.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => {
                      audio.playClick();
                      setSelectedSize(size);
                    }}
                    className={`py-2 px-3 text-xs rounded border text-left rtl:text-right transition-colors ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#F3E5AB]'
                        : 'border-white/10 bg-[#141414] text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium">{lang === 'ar' ? size.nameAr : size.nameEn}</div>
                    {size.priceDiff !== 0 && (
                      <div className="text-[11px] text-[#D4AF37] tabular-nums mt-0.5">
                        +{size.priceDiff} {lang === 'ar' ? 'ر.س' : 'SAR'}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Optional Customizations / Extras */}
        {item.extras.length > 0 && (
          <div className="mb-5">
            <span className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
              {lang === 'ar' ? 'إضافات الشيف الفاخرة' : 'Chef Customizations & Extras'}
            </span>
            <div className="space-y-1.5">
              {item.extras.map((extra) => {
                const isChecked = selectedExtras.some((e) => e.id === extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`w-full flex items-center justify-between p-2.5 rounded border text-xs transition-colors ${
                      isChecked
                        ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#F3E5AB]'
                        : 'border-white/5 bg-[#141414]/60 text-stone-300 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                            : 'border-stone-600 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{lang === 'ar' ? extra.nameAr : extra.nameEn}</span>
                    </div>
                    <span className="text-[#D4AF37] tabular-nums font-medium">
                      +{extra.price} {lang === 'ar' ? 'ر.س' : 'SAR'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Ingredients & Provenance (Unboxed with · separator) */}
        <div className="mb-4 text-xs text-stone-400">
          <span className="text-stone-500 uppercase tracking-wider block mb-1">
            {lang === 'ar' ? 'المكونات النقية' : 'Core Ingredients'}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-stone-300 leading-relaxed">
            {(lang === 'ar' ? item.ingredientsAr : item.ingredientsEn).map((ing, idx, arr) => (
              <React.Fragment key={idx}>
                <span>{ing}</span>
                {idx < arr.length - 1 && <span className="text-stone-600">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Allergens warning if present */}
        {item.allergensAr.length > 0 && (
          <div className="text-[11px] text-amber-300/80 mb-5">
            <span className="text-stone-500">{lang === 'ar' ? 'مسببات الحساسية: ' : 'Allergens: '}</span>
            <span>{(lang === 'ar' ? item.allergensAr : item.allergensEn).join(' · ')}</span>
          </div>
        )}
      </div>

      {/* Bottom Action Area */}
      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-white/10 rounded bg-[#141414] px-2 py-1.5 shrink-0">
            <button
              onClick={() => handleQuantity(-1)}
              disabled={quantity <= 1}
              className="p-1 text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-[#F3E5AB] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantity(1)}
              className="p-1 text-stone-400 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            disabled={!item.isAvailable}
            className={`flex-1 py-3 px-4 rounded font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              !item.isAvailable
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black hover:brightness-110 active:scale-[0.98] shadow-lg shadow-[#D4AF37]/20'
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
                  {lang === 'ar' ? 'إضافة للسلة' : 'Add to Order'} · {totalPrice}{' '}
                  {lang === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Lookbook Full Screen Trigger */}
        <button
          onClick={() => {
            audio.playClick();
            onOpenLookbook(item);
          }}
          className="w-full py-2 text-xs font-medium text-[#C8C2B7] hover:text-[#D4AF37] flex items-center justify-center gap-2 border border-white/5 hover:border-[#D4AF37]/30 rounded transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'استعراض الإيديتوريال وتفاصيل التحضير' : 'View Full Editorial Lookbook'}</span>
        </button>
      </div>
    </aside>
  );
};
