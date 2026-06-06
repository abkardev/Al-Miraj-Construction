import {
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  FAQItem,
  BlogPostItem,
  MilestoneItem,
  TeamMemberItem,
  CertificateItem,
  Metric
} from './types';

// Let's reference our custom external high-quality assets
export const HERO_IMAGE = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80';
export const STRUCTURE_IMAGE = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';

// Fallback high-contrast dark industrial image for various sections
export const SECONDARY_HERO = 'https://picsum.photos/seed/concrete/1200/800';

export const GLOBAL_TEXTS = {
  en: {
    brand: "AL-MIRAJ",
    brandTitle: "Al-Miraj Construction",
    brandSub: "CONSTRUCTION & CONTRACTING",
    home: "Home",
    about: "About Us",
    services: "Services",
    portfolio: "Portfolio",
    blog: "Insights",
    contact: "Contact Us",
    languageLabel: "العربية",
    learnMore: "Explore Our Work",
    getStarted: "Request Consultation",
    whyChooseUs: "Why Al-Miraj",
    whyChooseUsSub: "Engineered for maximum reliability and structural precision under absolute safety guidelines.",
    statsTitle: "Al-Miraj in Numbers",
    statsSub: "Over three decades of excellence building infrastructure and landmark skylines.",
    ourServices: "Our Specialized Services",
    ourServicesSub: "Providing comprehensive heavy civil, mechanical, and architectural design-build solutions.",
    ourPortfolio: "Elite Portfolio",
    ourPortfolioSub: "A selection of our major residential towers, industrial parks, and national infrastructures.",
    testimonials: "Trusted Partners & Clients",
    testimonialsSub: "What leading global corporations and government agencies say about our professional execution.",
    faq: "Frequently Asked Questions",
    faqSub: "Answering critical inquiries regarding our project management, design phase, and structural audits.",
    blogTitle: "Industrial Insights & News",
    blogSub: "Expert viewpoints on high-end construction materials, modern engineering, and sustainable builds.",
    contactTitle: "Partner With Us",
    contactSub: "Begin your project with premium budgeting and professional consultation from our senior engineers.",
    footerIntro: "A world-class engineering, procurement, and construction conglomerate building iconic masterworks across the region.",
    quickLinks: "Corporate Sections",
    allRightsReserved: "© 2026 Al-Miraj Group. All rights reserved.",
    backToTop: "Scroll to top",
    all: "All Projects",
    villas: "Villas",
    towers: "Towers",
    warehouses: "Warehouses / Industrial",
    roads: "Infrastructure & Roads",
    government: "Government Projects",
    aboutIntro: "For over 30 years, Al-Miraj Construction has been at the forefront of industrial builds and heavy contracting. Modernizing the blueprint of tomorrow.",
    vision: "Our Vision",
    visionDesc: "To be the ultimate benchmark in engineering perfection, creating high-tech, disaster-resilient structural ecosystems worldwide.",
    mission: "Our Mission",
    missionDesc: "Deploy state-of-the-art building science, rigorous safety controls, and sustainable logistics to construct durable structures on time.",
    values: "Core Industrial Values",
    timelineTitle: "The Al-Miraj Evolution",
    timelineSub: "A chronological journey from a local contracting contractor to a multi-billion dollar master builder.",
    teamTitle: "Executive Leadership",
    teamSub: "World-class engineers and veteran project managers driving Al-Miraj's vision of quality.",
    certTitle: "Elite Certifications",
    certSub: "Accredited by international regulatory bodies for construction structural integrity and safety standards.",
    sendMsg: "Submit Quote Request",
    nameLabel: "Full Name",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    companyLabel: "Company / Organization",
    msgLabel: "Describe Project Scope",
    msgPlaceholder: "Specify your building dimensions, plot locations, and project timeline...",
    formSuccess: "Your consultation request has been logged successfully. Our structural engineering lead will speak with you shortly.",
    whatsappBtn: "Direct Engineering Line",
    mapsTitle: "HQ Structural Location",
    mapsSub: "Visit our engineering headquarters for face-to-face draft consultations.",
    overview: "Project Overview",
    challenges: "Technical Challenges",
    solution: "Engineering Solution",
    results: "Final Results",
    client: "Client",
    location: "Location",
    year: "Completion Year",
    area: "Built Area",
    projectVal: "Investment Value",
    searchPlaceholder: "Search projects or articles...",
    readTime: "Read Time",
    relatedArticles: "Related Industrial Knowledge",
    crmDemoTitle: "CRM Submission Log (Developer Mode)",
    crmDemoDesc: "This lead is formatted and ready for Salesforce / Oracle ERP integration.",
    viewCaseStudy: "View Structural Review",
    closeBtn: "Dismiss",
    consultationCall: "Initiate Construction Inquiry"
  },
  ar: {
    brand: "المعراج",
    brandTitle: "مجموعة المعراج للإنشاءات",
    brandSub: "للمقاولات العامة والإنشاءات",
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    portfolio: "المشاريع",
    blog: "مقالات هندسية",
    contact: "اتصل بنا",
    languageLabel: "English",
    learnMore: "استكشف مشاريعنا",
    getStarted: "اطلب استشارة هندسية",
    whyChooseUs: "لماذا تختار المعراج؟",
    whyChooseUsSub: "هندسة فائقة الدقة وموثوقية حديدية تحت إشراف معايير السلامة المطلقة.",
    statsTitle: "المعراج في أرقام",
    statsSub: "أكثر من ثلاثة عقود من التميز في بناء الهياكل وتشييد ناطحات السحاب.",
    ourServices: "خدماتنا المتخصصة",
    ourServicesSub: "نقدم حلولاً متكاملة للهندسة الجيوتقنية والمدنية والكهربائية والميكانيكية والمباني الصناعية.",
    ourPortfolio: "المحفظة النخبوية",
    ourPortfolioSub: "نخبة مختارة من الأبراج السكنية العملاقة والمناطق الصناعية والبنية التحتية الوطنية.",
    testimonials: "شركاء النجاح وعملاؤنا",
    testimonialsSub: "ماذا تقول كبرى المؤسسات والجهات الحكومية عن دقة تنفيذنا وجودتنا العسكرية.",
    faq: "الأسئلة الشائعة والتحقيقات",
    faqSub: "إجابات علمية حول إدارة المشاريع وتخطيط المراحل والتدقيق الإنشائي وتقدير التكلفة.",
    blogTitle: "رؤى وأخبار الهندسة",
    blogSub: "مقالات احترافية حول تكنولوجيا المواد الإنشائية وإدارة سلاسل الإمداد والاستدامة.",
    contactTitle: "شراكة واستشارة",
    contactSub: "ابدأ مشروعك بميزانية احترافية واستشارة متخصصة من كبار المهندسين الإنشائيين لدينا.",
    footerIntro: "مجموعة هندسية عملاقة تعمل في المشتريات والإنشاءات لتشييد معالم مميزة في المنطقة بجودة لا تضاهى.",
    quickLinks: "أقسام الموقع الإدارية",
    allRightsReserved: "© 2026 مجموعة المعراج للإنشاءات. جميع الحقوق محفوظة.",
    backToTop: "الرجوع للأعلى",
    all: "كل المشاريع",
    villas: "فيلات فاخرة",
    towers: "أبراج عالية",
    warehouses: "مستودعات وصناعي",
    roads: "طرق وبنية تحتية",
    government: "مشاريع حكومية",
    aboutIntro: "لأكثر من 30 عامًا، كانت المعراج في طليعة المقاولات الثقيلة والإنشاءات الصناعية المتقدمة. نحن نصنع أساس المستقبل.",
    vision: "رؤيتنا الإستراتيجية",
    visionDesc: "أن نكون المعيار المطلق للكمال الهندسي، وتشييد هياكل ذكية مقاومة للكوارث وصديقة للبيئة في جميع أنحاء العالم.",
    mission: "رسالتنا العملية",
    missionDesc: "تطبيق أدق معايير العلوم الفيزيائية والمواد الإنشائية المتقدمة لتسليم المشاريع بأعلى جودة وضمن المدى الزمني للعميل.",
    values: "قيمنا الأساسية",
    timelineTitle: "مراحل تطور المعراج",
    timelineSub: "رحلة تاريخية ملهمة من مقاول محلي صغير إلى صرح إنشائي يدير مشاريع بمليارات الدولارات.",
    teamTitle: "القيادة التنفيذية",
    teamSub: "نخبة من كبار المهندسين والمديرين التنفيذيين الملتزمين بتحقيق الريادة والجودة الفائقة.",
    certTitle: "شهادات واعتمادات دولية",
    certSub: "اعتمادات مرموقة من هيئات الرقابة والجودة الدولية لسلامة الهياكل وإدارة الجودة والمخرجات.",
    sendMsg: "ارسال طلب الاستشارة والميزانية",
    nameLabel: "الاسم الكامل",
    phoneLabel: "رقم الهاتف",
    emailLabel: "البريد الإلكتروني",
    companyLabel: "الشركة / المؤسسة",
    msgLabel: "شرح نطاق وحجم المشروع",
    msgPlaceholder: "يرجى تحديد الأبعاد والمساحات التقريبية، وموقع الأرض، والجدول الزمني المستهدف...",
    formSuccess: "تم تسجيل طلبك الإنشائي بنجاح. سيقوم أحد كبار المهندسين الإنشائيين بمراجعة طلبك والتواصل معك فوراً.",
    whatsappBtn: "الخط الساخن للمهندس المسؤول",
    mapsTitle: "المقر الرئيسي للإدارة والهندسة",
    mapsSub: "تفضل بزيارة مركزنا للتصميم الإنشائي لمناقشة المسودات الهندسية وجهاً لوجه.",
    overview: "نظرة عامة على المشروع",
    challenges: "التحديات التقنية والجيولوجية",
    solution: "الحل الهندسي المنفذ",
    results: "النتائج والمخرجات النهائية",
    client: "العميل",
    location: "الموقع",
    year: "عام الاكتمال",
    area: "المساحة المبنية",
    projectVal: "القيمة الاستثمارية للمشروع",
    searchPlaceholder: "ابحث عن مشاريع أو مقالات...",
    readTime: "وقت القراءة",
    relatedArticles: "رؤى هندسية ذات صلة",
    crmDemoTitle: "سجل بيانات العملاء CRM (وضع المطور)",
    crmDemoDesc: "هذه البيانات مهيأة بالكامل للتكامل مع أنظمة Salesforce أو Oracle ERP لإدارة المبيعات والمتابعة.",
    viewCaseStudy: "استعراض التحليل الإنشائي",
    closeBtn: "إغلاق النافذة",
    consultationCall: "فتح استفسار إنشائي رسمي"
  }
};

