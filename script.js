/**
 * AL-DOMIATY COUNTER & TIMBER - INTERACTIVE CONTROLLER
 * Handles:
 * 1. Bilingual Support (Arabic as Primary, English selectable)
 * 2. Board & Sheet Estimator Calculator
 * 3. Veneer Texture Visualizer & Spec Updates
 * 4. Anatomy Layer Filtering
 * 5. Quick Quote & WhatsApp Message Builders
 * 6. Responsive Navigation Drawer
 */

// Phone number for WhatsApp quotes (Egyptian country code +20)
const SHOP_WHATSAPP_NUMBER = "201015176070";

// Standard Sheet Dimensions in meters
const SHEET_WIDTH_M = 1.22;
const SHEET_HEIGHT_M = 2.44;
const SHEET_AREA_M2 = SHEET_WIDTH_M * SHEET_HEIGHT_M; // ~2.9768 m²

// State
let currentCalcMode = 'area'; // 'area' | 'pieces'
let currentLang = 'ar'; // Default primary language is Arabic

// Veneer Database
const VENEER_DATA = {
  oak: {
    name_ar: "قشرة أرو أبيض أمريكي فاخر",
    name_en: "Natural White Oak (أرو أبيض طبيعي)",
    origin_ar: "أمريكا الشمالية",
    origin_en: "North America",
    desc_ar: "تتميز بحبات الكاتدرائية الفاخرة ودرجات العسل الدافئة. الخيار الأول للمطابخ المودرن والدريسينج روم والأثاث الراقي.",
    desc_en: "Prominent, elegant cathedral grain with golden honey undertones. Highly sought after for Scandinavian, modern minimalist, and luxury bespoke cabinetry.",
    hardness_ar: "عالية جداً",
    hardness_en: "High",
    tone_ar: "عسلي دافئ",
    tone_en: "Warm Honey",
    pore_ar: "مسام مفتوحة بارزة",
    pore_en: "Open Grain",
    cssClass: "oak-texture"
  },
  walnut: {
    name_ar: "قشرة جوز تركي / أمريكي طبيعي",
    name_en: "American Black Walnut (جوز أمريكي)",
    origin_ar: "أمريكا الشمالية / أوروبا",
    origin_en: "North America / Europe",
    desc_ar: "درجات الشوكولاتة الداكنة مع تموجات دخانية ساحرة. المعيار الذهبي للمكاتب الرئاسية وغرف النوم الفاخرة.",
    desc_en: "Deep, chocolate brown to dark amber tones with dramatic smoky grain figure. The benchmark for executive offices and luxury statement furniture.",
    hardness_ar: "متوسطة إلى عالية",
    hardness_en: "Medium-High",
    tone_ar: "إسبريسو غني",
    tone_en: "Rich Espresso",
    pore_ar: "مسام ناعمة مخملية",
    pore_en: "Fine to Medium",
    cssClass: "walnut-texture"
  },
  beech: {
    name_ar: "قشرة خشب زان أوروبي مبخر",
    name_en: "Steamed European Beech (زان أوروبي مبخر)",
    origin_ar: "وسط أوروبا",
    origin_en: "Central Europe",
    desc_ar: "لون وردي سلموني هادئ ومظهر متجانس وخالي من العيوب. مثالي لدهانات الأستر والصبغات الحديثة.",
    desc_en: "Delicate pinkish-salmon hue with subtle ray flecks. Extremely uniform, smooth, and easily takes modern stains, washes, and protective oils.",
    hardness_ar: "شديدة الصلابة",
    hardness_en: "Very High",
    tone_ar: "وردي سلموني",
    tone_en: "Warm Rosy Salmon",
    pore_ar: "مسام مغلقة مدمجة",
    pore_en: "Closed & Dense",
    cssClass: "beech-texture"
  },
  sapelli: {
    name_ar: "قشرة سابيلي ماهوجني أفريقي",
    name_en: "Sapelli Mahogany (سابيلي ماهوجني أفريقي)",
    origin_ar: "غرب أفريقيا",
    origin_en: "West Africa",
    desc_ar: "خطوط شريطية لؤلؤية تتلألأ مع الإضاءة بلون نحاسي محمر غني. خيار القصور واليخوت والأبواب الفاخرة.",
    desc_en: "Famous ribbon-stripe grain with lustrous golden-red iridescence. Resilient, opulent, and historically favoured in high-end yachting and classical joinery.",
    hardness_ar: "صلابة عالية",
    hardness_en: "High",
    tone_ar: "أحمر نحاسي",
    tone_en: "Copper Reddish",
    pore_ar: "ألياف متشابكة",
    pore_en: "Interlocking Grain",
    cssClass: "sapelli-texture"
  },
  teak: {
    name_ar: "قشرة تيك بورمي ذهبي طبيعي",
    name_en: "Burmese Golden Teak (تيك ذهبي طبيعي)",
    origin_ar: "جنوب شرق آسيا",
    origin_en: "South-East Asia",
    desc_ar: "غني بالزيوت الطبيعية المقاومة للرطوبة والمياه. ملمس حريري فريد ومظهر ذهبي دافئ لا يتأثر بالزمن.",
    desc_en: "Natural aromatic oils make it exceptionally water and decay resistant. Mellow golden-brown appearance with silky tactile smoothness.",
    hardness_ar: "كثافة عالية",
    hardness_en: "High Density",
    tone_ar: "ذهبي نضر",
    tone_en: "Mellow Golden",
    pore_ar: "زيتي مقاوم",
    pore_en: "Oily & Tight",
    cssClass: "teak-texture"
  }
};

