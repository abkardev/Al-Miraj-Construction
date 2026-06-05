import React, { useState } from 'react';
import { MapPin, Building, Phone, Mail, Award, Globe } from 'lucide-react';

const MAP_EMBED_URLS: Record<string, string> = {
  "loc-riyadh": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.846549925206!2d46.67184207604474!3d24.711516678028212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0326490696b9%3A0xf67f8fb8cf60eb24!2sKingdom%20Centre!5e0!3m2!1sen!2ssa!4v1717600000000!5m2!1sen!2ssa",
  "loc-dubai": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6276921312567!2d55.14515567554904!3d25.080582936417757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f134bb4879b29%3A0xc3fa5be35f992cf6!2sMarina%20Gate%201!5e0!3m2!1sen!2sae!4v1717600000000!5m2!1sen!2sae",
  "loc-jeddah": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.3967841122175!2d39.1769614754593!2d21.53127816869559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cf3df3da327d%3A0xa23fec959cc9597!2sAl%20Andalus%20Rd%2C%20Jeddah!5e0!3m2!1sen!2ssa!4v1717600000000!5m2!1sen!2ssa",
  "loc-qatar": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14429.390709971917!2d51.52763261642106!3d25.132103444439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c479e0000001%3A0x64e0a96fcdfebbbf!2sThe%20Pearl%20-%20Qatar!5e0!3m2!1sen!2sqa!4v1717600000000!5m2!1sen!2sqa"
};

interface OfficeLocation {
  id: string;
  name: { en: string; ar: string };
  city: { en: string; ar: string };
  coordinates: { x: number; y: number }; // Percentage offsets in visual card
  address: { en: string; ar: string };
  phone: string;
  email: string;
  activeContracts: { en: string; ar: string };
  specialty: { en: string; ar: string };
}

const REGIONAL_OFFICES: OfficeLocation[] = [
  {
    id: "loc-riyadh",
    name: { en: "Al-Miraj Kingdom HQ", ar: "مقر مجموعة المعراج الرئيسي - الرياض" },
    city: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },
    coordinates: { x: 35, y: 40 },
    address: { en: "Al-Olaya Tower, Floor 44, King Fahd Rd", ar: "برج العليا، الطابق 44، طريق الملك فهد" },
    phone: "+966 11 409 0011",
    email: "riyadh.epc@al-miraj.com",
    activeContracts: { en: "$720 Million Active", ar: "720 مليون دولار عقود نشطة" },
    specialty: { en: "Heavy Civil & Super-Towers", ar: "الأبراج العالية والإنشاءات الكبرى" }
  },
  {
    id: "loc-dubai",
    name: { en: "Emirates Corporate Hub", ar: "مركز الإمارات للإدارة والمشاريع" },
    city: { en: "Dubai, UAE", ar: "دبي، الإمارات العربية المتحدة" },
    coordinates: { x: 65, y: 56 },
    address: { en: "Marina Gate Towers, Suite 1205, Marina", ar: "بوابة ديرة، الطابق 12، مرسى دبي" },
    phone: "+971 4 330 9900",
    email: "dubai.epc@al-miraj.com",
    activeContracts: { en: "$540 Million Active", ar: "540 مليون دولار عقود نشطة" },
    specialty: { en: "Design & Build, Marine Works", ar: "التصميم والتنفيذ المتكامل والموانئ" }
  },
  {
    id: "loc-jeddah",
    name: { en: "Red Sea Logistic Base", ar: "مركز البحر الأحمر اللوجستي" },
    city: { en: "Jeddah, Saudi Arabia", ar: "جدة، المملكة العربية السعودية" },
    coordinates: { x: 18, y: 72 },
    address: { en: "Al-Andalus Rd Building 8A, Coastal Zone", ar: "طريق الأندلس، مبنى 8أ، المنطقة الساحلية" },
    phone: "+966 12 605 5588",
    email: "jeddah.ops@al-miraj.com",
    activeContracts: { en: "$310 Million Active", ar: "310 مليون دولار عقود نشطة" },
    specialty: { en: "Logistics, Roads & Infrastructure", ar: "شق الطرق والجسور والبنية التحتية" }
  },
  {
    id: "loc-qatar",
    name: { en: "Doha Engineering Sector", ar: "قطاع الدوحة الهندسي والمشتريات" },
    city: { en: "Doha, Qatar", ar: "الدوحة، دولة قطر" },
    coordinates: { x: 54, y: 32 },
    address: { en: "The Pearl Marina Walk, Office G9", ar: "ممشى اللؤلؤة، مكتب جي 9، الدوحة" },
    phone: "+974 44 88 1234",
    email: "doha.office@al-miraj.com",
    activeContracts: { en: "$230 Million Active", ar: "230 مليون دولار عقود نشطة" },
    specialty: { en: "Industrial Warehouses & Steel Fabrication", ar: "المستودعات وهياكل الحديد المعالجة" }
  }
];