export const STATISTICS: Metric[] = [
  {
    id: "m1",
    value: "140+",
    label: { en: "Completed Landmarks", ar: "منشآت تم تشييدها" },
    description: { en: "High-rise towers, industrial complexes, and national airports.", ar: "أبراج شاهقة ومجمعات صناعية ومطارات إستراتيجية." }
  },
  {
    id: "m2",
    value: "$1.8B",
    label: { en: "Total Project Value", ar: "إجمالي قيمة المشاريع" },
    description: { en: "Active and completed contracts across the Middle East.", ar: "عقود نشطة ومكتملة في جميع أنحاء الشرق الأوسط." }
  },
  {
    id: "m3",
    value: "12,000+",
    label: { en: "Active Specialized Workforce", ar: "القوة العاملة المتخصصة" },
    description: { en: "Skilled structural engineers, safety leads, and site foremen.", ar: "مهندسو هياكل، خبراء سلامة، ومراقبون فنيون." }
  },
  {
    id: "m4",
    value: "0.02%",
    label: { en: "Incident Frequency Rate", ar: "معدل الحوادث الموقعي" },
    description: { en: "Industry-leading OSHA safety compliance across heavy sectors.", ar: "نسبة شبه معدومة بفضل الالتزام بمعايير السلامة المهنية الشاملة." }
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: "wc1",
    title: { en: "BIM 3D Blueprinting", ar: "النمذجة ثلاثية الأبعاد BIM" },
    desc: { en: "We simulate every mechanical, plumbing, and structural gravity calculation inside premium Building Information Modeling systems before breaking ground.", ar: "نقوم بمحاكاة جميع التداخلات وحسابات الجاذبية الإنشائية ميكانيكياً وكهربائياً في مرحلة النمذجة قبل البدء بالصب الخرساني." },
    icon: "Layers"
  },
  {
    id: "wc2",
    title: { en: "Seismic & Disaster Resilient", ar: "مقاومة الزلازل والكوارث" },
    desc: { en: "Every Al-Miraj building goes through structural shear-wall optimization to ensure maximum hazard resistance and building longevity.", ar: "تخضع جميع تصاميمنا وجدران القص لاختبارات واهتزازات معيارية لضمان سلامة الأبراج والمستخدمين في أسوأ الظروف الطبيعية." },
    icon: "ShieldCheck"
  },
  {
    id: "wc3",
    title: { en: "Premium Sourcing & Logistics", ar: "سلاسل إمداد متميزة" },
    desc: { en: "We leverage global direct partnerships with aggregate, specialized high-grade reinforcing steel, and smart eco-concrete suppliers.", ar: "نمتلك شراكات توريد مباشرة للحديد عالي الصلابة، الإسمنت الصديق للبيئة المعالج حرارياً بخلطات ذات جودة استثنائية." },
    icon: "Truck"
  },
  {
    id: "wc4",
    title: { en: "Rigorous OSHA Safety", ar: "السلامة المهنية الصارمة" },
    desc: { en: "Zero-compromise environment with computerized live camera telemetry, crane safety limits, and personal protective compliance enforcement.", ar: "نهج صارم للحفاظ على الأرواح والمعدات، يشمل مراقبة بالكاميرات الذكية وأنظمة حماية السقوط المتقدمة في كل موقع." },
    icon: "HardHat"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "sc1",
    title: { en: "General Contracting", ar: "المقاولات العامة والإنشاءات" },
    shortDesc: { en: "Turnkey execution of grand projects with computerized milestones and full resource scheduling.", ar: "تنفيذ المشاريع الإنشائية الكبرى بنظام تسليم المفتاح مع إدارة زمنية دقيقة وجدولة ذكية للموارد والمعدات." },
    longDesc: {
      en: "From early grading and mobilization to high-finish architectural completions, we assume top-tier financial and technical liability for heavy concrete, smart masonry, and envelope structures.",
      ar: "من مرحلة الحفر والتمهيد اللوجستي وحتى التشطيبات المعمارية الدقيقة للواجهات، نلتزم بالمسؤولية القانونية والفنية الكاملة لصب الخرسانات المسلحة والهياكل المعدنية المعقدة."
    },
    benefits: {
      en: ["Direct supply lines of ready-mix and top-tier reinforcing steel Rebar", "Rigorous critical-path management (CPM) schedule models", "Dedicated qualified resident engineers for quality assurance audits"],
      ar: ["خطوط إمداد مباشر للخرسانة الجاهزة وحديد التسليح عالي المقاومة", "متابعة زمنية حثيثة عبر نماذج المسار الحرج (CPM)", "مهندسو جودة مقيمون دائمون لمطابقة العينات والمواصفات المعيارية"]
    },
    process: [
      { title: { en: "Mobilization & Site Fencing", ar: "التجهيز وسياج الموقع" }, desc: { en: "Preparing the workspace with temporary offices, power sub-stations, and security zones.", ar: "تأمين بيئة العمل بتركيب مكاتب الإشراف، المولدات الكهربائية الفرعية، ونقاط الحراسة والتحكم." } },
      { title: { en: "Heavy Formwork & Shoring", ar: "الشدات المخصصة والتدعيم" }, desc: { en: "Erecting custom steel/timber systems to handle extreme concrete weight loads during casting.", ar: "تشييد الشدات المعدنية الثقيلة لدعم الأكوام والكمرات أثناء تدفق الخرسانة وتصليدها." } },
      { title: { en: "Casting & Hydration Care", ar: "الصب والمعالجة الحرارية" }, desc: { en: "Pouring concrete with specific temperature tracking to achieve intended design strength.", ar: "صب الخلطات الخرسانية بمراقبة حرارية تمنع التصدع والتشقق أثناء مراحل الجفاف." } }
    ],
    iconName: "Hammer",
    duration: { en: "Scalable (9 to 36 months)", ar: "مرن (من 9 إلى 36 شهراً)" },
    industrialStat: { en: "Over 80 major structures successfully completed", ar: "أكثر من 80 هيكلاً رئيسياً تم بناؤه بنجاح" },
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sc2",
    title: { en: "Infrastructure Projects", ar: "مشاريع البنية التحتية والجسور" },
    shortDesc: { en: "Major arterial highways, deep stormwater sewers, and reinforced transport systems.", ar: "شق الطرق الإستراتيجية وتشييد الجسور والأنفاق وشبكات تصريف السيول الضخمة." },
    longDesc: {
      en: "Connecting cities using heavy equipment and high-grade geology analysis. Al-Miraj engineers build massive bridge structures, high-pressure utility pipes, and highly resilient asphalt highways.",
      ar: "ربط الحواضر والمدن الكبرى باستخدام أحدث المعدات ونظام التحليل الجيولوجي للتربة. نحن نبني الجسور الكابلية، شبكات مياه الصرف الصحي والصناعي، وشبكات النقل المعقدة."
    },
    benefits: {
      en: ["Advanced land surveying using precision GPS and electronic telemetry", "Durable materials for extended heavy highway vehicle load friction", "Stormwater containment and underground utility routing experience"],
      ar: ["مسح طوبوغرافي متقدم بمستشعرات تتبع عبر الأقمار الصناعية والنظم الرقمية", "مواد أسفلتية مخصصة لتحمل احتكاك الشاحنات الثقيلة والحرارة العالية", "براعة مشهودة في شق وحفر مسارات الخدمات تحت الأرض وسكك الحديد"]
    },
    process: [
      { title: { en: "Geotechnical Analysis", ar: "التحليل الجيولوجي والتربة" }, desc: { en: "Excavating core samples to ensure stable deep foundations for columns.", ar: "سحب واختبار عينات التربة في أعماق قصوى للتأكد من تحمل الأساسات العميقة للأعمدة." } },
      { title: { en: "Heavy Excavation & Tunneling", ar: "الحفر الثقيل والدمك" }, desc: { en: "Using continuous grade machinery to achieve exact structural slopes.", ar: "استخدام تسوية آلية لضمان الميل الهندسي الدقيق للبنى والمجاري المائية." } },
      { title: { en: "Structural Asphalt Laying", ar: "رصف وصب الهيكل الأسفلتي" }, desc: { en: "Laying multiple density courses for multi-decade life with zero settling.", ar: "دمك طبقات حجرية متدرجة تمنع الهبوط الأرضي لعقود طويلة." } }
    ],
    iconName: "Truck",
    duration: { en: "Scalable (12 to 48 months)", ar: "مرن (من 12 إلى 48 شهراً)" },
    industrialStat: { en: "420 kilometers of highway built to critical metrics", ar: "420 كيلومتراً من الطرق الإستراتيجية تم تسليمها" },
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sc3",
    title: { en: "Commercial Buildings", ar: "المباني والمجمعات التجارية" },
    shortDesc: { en: "Stunning corporate headquarters, premium shopping centers, and financial hubs.", ar: "مقرات مميزة للشركات، مجمعات تجارية كبرى مجهزة تقنياً وفندقياً." },
    longDesc: {
      en: "We focus on premium visual appeal, luxury spacing, smart structural integration, and efficient carbon-neutral HVAC layouts to deliver profitable real estate investments.",
      ar: "نحن نركز على المظهر البصري الفاخر، المساحات المرنة الواسعة، والدمج الذكي للخدمات وأنظمة التكييف والاتصالات الصديقة للبيئة لضمان العوائد الاستثمارية المالية."
    },
    benefits: {
      en: ["Architectural glass curtain wall systems with thermal insulation", "Integrated building management systems (BMS) with computerized control", "Open-span layouts using reinforced post-tensioned concrete slabs"],
      ar: ["جدران ستائر زجاجية فاخرة عازلة للحرارة والضوضاء الخارجية", "أنظمة تحكم رقمية كاملة لإدارة الإنارة والتهوية والأمان الذكي (BMS)", "شرفات ومساحات داخلية شاسعة بالاعتماد على البلاطات مسبقة الإجهاد (Post-Tension)"]
    },
    process: [
      { title: { en: "Frame Design Integration", ar: "هندسة الهياكل البينية" }, desc: { en: "Coordinating core elevator shafts with open premium leasing spans.", ar: "صياغة المقطع الرئيسي لتوزيع المصاعد الرأسية وتوفير مساحات مكتبية متكاملة." } },
      { title: { en: "Curtain Installation", ar: "تثبيت الواجهات الزجاجية" }, desc: { en: "Using spider-fittings and vacuum lifters for pristine architectural glass work.", ar: "تثبيت الزجاج المعزول بتقنيات متقدمة مقاومة لصدامات الأتربة والرياح." } },
      { title: { en: "Interior MEP Integration", ar: "الأعمال الميكانيكية والكهربائية (MEP)" }, desc: { en: "Installing high-efficiency lighting, safety alarms, and automated sprinklers.", ar: "تمديد قنوات تكييف تيار إزاحي وأنظمة إنذار وإطفاء حرائق نشطة تلقائية." } }
    ],
    iconName: "Building2",
    duration: { en: "Scalable (14 to 30 months)", ar: "مرن (من 14 إلى 30 شهراً)" },
    industrialStat: { en: "26 luxury central hubs designed and structuralized", ar: "26 مركزاً تجارياً وإدارياً تم تسليمها بالكامل" },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sc4",
    title: { en: "Residential Construction", ar: "الإنشاءات السكنية والفلل الفاخرة" },
    shortDesc: { en: "Master-planned developer residential communities and premium smart villas.", ar: "مجتمعات سكنية متكاملة وفلل وقصور خاصة تجمع بين الرفاهية والتحمل الإنشائي." },
    longDesc: {
      en: "We bring elite contracting standards to residential sectors. Providing solid, luxury residential spaces that prioritize smart systems, secure acoustic barriers, and beautiful landscaping.",
      ar: "ننقل جودة المقاولات الضخمة إلى القطاع السكني الخاص لضمان بناء قصور وفيلات وعمارات سكنية تتمتع بأعلى مواصفات العزل الصوتي والمعماري."
    },
    benefits: {
      en: ["Premium acoustic insulation between adjacent units for fully quiet spaces", "Integration of clean solar power arrays and localized battery banks", "Imported marble, luxury woodwork, and custom designer materials"],
      ar: ["عوازل صوتية مائية وحرارية مدمجة لخصوصية تامة وهدوء مثالي", "تكامل أنظمة الطاقة الشمسية النظيفة مع بطاريات تخزين ذكية مدمجة", "أعمال الرخام الإيطالي الفاخر وتشطيبات النجارة الراقية المصنعة محلياً"]
    },
    process: [
      { title: { en: "Custom Concept Drafting", ar: "صياغة المساقط الخاصة" }, desc: { en: "Iterating layout blueprints with clients using rendering visualization.", ar: "تعديل المخطط المعماري بما يتطابق تماماً مع تطلعات السكن العائلي الأنيق للعميل." } },
      { title: { en: "Aesthetic Foundations", ar: "الأساسات المعزولة" }, desc: { en: "Double waterproofing concrete pads to entirely avoid subterranean humidity leaks.", ar: "عزل مزدوج للأرضيات يمنع تغلغل الرطوبة الأرضية تماماً لبنية أساسية صلبة." } },
      { title: { en: "Fine Luxury Finish", ar: "التشطيبات المعمارية النخبوية" }, desc: { en: "Handmade custom paint structures, luxury stone tile mapping.", ar: "تطبيق الدهانات الإبداعية المتخصصة ورصف الأحجار النادرة بمهارة يدوية فائقة." } }
    ],
    iconName: "Briefcase",
    duration: { en: "Scalable (8 to 18 months)", ar: "مرن (من 8 إلى 18 شهراً)" },
    industrialStat: { en: "150+ high-end residential units handed over on budget", ar: "أكثر من 150 وحدة سكنية وقصر تم تسليمها بمواصفات متميزة" },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sc5",
    title: { en: "Industrial Projects", ar: "المشاريع الصناعية والمستودعات" },
    shortDesc: { en: "Heavy manufacturing plants, thermal power facilities, and smart logistic parks.", ar: "مصانع ثقيلة، محطات كهرباء متكاملة، ومستودعات تخزين مبردة ذات مساحات حرة." },
    longDesc: {
      en: "Engineering customized to secure massive dynamic machinery loads. We build industrial layouts with long-span steel roofs, heavy epoxy flooring, and custom explosive-resistant venting panels.",
      ar: "هندسة مخصصة لتلقي وصدمات أحمال الآلات الضخمة والديناميكية. نقوم بتشييد المستودعات والهياكل والجمالونات الحديدية الممتدة مع أرضيات إيبوكسي عالية المقاومة للتآكل الكيميائي."
    },
    benefits: {
      en: ["Reinforced floor plates with heavy load bearing characteristics", "Explosion-proof hazardous vapor venting and electrical lines", "Overhead crane runway structural coordination and heavy gantry supports"],
      ar: ["أرضيات خرسانية مسلحة فائقة الكثافة والصلابة لمنع التفتت تحت وطأة الآلات", "تصميم شبكات تهوية مقاومة لشرر الانفجارات وتمديد كابلات مصفحة", "دمج وتثبيت سكك الرافعات الجسرية الضخمة في الأعمدة الحاملة مباشرة"]
    },
    process: [
      { title: { en: "Steel Span Fabrication", ar: "تصنيع الجمالونات المعدنية" }, desc: { en: "Welding pre-designed structural steel columns inside clean shops.", ar: "تصنيع وقص وتجميع الهياكل المعدنية داخل ورش معزولة تحت ظروف ضبط جودة صارمة." } },
      { title: { en: "Epoxy Surface Armor", ar: "أرضيات الإيبوكسي المتخصصة" }, desc: { en: "Applying chemically-resistant coatings capable of resisting machine oil dripping.", ar: "تغطية الخرسانة بطبقات بوليمرية تمنع تسرب الزيوت والكيماويات للأعماق." } },
      { title: { en: "Ventilation Safety Grid", ar: "ممرات الهواء الآمنة" }, desc: { en: "Enabling active high-exchange industrial fans for fully breathable work zones.", ar: "تركيب مراوح سحب صناعية نشطة لضبط توازن الضغط وجودة الهواء للعاملين." } }
    ],
    iconName: "Factory",
    duration: { en: "Scalable (10 to 24 months)", ar: "مرن (من 10 إلى 24 شهراً)" },
    industrialStat: { en: "48 automated manufacturing plants operational today", ar: "48 مصنعاً آلياً ومستودعاً ضخماً قيد التشغيل الفعلي حالياً" },
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sc6",
    title: { en: "Design & Build", ar: "التصميم والتنفيذ المتكامل" },
    shortDesc: { en: "Single-source engineering, architectural draft, and direct physical execution.", ar: "هيئة واحدة تدير التصميم المعماري والمخطط الفني والإنشاء الموقعي لتوفير التكلفة والوقت." },
    longDesc: {
      en: "Combining architecture and general contracting under a single Al-Miraj contract. This completely resolves interface communication delays, reduces budget conflicts, and speeds delivery.",
      ar: "دمج الرؤية المعمارية والمخطط الرياضي الهندسي والعمل الميداني تحت مظلة المعراج فقط. يقلل هذا النموذج من الأخطاء التنسيقية ويحقق وفراً في الميزانية ويسرع تسليم المشاريع."
    },
    benefits: {
      en: ["Fast-tracked engineering drafting directly merged under building schedules", "Lower overall project costs via unified procurement contracts", "Single point of absolute project accountability with zero blame-shifting"],
      ar: ["تسريع وتيرة الرسومات الهندسية وربطها المباشر بجداول المشتريات والمواد", "تقليل تكلفة البناء الإجمالية بأكثر من 15% بفضل التوريد الموحد", "جهة اتصال واحدة مسؤولة بالكامل أمام العميل دون تضارب إداري"]
    },
    process: [
      { title: { en: "Conceptual Visualization", ar: "بلورة المفهوم الفراغي" }, desc: { en: "Developing virtual renderings to detail space optimization.", ar: "توليد النماذج المجسمة والمخططات لفهم توزيع الكتلة والضوء والمداخل." } },
      { title: { en: "Estimating & Prototyping", ar: "التسعير والنمذجة السريعة" }, desc: { en: "Pricing components iteratively to keep final build below targeted budgets.", ar: "حساب التكاليف بشكل تكراري لضمان مواءمة التصميم للميزانية المرصودة تماماً." } },
      { title: { en: "Direct Field Directing", ar: "التنفيذ والقيادة المشتركة" }, desc: { en: "Directly transmitting structural alterations from designers to site machinery.", ar: "إرسال التحديثات الإنشائية من فريق الرسم إلى مهندسي الموقع لاسلكياً لحظة بلحظة." } }
    ],
    iconName: "Award",
    duration: { en: "Scalable (12 to 36 months)", ar: "مرن (من 12 إلى 36 شهراً)" },
    industrialStat: { en: "35 major projects streamlined with faster occupancy timelines", ar: "35 مشروعاً عملاقاً تم تسريع تدشينها بهذا الأسلوب المبتكر" },
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "pr1",
    title: { en: "Al-Miraj Heights", ar: "برج المعراج هايتس السكني" },
    category: "towers",
    client: { en: "EMAAR Properties", ar: "إعمار العقارية" },
    location: { en: "Downtown Dubai, UAE", ar: "وسط مدينة دبي، الإمارات" },
    year: "2025",
    area: { en: "124,000 m²", ar: "124,000 متر مربع" },
    image: HERO_IMAGE,
    overview: {
      en: "A majestic 68-story residential tower reflecting ultra-luxury architecture with high-efficiency wind stabilization and responsive seismic damper foundations.",
      ar: "برج سكني شاهق الارتفاع يبلغ 68 طابقاً، يمثل تحفة معمارية مدمج بها أنظمة تخميد الرياح والزلازل الذكية المتطورة."
    },
    challenge: {
      en: "Casting high-strength self-compacting concrete over 300 meters high while navigating dynamic desert winds requiring micro-second vertical laser monitoring.",
      ar: "صب الخرسانة ذاتية الدمك عالية المقاومة على ارتفاع يتجاوز 300 متر تحت تأثير الرياح الصحراوية القوية، مما تطلب مراقبة مستمرة بأشعة الليزر الجيوديسية."
    },
    solution: {
      en: "Implemented a fully automatic self-climbing hydraulic shutter system, paired with active refrigeration coils in the mix to completely avoid hot-weather settlement cracking.",
      ar: "استخدام نظام الشدات المنزلقة الهيدروليكية ذاتية الارتفاع، مع تبريد الخرسانة بقوالب ثلج صناعية لمنع التصدع الحراري في الأجواء الحارة."
    },
    result: {
      en: "Delivered the tower structural frame 42 days ahead of schedule with 100% compliance in structural load audits.",
      ar: "تسليم الهيكل الخرساني للبرج قبل 42 يوماً من الموعد المحدد مع مطابقة كاملة لاختبارات التحمل الإنشائية ومقاومة الحريق."
    },
    valValue: { en: "$320 Million", ar: "320 مليون دولار" }
  },
  {
    id: "pr2",
    title: { en: "National Heavy Logistics Arena", ar: "مدينة المستودعات اللوجستية الوطنية" },
    category: "warehouses",
    client: { en: "Gulf Industrial Logistics Zone", ar: "منطقة الخليج للمستودعات اللوجستية" },
    location: { en: "Industrial City, Riyadh", ar: "المدينة الصناعية، الرياض" },
    year: "2024",
    area: { en: "85,000 m²", ar: "85,000 متر مربع" },
    image: STRUCTURE_IMAGE,
    overview: {
      en: "A state-of-the-art automated logistics hub containing three massive continuous clear-span steel buildings designed to support heavy automated robot pickers.",
      ar: "مركز لوجستي فائق التطور يحتوي على ثلاثة مبانٍ صناعية حديدية ممتدة وخالية من الأعمدة الداخلية لدعم حركة الرافعات والمعدات الذاتية بالكامل."
    },
    challenge: {
      en: "Designing concrete slab levels with less than 2mm deviation over an expansive 85k square meter footprint inside extreme daily temperature variances.",
      ar: "صب أرضيات خرسانية مستوية بنسبة تفاوت تقل عن 2 مليمتر على مساحة 85 ألف متر مربع تحت تأثير فارق درجات الحرارة القاسي بين الليل والنهار."
    },
    solution: {
      en: "Utilized laser-screed alignment systems with steel fiber reinforcement, avoiding traditional cold expansion joints to prevent forklift wheel vibrations.",
      ar: "استخدام فرشات الليزر لتسوية الأسطح فوراً مع تسليح الخرسانة بألياف الحديد الدقيقة (Steel Fiber) مما ألغى الحاجة للفواصل التقليدية المسببة للاهتزاز."
    },
    result: {
      en: "Completed concrete plates supporting up to 45 tons per square meter with a glossy surface finish for robotic motion.",
      ar: "إنجاز البلاطات الحاملة لأحمال حية وميتة تصل لـ 45 طناً للمتر المربع بلمعان أملس يعزز تشغيل السيرورات الروبوتية."
    },
    valValue: { en: "$115 Million", ar: "115 مليون دولار" }
  },
  {
    id: "pr3",
    title: { en: "Royal Orchid Smart Estate", ar: "ضواحي الأوركيد - السكن العائلي الفاخر" },
    category: "villas",
    client: { en: "Elite Living Properties Group", ar: "مجموعة النخبة العقارية" },
    location: { en: "Ad-Diriyah District, KSA", ar: "منطقة الدرعية، السعودية" },
    year: "2026",
    area: { en: "48,000 m²", ar: "48,000 متر مربع" },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    overview: {
      en: "A high-end private community of 40 ultra-modern, fully integrated smart villas utilizing local natural clay stone, luxury glass facades, and extensive landscape architecture.",
      ar: "ضاحية سكنية خاصة تضم 40 فيلا فائقة الحداثة مدمجة بالذكاء الاصطناعي، يغلب عليها الاستخدام الفني للحجر الطبيعي والواجهات الزجاجية الشاسعة."
    },
    challenge: {
      en: "Preserving historical architectural styling guidelines of Riyadh's heritage district while implementing heavy premium steel skeletons and floor-to-ceiling thermal glass.",
      ar: "الحفاظ على الهوية المعمارية واللوائح التراثية لمنطقة الدرعية مع دمج الهياكل المعدنية الحديثة والواجهات الزجاجية الكبيرة العازلة للحرارة."
    },
    solution: {
      en: "Designed a bespoke composite structural framework using double-walled load-bearing clay brick veneers coupled with internal heavy steel portal frames.",
      ar: "ابتكار هيكل هجين يتكون من جدران خارجية حاملة من الطوب الطيني والخرساني المصنع يدوياً مع هيكل معدني لتوفير حريات فراغية داخلية واسعة."
    },
    result: {
      en: "Created comfortable luxury villas utilizing 40% less electricity due to thermodynamic mass passive cooling properties of the stone walling.",
      ar: "إنجاز فيلات سكنية بمساحات تشطيب نخبوية تحقق توفيراً بنسبة 40% في تبريد الهواء بفضل خصائص الكتلة الحرارية للأحجار الطينية الممتازة."
    },
    valValue: { en: "$180 Million", ar: "180 مليون دولار" }
  },
  {
    id: "pr4",
    title: { en: "The Desert Ring High-Speed Highway", ar: "طريق الحزام الصحراوي السريع" },
    category: "roads",
    client: { en: "Ministry of Transport & Logistics Council", ar: "وزارة النقل والخدمات اللوجستية" },
    location: { en: "Eastern Region Connective Highway", ar: "شريان المنطقة الشرقية السريع" },
    year: "2024",
    area: { en: "180 km Section", ar: "طول 180 كيلومتر" },
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    overview: {
      en: "A landmark multi-lane interstate highway connecting heavy shipping industrial grids through deep sand-dune zones under rugged climatic shifts.",
      ar: "طريق سريع متعدد المسارات يربط المدن والموانئ الصناعية، مصمم لتحمل الحركات الكثيفة لسيارات الشحن والطقس الصحراوي العاصف."
    },
    challenge: {
      en: "Preventing desert sand accumulation and soil settlement over unstable moisture-changing dune structures.",
      ar: "منع تكدس الرمال المتحركة وحماية جسم الطريق من الهياكل الطينية والمائية غير المستقرة في عمق رمال الربع الخالي."
    },
    solution: {
      en: "Implemented soil stabilization with heavy geotextiles and chemical polymer binders, with custom wind-deflecting side barriers that push sand particles off the asphalt lanes.",
      ar: "تعديل خصائص التربة وحشوها بطبقات الجيوتكستايل المانع للانزلاق، وتشييد حواجز صد ديناميكية تحرف مسارات الرياح والرمال بعيداً عن الأسفلت."
    },
    result: {
      en: "A smooth interstate highway with high safety indexes, holding heavy traffic load with near-zero degradation.",
      ar: "طريق دولي آمن وسريع تتدفق عبره البضائع والمعدات بدون أي تفتت أو معوقات موقعية، وحصل على جائزة أفضل بنية تحتية وطنية."
    },
    valValue: { en: "$270 Million", ar: "270 مليون دولار" }
  },
  {
    id: "pr5",
    title: { en: "The Federal Security Center", ar: "مجمع المراكز الأمنية الإستراتيجي" },
    category: "government",
    client: { en: "National Security & Authority Bureau", ar: "الهيئة الوطنية للسلامة والأمن العام" },
    location: { en: "Capital Administrative Area", ar: "العاصمة الإدارية الجديدة" },
    year: "2025",
    area: { en: "95,000 m²", ar: "95,000 متر مربع" },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    overview: {
      en: "A robust structural fortress building incorporating blast-resistant reinforced architectural panels, secure energy redundancies, and dynamic data defense spaces.",
      ar: "مجمع أمني إستراتيجي محمي بكتل خرسانية مسلحة فائقة الكثافة والصلابة تم إخضاعها لاختبارات مقاومة الموجات الارتدادية والانفجارات."
    },
    challenge: {
      en: "Strict material secrecy protocols, high defense specifications, and complex structural coordination with multiple secure backup utilities.",
      ar: "بروتوكولات الأمان والسرية الصارمة للموقع والمخططات، والمواصفات الدفاعية الدقيقة لتركيب المولدات ومخازن الوقود البديلة تحت الأرض."
    },
    solution: {
      en: "Created a heavy double-layered core capsule using high-density concrete with military shielding, implementing multi-grid secure server halls with passive air cooling.",
      ar: "بناء قبو مركب ثنائي الطبقات من الخرسانة المصفحة الكثيفة مع عزل مغناطيسي كامل، وغرف تحكم طاقة هواء سلبية مستمرة."
    },
    result: {
      en: "Delivered of one of the safest administrative installations in the region, operating with zero power downtime capability.",
      ar: "تسليم أحد أكثر المقرات الحكومية أمناً واستقراراً بنظام طاقة لا ينقطع نهائياً ومصنف ضمن أعلى تقييمات الحماية المعمارية."
    },
    valValue: { en: "$410 Million", ar: "410 مليون دولار" }
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: { en: "Eng. Tareq Al-Subai", ar: "المهندس طارق السبيعي" },
    role: { en: "Director of Infrastructure Delivery", ar: "مدير مشاريع البنية التحتية" },
    company: { en: "Ministry of Transport Projects", ar: "وزارة الإسكان والنقل" },
    content: {
      en: "Al-Miraj Group demonstrated military-grade discipline. They deployed over 400 pieces of heavy equipment onto our highway project and managed to hand over the road layout entirely ahead of schedule, with zero accidents or safety incidents logged.",
      ar: "أبدت مجموعة المعراج التزاماً حديدياً وانضباطاً منقطع النظير. قاموا بحشد أكثر من 400 معدة ثقيلة في مشروع الطريق الصحراوي ونجحوا في تسليمه قبل المخطط الزمني مع الالتزام التام بسلامة جميع العاملين."
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t2",
    name: { en: "Sarah Van De Berg", ar: "سارة فان دي بيرغ" },
    role: { en: "Chief Investment Officer", ar: "رئيسة الاستثمار العقاري" },
    company: { en: "Vortex Property Capital Partners", ar: "مجموعة فورتكس للاستثمار والتمويل" },
    content: {
      en: "Their construction coordination and beautiful finish exceeded all of our previous developer relationships. Al-Miraj's BIM systems gave us perfect cost transparency, saving us over $14M in early fabrication rework.",
      ar: "كانت معايير البناء والتشطيب التي ق قدمتها المعراج تفوق كل تجاربنا التطويرية السابقة. ساهمت أنظمة BIM الرقمية الخاصة بهم في منحنا شفافية تامة بالتكاليف ووفرت علينا ملايين التكاليف الضائعة."
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t3",
    name: { en: "Eng. Abdulrahman Al-Fara", ar: "المهندس عبد الرحمن الفرا" },
    role: { en: "Chief Structural Auditor", ar: "كبير المفتشين الإنشائيين والخرسانة" },
    company: { en: "National Engineering Authority Council", ar: "الهيئة العليا للمدن السكنية" },
    content: {
      en: "Their concrete hydration tracking science is exemplary. In concrete casting, density consistency determines everything; Al-Miraj manages structural pouring like a high-tech science laboratory.",
      ar: "طريقتهم في التحكم الإنشائي واختبارات الضغط الخرسانية نموذج يحتذى به. المعراج تتعامل مع تشييد الأساسات علمياً كما لو أنها مختبر عالي الدقة، وتستحق الثقة في كافة المشاريع الحيوية."
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: { en: "What is Al-Miraj's approach to cost estimates and critical-path scheduling?", ar: "كيف تتعامل المعراج مع مسألتي تقدير التكاليف ومخططات المسار الحرج؟" },
    answer: {
      en: "We generate comprehensive, bottom-up cost calculations using actual subcontractor supply rates. For our delivery timeline, we employ critical-path project management models tracking thousands of interlinked tasks weekly, which completely eliminates structural delays.",
      ar: "نقوم بصياغة تقديرات أسعار تفصيلية شفافة بناءً على الأسعار الفعلية المحدثة للمواد والعمالة وثقيل النقل. نعتمد على محاكاة المسارات الحرجة أسبوعياً لتوقع أي تلميح للتأخير في سلاسل الإمداد وتلافي المشاكل الإدارية مسبقاً."
    }
  },
  {
    id: "faq2",
    question: { en: "How does the single-source Design & Build framework contract function?", ar: "كيف يعمل عقد التصميم والتنفيذ المتكامل أحادي المصدر؟" },
    answer: {
      en: "Under our Design & Build framework, our architects and engineers work within the same office as our concrete casting leads and structural builders. This means the layout drawings are 100% buildable, budget limits are set in stone from day one, and clients have exactly one point of direct physical accountability.",
      ar: "في هذا الإطار، يعمل المصممون المعماريون والمهندسون الإنشائيون والمهنيون الموقعيون في مجمع واحد وتحت إدارة موحدة. هذا يضمن أن جميع المخططات والمساقط قابلة للتنفيذ بنسبة 100% دون تضارب إداري لتسليم مدروس بأقل تكلفة."
    }
  },
  {
    id: "faq3",
    question: { en: "What are your guidelines for heavy cement safety and environment protection?", ar: "ما هي المبادئ والأدلة المتبعة لديكم لسلامة الإسمنت الثقيل وحماية البيئة؟" },
    answer: {
      en: "We are strictly compliant with international ISO 14001, utilizing eco-concrete aggregates where structurally viable. We employ computerized water recapture tanks in our concrete wash divisions, preventing alkaline spills from reaching native water tables, and monitor soil compaction carefully.",
      ar: "نحن ملتزمون تماماً بمعايير الآيزو 14001 البيئية. نستخدم خلطات خرسانية مجهزة بمواد مضافة تقلل الانبعاثات الكربونية بنسبة تقارب 40%، ونمتلك فلاتر تصفية وفصل مياه الغسيل لمنع تسرب قلويات الإسمنت للمياه الجوفية المحيطة."
    }
  },
  {
    id: "faq4",
    question: { en: "Are the structural plans prepared by Al-Miraj fully certified for government projects?", ar: "هل المخططات المعمارية والإنشائية التي تعدها المعراج معتمدة للمشاريع الفيدرالية والحكومية؟" },
    answer: {
      en: "Yes. All engineering calculations, seismic vibration layouts, hydraulic pipelines, and foundation structural designs bear stamp validations signed by licensed senior consultants fully accredited for national defense, high-rise, and government transport projects.",
      ar: "بكل تأكيد. جميع رسومات المقاطع الفنية والجيولوجية والكهروأوتوماتيكية تحمل أختام المصادقة القانونية الموقعة من كبار المستشارين الحاصلين على تراخيص الهيئات الوطنية والبلدية ومجلس المهندسين لإلقاء الثقة القانونية التامة."
    }
  }
];

export const BLOGS: BlogPostItem[] = [
  {
    id: "b1",
    title: { en: "Optimizing High-Rise Wind Stabilization in Desert Climates", ar: "تحسين ثبات الأبراج الشاهقة ضد قوى الرياح في المناخات الصحراوية" },
    excerpt: { en: "How modern high-performance concrete damping systems and aerodynamic building geometries mitigate violent crosswind vibrations.", ar: "كيف تساعد كتل التخميد الخرسانية والفتحات الديناميكية للواجهات في تشتيت قوى الرياح العنيفة في المباني الشاهقة." },
    content: {
      en: "In structures rising above 250 meters, solar thermal differentials and high desert velocity currents create massive shear challenges. This insight details our recent structural installation of localized outrigger trusses, showing how our engineering division integrated a 400-ton tuned sloshing water damper on key high floors to offset horizontal wave motion by 38%...",
      ar: "في الأبراج التي ترتفع لأكثر من 250 متراً فوق مسار الرياح، يخلق الفارق الحراري وحركات الهواء قوى ضغط هائلة تحاول زحزحة كتلة البناء. يستعرض هذا المقال الهندسي استخدامنا لأحدث الكوابل والجمالونات المتصلة بالأعمدة الطوقية وأفضل كوابح المياه المائعة النشطة لتقليل الاهتزازات الأفقية بنسبة 38%..."
    },
    category: { en: "Structural Science", ar: "علم الهياكل" },
    author: { en: "Dr. Khaled Al-Masri, Chief Structural Lead", ar: "د. خالد المصري، رئيس التصميم الإنشائي" },
    date: "2026-05-12",
    readTime: { en: "8 min read", ar: "قراءة في 8 دقائق" },
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "b2",
    title: { en: "The Evolution of Carbon-Negative Eco-Concrete", ar: "تطور الخرسانة الصديقة للبيئة والذكية" },
    excerpt: { en: "Incorporating slag and pozzolan minerals to reduce total manufacturing emissions while boosting compressive strength indexes.", ar: "استخدام غبار السيليكا وخبث الأفران المعدنية لتقليل الانبعاثات الكربونية وزيادة معامل الضغط ومقاومة الأملاح الكبريتية." },
    content: {
      en: "Traditional portland cement is a primary contributor to global CO2. By utilizing high-volume slag and volcanic ash additives, Al-Miraj chemical engineers have optimized customized concrete mixes that cure slower but showcase a final 28-day compression strength of 85MPa. These structures offer extreme resistance against acidic chemical spills and sulfur absorption...",
      ar: "يعتبر الإسمنت التقليدي أحد المصادر الأساسية لانبعاثات الكربون عالمياً. عبر دمج خبث المعادن والرماد البركاني والسيليكا، نجح كيميائيو المعراج في صياغة خلطات ذكية ذات سعة علاجية ذاتية تسجل قوة ضغط قصوى تصل إلى 85 ميجا باسكال وتتمتع بصلادة كبريتية عظمى..."
    },
    category: { en: "Material Technologies", ar: "تكنولوجيا المواد" },
    author: { en: "Eng. Robert Cole, Senior Material Specialist", ar: "المهندس روبرت كول، كبير أخصائيي المواد" },
    date: "2026-04-28",
    readTime: { en: "6 min read", ar: "قراءة في 6 دقائق" },
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "b3",
    title: { en: "Building Information Modeling (BIM) Level 3 Implementation", ar: "تطبيق المستوى الثالث من نمذجة معلومات البناء BIM" },
    excerpt: { en: "How live cloud databases solve MEP structural clashes and optimize global supply chains during complex construction works.", ar: "كيف تساهم قواعد البيانات السحابية الحية في حل التداخلات بين التمديدات الكهربائية والهيكل والتسليح، وتوفير الملايين." },
    content: {
      en: "When thousands of structural drawings are isolated, physical building delays of up to 18% occur due to layout adjustments at site. Level 3 BIM resolves this by integrating structural steel, concrete cores, electrical pipelines, and chilled ventilation tubes into a synchronized 3D coordinate system. This article reviews how our cloud planning resolved over 1,500 site clashes...",
      ar: "عند تشتت المخططات بين الميكانيك والخرسانة، ترتفع احتمالية الأخطاء الموقع مسببة هدر الوقت والمواد. هنا يأتي دور نظام النمذجة السحابي الموحد لربط تفاصيل التسليح وفتحات الهواء والكابلات في بيئة محاكاة واحدة. نستكشف كيف تلافينا 1,500 خطأ تداخلي قبل وصول العمال للميدان..."
    },
    category: { en: "Digital Engineering", ar: "الهندسة الرقمية" },
    author: { en: "Safouan Al-Homsi, BIM Director", ar: "صفوان الحمصي، مدير إدارة النمذجة الرقمية" },
    date: "2026-04-05",
    readTime: { en: "11 min read", ar: "قراءة في 11 دقيقة" },
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  }
];

export const MILESTONES: MilestoneItem[] = [
  {
    year: "1996",
    title: { en: "Foundations in Contracting", ar: "التأسيس والانطلاقة الأولى" },
    description: { en: "Al-Miraj was registered as a specialized concrete pouring subcontractor in Riyadh.", ar: "تأسيس شركة معمارية صغيرة لصب وعزل القواعد والخلطات الخرسانية في مدينة الرياض." }
  },
  {
    year: "2005",
    title: { en: "Expanding to Public Infrastructure", ar: "دخول البنية التحتية والمشروعات الكبرى" },
    description: { en: "Secured our first national arterial bridge and interstate stormwater canal contracts.", ar: "الفوز بالعديد من عقود الجسور والقنوات الوطنية لتصريف السيول ومياه الأمطار." }
  },
  {
    year: "2012",
    title: { en: "International BIM Innovation", ar: "التكامل الرقمي وحلول BIM" },
    description: { en: "Adopted comprehensive 3D computerized BIM models in our drafting workflow, drastically cutting site rework.", ar: "الاعتماد الكامل على نمذجة البناء ثلاثية الأبعاد ودمج خدمات الإلكتروميكانيك رقمياً." }
  },
  {
    year: "2019",
    title: { en: "Iconic Skyscrapers Era", ar: "عصر ناطحات السحاب المرتفعة" },
    description: { en: "Successfully delivered our first 50-story commercial tower landmark under budgets.", ar: "إنجاز أول برج شاهق تجاوز 50 طابقاً بشكل مستقل وتسليمه بمواصفات جودة معمارية نخبوية." }
  },
  {
    year: "2026",
    title: { en: "The Billion-Dollar Multi-Sector Guild", ar: "الريادة المجمعة بمليارات الدولارات" },
    description: { en: "Employing over 12,000 workers across heavy energy, residential, and corporate developments.", ar: "المعراج اليوم تقود وتدير مشاريع كبرى في مجالات الاستدامة وناطحات السحاب تضم آلاف الكفاءات." }
  }
];

export const TEAM: TeamMemberItem[] = [
  {
    name: { en: "Eng. Salim Al-Miraj", ar: "المهندس سليم المعراج" },
    role: { en: "Chairman & Founder", ar: "رئيس مجلس الإدارة والمؤسس" },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: { en: "Vanguard structural specialist with over 40 years of direct physical building execution across the Middle East.", ar: "رائد في أعمال الهندسة الإنشائية يمتلك أكثر من 40 عاماً من المساهمة الفعلية في تشييد معالم المنطقة." }
  },
  {
    name: { en: "Eng. Layla Al-Omran", ar: "المهندسة ليلى العمران" },
    role: { en: "Chief Executive Officer (CEO)", ar: "الرئيس التنفيذي للمجموعة" },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    bio: { en: "Prominent construction leader specialized in high-rise structural systems and international asset logistics.", ar: "قائدة ملهمة متخصصة في سلاسل إمداد مواد البناء وتشليذ الهياكل المعقدة وإدارة الأصول والتكاليف." }
  },
  {
    name: { en: "Dr. Adel Al-Ghamdi", ar: "الدكتور عادل الغامدي" },
    role: { en: "Director of Structural Audits", ar: "مدير الهيئة الفنية والجودة" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: { en: "Academic structural engineer and concrete curing science expert who has audited over 110 sky towers.", ar: "أكاديمي وباحث إنشائي سابق أشرف شخصياً على التدقيق الهيكلي لأكثر من 110 برجا ونفقا مائيا." }
  }
];

export const CERTIFICATIONS: CertificateItem[] = [
  { id: "c1", title: { en: "ISO 9001:2015 Quality Management", ar: "آيزو 9001 لنظم إدارة الجودة" }, issuer: { en: "Lloyd's Register Quality Assurance", ar: "لويدز ريجستر الدولية لضمان الجودة" }, year: "2025" },
  { id: "c2", title: { en: "ISO 45001:2018 Occupational Health", ar: "آيزو 45001 للصحة والسلامة المهنية" }, issuer: { en: "British Standards Institution (BSI)", ar: "المعهد البريطاني للمواصفات المعمارية" }, year: "2024" },
  { id: "c3", title: { en: "ISO 14001:2015 Environmental System", ar: "آيزو 14001 لنظم حماية البيئة" }, issuer: { en: "SGS International Certification", ar: "إس جي إس العالمية للتدقيق والمطابقة" }, year: "2025" }
];