// Bilingual Translations (Arabic Primary, English Secondary)
const TRANSLATIONS = {
  ar: {
    topbar_badge: "أصالة صناعة الأخشاب والكونتر الدمياطي",
    topbar_delivery: "توريد مباشر من المصنع ومستودعات الجملة",
    brand_subtitle: "للاستيراد والتصدير • كونتر وأخشاب فاخرة",
    nav_products: "المنتجات",
    nav_anatomy: "تشريح اللوح",
    nav_calculator: "حاسبة الألواح",
    nav_veneers: "قشرة الأخشاب",
    nav_specs: "المقارنة الفنية",
    nav_quality: "معايير الجودة",
    nav_contact: "تواصل معنا",
    btn_calc: "حاسبة الكميات",
    nav_btn_calc: "حاسبة الكميات",
    btn_whatsapp: "عرض سعر فوري",
    hero_pill: "سدائب خشب طبيعي سويد مجفف أفران 100%",
    hero_origin: "دمياط، مصر",
    hero_title: "المعيار الدمياطي الأرقى في <span class=\"wood-gradient-text\">ألواح الكونتر والساندوتش</span> والأخشاب المصنعة",
    hero_desc: "من قلب قلعة صناعة الأثاث في دمياط، تقدم <strong>مؤسسة الدمياطي</strong> أعلى مستويات الجودة في ألواح الكونتر الطبيعي وساندوتش الإم دي إف. سدائب خشب سويد مجفف أفران، بدون أي فراغات داخلية، معايرة بدقة ميكرومترية لتصنيع أرقى الموديلات وغرف النوم والمطابخ.",
    prod1_name: "كونتر إم دي إف",
    prod1_sub: "سطح أملس • جاهز للدهان وتفريغ CNC",
    prod2_name: "كونتر وش قشرة",
    prod2_sub: "قشرة أرو وجوز وزان طبيعي فاخر",
    prod3_name: "كونتر ساندوتش",
    prod3_sub: "هيكل 5 طبقات فائق الصلابة ومقاوم للتقوس",
    hero_cta_explore: "استعرض تشكيلة الألواح",
    hero_cta_calc: "احسب عدد الألواح لمشروعك",
    stat_moisture: "رطوبة مجففة بدقة بالأفران",
    stat_cavity: "قلب مصمت خالٍ تماماً من الفراغ",
    stat_thickness: "تخانات ومعايرات قياسية",
    stat_eco: "غراء آمن وصحي صديق للبيئة",
    anatomy_tag: "الهندسة وبنية اللوح",
    anatomy_title: "لماذا يتفوق كونتر الدمياطي على الألواح التجارية العادية؟",
    anatomy_subtitle: "على عكس الألواح التجارية التي تحوي فراغات هوائية وتسبب تقوس الأبواب وتلف المسامير، نعتمد على سدائب خشب طبيعي مجففة ومعايرة بدقة مع طبقات توازن متماثلة.",
    layer_1_pill: "الطبقة 1",
    layer_face_title: "سطح خارجي عالي الكثافة (MDF أو قشرة طبيعية)",
    layer_face_desc: "سطح معاير ومصنفر بسماكة 2.5 - 3.5 مم عالي الكثافة لتوفير استواء تام لدهانات الدوكو أو كبس القشرة أو الفورميكا.",
    layer_resin_pill: "راتنج E1",
    layer_glue_title: "خط غراء حراري E1 مقاوم للرطوبة",
    layer_glue_desc: "مكبوس هيدروليكياً تحت حرارة 180°C وضغط عالي يمنع تماماً تفكك الطبقات أو انفصال القشرة.",
    layer_core_pill: "القلب المصمت",
    layer_core_title: "سدائب خشب سويد طبيعي مجفف أفران",
    layer_core_desc: "سدائب مجمعة ومكبوسة جانبياً بعرض 28-32 مم برطوبة متزنة 8-10% لقوة تثبيت فائقة للمفصلات والمسامير.",
    layer_5_pill: "الطبقة 5",
    layer_back_title: "طبقة خلفية متماثلة لمنع الشد المعاكس",
    layer_back_desc: "طبقة مماثلة تماماً للوجه تحقق توازناً ميكانيكياً بين وجهي اللوح، مما يقضي نهائياً على إجهادات التقوس والانحناء.",
    anatomy_hint: "فحص طبقات اللوح التفاعلي:",
    filter_full: "كامل اللوح",
    filter_core: "فحص القلب الداخلي",
    filter_faces: "فحص الأسطح والغراء",
    prod_tag: "التشكيلة الثلاثية الأساسية",
    prod_title: "ألواح الكونتر والخشب المصنع الممتاز",
    prod_desc: "نركز على إنتاج ثلاثة أصناف رئيسية من ألواح الكونتر تم تطويرها بدقة هندسية لتلبية متطلبات ورش النجارة الراقية، مصانع الأثاث، ومقاولي الديكور الداخلي.",
    p1_cat: "لوح ذو وجه ناعم",
    p1_overlay_tag: "مثالي لدهانات الدوكو واللاكيه وتفريغ الـ CNC",
    p1_title: "كونتر إم دي إف (MDF Blockboard)",
    p1_summary: "قلب متماسك من سدائب الخشب الطبيعي السويد، مكسو من الجهتين بطبقة إم دي إف عالي الكثافة معايرة ومصنفرة بنعومة فائقة. يمنحك قوة مسك المسامير وسهولة تشغيل الخشب الطبيعي مع نعومة واستواء الـ MDF.",
    spec_core: "بنية القلب الداخلي:",
    spec_faces: "طبقة الوجه والظهر:",
    spec_thicknesses: "التخانات المتوفرة:",
    spec_size: "الأبعاد القياسية:",
    spec_density: "الكثافة المتوسطة:",
    p1_spec_core: "سدائب خشب سويد طبيعي مجفف أفران",
    p1_spec_faces: "إم دي إف ناعم معاير (2.5 مم - 3 مم)",
    btn_order_inquiry: "طلب عرض سعر ومواصفات",
    btn_calc_this: "حساب عدد الألواح",
    p2_cat: "قشرة أخشاب طبيعية فاخرة",
    p2_overlay_tag: "قشرة خشب طبيعي أرو وجوز وزان مفروزة",
    p2_title: "كونتر وش قشرة طبيعي (Ply Face Veneer)",
    p2_summary: "يجمع بين صلابة القلب الداخلي للكونتر وطبقات الأبلكاج المتقاطعة مع قشرة خشب طبيعي فاخرة مختارة بعناية. يمنح أعمالك مظهر الخشب الطبيعي الخالص مع عروق الأرو الأمريكي، الجوز، الزان، أو التيك.",
    p2_spec_core: "سدائب خشب سويد طبيعي معشقة ومجففة",
    p2_spec_faces: "أرو أبيض، جوز، زان مبخر، سابيلي، تيك",
    spec_veneer_grade: "درجة نقاء القشرة:",
    p2_spec_grade: "نخب أول مفروز ومطابق (0.5 - 0.6 مم)",
    spec_finish: "حالة السطح:",
    p2_spec_finish: "مصنفر بصنفرة ناعمة 240 جاهز للأستر والصبغات",
    p3_cat: "هيكل مركب فائق المتانة",
    p3_overlay_tag: "أقصى مقاومة للتقوس والانحناء في الارتفاعات العالية",
    p3_title: "كونتر ساندوتش إم دي إف (MDF Sandwich)",
    p3_summary: "لوح هندسي مركب مكوّن من 5 طبقات متماثلة، حيث يُحاط قلب السدائب الخشبية بطبقات مزدوجة من الـ MDF عالي الكثافة مع حواجز استقرار متقاطعة لمنع أي انحناء أو تقوس تحت الأحمال الثقيلة.",
    p3_spec_core: "سدائب خشب سويد مدعمة بكبس هيدروليكي",
    spec_structure: "الهيكل الهندسي:",
    p3_spec_struct: "ساندوتش 5 طبقات متماثل الاتزان",
    spec_warp: "مقاومة التقوس:",
    p3_spec_warp: "أقل من 1 مم لكل متر طولي (انعدام التقوس)",
    spec_screwhold: "قوة تماسك المسامير:",
    veneer_tag: "التشطيبات وعروق الأخشاب",
    veneer_title: "استعرض قشرة الخشب الطبيعي المتاحة",
    veneer_subtitle: "تنتج ألواح كونتر وش قشرة الدمياطي بأجود أنواع القشور الطبيعية المستوردة والمفرزة بدقة. عاين درجات الألوان الطبيعية لمشروعك القادم:",
    calc_tag: "أداة الورش الذكية",
    calc_title: "حاسبة مسطحات وعدد ألواح الكونتر",
    calc_desc: "سواء كنت تنفذ مطبخاً، دواليب ملابس، أو مشروع تأثيث كامل، احسب بدقة عدد ألواح الكونتر بمقاس 1220 × 2440 مم (4 × 8 قدم) مع نسبة هالك المنشار، واحصل على عرض سعر رسمي عبر واتساب بضغطة زر.",
    calc_b1: "مقاس قياسي 1220 × 2440 مم (2.977 م² لكل لوح)",
    calc_b2: "حساب تلقائي للوزن التقريبي وحجم الشحنة",
    calc_b3: "تنسيق فوري لرسالة طلب الأسعار على واتساب",
    calc_lbl_product: "اختر نوع لوح الكونتر",
    calc_lbl_thick: "سماكة اللوح (التخانة)",
    calc_tab_area: "الحساب بإجمالي المساحة (م²)",
    calc_tab_pieces: "الحساب بمقاسات القطع (سم)",
    calc_lbl_total_area: "المساحة الإجمالية المطلوبة (م²)",
    calc_lbl_part_len: "الطول (سم)",
    calc_lbl_part_wid: "العرض (سم)",
    calc_lbl_qty: "العدد (قطعة)",
    calc_lbl_waste: "نسبة هالك القص والتقطيع (Wastage)",
    calc_waste_hint: "موصى به: 10% للتفصيل العادي، و 15% للأشكال والزوايا المعقدة.",
    calc_res_sheets: "عدد الألواح المقدر:",
    calc_res_gross_area: "المساحة الإجمالية:",
    calc_res_weight: "الوزن التقريبي:",
    calc_res_volume: "الحجم الإجمالي:",
    calc_btn_wa: "إرسال المقايسة لتسعيرها عبر واتساب",
    comp_tag: "مقارنة فنية مباشرة",
    comp_title: "اختر اللوح المثالي لاحتياجات ورشتك ومشاريعك",
    comp_subtitle: "مقارنة هندسية شاملة بين الأنواع الثلاثة لتحديد الأنسب لكل عنصر في صناعة الأثاث.",
    th_feature: "الخاصية الفنية",
    tr_core: "مادة القلب الداخلي",
    tr_outer: "الطبقة السطحية الخارجية",
    tr_surface: "نعومة واستواء السطح",
    tr_finish_ready: "التشطيبات المناسبة",
    tr_screwhold: "قوة تثبيت المسامير والمفصلات",
    tr_warp_resist: "مقاومة التقوس والالتواء",
    tr_best_use: "أفضل استخدام موصى به",
    qual_tag: "المعيار الدمياطي",
    qual_title: "صناعة خشبية بدون أي تهاون في الجودة",
    qual_subtitle: "في صناعة الأثاث، اللوح قوي بقوة قلبه الداخلي. إليك معايير الجودة الصارمة المطبقة في مصانع ومستودعات الدمياطي:",
    q1_title: "دقة تجفيف الأفران",
    q1_desc: "تجفف السدائب في أفران مبرمجة إلكترونياً حتى اتزان رطوبة 8-10% لمنع الانكماش أو التشقق بعد التصنيع والدهان.",
    q2_title: "خلو تام من الفراغات",
    q2_desc: "تُرص السدائب بنظام كبس جانبي ميكانيكي لمنع أي فراغات هوائية تسبب ضعف تثبيت المسامير أو هبوط السطح.",
    q3_title: "غراء E1 الصحي الآمن",
    q3_desc: "نستخدم راتنجات حرارية قوية وصديقة للبيئة خالية من الفورمالدهيد الضار ومناسبة للمطابخ وغرف الأطفال المغلقة.",
    q4_title: "معايرة ميكرومترية للسمك",
    q4_desc: "تُصنفر الألواح بمكائن عريضة أوتوماتيكية لتحقيق استواء بسماكة دقيقة بتفاوت لا يتجاوز ±0.2 مم لتسهيل القشاط والشريط.",
    contact_tag: "مباشرة من المستودع",
    contact_title: "تفضل بزيارة مستودعاتنا أو اطلب شحنتك",
    contact_desc: "سواء كنت تحتاج رزمة واحدة لورشتك أو كميات جملة وتوريدات للمشاريع والشركات في كافة محافظات مصر، فريق المبيعات جاهز لخدمتك فوراً وتجهيز الشحنة.",
    form_title: "طلب كميات أو تسعير مواصفة",
    form_lbl_name: "الاسم أو اسم الورشة / المصنع",
    form_lbl_phone: "رقم الهاتف أو الواتساب",
    form_lbl_prod: "النوع المطلوب",
    form_lbl_qty: "الكمية المطلوبة (بالألواح أو الرزم)",
    form_lbl_thick: "السماكة المطلوبة",
    form_lbl_notes: "ملاحظات أو تفاصيل المشروع ومدينة التوصيل",
    btn_send_inquiry: "إرسال الطلب مباشرة إلى واتساب",
    modal_tag: "تسعير فوري",
    modal_desc: "احصل على سعر فوري من مستودعاتنا عبر محادثة واتساب سريعة.",
    modal_lbl_thick: "اختر السماكة (التخانة)",
    modal_lbl_qty: "الكمية المطلوبة (لوح)",
    modal_lbl_dest: "مدينة التوصيل أو موقع الورشة",
    modal_btn_wa: "بدء المحادثة على واتساب الآن",
    footer_desc: "الدمياطي للكونتر والأخشاب — عراقة الصناعة الدمياطية وجودة الهندسة الخشبية الحديثة لخدمة النجارين، المقاولين، وشركات الديكور.",
    footer_head_products: "منتجاتنا",
    footer_head_tools: "أدوات ومساعدة",
    footer_link_calc: "حاسبة مسطحات الكونتر",
    footer_link_anatomy: "تشريح بنية اللوح",
    footer_link_specs: "جدول المقارنة الفنية",
    footer_link_contact: "طلبات جملة المستودع",
    footer_head_hours: "مواعيد العمل",
    floating_whatsapp_tooltip: "اطلب عرض سعر فوري"
  },
  en: {
    topbar_badge: "Damietta Heritage Timber Craftsmanship",
    topbar_delivery: "Factory Direct Delivery & Wholesale Supply",
    brand_subtitle: "IMPORT & EXPORT • TIMBER PANELS",
    nav_products: "Products",
    nav_anatomy: "Core Anatomy",
    nav_calculator: "Board Estimator",
    nav_veneers: "Veneer Finishes",
    nav_specs: "Technical Specs",
    nav_quality: "Why Al-Domiaty",
    nav_contact: "Contact",
    btn_calc: "Estimator",
    nav_btn_calc: "Estimator",
    btn_whatsapp: "Quick Quote",
    hero_pill: "100% Solid Kiln-Dried Pine Core",
    hero_origin: "Damietta, Egypt",
    hero_title: "The Master Standard in <span class=\"wood-gradient-text\">Engineered Blockboard</span> & Counter Panels",
    hero_desc: "Born from Damietta’s renowned timber legacy, <strong>Al-Domiaty</strong> produces the region's most dimensionally stable blockboards. Engineered with kiln-dried solid timber batons, zero-cavity calibration, and ultra-flat skins for elite furniture makers and architectural millwork.",
    prod1_name: "MDF Blockboard",
    prod1_sub: "Smooth Face • Paint & CNC",
    prod2_name: "Ply Face Veneer",
    prod2_sub: "Natural Oak & Walnut Grain",
    prod3_name: "MDF Sandwich",
    prod3_sub: "Multi-Layer Heavy Duty Rigid",
    hero_cta_explore: "Explore Product Line",
    hero_cta_calc: "Calculate Sheets Needed",
    stat_moisture: "Kiln Moisture Control",
    stat_cavity: "Solid Core Guarantee",
    stat_thickness: "Standard Calibrations",
    stat_eco: "Low-VOC Bonding Resin",
    anatomy_tag: "Engineering & Build",
    anatomy_title: "Why Domiaty Blockboard Stands Above Standard Wood",
    anatomy_subtitle: "Unlike hollow or uncalibrated commercial boards, our counter boards are built with seasoned finger-jointed timber strips to prevent bowing, cupping, and screw stripping.",
    layer_1_pill: "Layer 1",
    layer_face_title: "Smooth Calibrated Face (MDF / Natural Veneer)",
    layer_face_desc: "2.5mm - 3.5mm ultra-dense calibrated surface. Defect-free for flawless paint finish, vacuum press, or high-pressure laminate.",
    layer_resin_pill: "Resin E1",
    layer_glue_title: "E1 Moisture-Resistant Adhesive Line",
    layer_glue_desc: "Hot-pressed under 180°C and 1.8 MPa hydraulic pressure for permanent delamination resistance.",
    layer_core_pill: "Solid Core",
    layer_core_title: "Kiln-Dried Solid Pine / Hardwood Batons",
    layer_core_desc: "Edge-glued solid timber strips (28mm–32mm width). Sourced from sustainable forests, seasoned to 8-10% moisture content.",
    layer_5_pill: "Layer 5",
    layer_back_title: "Symmetrical Balancing Backer Sheet",
    layer_back_desc: "Identical density backer ensures absolute tension equilibrium across both faces, eliminating internal warping stresses.",
    anatomy_hint: "Interactive Cross-Section Inspection:",
    filter_full: "Full Panel",
    filter_core: "Inspect Core",
    filter_faces: "Inspect Faces & Resin",
    prod_tag: "The Signature Three",
    prod_title: "Engineered Timber Panels & Blockboards",
    prod_desc: "We specialize exclusively in three premier blockboard formulations engineered for precision cabinetry, high-end furniture fabrication, and structural architectural partitions.",
    p1_cat: "Smooth Face Panel",
    p1_overlay_tag: "Ideal for Spray Paint & CNC Routing",
    p1_title: "MDF Blockboard",
    p1_summary: "A solid blockboard timber core fused symmetrically with calibrated High-Density MDF faces on both sides. Offers the lightweight screw holding of solid timber with the mirror-smooth, uniform surface of MDF.",
    spec_core: "Core Construction:",
    spec_faces: "Face & Back:",
    spec_thicknesses: "Thicknesses:",
    spec_size: "Dimensions:",
    spec_density: "Average Density:",
    p1_spec_core: "Kiln-Dried Solid Pine Batons",
    p1_spec_faces: "Smooth Calibrated MDF (2.5mm - 3mm)",
    btn_order_inquiry: "Request Price & Specs",
    btn_calc_this: "Estimate Sheets",
    p2_cat: "Luxury Natural Veneer",
    p2_overlay_tag: "Genuine Natural Hardwood Veneer",
    p2_title: "Ply Face Veneer Blockboard",
    p2_summary: "Combines the structural integrity of a solid blockboard core with cross-banded veneers and hand-selected natural hardwood face veneers. Delivers the authentic luxury grain of White Oak, American Walnut, Beech, or Teak.",
    p2_spec_core: "Finger-Jointed Solid Timber Batons",
    p2_spec_faces: "White Oak, Walnut, Beech, Sapelli",
    spec_veneer_grade: "Veneer Grade:",
    p2_spec_grade: "Grade A/B Book-Matched (0.5-0.6mm)",
    spec_finish: "Surface State:",
    p2_spec_finish: "240-Grit Pre-Sanded Ready for Stain",
    p3_cat: "Heavy-Duty Composite",
    p3_overlay_tag: "Maximum Warp-Resistant Rigidity",
    p3_title: "MDF Sandwich Blockboard",
    p3_summary: "An advanced 5-layer composite engineered panel. Symmetrically sandwiches high-density MDF outer skins and cross-ply stabilization barriers around a heavy-duty finger-jointed timber core to provide unmatched bending strength.",
    p3_spec_core: "Engineered Solid Pine Strip Core",
    spec_structure: "Structure:",
    p3_spec_struct: "5-Layer Symmetrical Sandwich",
    spec_warp: "Warp Resistance:",
    p3_spec_warp: "< 1mm / Linear Meter deflection",
    spec_screwhold: "Screw Retention:",
    veneer_tag: "Finishes & Textures",
    veneer_title: "Explore Real Wood Veneer Faces",
    veneer_subtitle: "Our Ply Face Veneer Blockboards are produced with authenticated, book-matched natural wood grains. Preview the rich timber tones available for your bespoke furniture.",
    calc_tag: "Smart Timber Tool",
    calc_title: "Board & Sheet Requirement Estimator",
    calc_desc: "Planning a kitchen carcase, custom wardrobes, or an entire commercial fit-out? Calculate exact sheet quantities of 1220 x 2440 mm (4x8 ft) counter panels, account for cutting saw kerf wastage, and get an instant quote directly via WhatsApp.",
    calc_b1: "Standard 1220 x 2440 mm (2.977 m² per sheet)",
    calc_b2: "Automatic weight & volume estimates",
    calc_b3: "Pre-formatted WhatsApp inquiry builder",
    calc_lbl_product: "Select Blockboard Formulation",
    calc_lbl_thick: "Board Thickness",
    calc_tab_area: "Calculate by Total Area (m²)",
    calc_tab_pieces: "Calculate by Cabinet Pieces",
    calc_lbl_total_area: "Total Net Surface Needed (m²)",
    calc_lbl_part_len: "Length (cm)",
    calc_lbl_part_wid: "Width (cm)",
    calc_lbl_qty: "Quantity (Pieces)",
    calc_lbl_waste: "Cutting Kerf & Wastage Allowance",
    calc_waste_hint: "Recommended: 10% for standard cabinetry, 15% for complex angle cuts.",
    calc_res_sheets: "Estimated Sheets Needed:",
    calc_res_gross_area: "Gross Area:",
    calc_res_weight: "Total Weight:",
    calc_res_volume: "Volume:",
    calc_btn_wa: "Send Quote Request via WhatsApp",
    comp_tag: "Side-by-Side Comparison",
    comp_title: "Choose the Perfect Board For Your Application",
    comp_subtitle: "Detailed technical evaluation across our three product formulations.",
    th_feature: "Technical Feature",
    tr_core: "Core Construction",
    tr_outer: "Outer Skin Material",
    tr_surface: "Surface Smoothness",
    tr_finish_ready: "Finishing Compatibility",
    tr_screwhold: "Screw Retention Capacity",
    tr_warp_resist: "Anti-Warping Performance",
    tr_best_use: "Primary Application",
    qual_tag: "The Damietta Standard",
    qual_title: "Built With Uncompromising Timber Discipline",
    qual_subtitle: "In furniture making, a board is only as reliable as its internal core. Here is how Al-Domiaty guarantees zero failures in your workshop.",
    q1_title: "Kiln-Drying Precision",
    q1_desc: "Timber batons are seasoned in computerized kilns down to an exact 8-10% moisture equilibrium, preventing post-manufacture cracking, shrinkage, or swelling.",
    q2_title: "Zero Hollow Cavities",
    q2_desc: "Baton edges are tightly calibrated and machine-assembled under lateral hydraulic pressure to eliminate internal air gaps and hollow pockets completely.",
    q3_title: "Eco-Safe E1 Adhesives",
    q3_desc: "Bonded with high-strength, low-emission E1 thermosetting resins that guarantee safety in living spaces, children's bedrooms, and closed kitchens.",
    q4_title: "Micrometer Calibration",
    q4_desc: "Double-sided broad-belt industrial sanders calibrate panel thickness to within ±0.2mm tolerance, ensuring effortless edge-banding and flawless joint alignment.",
    contact_tag: "Direct From The Yard",
    contact_title: "Visit Our Yard or Order Direct",
    contact_desc: "Whether you need a single bundle for an artisan project or container-load wholesale dispatch across Egypt and the MENA region, our timber specialists are ready.",
    form_title: "Quick Order / Spec Request",
    form_lbl_name: "Your Name / Workshop Name",
    form_lbl_phone: "Phone / WhatsApp Number",
    form_lbl_prod: "Desired Product",
    form_lbl_qty: "Quantity (Sheets / Bundles)",
    form_lbl_thick: "Required Thickness",
    form_lbl_notes: "Project Details / Custom Requests",
    btn_send_inquiry: "Send Inquiry Directly to WhatsApp",
    modal_tag: "Direct Quote",
    modal_desc: "Fast-track your quote with our sales team via WhatsApp.",
    modal_lbl_thick: "Select Thickness",
    modal_lbl_qty: "Quantity Needed (Sheets)",
    modal_lbl_dest: "Delivery City / Workshop Location",
    modal_btn_wa: "Chat on WhatsApp Now",
    footer_desc: "Rooted in the renowned woodworking heritage of Damietta. Delivering kiln-dried, defect-free counter panels, blockboards, and engineered timber solutions to contractors and manufacturers.",
    footer_head_products: "Our Products",
    footer_head_tools: "Tools & Support",
    footer_link_calc: "Board & Sheet Estimator",
    footer_link_anatomy: "Core Structure Anatomy",
    footer_link_specs: "Technical Specs Matrix",
    footer_link_contact: "Wholesale Yard Orders",
    footer_head_hours: "Working Hours",
    floating_whatsapp_tooltip: "Request Instant Quote"
  }
};

