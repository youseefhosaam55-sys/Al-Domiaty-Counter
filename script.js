/**
 * AL-DOMIATY COUNTER & TIMBER - INTERACTIVE CONTROLLER
 * Handles:
 * 1. Board & Sheet Estimator Calculator
 * 2. Veneer Texture Visualizer
 * 3. Anatomy Layer Filtering
 * 4. Bilingual Support (EN / AR)
 * 5. Quick Quote & WhatsApp Message Builders
 * 6. Responsive Navigation
 */

// Phone number for WhatsApp quotes (Egyptian country code +20)
const SHOP_WHATSAPP_NUMBER = "201015176070";

// Standard Sheet Dimensions in meters
const SHEET_WIDTH_M = 1.22;
const SHEET_HEIGHT_M = 2.44;
const SHEET_AREA_M2 = SHEET_WIDTH_M * SHEET_HEIGHT_M; // ~2.9768 m²

// State
let currentCalcMode = 'area'; // 'area' | 'pieces'
let currentLang = 'en';

// Veneer Database
const VENEER_DATA = {
  oak: {
    name_en: "Natural White Oak (أرو أبيض طبيعي)",
    name_ar: "قشرة أرو أبيض أمريكي فاخر",
    origin_en: "North America",
    origin_ar: "أمريكا الشمالية",
    desc_en: "Prominent, elegant cathedral grain with golden honey undertones. Highly sought after for Scandinavian, modern minimalist, and luxury bespoke cabinetry.",
    desc_ar: "تتميز بحبات الكاتدرائية الفاخرة ودرجات العسل الدافئة. الخيار الأول للمطابخ المودرن والدريسينج روم والأثاث الراقي.",
    hardness_en: "High",
    hardness_ar: "عالية جداً",
    tone_en: "Warm Honey",
    tone_ar: "عسلي دافئ",
    pore_en: "Open Grain",
    pore_ar: "مسام مفتوحة بارزة",
    cssClass: "oak-texture"
  },
  walnut: {
    name_en: "American Black Walnut (جوز أمريكي)",
    name_ar: "قشرة جوز تركي / أمريكي طبيعي",
    origin_en: "North America / Europe",
    origin_ar: "أمريكا الشمالية / أوروبا",
    desc_en: "Deep, chocolate brown to dark amber tones with dramatic smoky grain figure. The benchmark for executive offices and luxury statement furniture.",
    desc_ar: "درجات الشوكولاتة الداكنة مع تموجات دخانية ساحرة. المعيار الذهبي للمكاتب الرئاسية وغرف النوم الفاخرة.",
    hardness_en: "Medium-High",
    hardness_ar: "متوسطة إلى عالية",
    tone_en: "Rich Espresso",
    tone_ar: "إسبريسو غني",
    pore_en: "Fine to Medium",
    pore_ar: "مسام ناعمة مخملية",
    cssClass: "walnut-texture"
  },
  beech: {
    name_en: "Steamed European Beech (زان أوروبي مبخر)",
    name_ar: "قشرة خشب زان أوروبي مبخر",
    origin_en: "Central Europe",
    origin_ar: "وسط أوروبا",
    desc_en: "Delicate pinkish-salmon hue with subtle ray flecks. Extremely uniform, smooth, and easily takes modern stains, washes, and protective oils.",
    desc_ar: "لون وردي سلموني هادئ ومظهر متجانس وخالي من العيوب. مثالي لدهانات الأستر والصبغات الحديثة.",
    hardness_en: "Very High",
    hardness_ar: "شديدة الصلابة",
    tone_en: "Warm Rosy Salmon",
    tone_ar: "وردي سلموني",
    pore_en: "Closed & Dense",
    pore_ar: "مسام مغلقة مدمجة",
    cssClass: "beech-texture"
  },
  sapelli: {
    name_en: "Sapelli Mahogany (سابيلي ماهوجني أفريقي)",
    name_ar: "قشرة سابيلي ماهوجني أفريقي",
    origin_en: "West Africa",
    origin_ar: "غرب أفريقيا",
    desc_en: "Famous ribbon-stripe grain with lustrous golden-red iridescence. Resilient, opulent, and historically favoured in high-end yachting and classical joinery.",
    desc_ar: "خطوط شريطية لؤلؤية تتلألأ مع الإضاءة بلون نحاسي محمر غني. خيار القصور واليخوت والأبواب الفاخرة.",
    hardness_en: "High",
    hardness_ar: "صلابة عالية",
    tone_en: "Copper Reddish",
    tone_ar: "أحمر نحاسي",
    pore_en: "Interlocking Grain",
    pore_ar: "ألياف متشابكة",
    cssClass: "sapelli-texture"
  },
  teak: {
    name_en: "Burmese Golden Teak (تيك ذهبي طبيعي)",
    name_ar: "قشرة تيك بورمي ذهبي طبيعي",
    origin_en: "South-East Asia",
    origin_ar: "جنوب شرق آسيا",
    desc_en: "Natural aromatic oils make it exceptionally water and decay resistant. Mellow golden-brown appearance with silky tactile smoothness.",
    desc_ar: "غني بالزيوت الطبيعية المقاومة للرطوبة والمياه. ملمس حريري فريد ومظهر ذهبي دافئ لا يتأثر بالزمن.",
    hardness_en: "High Density",
    hardness_ar: "كثافة عالية",
    tone_en: "Mellow Golden",
    tone_ar: "ذهبي نضر",
    pore_en: "Oily & Tight",
    pore_ar: "زيتي مقاوم",
    cssClass: "teak-texture"
  }
};

