import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, CategoryId } from '../types/menu';
import { CATEGORIES } from '../data/initialMenu';
import { ThreeFoodStage } from './ThreeFoodStage';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

interface InteractiveFoodShowcaseProps {
  items: MenuItem[];
  activeItem: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  onOpenLookbook: (item: MenuItem) => void;
  lang: 'ar' | 'en';
}

export const InteractiveFoodShowcase: React.FC<InteractiveFoodShowcaseProps> = ({
  items,
  activeItem,
  onSelectItem,
  onOpenLookbook,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('signature');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items based on category
  const filteredItems = items.filter((item) => item.category === selectedCategory);
  const activeIndex = Math.max(0, filteredItems.findIndex((it) => it.id === activeItem.id));

  // Sync category if active item belongs to another category
  useEffect(() => {
    if (activeItem.category !== selectedCategory) {
      setSelectedCategory(activeItem.category);
    }
  }, [activeItem]);

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    audio.playClick();
    const newIdx = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    onSelectItem(filteredItems[newIdx]);
  };

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    audio.playClick();
    const newIdx = (activeIndex + 1) % filteredItems.length;
    onSelectItem(filteredItems[newIdx]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (lang === 'ar') handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (lang === 'ar') handlePrev();
        else handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, filteredItems, lang]);

  return (
    <div ref={containerRef} className="flex-1 flex flex-col justify-between select-none">
      
      {/* Category Navigation Bar (Segmented luxury tabs) */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max border-b border-white/10 pb-3">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audio.playClick();
                  setSelectedCategory(cat.id);
                  const firstOfCat = items.find((i) => i.category === cat.id);
                  if (firstOfCat) onSelectItem(firstOfCat);
                }}
                className={`py-2 px-4 rounded text-xs font-semibold tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#D4AF37]/15 border border-[#D4AF37] text-[#F3E5AB] shadow-sm'
                    : 'bg-[#121212] border border-white/5 text-stone-400 hover:text-white hover:border-white/15'
                }`}
              >
                {isActive && <Sparkles className="w-3 h-3 text-[#D4AF37]" />}
                <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Subtitle Kicker (Minimal Unboxed) */}
      <div className="mt-3 text-xs text-[#C8C2B7]/60 tracking-wider">
        {lang === 'ar'
          ? CATEGORIES.find((c) => c.id === selectedCategory)?.subtitleAr
          : CATEGORIES.find((c) => c.id === selectedCategory)?.subtitleEn}
      </div>

      {/* Central Interactive 3D Food Showcase Stage */}
      <div className="relative my-4 flex-1 flex flex-col items-center justify-center min-h-[380px]">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous item"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-[#D4AF37] text-stone-300 hover:text-[#F3E5AB] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
        </button>

        {/* 3D WebGL Exhibition Stage */}
        <div className="w-full">
          <ThreeFoodStage
            activeItem={activeItem}
            onOpenLookbook={() => onOpenLookbook(activeItem)}
            lang={lang}
          />
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next item"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-[#D4AF37] text-stone-300 hover:text-[#F3E5AB] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <ChevronRight className="w-5 h-5 rtl:rotate-180" />
        </button>
      </div>

      {/* Bottom Horizontal Filmstrip Carousel & Index Tracker */}
      <div className="pt-2 border-t border-white/5">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-3 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(filteredItems.length || 1).padStart(2, '0')}</span>
            <span className="text-stone-600">·</span>
            <span className="text-stone-300 truncate max-w-[200px] sm:max-w-xs font-sans">
              {lang === 'ar' ? activeItem.nameAr : activeItem.nameEn}
            </span>
          </div>

          <div className="text-[11px] text-stone-500 font-sans hidden sm:block">
            {lang === 'ar' ? 'استخدم الأسهم أو اسحب للتنقل' : 'Use arrow keys or drag to navigate'}
          </div>
        </div>

        {/* Filmstrip thumbnails */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {filteredItems.map((item, idx) => {
            const isSelected = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audio.playClick();
                  onSelectItem(item);
                }}
                className={`relative flex items-center gap-2.5 p-2 rounded-lg border transition-all shrink-0 text-left rtl:text-right ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white shadow-md shadow-[#D4AF37]/10 scale-[1.02]'
                    : 'border-white/10 bg-[#121212]/80 text-stone-400 hover:border-white/30 hover:text-stone-200'
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black">
                  <img
                    src={item.image}
                    alt={lang === 'ar' ? item.nameAr : item.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 pr-1 rtl:pr-0 rtl:pl-1">
                  <div className="text-xs font-medium truncate max-w-[130px] sm:max-w-[160px]">
                    {lang === 'ar' ? item.nameAr : item.nameEn}
                  </div>
                  <div className="text-[11px] text-[#D4AF37] tabular-nums font-mono mt-0.5">
                    {item.price} {lang === 'ar' ? 'ر.س' : 'SAR'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