// Initialize DOM Events when document is ready
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initCalculator();
  initNavigation();
  initVeneerStage();
  updateCopyrightYear();
});

function updateCopyrightYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================================================
   NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const header = document.getElementById('mainHeader');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Header scroll shadow and compacting
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   BILINGUAL SUPPORT (ARABIC PRIMARY <-> ENGLISH)
   ========================================================================== */
function initLanguage() {
  // Default to Arabic unless the user previously explicitly chose English
  const savedLang = localStorage.getItem('aldomiaty_lang') || 'ar';
  setLanguage(savedLang);

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'ar' ? 'en' : 'ar';
      setLanguage(nextLang);
    });
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('aldomiaty_lang', lang);
  const html = document.documentElement;
  const langLabel = document.getElementById('langLabel');

  if (lang === 'ar') {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    if (langLabel) langLabel.textContent = 'English';
    document.title = "الدمياطي للكونتر والأخشاب | أجود أنواع ألواح الكونتر والساندوتش والقشرة";
  } else {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    if (langLabel) langLabel.textContent = 'العربية';
    document.title = "Al-Domiaty Counter & Timber | Premium Blockboard Solutions (الدمياطي)";
  }

  // Update all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Re-run calculation and veneer info refresh
  runCalculation();
  refreshVeneerText();
}