export default function InteractiveMap({ isRtl = false }: { isRtl?: boolean }) {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(REGIONAL_OFFICES[0]);
  const [mapMode, setMapMode] = useState<'grid' | 'google'>('grid');

  const text = isRtl ? {
    title: "مواقع الانتشار والمراكز الإقليمية",
    desc: "اضغط على أي من النقاط النشطة على خريطتنا الشبكية التفاعلية لاستعراض عقودنا الحالية ومعلومات الاتصال المباشر بالمهندس المسؤول وعناوين مقار الإدارة.",
    contracts: "حجم المحفظة الناشطة",
    specialty: "التخصص الإقليمي المعتمد",
    address: "العنوان الفعلي المقر",
    email: "المراسلة الرسمية",
    phone: "الخط الساخن للأعمال",
    selectLabel: "اختر المركز الإداري"
  } : {
    title: "Regional Deployment & Authority Centers",
    desc: "Click on any active nodal joint on our interactive grid map below to preview Al-Miraj's local contract scale, regional capabilities, and direct communications.",
    contracts: "Portfolio Under Supervision",
    specialty: "Regional Core Specialty",
    address: "Physical HQ Address",
    email: "Official Communications",
    phone: "Corporate Project Line",
    textSelect: "Change map mode",
    selectLabel: "Select Office Location"
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Visual Map Layout */}
      <div className="lg:col-span-7 relative h-[340px] md:h-[420px] rounded-xl border border-gray-800 bg-[#080d19] overflow-hidden flex flex-col justify-between p-4">
        
        {mapMode === 'google' ? (
          <div className="absolute inset-0 w-full h-full z-0">
            <iframe
              src={MAP_EMBED_URLS[selectedOffice.id]}
              width="100%"
              height="100%"
              style={{ border: 0, filter: document.documentElement.classList.contains('light') ? 'none' : 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <>
            {/* Futuristic Map Grid Background (SVG Blueprint of Middle East Coastal Points representational map) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                  <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="#D97706" fillOpacity="0.4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" />
                
                {/* Draw abstract topological routes between locations */}
                <path 
                  d="M 60,140 Q 150,120 220,160 T 380,225" 
                  fill="none" 
                  stroke="rgba(217, 119, 6, 0.2)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
                <path 
                  d="M 220,160 Q 300,300 420,290" 
                  fill="none" 
                  stroke="rgba(217, 119, 6, 0.15)" 
                  strokeWidth="1.5" 
                  strokeDasharray="3 3" 
                />
              </svg>
            </div>

            {/* Abstract topographic vectors resembling land outline */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
              <Globe className="w-80 h-80 text-amber-500 animate-spin" style={{ animationDuration: '90s' }} />
            </div>

            {/* Dynamic coordinate crosshair following active item */}
            <div className="absolute inset-x-0 h-px border-t border-dashed border-amber-600/10 pointer-events-none" style={{ top: `${selectedOffice.coordinates.y}%` }} />
            <div className="absolute inset-y-0 w-px border-l border-dashed border-amber-600/10 pointer-events-none" style={{ left: `${selectedOffice.coordinates.x}%` }} />

            {/* Office Node Anchors on Map */}
            {REGIONAL_OFFICES.map((office) => {
              const isSelected = selectedOffice.id === office.id;
              return (
                <button
                  id={`map-node-${office.id}`}
                  key={office.id}
                  onClick={() => setSelectedOffice(office)}
                  style={{
                    left: `${office.coordinates.x}%`,
                    top: `${office.coordinates.y}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-25 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  {/* Outer pulsing ring */}
                  <span className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? 'bg-amber-500/20 animate-ping' 
                      : 'bg-transparent group-hover:bg-amber-500/5'
                  }`}></span>
                  
                  {/* Core glow */}
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-500 border-white shadow-lg scale-110 shadow-amber-500/50'
                      : 'bg-gray-950 border-amber-500 group-hover:bg-amber-600/30'
                  }`}>
                    <span className={`w-1.2 h-1.2 rounded-full bg-white ${isSelected ? 'block' : 'hidden md:block'}`}></span>
                  </span>

                  {/* Hover/Selection City Label */}
                  <span className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-0.5 whitespace-nowrap rounded text-[10px] font-mono border transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-500 border-amber-500 text-white font-bold opacity-100 scale-100 translate-y-0'
                      : 'bg-gray-950/90 border-gray-800 text-gray-400 group-hover:text-white opacity-80 group-hover:opacity-100 scale-95 translate-y-0.5'
                  }`}>
                    {isRtl ? office.city.ar : office.city.en}
                  </span>
                </button>
              );
            })}
          </>
        )}

        {/* Header HUD inside card - Kept relative with z-20 to stack correctly over Google Map Iframe */}
        <div className="relative z-20 flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center bg-gray-950/90 border border-gray-800 p-2 text-white rounded-lg backdrop-blur-sm shadow-md">
          <span className="text-[10px] font-mono tracking-widest text-amber-500 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
            {isRtl ? "تتبع نظام المقر والمشاريع" : "OFFICE SITE TELEMETRY"}
          </span>
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 p-0.5 rounded-md text-[9px] font-mono select-none self-end sm:self-center">
            <button
              id="toggle-map-grid"
              onClick={() => setMapMode('grid')}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${mapMode === 'grid' ? 'bg-amber-500 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {isRtl ? "الخريطة التفاعلية" : "Interactive Grid"}
            </button>
            <button
              id="toggle-map-google"
              onClick={() => setMapMode('google')}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${mapMode === 'google' ? 'bg-amber-500 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {isRtl ? "خرائط Google" : "Google Map View"}
            </button>
          </div>
        </div>

        {/* Footer instructional prompt */}
        <div className="relative z-20 text-[9px] font-mono text-gray-400 bg-gray-950/90 border border-gray-800/40 p-1.5 rounded flex items-center justify-between backdrop-blur-sm mt-auto">
          <span>
            {mapMode === 'google' 
              ? (isRtl ? `عرض مباشر لـ: ${selectedOffice.city.ar}` : `Live view: ${selectedOffice.city.en}`)
              : (isRtl ? "اضغط على العقد لتبديل البيانات" : "* Click node coordinate for direct EPC metrics")
            }
          </span>
          <span className="text-amber-500 font-bold uppercase">{selectedOffice.id.split('-')[1]} // LOK</span>
        </div>
      </div>

      {/* Information Panel Grid Right */}
      <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-900/40 p-5 rounded-xl">
        <div className="space-y-4">
          {/* Section title */}
          <div>
            <h4 id="interactive-map-heading" className="text-sm font-mono tracking-wider text-amber-500 font-bold uppercase mb-1">
              {text.title}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {text.desc}
            </p>
          </div>

          <div className="h-px bg-gray-850"></div>

          {/* Office Detailed Info Sheet */}
          <div className="space-y-3.5 pt-1">
            {/* Office name header */}
            <div className="flex gap-2.5 items-start">
              <Building className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h5 id="office-details-name" className="text-sm font-semibold text-white">
                  {isRtl ? selectedOffice.name.ar : selectedOffice.name.en}
                </h5>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {isRtl ? selectedOffice.city.ar : selectedOffice.city.en}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#060a12]/80 p-3 rounded-lg border border-gray-800/60 font-mono">
              {/* Active contracts scale */}
              <div>
                <span className="text-[10px] text-gray-500 block uppercase font-bold">{text.contracts}</span>
                <span className="text-xs text-emerald-400 font-bold mt-0.5 block">
                  {isRtl ? selectedOffice.activeContracts.ar : selectedOffice.activeContracts.en}
                </span>
              </div>
              {/* Regional core specialty */}
              <div>
                <span className="text-[10px] text-gray-500 block uppercase font-bold">{text.specialty}</span>
                <span className="text-xs text-amber-500 font-semibold mt-0.5 block">
                  {isRtl ? selectedOffice.specialty.ar : selectedOffice.specialty.en}
                </span>
              </div>
            </div>

            {/* Direct contact info list */}
            <div className="space-y-2 mt-3.5 text-xs text-gray-300">
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 shrink-0 font-mono">{text.address}:</span>
                <span className="text-gray-300">{isRtl ? selectedOffice.address.ar : selectedOffice.address.en}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 shrink-0 font-mono">{text.phone}:</span>
                <a href={`tel:${selectedOffice.phone}`} id={`call-office-${selectedOffice.id}`} className="text-white hover:text-amber-500 font-mono underline underline-offset-2 transition-colors">
                  {selectedOffice.phone}
                </a>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 shrink-0 font-mono">{text.email}:</span>
                <a href={`mailto:${selectedOffice.email}`} id={`email-office-${selectedOffice.id}`} className="text-gray-300 hover:text-amber-500 font-mono transition-colors">
                  {selectedOffice.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stamp representation at the bottom */}
        <div className="pt-4 mt-4 border-t border-gray-800/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[9px]">
            <Award className="w-5 h-5 text-amber-500/60" />
            <div>
              <span className="block font-bold text-gray-400">ISO 9001 EPC REGISTERED</span>
              <span>VERIFIED CO-ORDINATE SYSTEM</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            {REGIONAL_OFFICES.map((loc) => (
              <button
                id={`sidebar-select-${loc.id}`}
                key={loc.id}
                onClick={() => setSelectedOffice(loc)}
                className={`w-2.5 h-2.5 rounded-full border transition-all ${
                  selectedOffice.id === loc.id 
                    ? 'bg-amber-500 border-amber-500 scale-110' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                title={isRtl ? loc.city.ar : loc.city.en}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
