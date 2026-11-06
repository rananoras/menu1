import React, { useState } from 'react';
import { CartItem, DiningType, PaymentMethod, SavedOrder } from '../types/menu';
import { RestaurantSettings } from '../data/initialMenu';
import { X, Trash2, Plus, Minus, MessageSquare, Send, CheckCircle2, ShieldCheck, MapPin, Phone, User, Clock } from 'lucide-react';
import { audio } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  settings: RestaurantSettings;
  lang: 'ar' | 'en';
  onOrderCompleted: (order: SavedOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
  lang,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [diningType, setDiningType] = useState<DiningType>('delivery');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<PaymentMethod>('whatsapp_transfer');
  const [lastOrder, setLastOrder] = useState<SavedOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const vat = Math.round(subtotal * settings.vatRate * 10) / 10;
  const deliveryFee = diningType === 'delivery' ? settings.deliveryFee : 0;
  const grandTotal = Math.round((subtotal + vat + deliveryFee) * 10) / 10;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert(lang === 'ar' ? 'الرجاء إدخال الاسم ورقم الجوال' : 'Please provide name and phone number');
      return;
    }

    audio.playAddToCart();

    const orderNumber = `ORZR-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timestampStr = now.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US');

    const newOrder: SavedOrder = {
      id: orderNumber,
      orderNumber,
      timestamp: timestampStr,
      items: [...cart],
      customerInfo: {
        name: customerName,
        phone,
        diningType,
        tableOrAddress,
        paymentPreference,
        notes,
      },
      subtotal,
      vat,
      deliveryFee,
      grandTotal,
      status: 'new',
    };

    // Save order in history
    try {
      const existingRaw = localStorage.getItem('orzr_orders_history');
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem('orzr_orders_history', JSON.stringify([newOrder, ...list]));
    } catch {
      // ignore
    }

    setLastOrder(newOrder);
    onOrderCompleted(newOrder);

    // Format luxury WhatsApp message
    let diningLabel = '';
    if (diningType === 'delivery') diningLabel = lang === 'ar' ? 'توصيل للموقع' : 'Delivery';
    else if (diningType === 'pickup') diningLabel = lang === 'ar' ? 'استلام من المطعم' : 'Takeaway / Pickup';
    else diningLabel = lang === 'ar' ? 'جلسة داخل المطعم' : 'Dine-In Table';

    let paymentLabel = '';
    if (paymentPreference === 'whatsapp_transfer') {
      paymentLabel = lang === 'ar' ? 'تحويل بنكي وإرسال الإشعار عبر الواتساب' : 'Bank Transfer & Slip via WhatsApp';
    } else if (paymentPreference === 'card_mada_applepay') {
      paymentLabel = lang === 'ar' ? 'مدى / أبل باي عند الاستلام أو الطاولة' : 'Mada / Apple Pay on Arrival';
    } else {
      paymentLabel = lang === 'ar' ? 'دفع نقدي عند الاستلام' : 'Cash on Delivery';
    }

    const itemsSummary = cart
      .map((item, idx) => {
        const extrasStr = item.selectedExtras.length > 0
          ? ` (${item.selectedExtras.map(e => e.nameAr).join(' + ')})`
          : '';
        const sizeStr = item.selectedSize.priceDiff !== 0 ? ` [${item.selectedSize.nameAr}]` : '';
        return `${idx + 1}. *${item.item.nameAr}* ${sizeStr}${extrasStr} × ${item.quantity} = ${item.unitPrice * item.quantity} ر.س`;
      })
      .join('\n');

    const message = `✨ *طلب جديد من مطعم ومقهى ثريا (ORZR)* ✨