/* ==========================================================================
   VENEER SHOWCASE CONTROLLER
   ========================================================================== */
let activeVeneerKey = 'oak';

function initVeneerStage() {
  selectVeneer('oak');
}

function selectVeneer(key) {
  if (!VENEER_DATA[key]) return;
  activeVeneerKey = key;

  // Update button active state
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    if (btn.getAttribute('data-veneer') === key) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update sample view classes
  const sample = document.getElementById('veneerSampleView');
  if (sample) {
    sample.className = 'veneer-texture-sample ' + VENEER_DATA[key].cssClass;
  }

  refreshVeneerText();
}

function refreshVeneerText() {
  const data = VENEER_DATA[activeVeneerKey];
  if (!data) return;

  const isAr = currentLang === 'ar';
  const nameEl = document.getElementById('veneerName');
  const originEl = document.getElementById('veneerOrigin');
  const descEl = document.getElementById('veneerDesc');
  const hardnessEl = document.getElementById('vPropHardness');
  const toneEl = document.getElementById('vPropTone');
  const poreEl = document.getElementById('vPropPore');

  if (nameEl) nameEl.textContent = isAr ? data.name_ar : data.name_en;
  if (originEl) originEl.textContent = isAr ? data.origin_ar : data.origin_en;
  if (descEl) descEl.textContent = isAr ? data.desc_ar : data.desc_en;
  if (hardnessEl) hardnessEl.textContent = isAr ? data.hardness_ar : data.hardness_en;
  if (toneEl) toneEl.textContent = isAr ? data.tone_ar : data.tone_en;
  if (poreEl) poreEl.textContent = isAr ? data.pore_ar : data.pore_en;
}

