import { CategoryInfo, MenuItem } from '../types/menu';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'signature',
    nameAr: 'الأطباق المميزة',
    nameEn: 'Signature Creations',
    subtitleAr: 'تجارب طهي فريدة تدمج الابتكار والأصالة',
    subtitleEn: 'Unique culinary masterworks bridging Japanese minimalism & Saudi heritage',
  },
  {
    id: 'mains',
    nameAr: 'الأطباق الرئيسية',
    nameEn: 'Main Courses',
    subtitleAr: 'أجود المكونات واللحوم المعتقة والمأكولات البحرية',
    subtitleEn: 'Finest cuts, aged lamb & pristine seafood',
  },
  {
    id: 'appetizers',
    nameAr: 'المقبلات الفاخرة',
    nameEn: 'Artisanal Appetizers',
    subtitleAr: 'افتتاحيات راقية بمذاقات غير مسبوقة',
    subtitleEn: 'Refined beginnings with bespoke textures',
  },
  {
    id: 'desserts',
    nameAr: 'الحلويات الفاخرة',
    nameEn: 'Haute Pâtisserie',
    subtitleAr: 'منحوتات سكرية بنكهات العنبر والشوكولاتة والزعفران',
    subtitleEn: 'Confectionery sculptures infused with oud, saffron & gold',
  },
  {
    id: 'coffee',
    nameAr: 'القهوة المختصة',
    nameEn: 'Specialty Coffee & Dallah',
    subtitleAr: 'محاصيل نادرة والقهوة السعودية الملكية',
    subtitleEn: 'Rare micro-lots & ceremonial Saudi blends',
  },
  {
    id: 'beverages',
    nameAr: 'مشروبات توقيع الدار',
    nameEn: 'Signature Elixirs',
    subtitleAr: 'مستخلصات باردة مرصعة برقائق الذهب والأعشاب البرية',
    subtitleEn: 'Artisanal cold infusions with botanicals & gold dust',
  },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'wagyu-truffle',
    nameAr: 'تندرلوين واغيو بالكمأة الملكية وورق الذهب',
    nameEn: 'A5 Wagyu Tenderloin with Perigord Truffle & 24K Gold',
    category: 'signature',
    price: 385,
    descriptionAr: 'قطعة تندرلوين واغيو يابانية مصنفة A5 مشوية على فحم البينشوتان، تعلوها شرائح الكمأة السوداء ورقائق الذهب عيار 24 الصالحة للأكل، مع هريس البطاطا المدخنة وصلصة التخفيض الغنية.',
    descriptionEn: 'Japanese A5 Wagyu tenderloin char-grilled over white Binchotan coals, finished with shaved black Perigord truffle, 24K edible gold leaves, smoked ratte potato mousseline, and rich demi-glace.',
    image: '/src/assets/images/luxury_wagyu_truffle_1793879808150.jpg',
    ingredientsAr: ['لحم واغيو A5 معتق', 'كمأة بيريجور السوداء', 'رقائق ذهب عيار 24', 'بطاطا فرنسية مدخنة', 'زبدة أرتيزان مملحة', 'مرق العجل المركز'],
    ingredientsEn: ['Dry-Aged A5 Wagyu', 'Black Perigord Truffle', '24K Edible Gold Leaf', 'Smoked Ratte Potatoes', 'Cultured Butter', 'Bone Marrow Jus'],
    allergensAr: ['منتجات الحليب'],
    allergensEn: ['Dairy'],
    calories: 680,
    prepTime: '22 - 25 دقيقة',
    isAvailable: true,
    isSignature: true,
    curatorNotesAr: 'يتم استيراد الواغيو مباشرة من مقاطعة ميازاكي بدرجة رخامية 9+. الشواء البطيء على حرارة الفحم الأبيض يمنح توازناً استثنائياً بين حلاوة الدهن وعمق الكمأة.',
    curatorNotesEn: 'Sourced directly from Miyazaki prefecture with BMS 9+ marbling. Slow sear over binchotan brings an unprecedented harmonic balance between umami richness and truffle aroma.',
    originAr: 'اليابان - ميازاكي ومستوردات طازجة',
    originEn: 'Miyazaki, Japan & Al-Ula wild herbs',
    accentColor: '#D4AF37',
    sizes: [
      { id: '180g', nameAr: 'حصة فردية 180 غرام', nameEn: 'Single Cut 180g', priceDiff: 0 },
      { id: '280g', nameAr: 'حصة ملكية 280 غرام', nameEn: 'Royal Reserve 280g', priceDiff: 140 },
    ],
    extras: [
      { id: 'extra-truffle', nameAr: 'إضافة شرائح كمأة إضافية (5 غرام)', nameEn: 'Extra Truffle Shavings (5g)', price: 65 },
      { id: 'extra-gold', nameAr: 'ورق ذهب إضافي 24 قيراط', nameEn: 'Extra 24K Gold Leaf', price: 40 },
      { id: 'bone-marrow', nameAr: 'نخاع عظم مشوي بالأعشاب', nameEn: 'Roasted Herb Bone Marrow', price: 50 },
    ],
  },
  {
    id: 'smoked-camel-ribs',
    nameAr: 'أضلاع الحاشي المدخنة بماء الورد والزعفران',
    nameEn: 'Slow-Smoked Saffron Baby Camel Short Ribs',
    category: 'signature',
    price: 320,
    descriptionAr: 'أضلاع حاشي بلدي طري مدخن على خشب السمر المحلي لمدة 14 ساعة، مع طلاء الزعفران الحر وماء ورد الطائف، يقدم مع أرز البرغل المحمص بالتوت البري.',
    descriptionEn: 'Locally raised tender baby camel short ribs smoked for 14 hours over native Samar wood, glazed with royal saffron reduction and Taif rosewater, paired with wild berry bulgur.',
    image: '/src/assets/images/luxury_wagyu_truffle_1793879808150.jpg',
    ingredientsAr: ['أضلاع حاشي بلدي', 'زعفران سوبر نقيل', 'ماء ورد الطائف المقطر', 'خشب السمر الطبيعي', 'دبس الرمان المعتق'],
    ingredientsEn: ['Baby Camel Short Ribs', 'Super Negin Saffron', 'Taif Artisan Rosewater', 'Samar Wood Smoke', 'Aged Pomegranate Molasses'],
    allergensAr: [],
    allergensEn: [],
    calories: 740,
    prepTime: '20 دقيقة',
    isAvailable: true,
    isSignature: true,
    curatorNotesAr: 'إعادة تصور راقية لتراث الطهي في نجد، مع تليين بطيء للألياف حتى تذوب في الفم مع نفحات عطرية زهرية دقيقة.',
    curatorNotesEn: 'An elevated homage to Najdi culinary heritage, cooked until fall-apart tender with delicate floral undertones.',
    originAr: 'القصيم والطائف - المملكة العربية السعودية',
    originEn: 'Al-Qassim & Taif, Saudi Arabia',
    accentColor: '#C5A059',
    sizes: [
      { id: 'std', nameAr: 'طبق رئيسي (شخص واحد)', nameEn: 'Standard Portion (1 Person)', priceDiff: 0 },
      { id: 'share', nameAr: 'طبق للمشاركة (شخصين)', nameEn: 'Sharing Feast (2 Persons)', priceDiff: 180 },
    ],
    extras: [
      { id: 'extra-sauce', nameAr: 'صلصة دبس الرمان والزعفران الإضافية', nameEn: 'Extra Saffron Pomegranate Glaze', price: 25 },
      { id: 'roasted-nuts', nameAr: 'مكسرات محمصة بالهيل والكراميل', nameEn: 'Cardamom Roasted Pine Nuts', price: 30 },
    ],
  },
  {
    id: 'chilean-seabass-miso',
    nameAr: 'قاروص تشيلي مشوي بالميسو والثوم الأسود',
    nameEn: 'Chilean Seabass with Aged Black Garlic & Saikyo Miso',
    category: 'mains',
    price: 275,
    descriptionAr: 'فيليه قاروص طازج متبل لمدة 48 ساعة بميسو السايكيو الحلو، مشوي بلطف حتى يكتسب كراميل ذهبي، مع نقع شاي الماتشا ونبات الإدامي المعطر بالزنجبيل.',
    descriptionEn: 'Glacier-fresh Chilean seabass fillet marinated 48 hours in sweet Saikyo miso, caramelized to golden perfection, served with matcha broth and ginger-infused edamame purée.',
    image: '/src/assets/images/luxury_wagyu_truffle_1793879808150.jpg',
    ingredientsAr: ['سمك القاروص التشيلي', 'ميسو سايكيو عضوي', 'ثوم أسود معتق', 'براعم الزنجبيل', 'زيت السمسم البارد'],
    ingredientsEn: ['Chilean Seabass', 'Organic Saikyo Miso', 'Aged Black Garlic', 'Young Ginger Shoots', 'Cold-Pressed Sesame'],
    allergensAr: ['الأسماك', 'الصويا'],
    allergensEn: ['Fish', 'Soy'],
    calories: 520,
    prepTime: '18 دقيقة',
    isAvailable: true,
    curatorNotesAr: 'السمك يذوب بنعومة فائقة مع طبقة خارجية مقرمشة خفيفة وحلاوة طبيعية متوازنة بحموضة خفيفة.',
    curatorNotesEn: 'Silky buttery texture with an irresistible umami-sweet glaze that highlights Japanese fine dining technique.',
    originAr: 'مياه باتاغونيا النظيفة ومزارع كيوتو',
    originEn: 'Patagonia & Kyoto, Japan',
    accentColor: '#D4AF37',
    sizes: [
      { id: '200g', nameAr: '200 غرام فيليه', nameEn: '200g Fillet', priceDiff: 0 },
      { id: '300g', nameAr: '300 غرام حصة فاخرة', nameEn: '300g Imperial Portion', priceDiff: 95 },
    ],
    extras: [
      { id: 'caviar-top', nameAr: 'ملعقة كافيار أوسيترا على الوجه', nameEn: 'Oscietra Caviar Spoon Topping', price: 85 },
      { id: 'extra-miso-glaze', nameAr: 'صلصة الميسو الإضافية', nameEn: 'Side of Warm Miso Reduction', price: 20 },
    ],
  },
  {
    id: 'lamb-shank-kabsa',
    nameAr: 'كبسة موزات الضأن المعتقة برائحة الهيل والزعفران',
    nameEn: 'Heritage Braised Lamb Shank with Smoked Basmati & Green Cardamom',
    category: 'mains',
    price: 245,
    descriptionAr: 'موزات ضأن نعيمي مطهوة ببطء على نار هادئة حتى تنفصل عن العظم، فوق أرز البسمتي العتيق المعطر بالهيل الأخضر والزعفران وحبوب الصنوبر المحمصة.',
    descriptionEn: 'Slow-braised tender Naemi lamb shank on a bed of aged long-grain basmati rice, perfumed with fresh green mountain cardamom, saffron water, and toasted pine nuts.',
    image: '/src/assets/images/luxury_wagyu_truffle_1793879808150.jpg',
    ingredientsAr: ['لحم ضأن نعيمي بلدي', 'أرز بسمتي عتيق', 'زعفران ملكي', 'هيل غابات أخضر', 'ليمون أسود مجفف', 'صنوبر تركي فاخر'],
    ingredientsEn: ['Local Naemi Lamb', 'Aged Basmati', 'Royal Saffron', 'Wild Cardamom', 'Sun-Dried Black Lime', 'Toasted Pine Nuts'],
    allergensAr: ['المكسرات'],
    allergensEn: ['Tree Nuts'],
    calories: 820,
    prepTime: '20 دقيقة',
    isAvailable: true,
    curatorNotesAr: 'تطبيق متقن لتقنية الطهي البطيء الفرنسية مع توليفة التوابل النجدية الأصيلة والليمون المجفف.',
    curatorNotesEn: 'French confit precision married with deep Najdi spices and aromatic dried black lime.',
    originAr: 'مزارع حائل ونجد',
    originEn: 'Hail & Najd Pastures',
    accentColor: '#AA8022',
    sizes: [
      { id: 'std', nameAr: 'حصة فردية (موزة كاملة)', nameEn: 'Full Single Shank', priceDiff: 0 },
      { id: 'double', nameAr: 'حصة لشخصين (موزتين)', nameEn: 'Double Shanks Feast', priceDiff: 160 },
    ],
    extras: [
      { id: 'extra-pine', nameAr: 'صنوبر ومكسرات إضافية محمصة', nameEn: 'Extra Toasted Pine Nuts & Almonds', price: 25 },
      { id: 'special-daqqus', nameAr: 'دقوس طماطم مدخنة بزيت الزيتون البكر', nameEn: 'Smoked Tomato Daqqus with Extra Virgin Olive Oil', price: 15 },
    ],
  },
  {
    id: 'burrata-dates-gold',
    nameAr: 'بوراتا المدينة المنورة مع تمر السكري والذهب',
    nameEn: 'Medina Burrata with Golden Sukari Dates & 24K Leaf',
    category: 'appetizers',
    price: 165,
    descriptionAr: 'جبنة البوراتا الإيطالية الحرفية الطازجة، محاطة بتمر السكري المكرمل ببلسميك مودينا المعتق 25 عاماً، ورقائق الذهب، ولمسات من زيت الزيتون البكر من مزارع الجوف.',
    descriptionEn: 'Artisanal fresh burrata cheese enveloped with caramelized Al-Qassim Sukari dates, 25-year aged Modena balsamic drops, 24K gold leaves, and cold-pressed Al-Jouf olive oil.',
    image: '/src/assets/images/luxury_gold_dessert_1793879810015.jpg',
    ingredientsAr: ['جبنة بوراتا طازجة', 'تمر سكري فاخر', 'بلسميك مودينا معتق', 'ورق ذهب عيار 24', 'زيت زيتون الجوف البكر', 'جوز البقان المحمص'],
    ingredientsEn: ['Fresh Burrata', 'Sukari Dates', '25-Year Modena Balsamic', '24K Gold Leaf', 'Al-Jouf Extra Virgin Olive Oil', 'Caramelized Pecans'],
    allergensAr: ['منتجات الحليب', 'المكسرات'],
    allergensEn: ['Dairy', 'Tree Nuts'],
    calories: 440,
    prepTime: '12 دقيقة',
    isAvailable: true,
    curatorNotesAr: 'تفاعل سحري بين قوام البوراتا الكريمي البارد والحلاوة العميقة لتمر السكري النقي مع حموضة البلسميك المعتق.',
    curatorNotesEn: 'An enchanting contrast of cold silky dairy cream against deep date caramel and velvety aged balsamic notes.',
    originAr: 'القصيم والجوف ومودينا',
    originEn: 'Al-Qassim, Al-Jouf & Modena',
    accentColor: '#D4AF37',
    sizes: [
      { id: 'std', nameAr: 'حجم قياسي (شخص أو شخصين)', nameEn: 'Standard (1-2 persons)', priceDiff: 0 },
    ],
    extras: [
      { id: 'focaccia', nameAr: 'خبز الفوكاشيا اليدوي الساخن بالزعتر البري', nameEn: 'Warm Wild Thyme Focaccia', price: 25 },
    ],
  },
  {
    id: 'caviar-tartlet',
    nameAr: 'تارت الكافيار الإمبراطوري برغوة الطحينة المحمصة',
    nameEn: 'Imperial Caviar Tartlet with Toasted Tahini Foam',
    category: 'appetizers',
    price: 230,
    descriptionAr: 'قاعدة تارت رقيقة من طحين الحنطة السوداء، تحتوي على لآلئ كافيار أوسيترا الأسود، يعلوها رغوة الطحينة البلدية المحمصة وليمون الكالامانسي العطري.',
    descriptionEn: 'Crisp buckwheat tart shell filled with Imperial Oscietra caviar pearls, topped with roasted sesame tahini emulsion, preserved yuzu gel, and gold flakes.',
    image: '/src/assets/images/luxury_wagyu_truffle_1793879808150.jpg',
    ingredientsAr: ['كافيار أوسيترا إمبراطوري', 'طحينة سمسم محمصة', 'عجينة حنطة سوداء', 'مستخلص اليوزو', 'زهور صالحة للأكل'],
    ingredientsEn: ['Imperial Oscietra Caviar', 'Roasted Sesame Tahini', 'Buckwheat Crust', 'Preserved Yuzu Gel', 'Edible Micro-Flowers'],
    allergensAr: ['الأسماك', 'السمسم', 'الغلوتين'],
    allergensEn: ['Fish', 'Sesame', 'Gluten'],
    calories: 290,
    prepTime: '10 دقيقة',
    isAvailable: true,
    curatorNotesAr: 'تزاوج جريء ومبتكر بين المذاق البحري الأرستقراطي للكافيار وحرارة نكهة السمسم العربي المحمص.',
    curatorNotesEn: 'A bold fusion pairing oceanic mineral brininess with the warm earthiness of Arabian toasted sesame.',
    originAr: 'بحر قزوين وحقول السمسم العضوية',
    originEn: 'Caspian Sea & Organic Sesame',
    accentColor: '#D4AF37',
    sizes: [
      { id: 'pair', nameAr: 'قطعتان كلاسيكية', nameEn: 'Pair of Tartlets (2 pcs)', priceDiff: 0 },
      { id: 'quartet', nameAr: 'أربع قطع للمشاركة', nameEn: 'Quartet (4 pcs)', priceDiff: 190 },
    ],
    extras: [
      { id: 'extra-caviar', nameAr: 'جرعة إضافية من الكافيار (10 غرام)', nameEn: 'Extra Oscietra Caviar Spoon (10g)', price: 90 },
    ],
  },
  {
    id: 'chocolate-oud-sphere',
    nameAr: 'كرة الشوكولاتة الداكنة بعبق العود والزعفران',
    nameEn: 'Smoked Cambodian Oud Dark Chocolate Sphere',
    category: 'desserts',
    price: 145,
    descriptionAr: 'كرة مصنوعة يدوياً من شوكولاتة فالبوليفيا الداكنة 72%، مرشوشة بغبار الذهب عيار 24، تذاب أمام الضيف بصلصة الزعفران الساخنة لتكشف عن موس الفستق الحلبي وعبق العود الملكي.',
    descriptionEn: 'Hand-cast sphere of 72% single-origin dark chocolate dusted with 24K gold. Melted tableside with boiling saffron infusion to unveil roasted Aleppo pistachio mousse and subtle smoked Cambodian oud aroma.',
    image: '/src/assets/images/luxury_gold_dessert_1793879810015.jpg',
    ingredientsAr: ['شوكولاتة داكنة 72%', 'مستخلص دهن العود الكمبودي النقي', 'فستق حلبي محمص', 'زعفران سوبر نقيل', 'غبار الذهب الغذائي عيار 24'],
    ingredientsEn: ['72% Valrhona Dark Chocolate', 'Pure Smoke Cambodian Oud Distillate', 'Roasted Pistachios', 'Super Negin Saffron', '24K Edible Gold Dust'],
    allergensAr: ['منتجات الحليب', 'المكسرات', 'الصويا'],
    allergensEn: ['Dairy', 'Tree Nuts', 'Soy'],
    calories: 490,
    prepTime: '15 دقيقة',
    isAvailable: true,
    isSignature: true,
    curatorNotesAr: 'تجربة حواس متكاملة تبدأ برائحة الدخان الخشبي النبيل للعود وتنتهي بذوبان الكاكاو الغني مع خضرة الفستق.',
    curatorNotesEn: 'A complete sensory spectacle starting with aristocratic woody smoke and melting into rich cocoa and emerald pistachios.',
    originAr: 'غابات كمبوديا وفنزويلا وحلب',
    originEn: 'Cambodia, Venezuela & Aleppo',
    accentColor: '#D4AF37',
    sizes: [
      { id: 'std', nameAr: 'كرة شوكولاتة مفردة', nameEn: 'Single Art Sphere', priceDiff: 0 },
      { id: 'grand', nameAr: 'حجم احتفالي كبير للمشاركة', nameEn: 'Celebration Grand Sphere', priceDiff: 85 },
    ],
    extras: [
      { id: 'ice-cream', nameAr: 'جيلاتو ماء الزهر الطبيعي', nameEn: 'Artisan Orange Blossom Gelato Scoop', price: 30 },
      { id: 'gold-flakes', nameAr: 'رقائق ذهب إضافية كثيفة', nameEn: 'Dense Gold Flakes Garnish', price: 35 },
    ],
  },
  {
    id: 'saffron-pistachio-millefeuille',
    nameAr: 'ميل في الزعفران والهيل وفستق عنتاب',
    nameEn: 'Saffron, Green Cardamom & Antep Pistachio Mille-Feuille',
    category: 'desserts',
    price: 125,
    descriptionAr: 'طبقات كاراميليزيه فائقة الهشاشة والرقّة من عجينة البف باستري المخبوزة يومياً، محشوة بكريمة الزعفران الخفيفة ومعجون الفستق العنتابي المحمص.',
    descriptionEn: 'Paper-thin caramelized puff pastry sheets filled with light saffron diplomatic cream, pure roasted Antep pistachio paste, and crushed candied rose petals.',
    image: '/src/assets/images/luxury_gold_dessert_1793879810015.jpg',
    ingredientsAr: ['عجينة بف باستري فرنسية', 'كريمة دبلوماسية بالزعفران', 'فستق عنتاب نقي', 'هيل مطحون طازج', 'بتلات ورد الطائف'],
    ingredientsEn: ['French Puff Pastry', 'Saffron Diplomat Cream', 'Antep Pistachio Paste', 'Fresh Ground Cardamom', 'Taif Candied Rose'],
    allergensAr: ['منتجات الحليب', 'المكسرات', 'الغلوتين'],
    allergensEn: ['Dairy', 'Tree Nuts', 'Gluten'],
    calories: 460,
    prepTime: '10 دقيقة',
    isAvailable: true,
    curatorNotesAr: 'التناغم بين قرمشة السكر المكرمل ونعومة الكريمة العطرية يقدم درساً في الاتزان الفرنسي والنكهة النجدية.',
    curatorNotesEn: 'Harmonious crunch of caramelized pastry and aromatic cream embodying French precision and Arabian warmth.',
    originAr: 'فرنسا وتركيا والمملكة',
    originEn: 'France, Turkey & Saudi Arabia',
    accentColor: '#E6CA65',
    sizes: [
      { id: 'slice', nameAr: 'شريحة فردية فاخرة', nameEn: 'Single Slice', priceDiff: 0 },
    ],
    extras: [
      { id: 'coffee-side', nameAr: 'إقرانها مع شوت إسبريسو مزدوج', nameEn: 'Double Espresso Pairing', price: 20 },
    ],
  },
  {
    id: 'geisha-pourover',
    nameAr: 'قهوة قيشا بنما المقطرة الفاخرة (محصول مزاد خاص)',
    nameEn: 'Panama Hacienda La Esmeralda Geisha V60',
    category: 'coffee',
    price: 95,
    descriptionAr: 'محصول قيشا استثنائي من مزاد لوس كانتاريس في بنما، معالج تجفيفاً لاهوائياً، يتميز بإيحاءات الياسمين وزهر الخوخ والبرغموت والشاي الأبيض مع نهاية عسلية طويلة.',
    descriptionEn: 'Exceptional private-lot Geisha coffee from Panama, anaerobic natural processing. Tasting notes of night-blooming jasmine, white peach, bergamot, and delicate honey finish.',
    image: '/src/assets/images/luxury_saudi_coffee_1793879808635.jpg',
    ingredientsAr: ['بن قيشا بنمي عضوي 100%', 'مياه جبلية معدنية مخصصة للتقطير بدرجة حرارة 92C'],
    ingredientsEn: ['100% Single Origin Panama Geisha', 'Mineral-Balanced Mountain Spring Water (92°C)'],
    allergensAr: [],
    allergensEn: [],
    calories: 5,
    prepTime: '8 دقيقة',
    isAvailable: true,
    isSignature: true,
    curatorNotesAr: 'تُحضر على أداة ترشيح زجاجية يابانية يدوية مع قياس دقيق لنسبة الاستخلاص للحفاظ على دقة النكهات العطرية.',
    curatorNotesEn: 'Brewed manually on hand-blown Japanese glass with calibrated TDS extraction to preserve sublime florals.',
    originAr: 'بوقيتي، بنما (ارتفاع 1850 م)',
    originEn: 'Boquete, Panama (1,850m Altitude)',
    accentColor: '#D4AF37',
    sizes: [
      { id: 'single', nameAr: 'إبريق فردي (220 مل)', nameEn: 'Individual Carafe (220ml)', priceDiff: 0 },
      { id: 'sharing', nameAr: 'إبريق للمشاركة (450 مل)', nameEn: 'Sharing Carafe (450ml)', priceDiff: 65 },
    ],
    extras: [
      { id: 'date-pairing', nameAr: 'تشكيلة تمور صقعي ومجدول محشوة بالمكسرات', nameEn: 'Stuffed Reserve Dates Selection', price: 30 },
    ],
  },
  {
    id: 'royal-saudi-coffee',
    nameAr: 'القهوة السعودية الملكية بالعنبر والهيل والزعفران',
    nameEn: 'Ceremonial Saudi Dallah with Ambergris, Najdi Cardamom & Saffron',
    category: 'coffee',
    price: 85,
    descriptionAr: 'خلطة الدار الملكية من البن الخولاني الجبلي المحمص بلون ذهبي شاحب، معتقة مع العنبر النادر والهيل الأخضر والزعفران الصافي، تقدم في دلة نحاسية مذهبة مع رطب القصيم.',
    descriptionEn: 'The estate’s signature ceremonial blend of high-altitude Khawlani beans lightly roasted, infused with rare ambergris, hand-crushed green cardamom, and saffron. Served in an artisan brass dallah with premium dates.',
    image: '/src/assets/images/luxury_saudi_coffee_1793879808635.jpg',
    ingredientsAr: ['بن خولاني سعودي درجة أولى', 'هيل أخضر نجد', 'زعفران سوبر نقيل', 'عنبر أشهب نقي', 'ماء قراح نقي'],
    ingredientsEn: ['Grade-A Khawlani Saudi Beans', 'Najdi Green Cardamom', 'Super Negin Saffron', 'Natural Ambergris', 'Purified Mineral Water'],
    allergensAr: [],
    allergensEn: [],
    calories: 12,
    prepTime: '10 دقيقة',
    isAvailable: true,
    isSignature: true,
    curatorNotesAr: 'رمز الكرم والضيافة السعودية في أبهى صورها الراقية، تعكس إرث مئات السنين من الأناقة والتكريم.',
    curatorNotesEn: 'The quintessential symbol of Saudi generosity and royal hospitality, perfected across centuries.',
    originAr: 'جبال جازان ونجد، المملكة العربية السعودية',
    originEn: 'Jazan Highlands & Najd, Saudi Arabia',
    accentColor: '#D4AF37',
    sizes: [
      { id: 'dallah-m', nameAr: 'دلة وسط (4 فناجيل)', nameEn: 'Medium Dallah (4 Finjans)', priceDiff: 0 },
      { id: 'dallah-l', nameAr: 'دلة ملكية كبيرة (8 فناجيل)', nameEn: 'Grand Royal Dallah (8 Finjans)', priceDiff: 45 },
    ],
    extras: [
      { id: 'truffle-dates', nameAr: 'تمر سكري محشو بكراميل الكمأة وجوز البقان', nameEn: 'Truffle-Caramel Stuffed Dates', price: 40 },
      { id: 'extra-saffron', nameAr: 'رشة زعفران إضافية في الفنجال', nameEn: 'Extra Saffron Threads in Cup', price: 20 },
    ],
  },
  {
    id: 'hibiscus-gold-fizz',
    nameAr: 'إكسير الرمان والكركديه برذاذ الذهب والورد',
    nameEn: 'Pomegranate & Hibiscus Elixir with Edible 24K Gold Shimmer',
    category: 'beverages',
    price: 68,
    descriptionAr: 'عصير رمان طائفي بارد مقطر مع أزهار الكركديه العضوية ومستخلص ماء الورد وماء الصودا الفوار، مرصع ببريق رقائق الذهب عيار 24 الصالحة للشرب مع غصن إكليل الجبل العطري.',
    descriptionEn: 'Cold-pressed Taif pomegranate juice steeped with organic wild hibiscus blossoms, Taif rose mist, and effervescent sparkling soda, swirling with edible 24K gold shimmer and burnt rosemary.',
    image: '/src/assets/images/luxury_signature_beverage_1793879810260.jpg',
    ingredientsAr: ['رمان طائفي طازج', 'كركديه عضوي بري', 'ماء ورد الطائف', 'ماء فوار بلوري', 'رقائق ذهب عيار 24 صالحة للأكل', 'إكليل الجبل المدخن'],
    ingredientsEn: ['Fresh Taif Pomegranate', 'Wild Organic Hibiscus', 'Taif Rose Essence', 'Artisan Sparkling Water', 'Edible 24K Gold Shimmer', 'Charred Rosemary'],
    allergensAr: [],
    allergensEn: [],
    calories: 130,
    prepTime: '6 دقائق',
    isAvailable: true,
    isSignature: true,
    curatorNotesAr: 'مشروب منعش ذو لون ياقوتي عميق وتدرجات ذهبية سائلة تلتمع في الكأس الكريستالي الفاخر.',
    curatorNotesEn: 'Deep ruby red nectar with swirling liquid gold facets that glisten under dim candle reflections.',
    originAr: 'بساتين الطائف، المملكة العربية السعودية',
    originEn: 'Taif Orchards, Saudi Arabia',
    accentColor: '#D4AF37',
    sizes: [
      { id: 'glass', nameAr: 'كأس كريستال مفرد', nameEn: 'Single Crystal Goblet', priceDiff: 0 },
    ],
    extras: [
      { id: 'extra-gold-sparkle', nameAr: 'بريق ذهب مضاعف', nameEn: 'Double Gold Shimmer Dust', price: 20 },
    ],
  },
  {
    id: 'smoked-fig-coldbrew',
    nameAr: 'كولد برو التين المدخن وإكليل الجبل البري',
    nameEn: 'Smoked Desert Fig & Wild Rosemary Cold Brew',
    category: 'beverages',
    price: 62,
    descriptionAr: 'قهوة كولومبية فاخرة منقوعة على البارد لمدة 24 ساعة، ممزوجة بمستخلص التين البري المدخن ولمسة من شراب القيقب الطبيعي وغصن إكليل الجبل المعطر.',
    descriptionEn: 'Single-origin Colombian micro-lot cold-steeped for 24 hours, infused with smoked desert wild fig reduction, subtle amber maple, and a singed sprig of fragrant mountain rosemary.',
    image: '/src/assets/images/luxury_signature_beverage_1793879810260.jpg',
    ingredientsAr: ['بن كولومبي مقطر بارداً', 'عصارة تين بري مدخن', 'شراب القيقب العضوي', 'إكليل جبل بري', 'ثلج نقي شفاف'],
    ingredientsEn: ['24h Steeped Colombian Coffee', 'Smoked Fig Reduction', 'Organic Amber Maple', 'Fresh Mountain Rosemary', 'Clear Block Ice'],
    allergensAr: [],
    allergensEn: [],
    calories: 45,
    prepTime: '5 دقائق',
    isAvailable: true,
    curatorNotesAr: 'مذاق معقد يجمع بين مرارة القهوة اللطيفة وحلاوة التين الدخانية مع انتعاش إكليل الجبل.',
    curatorNotesEn: 'Layered palate combining crisp coffee clarity, earthy smoked fruit, and pine-herbal freshness.',
    originAr: 'هويلا، كولومبيا ومزارع العلا',
    originEn: 'Huila, Colombia & Al-Ula Oases',
    accentColor: '#AA8022',
    sizes: [
      { id: 'glass', nameAr: 'كأس حجري مع مكعب ثلج نقي', nameEn: 'Highball Glass with Clear Ice Block', priceDiff: 0 },
    ],
    extras: [
      { id: 'extra-shot', nameAr: 'شوت إسبريسو قيشا إضافي', nameEn: 'Geisha Float Shot', price: 25 },
    ],
  },
];

