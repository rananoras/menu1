import React from 'react';
import { MessageSquare, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { RestaurantSettings } from '../data/initialMenu';
import { audio } from '../utils/audio';

interface FooterProps {
  settings: RestaurantSettings;
  lang: 'ar' | 'en';
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, lang, onOpenAdmin }) => {
  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/5 text-stone-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Wordmark & Essence */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-cinzel font-bold tracking-[0.2em] text-[#F3E5AB]">
                ORZR
              </span>
              <span className="text-sm font-editorial-ar text-[#D4AF37]">
                ثُـريّـا
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              {lang === 'ar'
                ? 'المعرض الرقمي التفاعلي للأطباق والمشروبات الفاخرة، يدمج بساطة الفلسفة اليابانية مع أصالة الضيافة السعودية الملكية.'
                : 'An interactive digital culinary exhibition merging Japanese minimalist editorial sensibility with royal Saudi luxury hospitality.'}
            </p>
          </div>

          {/* Col 2: Location & Address in Saudi Arabia */}
          <div>
            <div className="text-[#F3E5AB] font-semibold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'الموقع والعنوان' : 'Riyadh Flagship'}</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              {lang === 'ar' ? settings.locationAr : settings.locationEn}
            </p>
            <p className="text-stone-500 mt-1">
              {lang === 'ar' ? 'طريق الملك خالد، صالة كبار الشخصيات' : 'King Khalid Road, VIP Pavilion'}
            </p>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <div className="text-[#F3E5AB] font-semibold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'ساعات الخدمة والاستقبال' : 'Exhibition Hours'}</span>
            </div>
            <p className="text-stone-300">
              {lang === 'ar' ? 'يومياً: من 12:00 ظهراً وحتى 01:30 بعد منتصف الليل' : 'Daily: 12:00 PM – 01:30 AM'}
            </p>
            <p className="text-stone-500 mt-1">
              {lang === 'ar' ? 'خدمة القهوة المختصة تبدأ من 07:00 صباحاً' : 'Specialty Coffee Bar opens at 07:00 AM'}
            </p>
          </div>

          {/* Col 4: WhatsApp Concierge Action */}
          <div>
            <div className="text-[#F3E5AB] font-semibold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'الكونسيرج والواتساب' : 'WhatsApp Concierge'}</span>
            </div>
            <p className="text-stone-400 mb-3">
              {lang === 'ar' ? 'للحجوزات الخاصة والطلبات الحصرية والدفع المباشر:' : 'For reservations, VIP dining and direct WhatsApp orders:'}
            </p>
            <a
              href={`https://wa.me/${settings.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-black font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-mono dir-ltr">+{settings.whatsappPhone}</span>
            </a>
          </div>
        </div>

        {/* Bottom row: Quiet copyright and admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-600">
          <div>
            © {new Date().getFullYear()} {settings.restaurantNameAr} · All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                audio.playClick();
                onOpenAdmin();
              }}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {lang === 'ar' ? 'بوابة إدارة المحتوى (CMS)' : 'Manager Portal'}
            </button>
            <span>·</span>
            <span>Riyadh, Kingdom of Saudi Arabia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