/* ==========================================================================
   ANATOMY INTERACTIVE LAYER VIEWER
   ========================================================================== */
function filterLayers(mode) {
  // Update button active states
  document.querySelectorAll('.anatomy-controls .btn-filter').forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const faceLayers = document.querySelectorAll('.layer-mdf');
  const resinLayers = document.querySelectorAll('.layer-glue');
  const coreLayer = document.querySelector('.layer-core');

  if (mode === 'all') {
    faceLayers.forEach(el => el.style.opacity = '1');
    resinLayers.forEach(el => el.style.opacity = '1');
    if (coreLayer) {
      coreLayer.style.opacity = '1';
      coreLayer.classList.add('active');
    }
  } else if (mode === 'core') {
    faceLayers.forEach(el => el.style.opacity = '0.35');
    resinLayers.forEach(el => el.style.opacity = '0.35');
    if (coreLayer) {
      coreLayer.style.opacity = '1';
      coreLayer.classList.add('active');
    }
  } else if (mode === 'faces') {
    faceLayers.forEach(el => {
      el.style.opacity = '1';
      el.classList.add('active');
    });
    resinLayers.forEach(el => el.style.opacity = '0.8');
    if (coreLayer) {
      coreLayer.style.opacity = '0.35';
      coreLayer.classList.remove('active');
    }
  }
}