// Bilingual Translations (English & Arabic)
const TRANSLATIONS = {
  en: {
    topbar_badge: "Damietta Heritage Timber Craftsmanship",
    topbar_delivery: "Factory Direct Delivery & Wholesale Supply",
    brand_subtitle: "IMPORT & EXPORT • TIMBER PANELS",
    nav_products: "Products",
    nav_anatomy: "Core Anatomy",
    nav_calculator: "Board Estimator",
    nav_veneers: "Veneer Finishes",
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
    layer_face_title: "Smooth Calibrated Face (MDF / Natural Veneer)",
    layer_face_desc: "2.5mm - 3.5mm ultra-dense calibrated surface. Defect-free for flawless paint finish, vacuum press, or high-pressure laminate.",
    layer_glue_title: "E1 Moisture-Resistant Adhesive Line",
    layer_glue_desc: "Hot-pressed under 180°C and 1.8 MPa hydraulic pressure for permanent delamination resistance.",
    layer_core_title: "Kiln-Dried Solid Pine / Hardwood Batons",
    layer_core_desc: "Edge-glued solid timber strips (28mm–32mm width). Sourced from sustainable forests, seasoned to 8-10% moisture content.",
    layer_back_title: "Symmetrical Balancing Backer Sheet",
    layer_back_desc: "Identical density backer ensures absolute tension equilibrium across both faces, eliminating internal warping stresses.",
    anatomy_hint: "Interactive Cross-Section Inspection",
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
    calc_lbl_qty: "Quantity",
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
    footer_head_hours: "Working Hours"
  },
  ar: {
    topbar_badge: "أصالة صناعة الأخشاب والكونتر الدمياطي",
    topbar_delivery: "توريد مباشر من المصنع ومستودعات الجملة",
    brand_subtitle: "للاستيراد والتصدير • كونتر وأخشاب فاخرة",
    nav_products: "المنتجات",
    nav_anatomy: "تشريح اللوح",
    nav_calculator: "حاسبة الألواح",
    nav_veneers: "أنواع القشرة",
    nav_quality: "لماذا الدمياطي",
    nav_contact: "تواصل معنا",
    btn_calc: "الحاسبة",
    nav_btn_calc: "حاسبة الألواح",
    btn_whatsapp: "طلب تسعير فوري",
    hero_pill: "سدائب سويد طبيعي مجفف أفران 100%",
    hero_origin: "دمياط، مصر",
    hero_title: "القمة في صناعة <span class=\"wood-gradient-text\">ألواح الكونتر الخشبي</span> والمسطحات الهندسية",
    hero_desc: "من قلب عاصمة الموبيليا المصرية بدمياط، تقدم <strong>مؤسسة الدمياطي</strong> ألواح كونتر فائقة الثبات والاستقامة. معالجة بأحدث أفران التجفيف، بدون أي فراغات داخلية، وبأسطح فائقة النعومة لأفضل مصنعي الأثاث والديكور.",
    prod1_name: "كونتر إم دي إف",
    prod1_sub: "سطح ناعم • للدهان والـ CNC",
    prod2_name: "كونتر وش قشرة طبيعي",
    prod2_sub: "قشرة أرو وجوز وزان فاخرة",
    prod3_name: "كونتر ساندوتش إم دي إف",
    prod3_sub: "متعدد الطبقات فائق الصلابة",
    hero_cta_explore: "تصفح خط الإنتاج",
    hero_cta_calc: "احسب عدد الألواح لمشروعك",
    stat_moisture: "نسبة رطوبة مجففة 8-10%",
    stat_cavity: "ضمان خلو تام من السوس والفراغ",
    stat_thickness: "تخانات متوفرة 16-25 مم",
    stat_eco: "غراء E1 صحي خالي من الانبعاثات",
    anatomy_tag: "الهندسة والبناء",
    anatomy_title: "لماذا يتفوق كونتر الدمياطي على الأخشاب التجارية؟",
    anatomy_subtitle: "على عكس الألواح التجارية المعرضة للتقوس والشرخ، يُبنى لوح الدمياطي من سدائب خشبية مصفوفة ومضغوطة هيدروليكياً لضمان ثبات المسامير وعدم التقوس مدى الحياة.",
    layer_face_title: "وش كبس عالي الكثافة (MDF أو قشرة طبيعية)",
    layer_face_desc: "سماكة متجانسة 2.5 - 3.5 مم بدون أي نتوءات لضمان دهان دوكو أو لاكيه أو تفريغ راوتر CNC بدقة متناهية.",
    layer_glue_title: "خط غراء E1 مقاوم للرطوبة والحرارة",
    layer_glue_desc: "مكبوس على الساخن تحت 180 درجة وضغط 1.8 ميجا باسكال لمنع فك الطبقات نهائياً.",
    layer_core_title: "قلب سدائب خشب سويد/زان مجفف أفران",
    layer_core_desc: "سدائب متلاصقة بعرض 28-32 مم معالجة ضد الرطوبة ومعاد ضبط استقامتها لمنع الالتواء.",
    layer_back_title: "طبقة ظهر موازنة للتمدد والانكماش",
    layer_back_desc: "تعادل إجهادات الشد السطحي بدقة بالغة مما يجعل اللوح مستقيماً ومستوياً تماماً.",
    anatomy_hint: "فحص طبقات اللوح تفاعلياً",
    prod_tag: "التشكيلة الأساسية",
    prod_title: "ألواح الكونتر والمسطحات الخشبية",
    prod_desc: "نختص بتصنيع وتوريد ثلاثة منتجات رئيسية صُممت خصيصاً لأعمال المطابخ الراقية، غرف النوم، والديكورات الداخلية الهندسية.",
    p1_cat: "سطح ناعم للدهان",
    p1_overlay_tag: "الخيار الأمثل للدهان الأملس وتفريغ الـ CNC",
    p1_title: "كونتر إم دي إف (MDF Blockboard)",
    p1_summary: "قلب كونتر من السدائب الخشبية مكسو بطبقتين متماثلتين من الـ MDF عالي الكثافة. يجمع بين قوة مسك المسامير وسهولة حمل الكونتر مع نعومة واستواء سطح الإم دي إف.",
    spec_core: "هيكل القلب:",
    spec_faces: "الوش والظهر:",
    spec_thicknesses: "التخانات المتوفرة:",
    spec_size: "الأبعاد القياسية:",
    spec_density: "متوسط الكثافة:",
    p1_spec_core: "سدائب خشب سويد طبيعي مجفف",
    p1_spec_faces: "إم دي إف ناعم معاير (2.5 - 3 مم)",
    btn_order_inquiry: "طلب الأسعار والمواصفات",
    btn_calc_this: "حساب الكمية المطلوبة",
    p2_cat: "قشرة خشب طبيعي فاخر",
    p2_overlay_tag: "قشرة خشب طبيعي أصلي A/B",
    p2_title: "كونتر وش قشرة (Ply Face Veneer)",
    p2_summary: "كونتر مصفح بقشرة طبيعية مختارة بعناية (أرو أمريكي، جوز تركي، زان، أو سابيلي) مع طبقة أبلكاش تعريض لتحقيق أقصى استقرار لمظهر الأخشاب الطبيعية الفاخرة.",
    p2_spec_core: "سدائب سويد معشقة finger-jointed",
    p2_spec_faces: "قشرة أرو، جوز، زان، سابيلي، تيك",
    spec_veneer_grade: "درجة القشرة:",
    p2_spec_grade: "درجة A/B تقفيل كتاب Book-matched",
    spec_finish: "حالة السطح:",
    p2_spec_finish: "صنفرة 240 جاهز للتلميع والصبغة",
    p3_cat: "ساندوتش فائق التحمل",
    p3_overlay_tag: "أعلى مقاومة للتقوس والانحناء للأبواب العالية",
    p3_title: "كونتر ساندوتش إم دي إف (Sandwich)",
    p3_summary: "هيكل مركب من 5 طبقات متناظرة يدمج ألواح الـ MDF الخارجية مع حواجز تقوية متقاطعة حول قلب خشب صلب، مانعاً أي اعوجاج حتى في درف الدواليب التي تتجاوز 2.4 متر.",
    p3_spec_core: "سدائب صنوبر مدمجة عالية المقاومة",
    spec_structure: "البنية التركيبية:",
    p3_spec_struct: "ساندوتش خماسي الطبقات متماثل",
    spec_warp: "مقاومة التقوس:",
    p3_spec_warp: "أقل من 1 مم لكل متر طولي",
    spec_screwhold: "قوة مسك المسمار:",
    veneer_tag: "التشطيبات والملامس",
    veneer_title: "استكشف ملامس القشرة الطبيعية",
    veneer_subtitle: "تُنتج ألواح الكونتر وش القشرة لدينا من أفضل جذوع الأخشاب الطبيعية. اختر الخامة المناسبة لمشروعك لمعاينة ألوانها وخصائصها.",
    calc_tag: "أداة النجار والمهندس",
    calc_title: "حاسبة مسطحات وكميات ألواح الكونتر",
    calc_desc: "سواء كنت تصنع مطبخاً أو دواليب ملابس أو قواطع ديكورية، احسب فورياً عدد ألواح مقاس 1220 × 2440 مم مع حساب هالك السحج والقص، واطلب عرض سعر مباشر عبر واتساب.",
    calc_b1: "مقاس قياسي 1220 × 2440 مم (2.977 م² للوح)",
    calc_b2: "حساب تلقائي للوزن التقديري والحجم",
    calc_b3: "تجهيز تلقائي لرسالة الواتساب للتسعير",
    calc_lbl_product: "اختر نوع الكونتر المطلوب",
    calc_lbl_thick: "سماكة اللوح (التخانة)",
    calc_tab_area: "الحساب بالمساحة الإجمالية (م²)",
    calc_tab_pieces: "الحساب بقطع الموبيليا (سم)",
    calc_lbl_total_area: "إجمالي المساحة الصافية المطلوبة (م²)",
    calc_lbl_part_len: "الطول (سم)",
    calc_lbl_part_wid: "العرض (سم)",
    calc_lbl_qty: "العدد",
    calc_lbl_waste: "نسبة هالك القص والسحج (Kerf)",
    calc_waste_hint: "يُنصح بـ 10% للأعمال المعتادة، و15% للتفاصيل والزوايا الدقيقة.",
    calc_res_sheets: "عدد الألواح المقدر:",
    calc_res_gross_area: "المساحة الإجمالية:",
    calc_res_weight: "الوزن التقريبي:",
    calc_res_volume: "الحجم الإجمالي:",
    calc_btn_wa: "إرسال المقايسة لتسعيرها عبر واتساب",
    comp_tag: "مقارنة فنية مباشرة",
    comp_title: "اختر اللوح المثالي لاحتياجات ورشتك",
    comp_subtitle: "مقارنة هندسية بين الأنواع الثلاثة لتحديد الأنسب لكل عنصر في صناعة الأثاث.",
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
    qual_subtitle: "في صناعة الأثاث، اللوح قوي بقوة قلبه الداخلي. إليك معايير الجودة المطبقة في مستودعات ومصانع الدمياطي:",
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
    contact_desc: "سواء كنت تحتاج رزمة واحدة لورشتك أو كميات جملة للمشاريع والشركات في كافة محافظات مصر، فريق المبيعات جاهز لخدمتك فوراً.",
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
    modal_lbl_thick: "اختر السماكة",
    modal_lbl_qty: "الكمية المطلوبة (لوح)",
    modal_lbl_dest: "مدينة التوصيل أو الورشة",
    modal_btn_wa: "بدء المحادثة على واتساب الآن",
    footer_desc: "الدمياطي للكونتر والأخشاب — عراقة الصناعة الدمياطية وجودة الهندسة الخشبية الحديثة لخدمة النجارين، المقاولين، وشركات الديكور.",
    footer_head_products: "منتجاتنا",
    footer_head_tools: "أدوات ومساعدة",
    footer_link_calc: "حاسبة مسطحات الكونتر",
    footer_link_anatomy: "تشريح بنية اللوح",
    footer_link_specs: "جدول المقارنة الفنية",
    footer_link_contact: "طلبات جملة المستودع",
    footer_head_hours: "مواعيد العمل"
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
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   BILINGUAL SUPPORT (ENGLISH <-> ARABIC)
   ========================================================================== */
function initLanguage() {
  const savedLang = localStorage.getItem('aldomiaty_lang') || 'en';
  setLanguage(savedLang);

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ar' : 'en';
      setLanguage(nextLang);
    });
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('aldomiaty_lang', lang);
  const html = document.documentElement;

  if (lang === 'ar') {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    document.getElementById('langLabel').textContent = 'English';
  } else {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    document.getElementById('langLabel').textContent = 'العربية';
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
    // Remove previous texture classes
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

  if (nameEl) nameEl.textContent = isAr ? data.name_ar : data.name_en;
  if (originEl) originEl.textContent = isAr ? data.origin_ar : data.origin_en;
  if (descEl) descEl.textContent = isAr ? data.desc_ar : data.desc_en;
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
    tabArea.classList.add('active');
    tabPieces.classList.remove('active');
    modeArea.classList.remove('hidden');
    modePieces.classList.add('hidden');
  } else {
    tabPieces.classList.add('active');
    tabArea.classList.remove('active');
    modePieces.classList.remove('hidden');
    modeArea.classList.add('hidden');
  }

  runCalculation();
}

