import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Award, CheckCircle2, ChevronRight, Activity, ArrowUpRight, Check, Play, Circle, Landmark, Grid } from 'lucide-react';

interface Phase {
  title: { en: string; ar: string };
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
  tasks: { en: string[]; ar: string[] };
  description: { en: string; ar: string };
}

interface ProjectTimelineData {
  projectId: string;
  projectName: { en: string; ar: string };
  duration: { en: string; ar: string };
  currentMilestone: { en: string; ar: string };
  estimatedCompletion: { en: string; ar: string };
  progressPercent: number;
  phases: Phase[];
}

const TIMELINE_DATA: ProjectTimelineData[] = [
  {
    projectId: "pr1",
    projectName: { en: "Al-Miraj Heights", ar: "برج المعراج هايتس السكني" },
    duration: { en: "36 Months", ar: "36 شهراً" },
    currentMilestone: { en: "Superstructure pouring complete; MEP insulation active", ar: "اكتمال صب الهيكل الفوقي بالتوازي مع تمديد عزل الأنظمة الميكانيكية والكهربائية" },
    estimatedCompletion: { en: "Dec 2026", ar: "ديسمبر 2026" },
    progressPercent: 75,
    phases: [
      {
        title: { en: "Geotechnical & Excavation", ar: "الجيوتقنية والحفر" },
        status: "completed",
        date: "Q2 2024",
        description: {
          en: "Soil core drills to 40m depth, shoring wall completion, and installation of dual bentonite slurry curtains.",
          ar: "حفر عينات التربة لعمق 40 متراً، واستكمال جدار الدعم وتدشين ستائر البنتونيت المزدوجة المانعة للتسرب الجوفي."
        },
        tasks: {
          en: ["Deep soil drill audits", "Secant shoring wall installation", "Slurry curtain sealing"],
          ar: ["فحص عينات التربة العميقة", "تركيب جدران التدعيم المتقاطعة", "حقن ستائر الطين العازلة"]
        }
      },
      {
        title: { en: "Foundations & Raft Raft", ar: "الأساسات واللبشة الخرسانية" },
        status: "completed",
        date: "Q4 2024",
        description: {
          en: "Continuous pour of 24,000 m³ premium concrete raft, reinforced with custom high-density tension anchors.",
          ar: "الصب المستمر لـ 24,000 متر مكعب من الخرسانة المتطورة للّبشة الحاملة المسلحة بقضبان الشد الكثيفة."
        },
        tasks: {
          en: ["Continuous raft pour", "High-density tension anchors", "Concrete curing temperature logs"],
          ar: ["صب اللبشة الخرسانية المستمر", "زرع مراسي الشد عالية الكثافة", "تسجيل تطور حرارة التصلد"]
        }
      },
      {
        title: { en: "Superstructure & Seismic Framing", ar: "الهيكل والتدعيم الزلزالي" },
        status: "completed",
        date: "Q3 2025",
        description: {
          en: "Erection of 68 floors using custom hydraulic self-climbing shutter system and localized outrigger trusses.",
          ar: "تشييد 68 طابقاً بنظام الشدات الهيدروليكية ذاتية الارتفاع وتركيب دعائم الاتزان الطرفية والزلزالية."
        },
        tasks: {
          en: ["Hydraulic self-climbing shutter setups", "Outrigger structural trusses", "Micro-second laser plumb alignment"],
          ar: ["تجهيز الشدات الهيدروليكية ذاتية الارتفاع", "تركيب العوارض الإنشائية الموزعة", "ضبط الرأسية بالليزر الدقيق"]
        }
      },
      {
        title: { en: "MEP & Smart Building Systems", ar: "الأنظمة الإلكتروميكانيكية والذكية" },
        status: "in-progress",
        date: "Ongoing",
        description: {
          en: "Integration of smart climate controls, district dual loop HVAC refrigeration lines, and primary fiber lines.",
          ar: "تمديد أنظمة التحكم المناخي الذكية، وقنوات تبريد الهواء عبر شبكة مركزية مزدوجة مع ألياف الاتصال الرئيسية."
        },
        tasks: {
          en: ["District cooling chilled lines", "Building management automation", "Electrical redundant riser logs"],
          ar: ["تمديد قنوات مياه التبريد المركزية", "أتمتة إدارة خدمات المبنى", "رفع دوائر توزيع الكهرباء الاحتياطية"]
        }
      },
      {
        title: { en: "Testing, Commissioning & Handover", ar: "التشغيل التجريبي والتسليم النهائي" },
        status: "upcoming",
        date: "Q4 2026",
        description: {
          en: "Dual structural load-bearing checks, civil defense approvals, and smart systems integrity clearances.",
          ar: "فحوصات استقرار الأحمال الهيكلية المستمرة، موافقات الدفاع المدني، وتشغيل أنظمة الإنقاذ والسلامة الفائقة."
        },
        tasks: {
          en: ["Dual mechanical dynamic load tests", "Civil defense certification audits", "Client keys handover protocol"],
          ar: ["اختبار الأحمال الديناميكية والميكانيكية", "تدقيق الدفاع المدني والحماية من الحريق", "بروتوكول تسليم مفاتيح المالك"]
        }
      }
    ]
  },
  {
    projectId: "pr2",
    projectName: { en: "National Heavy Logistics Arena", ar: "مدينة المستودعات اللوجستية الوطنية" },
    duration: { en: "18 Months", ar: "18 شهراً" },
    currentMilestone: { en: "Steel frame installation finalized; laser screed flooring underway", ar: "الانتهاء من صب الهيكل الحديدي والبدء في أعمال الأرضيات بالغة الاستواء بفرشات الليزر" },
    estimatedCompletion: { en: "Oct 2026", ar: "أكتوبر 2026" },
    progressPercent: 60,
    phases: [
      {
        title: { en: "Geotechnical Survey & Soil Density", ar: "الجيوتقنية وكثافة التربة" },
        status: "completed",
        date: "Q1 2025",
        description: {
          en: "Compaction of sandy-clay soils to 98% dry density to eliminate movement for robotic picker lanes.",
          ar: "دمك وتثبيت التربة الرملية الصلصالية وصولاً لكثافة جافة %98 لمنع أي هبوط يؤثر على مسارات الروبوتات الذكية."
        },
        tasks: {
          en: ["98% dry compaction audits", "Soil polymer binding sprays", "Geotextile layout mapping"],
          ar: ["فحص كثافة الدمك الجاف %98", "رش البوليمر المثبت للتربة", "وضع مخططات طبقات الجيوتكستايل"]
        }
      },
      {
        title: { en: "Foundation Anchoring", ar: "تثبيت الأساسات والركائز" },
        status: "completed",
        date: "Q2 2025",
        description: {
          en: "Drilling and casting high-load grade beam lines with micro-pile inserts for the column footprints.",
          ar: "حفر وصب خطوط الميدات الحاملة للأحمال الضخمة مع تركيب الركائز مسبقة الصنع بقواعد الأعمدة الرئيسية."
        },
        tasks: {
          en: ["Grade beam excavation", "Micro-pile anchors installation", "High-sulfate cement formulation"],
          ar: ["حفر خنادق الميدات الأرضية", "زرع خزانات الخوازيق الصغيرة", "خلط أسمنت مقاوم للكبريتات"]
        }
      },
      {
        title: { en: "Heavy Steel Portal Framing", ar: "تشييد الهيكل الفولاذي الممتد" },
        status: "completed",
        date: "Q4 2025",
        description: {
          en: "Lifting and bolting 100-meter continuous clear-span steel arched trusses utilizing heavy duty 500-ton crawler cranes.",
          ar: "رفع وتثبيت جمالونات الصلب بطول 100 متر خالية من الأعمدة باستخدام رافعات مجنزرة عملاقة حمولة 500 طن."
        },
        tasks: {
          en: ["Truss section welding & ultrasound", "500T crane tandem lifts", "Structural steel torque checks"],
          ar: ["لحام وتخطيط الجمالونات بالموجات فوق الصوتية", "رفع متزامن برافعة 500 طن", "قياس عزم مسامير الصلب الإنشائي"]
        }
      },
      {
        title: { en: "High-Precision Floor Slabs", ar: "بلاطات الأرضيات فائقة الدقة" },
        status: "in-progress",
        date: "Active",
        description: {
          en: "Pouring monolithic slabs utilizing advanced laser-screed machinery and fiber metallic additives for flatness.",
          ar: "صب بلاطات أرضية خرسانية مستمرة كقطعة واحدة بواسطة فرشات الليزر والألياف المعدنية لمنع التعرجات الفواصل."
        },
        tasks: {
          en: ["Laser screed flat alignment (<2mm deviation)", "Steel fiber integration mix", "Anti-dust glossy sealer spray"],
          ar: ["ضبط مستوى الليزر الدقيق (تفاوت < 2 مم)", "خلط الألياف الفولاذية بالخرسانة", "رش طبقة لمعان أرضيات مانعة للأتربة"]
        }
      },
      {
        title: { en: "MEP & Fire Protection Launch", ar: "خدمات الطوارئ والحماية والإلكتروميكانيك" },
        status: "upcoming",
        date: "Q3 2026",
        description: {
          en: "Installation of automatic giant mist sprinkler arrays and continuous multi-zone smoke evacuation systems.",
          ar: "تركيب شبكات الرش الرذاذي العملاقة الآلية للوقاية من الحريق وأنظمة سحب وقذف الدخان متعددة النطاقات."
        },
        tasks: {
          en: ["Automatic mist nozzle installation", "Multi-zone exhaust fans test", "Integrated solar grid launch"],
          ar: ["تركيب فوهات الضباب المائي التلقائي", "اختبار مراوح سحب الدخان", "توصيل شبكة الطاقة الشمسية المتكاملة"]
        }
      }
    ]
  },
  {
    projectId: "pr3",
    projectName: { en: "Royal Orchid Smart Estate", ar: "ضواحي الأوركيد - السكن العائلي الفاخر" },
    duration: { en: "24 Months", ar: "24 شهراً" },
    currentMilestone: { en: "Smart home infrastructure & structural masonry nearing completion", ar: "البنية التحتية للمنازل الذكية والواجهات المعمارية الحجرية تقترب من الاكتمال" },
    estimatedCompletion: { en: "Feb 2027", ar: "فبراير 2027" },
    progressPercent: 50,
    phases: [
      {
        title: { en: "Site Grading & Geoplastics", ar: "تسوية الموقع والتشكيل البيئي" },
        status: "completed",
        date: "Q3 2025",
        description: {
          en: "Levelling 48,000 square meters of hillside landscape, configuring passive soil retaining systems with stone walls.",
          ar: "تسوية 48,000 متر مربع من المرتفعات الطبيعية وتدشين جدران الحجر الطيني الطبيعي لحمل الكتل الطبوغرافية."
        },
        tasks: {
          en: ["Slope grading & volumetric balancing", "Natural stone retaining walls", "Deep site drainage channels"],
          ar: ["تسوية المنحدرات وموازنة مكعبات الحفر", "بناء مصدات صخرية تراثية", "شق قنوات تصريف المياه العميقة"]
        }
      },
      {
        title: { en: "Underground Infrastructure", ar: "البنية التحتية والشبكات الجوفية" },
        status: "completed",
        date: "Q4 2025",
        description: {
          en: "Deep trenching for main fiber optics, centralized smart water loops, and closed-circuit greywater treatment integration.",
          ar: "حفر ممرات كابلات الألياف الضوئية وأنظمة التحكم بالمياه المعالجة وتدوير مياه الري والحدائق."
        },
        tasks: {
          en: ["Smart pressurized water loops", "Composite fiber fiber sleeves", "Greywater mini-plant filtration tanks"],
          ar: ["شبكة أنابيب المياه الذكية المضغوطة", "تركيب قنوات الألياف البلاستيكية", "وحدات ترشيح ومعالجة المياه الرمادية"]
        }
      },
      {
        title: { en: "Stone Face Masonry & Portal Shell", ar: "البناء الحجري التراثي والهياكل المركبة" },
        status: "in-progress",
        date: "Active",
        description: {
          en: "Artisanal dry-cladding of local Riyadh sandstone coupled with premium steel structural frames inside core walls.",
          ar: "كسوة حجر الرياض الحبيبي المصنع يدوياً بالصيغة التراثية بالتوازي مع هياكل الحديد الحاملة لقوة الفراغ الداخلي."
        },
        tasks: {
          en: ["Sandstone cladding anchoring system", "Double internal thermal masonry", "Structural steel column alignment"],
          ar: ["تركيب زوايا تثبيت واجهات الحجر", "بناء الجدران المعزولة داخلياً", "محاذاة أعمدة الصلب الهيكلي"]
        }
      },
      {
        title: { en: "MEP & Low-Voltage IoT", ar: "الكهرباء والتيار المنخفض والذكاء الذاتي" },
        status: "upcoming",
        date: "Q4 2026",
        description: {
          en: "Installation of multi-zone thermal dual-pane glazing and low-voltage pipelines for automated home monitoring.",
          ar: "تركيب الواجهات الزجاجية المزدوجة العازلة والشبكة منخفضة الجهد للأنظمة الصوتية والتحكم بالطاقة والإضاءة."
        },
        tasks: {
          en: ["Double-glazed low-E thermal panels", "Low-voltage automation center", "Localized battery backup nodes"],
          ar: ["تركيب زجاج منخفض الانبعاث العازل", "لوحات التحكم المنخفض الجهد الذكي", "عقد بطاريات تخزين الطاقة الجزئية"]
        }
      },
      {
        title: { en: "Handover & Eco-Rating Verification", ar: "التدشين وتقييم الاستدامة والتسليم" },
        status: "upcoming",
        date: "Q1 2027",
        description: {
          en: "Green building authority verification, solar rooftop connections, and private keys cataloging.",
          ar: "استصدار شهادات الاستدامة والأبنية الخضراء، وتوصيل خلايا الطاقة بالشبكة وأرشفة الكودات البرمجية للموقع."
        },
        tasks: {
          en: ["Mostadam national building audits", "Rooftop solar solar system grid test", "Smart HVAC tuning logs"],
          ar: ["تدقيق معايير نظام مستدام الوطني للأبنية الخضراء", "تشغيل الخلايا الشمسية لأسطح الفلل", "تنسيق موازنة ضغوط الهواء والتكييف"]
        }
      }
    ]
  },
  {
    projectId: "pr4",
    projectName: { en: "The Desert Ring High-Speed Highway", ar: "طريق الحزام الصحراوي السريع" },
    duration: { en: "18 Months", ar: "18 شهراً" },
    currentMilestone: { en: "Asphalt second-wear layer laid; active kinetic sand barrier verification", ar: "وضع طبقة الأسفلت الثانية تحت التفتيش الهندسي واكتمال تركيب حواجز تشتيت الرياح" },
    estimatedCompletion: { en: "Aug 2026", ar: "أغسطس 2026" },
    progressPercent: 90,
    phases: [
      {
        title: { en: "Subgrade Earthworks", ar: "تمهيد طبقة الأساس الترابي" },
        status: "completed",
        date: "Q1 2025",
        description: {
          en: "Heavy clearing of desert sands, subgrade levelling, and laying non-woven geotextile stabilization cloths.",
          ar: "إزاحة ونقل الكثبان الرملية الضخمة، وتسوية الطبقات الأرضية وفرش لفائف الجيوتكستايل الصناعية للتثبيت."
        },
        tasks: {
          en: ["Sand dunes relocation metrics", "Subgrade heavy dynamic compaction", "Geotextile fabric anchoring layers"],
          ar: ["قياس نسب ترحيل التربة الرملية", "الدمك الديناميكي الميكانيكي لتمهيد الأساس", "تثبيت طبقات منسوجات الجيوتكستايل"]
        }
      },
      {
        title: { en: "Structural Bridges & Box Culverts", ar: "الجسور والعبارات الخرسانية لتصريف السيول" },
        status: "completed",
        date: "Q3 2025",
        description: {
          en: "Casting reinforced box culverts underneath lanes to route seasonal desert torrential waters safely.",
          ar: "صب العبارات الأنبوبية والصندوقية المسلحة الممتدة أسفل الطريق لتمرير السيول ومياه الأمطار الموسمية بأمان."
        },
        tasks: {
          en: ["Reinforced box culvert concrete casting", "Rip-rap stone dry anti-scour protection", "Hydrostatic seal verification checks"],
          ar: ["صب خرسانة العبارات الصندوقية المسلحة", "تبطين المخارج بصخور الحماية لمنع النحر", "فحص واختبار مقاومة النفاذية المائية"]
        }
      },
      {
        title: { en: "Crushed Base course grading", ar: "فرش ودك طبقة الأساس الحجري" },
        status: "completed",
        date: "Q4 2025",
        description: {
          en: "Lifting and heavy rolling of graded crushed native granite stone layers with continuous water moisture calibration.",
          ar: "توزيع دك طبقات حجر الجرانيت الصلد المكسر والمتدرج ومراقبته عبر أجهزة قياس الرطوبة اللاسلكية."
        },
        tasks: {
          en: ["Crushed granite base rolling density", "Moisture-density curve optimization", "Base level laser profile scans"],
          ar: ["قياس كثافة رص أساس الجرانيت المكسر", "مراقبة منحنى التجانس والرطوبة المثالية", "مسح منسوب الأساس بالليزر ثلاثي الأبعاد"]
        }
      },
      {
        title: { en: "Polymer Bituminous Wearing Course", ar: "فرد طبقات الأسفلت البوليمر المعزز" },
        status: "in-progress",
        date: "Active",
        description: {
          en: "Applying high-performance polymer-modified bituminous asphalt engineered for 50°C+ hot desert temperatures.",
          ar: "رصف طبقات الأسفلت المطورة بالبوليمرات الصناعية القادرة على تحمل الأوزان الثقيلة وحرارة الصيف المتجاوزة 50 درجة."
        },
        tasks: {
          en: ["Polymer asphalt mixture formulation", "Paving laying machine logistics", "Core sample thickness audits"],
          ar: ["صياغة مستحلب الأسفلت البوليمري المعدل", "لوجستيات ماكينات فرش الأسفلت بالطريق", "قطع وفحص عينات السمك الإنشائي للمختبر"]
        }
      },
      {
        title: { en: "Telemetry, Guardrails & Road Marks", ar: "التأثيث المروري والأنظمة الذكية والتسليم" },
        status: "upcoming",
        date: "Q3 2026",
        description: {
          en: "Painting reflective high-visibility thermal lines, crash barriers, and energy saving solar street grids.",
          ar: "تخطيط مسارات الطريق بالطلاء الحراري العاكس، وتركيب الحواجز الحديدية ومصابيح الإنارة المستقلة بالطاقة الشمسية."
        },
        tasks: {
          en: ["High-visibility thermoplastic paint layers", "Tension steel guardrail setups", "Solar panel lighting poles check"],
          ar: ["صناعة وتخطيط خطوط الدهان الحراري اللامع", "تركيب حواجز الصلب الجانبية الماصة للصدمات", "تزييت وتفعيل أعمدة الإنارة الشمسية الذاتية"]
        }
      }
    ]
  },
  {
    projectId: "pr5",
    projectName: { en: "The Desert Ring High-Speed Highway", ar: "طريق الحزام الصحراوي السريع" }, // Fallback placeholder
    duration: { en: "30 Months", ar: "30 شهراً" },
    currentMilestone: { en: "Concrete fortress encasement finished; secure redundant energy installations active", ar: "اكتمال بناء الحصن الخرساني المزدوج وتدشين تجهيزات الطاقة والتهوية الذاتية السلبية المقاومة للمخاطر" },
    estimatedCompletion: { en: "Apr 2027", ar: "أبريل 2027" },
    progressPercent: 40,
    phases: [
      {
        title: { en: "Seismic Ground Exploration", ar: "جسات الأرض والتحصين الزلزالي" },
        status: "completed",
        date: "Q4 2025",
        description: {
          en: "Seismic exploration boring down to bedrock, installing heavy physical rubber-steel elastomeric isolators.",
          ar: "إجراء الاختبارات الزلزالية والوقائية حتى الوصول للصخر الصلب وتركيب ركائز عزل الترددات المصنوعة من الصلب والمطاط."
        },
        tasks: {
          en: ["Bedrock compression audits", "Elastomeric rubber isolators alignment", "Groundwater baseline logs"],
          ar: ["اختبارات التحميل وقدرة تحمل الصخر السفلي", "تنصيب ووزن ركائز عزل الاهتزازات والموجات", "رصد مستوى المياه الجوفية التاريخي والمستقبلي"]
        }
      },
      {
        title: { en: "Subterranean Excavation", ar: "الحفريات العميقة للأبنية تحت الأرض" },
        status: "completed",
        date: "Q1 2026",
        description: {
          en: "Continuous dig to 18m below grade protected with massive continuous heavy concrete secant piles.",
          ar: "حفر وتثبيت ثلاثة طوابق تحت الأرض بعمق 18 متراً وتشييد صفائح الخوازيق الخرسانية المتقاطعة المستمرة."
        },
        tasks: {
          en: ["Contiguous shoring pile drill", "Anchor rod hydraulic loading setup", "Excavated mass relocation management"],
          ar: ["حفر وصب خوازيق التدعيم المتداخلة", "تركيب قضبان الشد والربط الجانبي الهيدروليكي", "نقل كتل الرمال المحفورة لمركز الفرز"]
        }
      },
      {
        title: { en: "Fortress Reinforced Core Shell", ar: "بناء الحصن الخرساني المزدوج" },
        status: "in-progress",
        date: "Active",
        description: {
          en: "Pouring military-grade blast-resistant concrete walls with thick double-layered rebar frameworks and shielding plates.",
          ar: "صب جدران خرسانية مسلحة فائقة الصلابة مصممة لامتصاص الموجات والارتجاجات ومسلحة بحديد ذي سمك مضاعف."
        },
        tasks: {
          en: ["Blast-resistant dense concrete formulations", "Double heavy rebar framing", "Shielding steel plate bonding"],
          ar: ["تركيب خلطات الخرسانة المقاومة للصدمات الانفجارية", "تضفير حديد التسليح الكثيف المزدوج", "ربط ألواح الصلب المانعة للاختراق والتسلل"]
        }
      },
      {
        title: { en: "Underground Safe Utilities & EMS Grid", ar: "المحطات الجوفية الآمنة ومولدات الطوارئ" },
        status: "upcoming",
        date: "Q1 2027",
        description: {
          en: "Positioning subterranean backup diesel fuel cells, water treatment centers, and magnetic shielding for IT arrays.",
          ar: "سحب وتثبيت مخازن طاقة الوقود المعزولة تحت الأرض والمنقيات المائية والغلاف المغناطيسي الحامي للأجهزة والخوادم."
        },
        tasks: {
          en: ["Fuel tank concrete bunker construction", "EMP shielding shell installation", "Passive ventilation piping setup"],
          ar: ["بناء مخازن الوقود المحصنة بالخرسانة", "عزل غلاف غرف الخوادم ضد النبضات المغناطيسية", "تركيب مجاري التهوية السلبية الجاذبة للهواء"]
        }
      },
      {
        title: { en: "Security Integration & Final Commissioning", ar: "تجهيزات الأمن العام والتشغيل الإنشائي" },
        status: "upcoming",
        date: "Q2 2027",
        description: {
          en: "Setting up secure control nodes, biometric ingress locks, and high intensity emergency redundant wiring.",
          ar: "تعديل وبرمجة أنظمة التحكم والتعرف على الهوية، وتركيب شبكات توزيع الكهرباء النحاسية المحمية بأغلفة الحماية."
        },
        tasks: {
          en: ["Biometric verification system tests", "Redundant electricity transfer switches", "Handover to regional site administrator"],
          ar: ["اختبارات بوابات التحقق الحيوي المتقدمة", "مفاتيح التحويل الفوري التلقائي للكهرباء", "محضر التسليم والتشغيل للجهة المستفيدة"]
        }
      }
    ]
  }
];