/* ==========================================================================
   BOARD & SHEET ESTIMATOR CALCULATOR
   ========================================================================== */
function initCalculator() {
  const prodSelect = document.getElementById('calcProduct');
  if (prodSelect) {
    prodSelect.addEventListener('change', runCalculation);
  }
  runCalculation();
}

function setCalcMode(mode) {
  currentCalcMode = mode;
  const tabArea = document.getElementById('tabByArea');
  const tabPieces = document.getElementById('tabByPieces');
  const modeArea = document.getElementById('modeArea');
  const modePieces = document.getElementById('modePieces');

  if (mode === 'area') {
    if (tabArea) tabArea.classList.add('active');
    if (tabPieces) tabPieces.classList.remove('active');
    if (modeArea) modeArea.classList.remove('hidden');
    if (modePieces) modePieces.classList.add('hidden');
  } else {
    if (tabPieces) tabPieces.classList.add('active');
    if (tabArea) tabArea.classList.remove('active');
    if (modePieces) modePieces.classList.remove('hidden');
    if (modeArea) modeArea.classList.add('hidden');
  }

  runCalculation();
}

function quickCalculate(productId) {
  const select = document.getElementById('calcProduct');
  if (select) {
    if (productId === 'mdf-blockboard') select.value = 'MDF Blockboard';
    else if (productId === 'ply-veneer') select.value = 'Ply Face Veneer Blockboard';
    else if (productId === 'mdf-sandwich') select.value = 'MDF Sandwich Blockboard';
  }
  const calcSec = document.getElementById('calculator');
  if (calcSec) {
    calcSec.scrollIntoView({ behavior: 'smooth' });
  }
  runCalculation();
}