const STORAGE_KEY = 'orzr_thuraya_menu_v1';
const SETTINGS_KEY = 'orzr_thuraya_settings_v1';

export interface RestaurantSettings {
  whatsappPhone: string;
  restaurantNameAr: string;
  restaurantNameEn: string;
  locationAr: string;
  locationEn: string;
  deliveryFee: number;
  minOrder: number;
  vatRate: number; // 0.15 for Saudi 15%
  isOrderingOpen: boolean;
}

export const DEFAULT_SETTINGS: RestaurantSettings = {
  whatsappPhone: '966542198899', // Riyadh Saudi Arabia format
  restaurantNameAr: 'ثريا · ORZR',
  restaurantNameEn: 'ORZR Al-Thuraya',
  locationAr: 'وادي ليسن · الرياض، المملكة العربية السعودية',
  locationEn: 'Laysen Valley, Riyadh, Saudi Arabia',
  deliveryFee: 35,
  minOrder: 100,
  vatRate: 0.15,
  isOrderingOpen: true,
};

export function loadMenuItems(): MenuItem[] {
  if (typeof window === 'undefined') return INITIAL_MENU_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
      return INITIAL_MENU_ITEMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MENU_ITEMS;
  }
}

export function saveMenuItems(items: MenuItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save menu items', err);
  }
}

export function resetMenuItems(): MenuItem[] {
  if (typeof window === 'undefined') return INITIAL_MENU_ITEMS;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
  return INITIAL_MENU_ITEMS;
}

export function loadRestaurantSettings(): RestaurantSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveRestaurantSettings(settings: RestaurantSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}
