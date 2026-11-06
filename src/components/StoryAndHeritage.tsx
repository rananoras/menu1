import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface StoryAndHeritageProps {
  lang: 'ar' | 'en';
}

export const StoryAndHeritage: React.FC<StoryAndHeritageProps> = ({ lang }) => {
  return (
    <section id="story" className="py-24 border-t border-white/5 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Unboxed, natural human editorial) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs text-[#D4AF37] uppercase tracking-[0.25em] mb-2 font-medium">
            {lang === 'ar' ? 'فلسفة المكان والهوية' : 'Our Culinary Philosophy'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F2EB] font-editorial-ar tracking-wide">
            {lang === 'ar'
              ? 'تلاقي الدقة اليابانية مع فيض الكرم السعودي'
              : 'Japanese Editorial Artistry Meets Arabian Majesty'}
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37]/60 mx-auto mt-4" />
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
            <div className="text-xs font-mono text-[#D4AF37] mb-3">01. WABI-SABI MINIMALISM</div>
            <h3 className="text-lg font-bold text-[#F3E5AB] font-editorial-ar mb-3">
              {lang === 'ar' ? 'البساطة والصفاء الإيديتوريالي' : 'Architectural Serenity'}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C2B7]/80 leading-relaxed">
              {lang === 'ar'
                ? 'استلهمنا концепт أرشيف ORZR لنقدم الأطباق كمنحوتات بصرية تطفو في الفضاء، متحررين من قوالب المطاعم التقليدية المزدحمة.'
                : 'Drawing inspiration from the ORZR digital archive, dishes are presented as floating gastronomic sculptures with generous negative space.'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 relative">
            <div className="text-xs font-mono text-[#D4AF37] mb-3">02. NOBLE SAUDI HERITAGE</div>
            <h3 className="text-lg font-bold text-[#F3E5AB] font-editorial-ar mb-3">
              {lang === 'ar' ? 'أصالة المكونات النجدية والحجازية' : 'Pristine Sourcing'}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C2B7]/80 leading-relaxed">
              {lang === 'ar'
                ? 'نحتفي بخيرات الجزيرة العربية: تمر السكري من القصيم، ورد الطائف الجبلي، زيت زيتون الجوف البكر، والعنبر والزعفران الحر النبيل.'
                : 'Celebrating the bounties of Arabia: Al-Qassim Sukari dates, fragrant Taif rosewater, cold-pressed Al-Jouf olive oil, and ceremonial saffron.'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
            <div className="text-xs font-mono text-[#D4AF37] mb-3">03. BESPOKE HOSPITALITY</div>
            <h3 className="text-lg font-bold text-[#F3E5AB] font-editorial-ar mb-3">
              {lang === 'ar' ? 'تجربة ضيافة حصرية ومخصصة' : 'Discreet Concierge'}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C2B7]/80 leading-relaxed">
              {lang === 'ar'
                ? 'خدمة طلب مباشرة ودفع فوري عبر الواتساب مع خيارات التوصيل الملكي أو التقديم على طاولتك الخاصة في وادي ليسن بالرياض.'
                : 'Direct ordering and private payment via WhatsApp with white-glove VIP delivery or tableside service in Riyadh.'}
            </p>
          </div>
        </div>

        {/* Quote Strip */}
        <div className="mt-16 text-center border border-white/5 bg-[#0C0C0C] p-8 rounded-2xl">
          <blockquote className="text-base sm:text-lg italic text-[#F3E5AB] font-editorial-ar max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? '«الطعام ليس مجرد مذاق، بل هو معرض حواس يبدأ من العين ويخلد في الذاكرة»'
              : '"Gastronomy is not mere sustenance; it is a sensory exhibition curated for contemplation and lingering memory."'}
          </blockquote>
          <div className="mt-3 text-xs text-stone-500 font-sans uppercase tracking-widest">
            {lang === 'ar' ? 'فريق الإبداع والطهي · ثريا الرياض' : 'Curatorial Team · ORZR Al-Thuraya Riyadh'}
          </div>
        </div>
      </div>
    </section>
  );
};