function runCalculation() {
  // 1. Get Selected Thickness
  const thickRadio = document.querySelector('input[name="boardThick"]:checked');
  const thicknessMm = thickRadio ? parseFloat(thickRadio.value) : 18;
  const thicknessM = thicknessMm / 1000;

  // 2. Get Selected Product Density
  const prodSelect = document.getElementById('calcProduct');
  let density = 660; // kg/m³
  if (prodSelect && prodSelect.selectedOptions.length > 0) {
    const dataDensity = prodSelect.selectedOptions[0].getAttribute('data-density');
    if (dataDensity) density = parseFloat(dataDensity);
  }

  // 3. Get Wastage
  const wastageSlider = document.getElementById('wastageInput');
  const wastagePct = wastageSlider ? parseFloat(wastageSlider.value) : 10;
  const wastageValEl = document.getElementById('wastageInputVal');
  if (wastageValEl) wastageValEl.textContent = wastagePct + '%';

  // 4. Calculate Net Area in m²
  let netAreaM2 = 0;
  if (currentCalcMode === 'area') {
    const areaInput = document.getElementById('areaInput');
    netAreaM2 = areaInput ? parseFloat(areaInput.value) : 15;
    const areaValBadge = document.getElementById('areaInputVal');
    const isAr = currentLang === 'ar';
    if (areaValBadge) areaValBadge.textContent = isAr ? `${netAreaM2} م²` : `${netAreaM2} m²`;
  } else {
    // Pieces mode: L(cm) * W(cm) * Qty
    const lenCm = parseFloat(document.getElementById('pieceLength')?.value || 200);
    const widCm = parseFloat(document.getElementById('pieceWidth')?.value || 60);
    const qty = parseFloat(document.getElementById('pieceQty')?.value || 12);

    const singlePieceM2 = (lenCm / 100) * (widCm / 100);
    netAreaM2 = singlePieceM2 * qty;
  }

  // 5. Apply Wastage Allowance
  const grossAreaM2 = netAreaM2 * (1 + wastagePct / 100);

  // 6. Calculate Sheets Needed (Ceil to nearest full sheet)
  const sheetsNeeded = Math.max(1, Math.ceil(grossAreaM2 / SHEET_AREA_M2));

  // 7. Calculate Weight and Volume of the required sheets
  const totalRealAreaM2 = sheetsNeeded * SHEET_AREA_M2;
  const volumeM3 = totalRealAreaM2 * thicknessM;
  const totalWeightKg = Math.round(volumeM3 * density);

  // 8. Update UI displays
  const isAr = currentLang === 'ar';
  const sheetUnit = isAr ? 'لوح' : 'Sheets';
  const kgUnit = isAr ? 'كجم' : 'kg';
  const m2Unit = isAr ? 'م²' : 'm²';
  const m3Unit = isAr ? 'م³' : 'm³';

  const resSheetsEl = document.getElementById('resSheets');
  const resGrossAreaEl = document.getElementById('resGrossArea');
  const resWeightEl = document.getElementById('resWeight');
  const resVolumeEl = document.getElementById('resVolume');

  if (resSheetsEl) resSheetsEl.innerHTML = `${sheetsNeeded} <small>${sheetUnit}</small>`;
  if (resGrossAreaEl) resGrossAreaEl.textContent = `${grossAreaM2.toFixed(2)} ${m2Unit}`;
  if (resWeightEl) resWeightEl.textContent = `~${totalWeightKg} ${kgUnit}`;
  if (resVolumeEl) resVolumeEl.textContent = `${volumeM3.toFixed(2)} ${m3Unit}`;
}