export default function ProjectTimeline({ isRtl = false, activeProjectId, onSelectProject }: { isRtl?: boolean; activeProjectId: string; onSelectProject?: (id: string) => void }) {
  const currentProject = TIMELINE_DATA.find(p => p.projectId === activeProjectId) || TIMELINE_DATA[0];
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Translate labels
  const text = isRtl ? {
    sectionTitle: "المخطط الزمني لمراحل التشييد التفاعلي",
    subTitle: "تتبع تقدم المشاريع ومخططها الفعلي والمهام التشغيلية لكل خطوة",
    durationLabel: "مدة التنفيذ الكلية",
    milestoneLabel: "المعالم والمحطة الحالية",
    completionLabel: "تاريخ التدشين المقدر",
    progressLabel: "مؤشر الإنجاز الهيكلي الميداني",
    tasksHeader: "تفاصيل المهام الهندسية لهذه المرحلة:",
    phaseCardTitle: "تحليل خطة المرحلة الإنشائية",
    phaseStatusLabel: "حالة الخطوة:",
    completed: "مكتملة بنجاح",
    inProgress: "قيد التنفيذ والمراقبة",
    upcoming: "مخططة مجدولة",
    switchLabel: "اختر مشروعاً آخر للمعاينة:"
  } : {
    sectionTitle: "Interactive Construction Timeline",
    subTitle: "Track real-time engineering phases, field operations, and technical milestones",
    durationLabel: "Total Field Duration",
    milestoneLabel: "Current Milestone Anchor",
    completionLabel: "Est. Handover Timeline",
    progressLabel: "Structural Progress Index",
    tasksHeader: "Engineered Tasks & Quality Protocols for this phase:",
    phaseCardTitle: "Structural Phase Analysis",
    phaseStatusLabel: "Operational Status:",
    completed: "Successfully Completed",
    inProgress: "Active In-Field Supervision",
    upcoming: "Scheduled / Projected Future Phase",
    switchLabel: "Select alternative project asset:"
  };

  const activePhase = currentProject.phases[activePhaseIndex] || currentProject.phases[0];

  const handleProjectLink = (id: string) => {
    if (onSelectProject) {
      onSelectProject(id);
    }
    setActivePhaseIndex(0);
  };

  return (
    <div id="project-timeline-container" className="bg-white dark:bg-slate-950/20 border border-slate-100 dark:border-gray-900 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 shadow-sm">
      
      {/* Decorative High-Performance Tagging Label */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-gray-900/60 pb-6">
        <div>
          <span className="text-amber-500 text-[10px] font-mono tracking-widest font-bold uppercase block mb-1">
            {isRtl ? "نظام المحاكاة والجدولة المعماري" : "GANTT CRITICAL PATH SYSTEM"}
          </span>
          <h3 id="timeline-component-title" className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            {text.sectionTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-sans mt-1">
            {text.subTitle}
          </p>
        </div>

        {/* Dynamic Project Quick Switcher */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-[10px] font-mono text-slate-400 dark:text-gray-500 font-bold uppercase">{text.switchLabel}</label>
          <div className="flex flex-wrap gap-1.5">
            {TIMELINE_DATA.map((p) => {
              const selectText = p.projectId === "pr1" ? (isRtl ? "المعراج هايتس" : "Miraj Heights")
                               : p.projectId === "pr2" ? (isRtl ? "مدينة المستودعات" : "Logistics Hub")
                               : p.projectId === "pr3" ? (isRtl ? "ضواحي الأوركيد" : "Orchid Estate")
                               : p.projectId === "pr4" ? (isRtl ? "طريق الحزام" : "Desert Highway")
                               : (isRtl ? "المجمع الأمني" : "Security Center");
              return (
                <button
                  id={`timeline-select-${p.projectId}`}
                  key={p.projectId}
                  onClick={() => handleProjectLink(p.projectId)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all border cursor-pointer ${
                    p.projectId === activeProjectId
                      ? 'bg-amber-500 border-amber-500 text-white font-bold'
                      : 'bg-slate-50 dark:bg-gray-950/50 border-slate-100 dark:border-gray-900 text-slate-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-white hover:border-amber-500/50'
                  }`}
                >
                  {selectText}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Project Information HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50/50 dark:bg-[#070b14]/40 p-5 rounded-2xl border border-slate-100 dark:border-gray-900/60 items-center">
        
        {/* Metric 1 */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-wider block font-bold">{text.durationLabel}</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold font-mono text-slate-800 dark:text-white">
              {isRtl ? currentProject.duration.ar : currentProject.duration.en}
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-wider block font-bold">{text.completionLabel}</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#10b981]" />
            <span className="text-sm font-bold font-mono text-slate-800 dark:text-white">
              {isRtl ? currentProject.estimatedCompletion.ar : currentProject.estimatedCompletion.en}
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-slate-400 dark:text-gray-500 uppercase tracking-wider font-bold">{text.progressLabel}</span>
            <span className="text-amber-500 font-bold">{currentProject.progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-gray-900 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${currentProject.progressPercent}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Visual Stepped Horizontal Timeline Nodes */}
      <div className="relative pt-6 pb-2 px-1">
        {/* Timeline Path Line */}
        <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-gray-900 z-0">
          <div 
            className="h-full bg-amber-500 transition-all duration-700"
            style={{ width: `${(activePhaseIndex / (currentProject.phases.length - 1)) * 100}%` }}
          />
        </div>

        {/* Timeline Nodes Grid */}
        <div className="relative z-10 grid grid-cols-5 gap-2 text-center">
          {currentProject.phases.map((phase, idx) => {
            const isCompleted = phase.status === 'completed';
            const isInProgress = phase.status === 'in-progress';
            const isActive = idx === activePhaseIndex;

            return (
              <button
                id={`phase-node-${idx}`}
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
                className="flex flex-col items-center gap-3 focus:outline-none focus:ring-0 group cursor-pointer"
              >
                {/* Node bubble representation */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-amber-500 border-amber-500 text-white scale-110 shadow-lg shadow-amber-500/30'
                    : isCompleted
                      ? 'bg-slate-50 dark:bg-gray-950 border-amber-500/80 text-amber-500 group-hover:bg-amber-500/10'
                      : isInProgress
                        ? 'bg-white dark:bg-gray-950 border-emerald-500 text-emerald-500 animate-pulse'
                        : 'bg-white dark:bg-gray-950 border-slate-200 dark:border-gray-800 text-slate-300 dark:text-gray-600 group-hover:border-slate-400 dark:group-hover:border-gray-600'
                }`}>
                  {isCompleted ? (
                    <Check className="w-4 h-4 font-bold" />
                  ) : isInProgress ? (
                    <Activity className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-mono font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Node Metadata label description */}
                <div className="space-y-0.5 max-w-[120px] mx-auto hidden sm:block">
                  <p className={`text-[10.5px] font-bold leading-tight line-clamp-2 transition-colors ${
                    isActive 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300'
                  }`}>
                    {isRtl ? phase.title.ar : phase.title.en}
                  </p>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-gray-500 uppercase">{phase.date}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Selected Phase Blueprint Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeProjectId}-${activePhaseIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-gray-950/40 p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-gray-950"
        >
          {/* Detailed analysis description text column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-amber-500 font-mono text-[10px] tracking-widest font-bold uppercase">
                {isRtl ? `الخطوة ${activePhaseIndex + 1} من 5` : `PHASE ${activePhaseIndex + 1} OF 5`}
              </span>
              
              {/* Status Badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500">{text.phaseStatusLabel}</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                  activePhase.status === 'completed'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                    : activePhase.status === 'in-progress'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                      : 'bg-slate-200 dark:bg-gray-900 border-slate-300 dark:border-gray-800 text-slate-500 dark:text-gray-400'
                }`}>
                  {activePhase.status === 'completed' ? text.completed : activePhase.status === 'in-progress' ? text.inProgress : text.upcoming}
                </span>
              </div>
            </div>

            <h4 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
              {isRtl ? activePhase.title.ar : activePhase.title.en}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-sans">
              {isRtl ? activePhase.description.ar : activePhase.description.en}
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 font-bold uppercase block mb-1">
                {isRtl ? "المعلم والحالة الميدانية الفورية" : "REAL-TIME FIELD DISPATCH"}
              </span>
              <p className="text-[11px] font-mono bg-white dark:bg-black/40 border border-slate-100 dark:border-gray-900 p-2.5 rounded-lg text-slate-700 dark:text-gray-400 leading-snug">
                <span className="text-amber-500 font-bold mr-1 block sm:inline-block">★ {isRtl ? "الموقف الحالي:" : "Current:"}</span>
                {isRtl ? currentProject.currentMilestone.ar : currentProject.currentMilestone.en}
              </p>
            </div>
          </div>

          {/* Checklist Task items column */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-950/80 p-5 rounded-xl border border-slate-100 dark:border-gray-900/60 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>{text.tasksHeader}</span>
              </h5>

              <ul className="space-y-2.5">
                {(isRtl ? activePhase.tasks.ar : activePhase.tasks.en).map((task, uidx) => (
                  <li key={uidx} className="flex gap-2.5 items-start">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      activePhase.status === 'completed'
                        ? 'bg-amber-500/10 text-amber-500'
                        : activePhase.status === 'in-progress' && uidx === 0
                          ? 'bg-emerald-500/15 text-emerald-500 animate-pulse'
                          : 'bg-slate-100 dark:bg-gray-900 text-slate-400 dark:text-gray-600'
                    }`}>
                      {activePhase.status === 'completed' ? (
                        <Check className="w-2.5 h-2.5 font-bold" />
                      ) : activePhase.status === 'in-progress' && uidx === 0 ? (
                        <Play className="w-2 h-2 fill-emerald-600 skew-x-3 text-emerald-600" />
                      ) : (
                        <Circle className="w-2 h-2" />
                      )}
                    </div>
                    <span className="text-xs text-slate-700 dark:text-gray-300 font-sans leading-tight">
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro aesthetic footer security key status */}
            <div className="text-[9px] font-mono text-slate-400 dark:text-gray-600 pt-4 border-t border-slate-100 dark:border-gray-900/40 flex justify-between items-center">
              <span>ISO:9001 QUAL // LOGGED</span>
              <span>VERIFIED: {activePhase.date}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
