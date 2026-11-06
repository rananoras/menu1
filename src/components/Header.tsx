import React from 'react';
import { ShoppingBag, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { audio } from '../utils/audio';

interface HeaderProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onNavClick: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  onNavClick,
}) => {
  const [isMuted, setIsMuted] = React.useState<boolean>(audio.getIsMuted());

  const handleToggleSound = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audio.playChime(640);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/85 backdrop-blur-md border-b border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            audio.playClick();
            onNavClick('hero');
          }}
          className="text-left rtl:text-right group flex items-baseline gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-cinzel font-bold tracking-[0.2em] text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors">
            ORZR
          </span>
          <span className="text-sm sm:text-base font-editorial-ar text-[#D4AF37]/80 tracking-widest">
            ثُـريّـا
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium text-[#C8C2B7]/80 tracking-wider">
          <button
            onClick={() => {
              audio.playClick();
              onNavClick('showcase');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {lang === 'ar' ? 'معرض الأطباق' : 'Exhibition'}
          </button>

          <button
            onClick={() => {
              audio.playClick();
              onNavClick('categories');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {lang === 'ar' ? 'القائمة المختارة' : 'Menu Collections'}
          </button>

          <button
            onClick={() => {
              audio.playClick();
              onNavClick('story');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {lang === 'ar' ? 'الفلسفة والهوية' : 'Our Heritage'}
          </button>

          <button
            onClick={() => {
              audio.playClick();
              onNavClick('contact');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {lang === 'ar' ? 'الحجز والتواصل' : 'Location & Concierge'}
          </button>

          <button
            onClick={() => {
              audio.playClick();
              onOpenAdmin();
            }}
            className="flex items-center gap-1.5 text-stone-500 hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1"
            title={lang === 'ar' ? 'لوحة تحكم إدارة المطعم' : 'Restaurant CMS Admin'}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px] uppercase tracking-wider">{lang === 'ar' ? 'الإدارة' : 'Admin'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + sound/lang controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Sound ambiance toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 text-stone-400 hover:text-[#F3E5AB] rounded-full hover:bg-white/5 transition-colors"
            title={lang === 'ar' ? (isMuted ? 'تفعيل الصوت' : 'كتم الصوت') : (isMuted ? 'Enable Sound' : 'Mute Sound')}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              audio.playClick();
              onToggleLang();
            }}
            className="px-2.5 py-1 text-xs font-semibold tracking-wider text-[#C8C2B7] hover:text-[#F3E5AB] border border-white/10 hover:border-[#D4AF37]/50 rounded transition-colors whitespace-nowrap"
          >
            {lang === 'ar' ? 'EN' : 'العربية'}
          </button>

          {/* Primary Action: Shopping Cart Trigger */}
          <button
            onClick={() => {
              audio.playClick();
              onOpenCart();
            }}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black font-semibold text-xs sm:text-sm rounded hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/15 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span>{lang === 'ar' ? 'سلة الطلبات' : 'Order Cart'}</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold bg-black text-[#F3E5AB] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