/* ==========================================================================
   WHATSAPP INTEGRATION & QUOTE ACTIONS
   ========================================================================== */
function sendCalculatedQuoteToWhatsApp() {
  const prodSelect = document.getElementById('calcProduct');
  const productName = prodSelect ? prodSelect.options[prodSelect.selectedIndex].text : "كونتر الدمياطي";
  const thickRadio = document.querySelector('input[name="boardThick"]:checked');
  const thickness = thickRadio ? thickRadio.value + ' مم' : '18 مم';
  
  const sheetsEl = document.getElementById('resSheets');
  const sheets = sheetsEl ? sheetsEl.innerText.replace('\n', ' ') : '6 لوح';
  const grossArea = document.getElementById('resGrossArea').textContent;
  const weight = document.getElementById('resWeight').textContent;

  let message = "";
  if (currentLang === 'ar') {
    message = `السلام عليكم ورحمة الله وبركاته، مؤسسة الدمياطي للكونتر والأخشاب،\nأود الاستفسار وطلب عرض سعر للكمية التالية:\n- الصنف: ${productName}\n- التخانة: ${thickness}\n- عدد الألواح المقدرة: ${sheets}\n- المساحة الإجمالية: ${grossArea}\n- الوزن التقديري: ${weight}\nأرجو إفادتي بالسعر وتوافر الشحن. شكراً جزيلاً!`;
  } else {
    message = `Hello Al-Domiaty Counter & Timber,\nI would like to request an official price quote for:\n- Product: ${productName}\n- Thickness: ${thickness}\n- Estimated Sheets: ${sheets}\n- Total Area: ${grossArea}\n- Estimated Weight: ${weight}\nPlease provide pricing and delivery timeline. Thank you!`;
  }

  const encodedUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}

/* Modal Open & WhatsApp Submission */
let modalTargetProduct = "كونتر إم دي إف (MDF Blockboard)";

function openOrderModal(productName, defaultThick = "18mm") {
  modalTargetProduct = productName;
  const titleEl = document.getElementById('modalProductTitle');
  if (titleEl) titleEl.textContent = productName;

  const thickSelect = document.getElementById('modalThickness');
  if (thickSelect) thickSelect.value = defaultThick;

  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.add('active');
}

function closeOrderModal(event) {
  if (event && event.target && event.target.closest('.modal-card') && !event.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.remove('active');
}

function sendModalQuoteToWhatsApp() {
  const thick = document.getElementById('modalThickness').value;
  const qty = document.getElementById('modalQuantity').value || 10;
  const location = document.getElementById('modalLocation').value || "دمياط / مصر";

  let message = "";
  if (currentLang === 'ar') {
    message = `مرحباً فريق الدمياطي للكونتر،\nأرغب في الاستفسار عن توفر وسعر:\n- الصنف: ${modalTargetProduct}\n- السماكة: ${thick}\n- الكمية المطلوبة: ${qty} لوح\n- مكان التسليم: ${location}\nأرجو التواصل معي بالأسعار وموعد التوريد.`;
  } else {
    message = `Hello Al-Domiaty Sales Team,\nI would like an immediate quote for:\n- Product: ${modalTargetProduct}\n- Thickness: ${thick}\n- Quantity: ${qty} Sheets\n- Location/City: ${location}\nPlease let me know pricing and stock availability.`;
  }

  closeOrderModal();
  const encodedUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}

/* Contact form inquiry submission directly to WhatsApp */
function handleInquirySubmit(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value;
  const phone = document.getElementById('clientPhone').value;
  const product = document.getElementById('inquiryProduct').value;
  const qty = document.getElementById('inquiryQty').value || "غير محدد";
  const thick = document.getElementById('inquiryThick').value;
  const notes = document.getElementById('inquiryNotes').value;

  let message = "";
  if (currentLang === 'ar') {
    message = `طلب تسعير جديد من موقع الدمياطي للكونتر:\n- الاسم: ${name}\n- الهاتف: ${phone}\n- المنتج: ${product}\n- السماكة: ${thick}\n- الكمية: ${qty}\n- تفاصيل إضافية: ${notes || 'لا يوجد'}`;
  } else {
    message = `New Quote Inquiry from Al-Domiaty Website:\n- Name/Shop: ${name}\n- Contact: ${phone}\n- Product: ${product}\n- Thickness: ${thick}\n- Quantity: ${qty}\n- Project Details: ${notes || 'None'}`;
  }

  const encodedUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}
