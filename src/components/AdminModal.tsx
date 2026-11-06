import React, { useState, useEffect } from 'react';
import { MenuItem, CategoryId, SavedOrder } from '../types/menu';
import { CATEGORIES, RestaurantSettings, resetMenuItems } from '../data/initialMenu';
import { X, Plus, Edit2, Trash2, Check, RefreshCw, Save, Phone, DollarSign, Eye, EyeOff, Package } from 'lucide-react';
import { audio } from '../utils/audio';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSaveItems: (items: MenuItem[]) => void;
  settings: RestaurantSettings;
  onSaveSettings: (settings: RestaurantSettings) => void;
  lang: 'ar' | 'en';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  items,
  onSaveItems,
  settings,
  onSaveSettings,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [tempSettings, setTempSettings] = useState<RestaurantSettings>(settings);
  const [ordersHistory, setOrdersHistory] = useState<SavedOrder[]>([]);

  useEffect(() => {
    setTempSettings(settings);
    if (isOpen) {
      try {
        const raw = localStorage.getItem('orzr_orders_history');
        if (raw) setOrdersHistory(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  // Toggle item availability
  const handleToggleAvailability = (id: string) => {
    audio.playClick();
    const updated = items.map((it) => (it.id === id ? { ...it, isAvailable: !it.isAvailable } : it));
    onSaveItems(updated);
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الصنف نهائياً؟' : 'Delete this item permanently?')) {
      audio.playClick();
      const updated = items.filter((it) => it.id !== id);
      onSaveItems(updated);
    }
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (confirm(lang === 'ar' ? 'هل تريد استعادة قائمة الأصناف الافتراضية؟' : 'Reset to default menu items?')) {
      audio.playClick();
      const defs = resetMenuItems();
      onSaveItems(defs);
    }
  };

  // Save edited or new item
  const handleSaveItemForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    audio.playClick();

    if (isAddingNew) {
      onSaveItems([editingItem, ...items]);
    } else {
      const updated = items.map((it) => (it.id === editingItem.id ? editingItem : it));
      onSaveItems(updated);
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  // Update order status in log
  const handleUpdateOrderStatus = (orderId: string, newStatus: 'new' | 'preparing' | 'completed') => {
    const updated = ordersHistory.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
    setOrdersHistory(updated);
    try {
      localStorage.setItem('orzr_orders_history', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      
      {/* Admin Panel Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0E0E0E] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#121212]">
          <div>
            <h2 className="text-lg font-bold text-[#F3E5AB] font-editorial-ar flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
              <span>{lang === 'ar' ? 'لوحة تحكم إدارة المطعم الرقمي (CMS)' : 'Restaurant Digital CMS'}</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              {lang === 'ar' ? 'تعديل الأسعار، إضافة الأصناف، ربط الواتساب، ومتابعة الطلبات' : 'Manage products, prices, WhatsApp settings, and orders'}
            </p>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 bg-[#0A0A0A] px-5 gap-3">
          <button
            onClick={() => {
              audio.playClick();
              setActiveTab('products');
            }}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#D4AF37] text-[#F3E5AB]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'إدارة قائمة الطعام' : 'Menu Management'} ({items.length})
          </button>

          <button
            onClick={() => {
              audio.playClick();
              setActiveTab('orders');
            }}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#D4AF37] text-[#F3E5AB]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'سجل طلبات الواتساب' : 'WhatsApp Orders Log'} ({ordersHistory.length})
          </button>

          <button
            onClick={() => {
              audio.playClick();
              setActiveTab('settings');
            }}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#D4AF37] text-[#F3E5AB]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'إعدادات الواتساب والتوصيل' : 'WhatsApp & Delivery Settings'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          
          {/* TAB 1: PRODUCTS LIST OR EDIT FORM */}
          {activeTab === 'products' && (
            <div>
              {editingItem ? (
                /* Edit Item Sub-form */
                <form onSubmit={handleSaveItemForm} className="space-y-4 max-w-2xl mx-auto bg-[#141414] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-sm font-bold text-[#F3E5AB]">
                      {isAddingNew
                        ? (lang === 'ar' ? 'إضافة طبق أو مشروب جديد' : 'Add New Item')
                        : (lang === 'ar' ? `تعديل الصنف: ${editingItem.nameAr}` : `Edit: ${editingItem.nameEn}`)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="text-xs text-stone-400 hover:text-white"
                    >
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">الاسم بالعربية *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.nameAr}
                        onChange={(e) => setEditingItem({ ...editingItem, nameAr: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Name in English *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.nameEn}
                        onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">التصنيف *</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as CategoryId })}
                        className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nameAr} - {cat.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">السعر (ر.س) *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">السعرات الحرارية</label>
                      <input
                        type="number"
                        value={editingItem.calories}
                        onChange={(e) => setEditingItem({ ...editingItem, calories: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">رابط أو مسار الصورة (Image Path/URL)</label>
                    <input
                      type="text"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">الوصف بالعربية</label>
                    <textarea
                      rows={2}
                      value={editingItem.descriptionAr}
                      onChange={(e) => setEditingItem({ ...editingItem, descriptionAr: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Description in English</label>
                    <textarea
                      rows={2}
                      value={editingItem.descriptionEn}
                      onChange={(e) => setEditingItem({ ...editingItem, descriptionEn: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="py-2 px-4 rounded text-xs bg-stone-800 text-stone-300"
                    >
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-5 rounded text-xs font-semibold bg-[#D4AF37] text-black hover:brightness-110 flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'حفظ الصنف' : 'Save Item'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Product Items Table */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-stone-400">
                      {lang === 'ar' ? 'قائمة الأصناف المعروضة في المعرض التفاعلي' : 'Active Showcase Items'}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetDefaults}
                        className="py-1.5 px-3 rounded border border-white/10 text-xs text-stone-400 hover:text-white hover:border-white/30 flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
                      </button>

                      <button
                        onClick={() => {
                          audio.playClick();
                          setEditingItem({
                            id: `item-${Date.now()}`,
                            nameAr: 'طبق جديد',
                            nameEn: 'New Creation',
                            category: 'signature',
                            price: 150,
                            descriptionAr: 'وصف الطبق ومكوناته الفاخرة...',
                            descriptionEn: 'Culinary description and exquisite ingredients...',
                            image: '/src/assets/images/luxury_wagyu_truffle_1793879808150.jpg',
                            ingredientsAr: ['مكونات طازجة'],
                            ingredientsEn: ['Fresh Ingredients'],
                            allergensAr: [],
                            allergensEn: [],
                            calories: 350,
                            prepTime: '15 دقيقة',
                            isAvailable: true,
                            curatorNotesAr: 'ملاحظات التحضير الفاخرة...',
                            curatorNotesEn: 'Sourcing and chef notes...',
                            originAr: 'المملكة العربية السعودية',
                            originEn: 'Saudi Arabia',
                            accentColor: '#D4AF37',
                            sizes: [{ id: 'std', nameAr: 'قياسي', nameEn: 'Standard', priceDiff: 0 }],
                            extras: [],
                          });
                          setIsAddingNew(true);
                        }}
                        className="py-1.5 px-3.5 rounded bg-[#D4AF37] text-black text-xs font-semibold flex items-center gap-1.5 hover:brightness-110"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'إضافة طبق جديد' : 'Add New Item'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121212]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left rtl:text-right text-xs">
                        <thead className="bg-[#181818] text-stone-400 uppercase tracking-wider border-b border-white/5">
                          <tr>
                            <th className="py-3 px-4">{lang === 'ar' ? 'الصنف' : 'Item'}</th>
                            <th className="py-3 px-4">{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                            <th className="py-3 px-4">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                            <th className="py-3 px-4">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                            <th className="py-3 px-4 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {items.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 px-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="font-semibold text-stone-200">{item.nameAr}</div>
                                  <div className="text-[11px] text-[#AA8022] font-editorial-en">{item.nameEn}</div>
                                </div>
                              </td>

                              <td className="py-3 px-4 text-stone-400 uppercase text-[11px]">
                                {item.category}
                              </td>

                              <td className="py-3 px-4 font-mono font-bold text-[#F3E5AB]">
                                {item.price} SAR
                              </td>

                              <td className="py-3 px-4">
                                <button
                                  onClick={() => handleToggleAvailability(item.id)}
                                  className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 ${
                                    item.isAvailable
                                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                                      : 'bg-red-950/60 text-red-400 border border-red-800/40'
                                  }`}
                                >
                                  {item.isAvailable ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                  <span>{item.isAvailable ? 'متاح للطلب' : 'غير متوفر'}</span>
                                </button>
                              </td>

                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => {
                                      audio.playClick();
                                      setEditingItem(item);
                                      setIsAddingNew(false);
                                    }}
                                    className="p-1.5 text-stone-400 hover:text-[#D4AF37] transition-colors"
                                    title="تعديل الصنف"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                                    title="حذف الصنف"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WHATSAPP ORDERS HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span>{lang === 'ar' ? 'سجل الطلبات الواردة والموجهة للواتساب' : 'Recorded WhatsApp Orders History'}</span>
                {ordersHistory.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm(lang === 'ar' ? 'مسح سجل الطلبات؟' : 'Clear orders history?')) {
                        setOrdersHistory([]);
                        localStorage.removeItem('orzr_orders_history');
                      }
                    }}
                    className="text-stone-500 hover:text-red-400"
                  >
                    {lang === 'ar' ? 'مسح السجل' : 'Clear Log'}
                  </button>
                )}
              </div>

              {ordersHistory.length === 0 ? (
                <div className="p-12 text-center text-stone-500 bg-[#141414] rounded-xl border border-white/5">
                  <Package className="w-10 h-10 mx-auto mb-2 text-stone-600" />
                  <p className="text-sm font-medium">{lang === 'ar' ? 'لا توجد طلبات مسجلة بعد' : 'No orders recorded yet'}</p>
                  <p className="text-xs text-stone-600 mt-1">
                    {lang === 'ar' ? 'سيظهر هنا أي طلب يتم إرساله عبر الواتساب' : 'Orders submitted via WhatsApp will be logged here'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ordersHistory.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-[#141414] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#D4AF37]">#{ord.orderNumber}</span>
                          <span className="text-xs text-stone-500">{ord.timestamp}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-black/60 text-stone-300 border border-white/10">
                            {ord.customerInfo.diningType}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-stone-200 mt-1">
                          {ord.customerInfo.name} · <span className="font-mono text-stone-400">{ord.customerInfo.phone}</span>
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5">
                          {ord.customerInfo.tableOrAddress || 'بدون عنوان محدد'}
                        </div>
                        <div className="text-xs text-stone-300 mt-2">
                          {ord.items.map((i) => `${i.item.nameAr} ×${i.quantity}`).join(' · ')}
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-white/5">
                        <div className="text-base font-bold text-[#F3E5AB] font-cinzel">
                          {ord.grandTotal} SAR
                        </div>

                        {/* Status switcher */}
                        <div className="flex items-center gap-1.5">
                          {(['new', 'preparing', 'completed'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateOrderStatus(ord.id, st)}
                              className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                                ord.status === st
                                  ? 'bg-[#D4AF37] text-black'
                                  : 'bg-black text-stone-500 hover:text-stone-300 border border-white/5'
                              }`}
                            >
                              {st === 'new' && (lang === 'ar' ? 'جديد' : 'New')}
                              {st === 'preparing' && (lang === 'ar' ? 'قيد التحضير' : 'Prep')}
                              {st === 'completed' && (lang === 'ar' ? 'مكتمل' : 'Done')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESTAURANT & WHATSAPP SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto bg-[#141414] p-6 rounded-xl border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-[#F3E5AB] pb-2 border-b border-white/5">
                {lang === 'ar' ? 'إعدادات رقم الواتساب ورسوم الخدمة' : 'Store & WhatsApp Configuration'}
              </h3>

              <div>
                <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'رقم الواتساب المستلم للطلبات (مع كود الدولة)' : 'WhatsApp Order Number (with Country Code)'} *</span>
                </label>
                <input
                  type="text"
                  placeholder="966542198899"
                  value={tempSettings.whatsappPhone}
                  onChange={(e) => setTempSettings({ ...tempSettings, whatsappPhone: e.target.value.replace(/\D/g, '') })}
                  className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                  dir="ltr"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  {lang === 'ar' ? 'الصيغة الصحيحة: 9665XXXXXXXX (بدون + أو أصفار إضافية)' : 'Format: 9665XXXXXXXX (no + or spaces)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">اسم المطعم (عربي)</label>
                  <input
                    type="text"
                    value={tempSettings.restaurantNameAr}
                    onChange={(e) => setTempSettings({ ...tempSettings, restaurantNameAr: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">Restaurant Name (EN)</label>
                  <input
                    type="text"
                    value={tempSettings.restaurantNameEn}
                    onChange={(e) => setTempSettings({ ...tempSettings, restaurantNameEn: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">رسوم التوصيل (ر.س)</label>
                  <input
                    type="number"
                    value={tempSettings.deliveryFee}
                    onChange={(e) => setTempSettings({ ...tempSettings, deliveryFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">نسبة ضريبة القيمة المضافة (0.15 = 15%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={tempSettings.vatRate}
                    onChange={(e) => setTempSettings({ ...tempSettings, vatRate: parseFloat(e.target.value) || 0.15 })}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    onSaveSettings(tempSettings);
                    alert(lang === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
                  }}
                  className="w-full py-2.5 px-4 rounded bg-[#D4AF37] text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:brightness-110"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حفظ إعدادات المتجر' : 'Save Store Configuration'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