function quickCalculate(productAnchor) {
  const prodSelect = document.getElementById('calcProduct');
  if (!prodSelect) return;

  if (productAnchor === 'mdf-blockboard') {
    prodSelect.selectedIndex = 0;
  } else if (productAnchor === 'ply-veneer') {
    prodSelect.selectedIndex = 1;
  } else if (productAnchor === 'mdf-sandwich') {
    prodSelect.selectedIndex = 2;
  }

  runCalculation();
  const calcSection = document.getElementById('calculator');
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function runCalculation() {
  // 1. Thickness
  const thickRadio = document.querySelector('input[name="boardThick"]:checked');
  const thicknessMm = thickRadio ? parseFloat(thickRadio.value) : 18;

  // 2. Wastage
  const wasteInput = document.getElementById('wastageInput');
  const wasteValEl = document.getElementById('wastageInputVal');
  const wastagePercent = wasteInput ? parseFloat(wasteInput.value) : 10;
  if (wasteValEl) wasteValEl.textContent = wastagePercent + '%';

  // 3. Net Surface Area
  let netAreaM2 = 0;

  if (currentCalcMode === 'area') {
    const areaInput = document.getElementById('areaInput');
    const areaValEl = document.getElementById('areaInputVal');
    netAreaM2 = areaInput ? parseFloat(areaInput.value) : 15;
    if (areaValEl) areaValEl.textContent = netAreaM2 + ' m²';
  } else {
    const pLenCm = parseFloat(document.getElementById('pieceLength').value) || 0;
    const pWidCm = parseFloat(document.getElementById('pieceWidth').value) || 0;
    const pQty = parseInt(document.getElementById('pieceQty').value) || 0;
    // Each piece area in m² = (cm / 100) * (cm / 100)
    netAreaM2 = (pLenCm / 100) * (pWidCm / 100) * pQty;
  }

  // 4. Gross Area with wastage
  const grossAreaM2 = netAreaM2 * (1 + (wastagePercent / 100));

  // 5. Total sheets required (Ceil to whole boards)
  const sheetsNeeded = Math.max(1, Math.ceil(grossAreaM2 / SHEET_AREA_M2));

  // 6. Selected Product Density
  const prodSelect = document.getElementById('calcProduct');
  const selectedOption = prodSelect ? prodSelect.options[prodSelect.selectedIndex] : null;
  const density = selectedOption ? (parseFloat(selectedOption.getAttribute('data-density')) || 670) : 670;

  // 7. Volume and Weight
  // Volume = sheetsNeeded * (1.22 * 2.44 * (thicknessMm / 1000))
  const volumeM3 = sheetsNeeded * (SHEET_AREA_M2 * (thicknessMm / 1000));
  const totalWeightKg = Math.round(volumeM3 * density);

  // 8. Update UI displays
  const isAr = currentLang === 'ar';
  const sheetUnit = isAr ? 'لوح' : 'Sheets';

  const resSheetsEl = document.getElementById('resSheets');
  const resGrossAreaEl = document.getElementById('resGrossArea');
  const resWeightEl = document.getElementById('resWeight');
  const resVolumeEl = document.getElementById('resVolume');

  if (resSheetsEl) resSheetsEl.innerHTML = `${sheetsNeeded} <small>${sheetUnit}</small>`;
  if (resGrossAreaEl) resGrossAreaEl.textContent = `${grossAreaM2.toFixed(2)} m²`;
  if (resWeightEl) resWeightEl.textContent = `~${totalWeightKg} kg`;
  if (resVolumeEl) resVolumeEl.textContent = `${volumeM3.toFixed(2)} m³`;
}

/* ==========================================================================
   WHATSAPP INTEGRATION & QUOTE ACTIONS
   ========================================================================== */
function sendCalculatedQuoteToWhatsApp() {
  const prodSelect = document.getElementById('calcProduct');
  const productName = prodSelect ? prodSelect.options[prodSelect.selectedIndex].text : "Al-Domiaty Counter Wood";
  const thickRadio = document.querySelector('input[name="boardThick"]:checked');
  const thickness = thickRadio ? thickRadio.value + 'mm' : '18mm';
  
  const sheetsEl = document.getElementById('resSheets');
  const sheets = sheetsEl ? sheetsEl.innerText.replace('\n', ' ') : '6 Sheets';
  const grossArea = document.getElementById('resGrossArea').textContent;
  const weight = document.getElementById('resWeight').textContent;

  let message = "";
  if (currentLang === 'ar') {
    message = `السلام عليكم ورحمة الله وبركاته، مؤسسة الدمياطي للكونتر والأخشاب،\nأود الاستفسار وطلب عرض سعر للكمية التالية:\n- المنتج: ${productName}\n- التخانة: ${thickness}\n- عدد الألواح المقدرة: ${sheets}\n- المساحة المحسوبة: ${grossArea}\n- الوزن التقديري: ${weight}\nأرجو إفادتي بالسعر وتوافر الشحن. شكراً جزيلاً!`;
  } else {
    message = `Hello Al-Domiaty Counter & Timber,\nI would like to request an official price quote for:\n- Product: ${productName}\n- Thickness: ${thickness}\n- Estimated Sheets: ${sheets}\n- Total Area: ${grossArea}\n- Estimated Weight: ${weight}\nPlease provide pricing and delivery timeline. Thank you!`;
  }

  const encodedUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}

/* Modal Open & WhatsApp Submission */
let modalTargetProduct = "MDF Blockboard";

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
  const location = document.getElementById('modalLocation').value || "Egypt";

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
  const qty = document.getElementById('inquiryQty').value || "Unspecified";
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