━━━━━━━━━━━━━━━━━━━━
📌 *رقم الطلب:* #${orderNumber}
🕒 *التاريخ:* ${timestampStr}
👤 *اسم العميل:* ${customerName}
📱 *رقم التواصل:* ${phone}
🛎️ *نوع الخدمة:* ${diningLabel}
📍 *الموقع / رقم الطاولة:* ${tableOrAddress || 'حسب الاتفاق'}
💳 *طريقة الدفع:* ${paymentLabel}
${notes ? `📝 *ملاحظات خاصة:* ${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
🍽️ *قائمة الأصناف المطلوبة:*
${itemsSummary}
━━━━━━━━━━━━━━━━━━━━
💵 *المجموع الفرعي:* ${subtotal} ر.س
🏷️ *ضريبة القيمة المضافة (15%):* ${vat} ر.س
🚚 *رسوم التوصيل:* ${deliveryFee} ر.س
🌟 *الإجمالي المطلوب:* *${grandTotal} ريال سعودي*
━━━━━━━━━━━━━━━━━━━━
يسعدنا خدمتكم في ثريا، يرجى تأكيد الطلب أو إرسال إيصال التحويل للاعتماد الفوري.`;

    const encoded = encodeURIComponent(message);
    const targetUrl = `https://wa.me/${settings.whatsappPhone}?text=${encoded}`;

    // Open WhatsApp
    window.open(targetUrl, '_blank');
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#0D0D0D] border-l rtl:border-l-0 rtl:border-r border-white/10 h-full flex flex-col justify-between shadow-2xl z-10">
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#F5F2EB] font-editorial-ar tracking-wide">
              {step === 'cart' && (lang === 'ar' ? 'سلة الطلبات المختارة' : 'Your Order Bag')}
              {step === 'checkout' && (lang === 'ar' ? 'إتمام الطلب والدفع بالواتساب' : 'Checkout & WhatsApp Order')}
              {step === 'success' && (lang === 'ar' ? 'تم تجهيز الطلب بنجاح' : 'Order Dispatched')}
            </h2>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-500">
                  <div className="w-16 h-16 rounded-full border border-dashed border-stone-700 flex items-center justify-center mb-4 text-[#D4AF37]">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-medium text-stone-400 mb-1">
                    {lang === 'ar' ? 'سلة طلباتك فارغة حالياً' : 'Your cart is empty'}
                  </p>
                  <p className="text-xs text-stone-600 max-w-xs">
                    {lang === 'ar'
                      ? 'تصفح تشكيلة الأطباق والمشروبات الفاخرة وأضف لمساتك الخاصة'
                      : 'Explore our exhibition of masterworks and add your selection'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="p-3.5 rounded-xl bg-[#141414] border border-white/5 flex gap-3.5 items-center justify-between"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                        <img
                          src={cartItem.item.image}
                          alt={lang === 'ar' ? cartItem.item.nameAr : cartItem.item.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#F5F2EB] truncate">
                          {lang === 'ar' ? cartItem.item.nameAr : cartItem.item.nameEn}
                        </h4>

                        {/* Size tag */}
                        {cartItem.selectedSize.priceDiff !== 0 && (
                          <div className="text-[11px] text-[#AA8022]">
                            {lang === 'ar' ? cartItem.selectedSize.nameAr : cartItem.selectedSize.nameEn}
                          </div>
                        )}

                        {/* Extras list */}
                        {cartItem.selectedExtras.length > 0 && (
                          <div className="text-[10px] text-stone-400 truncate">
                            +{cartItem.selectedExtras.map((e) => (lang === 'ar' ? e.nameAr : e.nameEn)).join(', ')}
                          </div>
                        )}

                        <div className="text-xs font-semibold text-[#D4AF37] tabular-nums mt-1">
                          {cartItem.unitPrice * cartItem.quantity} {lang === 'ar' ? 'ر.س' : 'SAR'}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => {
                            audio.playClick();
                            onRemoveItem(cartItem.cartItemId);
                          }}
                          className="text-stone-600 hover:text-red-400 transition-colors p-1"
                          title="حذف الصنف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-white/10 rounded bg-black/60 px-1 py-0.5">
                          <button
                            onClick={() => {
                              audio.playClick();
                              onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1);
                            }}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold tabular-nums text-[#F3E5AB]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => {
                              audio.playClick();
                              onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1);
                            }}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleSendWhatsAppOrder} className="space-y-4">
              
              {/* Dining service selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  {lang === 'ar' ? 'نوع استلام الطلب' : 'Service Type'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'delivery', nameAr: 'توصيل فاخر', nameEn: 'VIP Delivery' },
                    { id: 'pickup', nameAr: 'استلام سفري', nameEn: 'Pickup' },
                    { id: 'dine_in', nameAr: 'طاولة بالصالة', nameEn: 'Dine-In' },
                  ].map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        audio.playClick();
                        setDiningType(srv.id as DiningType);
                      }}
                      className={`py-2 px-2 text-xs rounded border text-center transition-all ${
                        diningType === srv.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F3E5AB] font-semibold'
                          : 'border-white/10 bg-[#141414] text-stone-400 hover:text-white'
                      }`}
                    >
                      {lang === 'ar' ? srv.nameAr : srv.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'اسم العميل الكريم' : 'Customer Name'} *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'مثال: محمد السعيد' : 'e.g. Mohammed Al-Saeed'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-[#F5F2EB] placeholder:text-stone-600 outline-none transition-colors"
                />
              </div>

              {/* Phone (Saudi format) */}
              <div>
                <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'رقم الجوال السعودي (+966)' : 'Saudi Phone Number'} *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-[#F5F2EB] placeholder:text-stone-600 outline-none transition-colors font-mono"
                  dir="ltr"
                />
              </div>

              {/* Location or Table number */}
              <div>
                <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {diningType === 'dine_in'
                      ? (lang === 'ar' ? 'رقم الطاولة أو اسم الجلسة' : 'Table Number / Suite')
                      : diningType === 'delivery'
                      ? (lang === 'ar' ? 'عنوان التوصيل (الحي، الشارع، المعلم)' : 'Delivery Address & District')
                      : (lang === 'ar' ? 'وقت الوصول التقريبي للاستلام' : 'Estimated Pickup Time')}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={
                    diningType === 'dine_in'
                      ? (lang === 'ar' ? 'طاولة رقم 7' : 'Table #7')
                      : diningType === 'delivery'
                      ? (lang === 'ar' ? 'حي النرجس، شارع أنس بن مالك، فيلا 12' : 'Al-Narjis, Anas Bin Malik St.')
                      : (lang === 'ar' ? 'خلال 30 دقيقة' : 'In 30 minutes')
                  }
                  value={tableOrAddress}
                  onChange={(e) => setTableOrAddress(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-[#F5F2EB] placeholder:text-stone-600 outline-none transition-colors"
                />
              </div>

              {/* Payment Method Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  {lang === 'ar' ? 'طريقة الدفع وتأكيد الحساب' : 'Payment Preference'}
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'whatsapp_transfer',
                      titleAr: 'تحويل بنكي وإرسال إيصال الدفع عبر الواتساب',
                      titleEn: 'Bank Transfer & Slip on WhatsApp',
                      descAr: 'حساب مصرف الراجحي / البنك الأهلي السعودي، مع اعتماد فوري للإيصال',
                      descEn: 'Al Rajhi or SNB bank transfer with instant slip verification',
                    },
                    {
                      id: 'card_mada_applepay',
                      titleAr: 'بطاقة مدى / أبل باي عند الوصول',
                      titleEn: 'Mada / Apple Pay POS',
                      descAr: 'جهاز نقاط البيع اللاسلكي مع السائق أو مباشر على الطاولة',
                      descEn: 'Wireless POS machine with courier or at your table',
                    },
                    {
                      id: 'cash_on_delivery',
                      titleAr: 'دفع نقدي عند الاستلام',
                      titleEn: 'Cash on Delivery',
                      descAr: 'الدفع نقداً للمندوب أو كاشير الاستقبال',
                      descEn: 'Direct cash settlement upon arrival',
                    },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => {
                        audio.playClick();
                        setPaymentPreference(pay.id as PaymentMethod);
                      }}
                      className={`w-full p-3 rounded-lg border text-left rtl:text-right transition-all flex items-start gap-3 ${
                        paymentPreference === pay.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-white/5 bg-[#141414] text-stone-400 hover:border-white/15'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        paymentPreference === pay.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-stone-600'
                      }`}>
                        {paymentPreference === pay.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#F5F2EB]">
                          {lang === 'ar' ? pay.titleAr : pay.titleEn}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {lang === 'ar' ? pay.descAr : pay.descEn}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs text-stone-400 mb-1">
                  {lang === 'ar' ? 'ملاحظات وتفضيلات للشيف (اختياري)' : 'Special Dietary or Chef Requests'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'ar' ? 'درجة استواء اللحم، التغليف الفاخر للإهداء...' : 'Steak doneness, gift packaging...'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#F5F2EB] placeholder:text-stone-600 outline-none transition-colors resize-none"
                />
              </div>
            </form>
          )}

          {step === 'success' && lastOrder && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#F3E5AB] font-editorial-ar mb-1">
                {lang === 'ar' ? 'تم تجهيز مسودة الطلب بنجاح' : 'Order Ready for WhatsApp'}
              </h3>
              <p className="text-xs text-stone-400 max-w-xs mb-4">
                {lang === 'ar'
                  ? `رقم الطلب #${lastOrder.orderNumber}. تم فتح محادثة الواتساب مع خدمة عملاء ثريا للاعتماد.`
                  : `Order #${lastOrder.orderNumber}. WhatsApp chat has been initiated with concierge.`}
              </p>

              <div className="w-full p-4 rounded-xl bg-[#141414] border border-white/10 text-xs text-left rtl:text-right space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500">{lang === 'ar' ? 'المجموع النهائي:' : 'Total:'}</span>
                  <span className="text-[#D4AF37] font-bold font-mono">{lastOrder.grandTotal} SAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{lang === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span>
                  <span className="text-stone-300">
                    {lastOrder.customerInfo.paymentPreference === 'whatsapp_transfer'
                      ? (lang === 'ar' ? 'تحويل بنكي عبر الواتس' : 'WhatsApp Bank Transfer')
                      : (lang === 'ar' ? 'مدى / أبل باي' : 'Mada / Apple Pay')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {lang === 'ar' ? 'العودة للمعرض' : 'Return to Showcase'}
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer / Financial Summary */}
        {step !== 'success' && cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-white/5 bg-[#0A0A0A]">
            
            {/* Summary lines */}
            <div className="space-y-1.5 text-xs text-stone-400 mb-4">
              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'المجموع الفرعي للأطباق' : 'Items Subtotal'}</span>
                <span className="text-stone-200 tabular-nums font-mono">{subtotal} {lang === 'ar' ? 'ر.س' : 'SAR'}</span>
              </div>

              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'ضريبة القيمة المضافة (15% ZATCA)' : 'VAT (15%)'}</span>
                <span className="text-stone-200 tabular-nums font-mono">{vat} {lang === 'ar' ? 'ر.س' : 'SAR'}</span>
              </div>

              {diningType === 'delivery' && (
                <div className="flex justify-between">
                  <span>{lang === 'ar' ? 'رسوم التوصيل والضيافة الخاصة' : 'VIP Delivery Fee'}</span>
                  <span className="text-stone-200 tabular-nums font-mono">{deliveryFee} {lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm">
                <span className="font-semibold text-[#F5F2EB]">{lang === 'ar' ? 'المجموع الكلي المطلوب' : 'Grand Total'}</span>
                <span className="text-xl font-bold text-[#F3E5AB] font-cinzel tabular-nums">
                  {grandTotal} <span className="text-xs text-[#D4AF37] font-sans">{lang === 'ar' ? 'ريال' : 'SAR'}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {step === 'cart' ? (
              <button
                onClick={() => {
                  audio.playClick();
                  setStep('checkout');
                }}
                className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                <span>{lang === 'ar' ? 'متابعة لإدخال البيانات والدفع بالواتساب' : 'Proceed to Checkout'}</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    setStep('cart');
                  }}
                  className="py-3 px-4 rounded-lg bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700 transition-colors"
                >
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>

                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{lang === 'ar' ? 'تأكيد وإرسال الطلب عبر الواتساب' : 'Confirm & Order via WhatsApp'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
