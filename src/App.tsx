import React, { useState, useEffect } from 'react';
import {
  GLOBAL_TEXTS,
  STATISTICS,
  WHY_CHOOSE_ITEMS,
  SERVICES,
  PROJECTS,
  TESTIMONIALS,
  FAQS,
  BLOGS,
  MILESTONES,
  TEAM,
  CERTIFICATIONS,
  HERO_IMAGE,
  STRUCTURE_IMAGE,
  SECONDARY_HERO
} from './data';
import { Language, Page, ServiceItem, ProjectItem, BlogPostItem } from './types';
import BlueprintCanvas3D from './components/BlueprintCanvas3D';
import InteractiveMap from './components/InteractiveMap';
import ProjectTimeline from './components/ProjectTimeline';
import {
  HardHat,
  ShieldCheck,
  Truck,
  Layers,
  Building2,
  Building,
  Briefcase,
  Factory,
  Award,
  Hammer,
  Check,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronDown,
  ArrowRight,
  Search,
  FileText,
  Calendar,
  Clock,
  Star,
  Quote,
  Menu,
  X,
  Activity,
  Database,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activePage, setActivePage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Theme state persisted locally, defaulting to light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'light';
  });

  // Sync theme class with document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Interactive Services Selection Detail
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  // Hero Display Mode Toggle: 3D interactive vs. high-quality image gallery
  const [heroVisualMode, setHeroVisualMode] = useState<'blueprint' | 'photo'>('photo');

  // Portfolio Filters & search
  const [portfolioCategory, setPortfolioCategory] = useState<string>('all');
  const [portfolioSearch, setPortfolioSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTimelineProjectId, setActiveTimelineProjectId] = useState<string>('pr1');

  // Blog Filters & search
  const [blogSearch, setBlogSearch] = useState<string>('');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostItem | null>(null);

  // Scroll position monitor (Navbar fading effect)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync HTML dir attribute on language translation changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    setFormData({ name: '', phone: '', email: '', company: '', message: '' });
  };

  const currentTexts = GLOBAL_TEXTS[lang];
  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Helper matching component icon mapping
  const renderIcon = (name: string, className: string = "w-5 h-5") => {
    switch (name) {
      case 'Layers': return <Layers className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Truck': return <Truck className={className} />;
      case 'HardHat': return <HardHat className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Factory': return <Factory className={className} />;
      case 'Award': return <Award className={className} />;
      default: return <Building className={className} />;
    }
  };

  // Filtered lists
  const filteredProjects = PROJECTS.filter(p => {
    const matchesCat = portfolioCategory === 'all' || p.category === portfolioCategory;
    const searchString = portfolioSearch.toLowerCase();
    const matchesSearch = 
      p.title.en.toLowerCase().includes(searchString) || 
      p.title.ar.includes(searchString) ||
      p.location.en.toLowerCase().includes(searchString) ||
      p.location.ar.includes(searchString);
    return matchesCat && matchesSearch;
  });

  const filteredBlogs = BLOGS.filter(b => {
    const searchString = blogSearch.toLowerCase();
    return (
      b.title.en.toLowerCase().includes(searchString) || 
      b.title.ar.includes(searchString) ||
      b.excerpt.en.toLowerCase().includes(searchString) ||
      b.excerpt.ar.includes(searchString) ||
      b.category.en.toLowerCase().includes(searchString) ||
      b.category.ar.includes(searchString)
    );
  });

  return (
    <div className="min-h-screen bg-[#03060f] text-gray-100 flex flex-col selection:bg-amber-600 selection:text-white">
      
      {/* GLOBAL BACKGROUND STEEL GRAIN PANEL overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] z-50"></div>

      {/* STICKY GLASS NAVIGATION HEADER */}
      <header id="app-navbar" className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#091026]/90 border-b border-gray-800/80 shadow-lg backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Group Branded Typography Logo */}
          <button id="nav-brand-logo" onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }} className="text-left flex items-center gap-3 focus:outline-none cursor-pointer">
            <div className="w-10 h-10 border-2 border-amber-500 rounded-lg flex items-center justify-center bg-gray-950 font-mono font-bold text-amber-500 tracking-tighter text-xl">
              AM
            </div>
            <div>
              <div className="font-display text-base tracking-widest font-bold text-white uppercase flex items-center gap-1.5 leading-none">
                {currentTexts.brand}
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              </div>
              <span className="text-[8px] font-mono tracking-widest text-[#9ca3af] block mt-0.5 uppercase">
                {currentTexts.brandSub}
              </span>
            </div>
          </button>

          {/* Desktop Nav Actions */}
          <nav className={`hidden lg:flex items-center gap-8 text-gray-300 ${
            lang === 'ar' ? 'text-sm font-sans font-medium' : 'text-xs font-mono tracking-wider'
          }`}>
            {(['home', 'about', 'services', 'portfolio', 'blog', 'contact'] as Page[]).map((page) => (
              <button
                id={`nav-${page}`}
                key={page}
                onClick={() => { setActivePage(page); window.scrollTo(0, 0); }}
                className={`py-1 hover:text-amber-500 transition-colors uppercase relative cursor-pointer ${
                  activePage === page ? 'text-amber-500 font-bold font-semibold' : ''
                }`}
              >
                {currentTexts[page]}
                {activePage === page && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-500 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher Button and Interactive Consultation Request */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="theme-switcher"
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="p-2 border border-gray-800 rounded-lg hover:border-amber-500/50 hover:bg-gray-900 transition-all flex items-center justify-center text-gray-300 cursor-pointer"
              title={theme === 'light' ? (lang === 'ar' ? 'الوضع المظلم' : 'Dark Mode') : (lang === 'ar' ? 'الوضع المضيء' : 'Light Mode')}
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            <button
              id="lang-switcher"
              onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
              className={`p-2 border border-gray-800 rounded-lg hover:border-amber-500/50 hover:bg-gray-900 transition-all flex items-center gap-1.5 text-gray-300 cursor-pointer ${
                lang === 'ar' ? 'text-sm font-sans font-medium' : 'text-xs font-mono'
              }`}
            >
              <Globe className="w-4 h-4 text-amber-500" />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            <button
              id="top-cta-consultation"
              onClick={() => { setActivePage('contact'); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}
              className={`px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-500/20 rounded-md uppercase text-white shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ${
                lang === 'ar' ? 'text-sm font-sans font-medium tracking-wide' : 'text-xs font-bold font-mono tracking-wider'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>{currentTexts.consultationCall}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="theme-switcher-mobile"
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="p-1.5 border border-gray-800 rounded-lg text-gray-300 cursor-pointer flex items-center justify-center"
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
            <button
              id="lang-switcher-mobile"
              onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
              className={`p-1.5 border border-gray-800 rounded-lg text-gray-300 cursor-pointer ${
                lang === 'ar' ? 'text-sm font-sans font-medium' : 'text-xs font-mono'
              }`}
            >
              {lang === 'en' ? 'العربية' : 'EN'}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-950 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE FLOATING MENU SCREEN */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-[#03060f]/98 backdrop-blur-lg z-30 lg:hidden border-t border-gray-950 flex flex-col justify-between p-6">
          <div className={`space-y-4 text-center ${
            lang === 'ar' ? 'font-sans text-base' : 'font-mono text-sm uppercase tracking-widest'
          }`}>
            {(['home', 'about', 'services', 'portfolio', 'blog', 'contact'] as Page[]).map((page) => (
              <button
                id={`mobile-nav-${page}`}
                key={page}
                onClick={() => { setActivePage(page); setMobileMenuOpen(false); window.scrollTo(0, 0); }}
                className={`py-2 px-4 w-full rounded-md border ${
                  activePage === page 
                    ? 'bg-amber-600 border-amber-500 text-white font-bold' 
                    : 'border-transparent text-gray-400 hover:text-white'
                } transition-colors`}
              >
                {currentTexts[page]}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-900">
            <button
              id="mobile-nav-whatsapp"
              onClick={() => window.open('https://wa.me/96650000000', '_blank')}
              className={`w-full py-3 bg-emerald-600 text-white rounded-lg text-center flex items-center justify-center gap-1.5 ${
                lang === 'ar' ? 'text-sm font-sans font-medium' : 'text-xs font-mono font-bold'
              }`}
            >
              <Phone className="w-4 h-4" />
              {currentTexts.whatsappBtn}
            </button>
            <p className="text-[10px] text-gray-500 text-center font-mono uppercase">
              {currentTexts.brandSub}
            </p>
          </div>
        </div>
      )}


      {/* MAIN CONTENT CONTAIN COMPONENT PORTALS */}
      <main className="flex-grow pt-24 sm:pt-28">

        {/* ---------------------------------------------------- */}
        {/* VIEWPORTS CORE CHANGER */}
        
        {/* 1. HOME VIEWPORT MODULE */}
        {activePage === 'home' && (
          <div className="fade-in space-y-16 sm:space-y-24">
            
            {/* HERO SECTION CONTAINER */}
            <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column Text details & branding pitch */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Authority Tagline Banner */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10.5px] font-mono tracking-wider font-bold">
                  <HardHat className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? "GRADE-A INDUSTRIAL CONTRACTOR" : "مصنف فئة أولى - مقاولات عامة"}</span>
                </div>

                {/* Main agency typography scale heading */}
                <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] uppercase">
                  {lang === 'en' ? (
                    <>
                      Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Excellence</span>.<br />
                      Delivering the Future.
                    </>
                  ) : (
                    <>
                      نشيد <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">التميز الإنشائي</span>.<br />
                      ونبني أساس المستقبل.
                    </>
                  )}
                </h1>

                {/* Subtitle brief introduction */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-xl">
                  {currentTexts.aboutIntro}
                </p>

                {/* Quick actions CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    id="hero-cta-portfolio"
                    onClick={() => { setActivePage('portfolio'); window.scrollTo(0, 0); }}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-lg text-xs font-bold font-mono tracking-wider uppercase text-white shadow-lg shadow-amber-900/10 hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{currentTexts.learnMore}</span>
                    <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    id="hero-cta-contact"
                    onClick={() => { setActivePage('contact'); window.scrollTo(0, 0); }}
                    className="px-6 py-3.5 bg-[#080c16]/90 hover:bg-gray-900 border border-gray-800 rounded-lg text-xs font-bold font-mono tracking-wider uppercase text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span>{currentTexts.getStarted}</span>
                  </button>
                </div>

                {/* Mini quick features strip */}
                <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-4 border-t border-gray-900 font-mono text-[10px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-500/60" />
                    <span>{lang === 'en' ? "OSHA Fully Audited" : "معايير OSHA الدولية"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-500/60" />
                    <span>{lang === 'en' ? "Level 3 BIM Integration" : "نمذجة ليفل 3 BIM"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500/60" />
                    <span>{lang === 'en' ? "30+ Years Tenure" : "تاريخ يمتد لـ 30 عاماً"}</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Interactive 3D blueprint wireframe / Real-World Image tab selector widget */}
              <div id="hero-interactive-board" className="lg:col-span-6 relative w-full flex flex-col justify-center space-y-4">
                
                {/* Visualizer Mode selector buttons */}
                <div className="flex bg-gray-950/85 p-1 rounded-lg border border-gray-900 w-fit mx-auto lg:mx-0 font-mono text-[10.5px] sm:text-[11px] self-center lg:self-start">
                  <button 
                    onClick={() => setHeroVisualMode('photo')}
                    className={`px-4 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                      heroVisualMode === 'photo' 
                        ? 'bg-amber-600 font-bold text-white shadow' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'en' ? "Real-World Projects" : "العمل الميداني الفعلي"}</span>
                  </button>
                  <button 
                    onClick={() => setHeroVisualMode('blueprint')}
                    className={`px-4 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                      heroVisualMode === 'blueprint' 
                        ? 'bg-amber-600 font-bold text-white shadow' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                    <span>{lang === 'en' ? "3D Vector blue" : "المخططات الهندسية ثلاثية الأبعاد"}</span>
                  </button>
                </div>

                <div className="relative w-full overflow-hidden min-h-[350px] sm:min-h-[420px] rounded-2xl border border-gray-900 bg-gray-950/40 p-1 flex items-center justify-center">
                  
                  {heroVisualMode === 'blueprint' ? (
                    <div className="w-full h-full flex flex-col justify-center animate-fadeIn">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent blur-xl pointer-events-none"></div>
                      <BlueprintCanvas3D isRtl={lang === 'ar'} />
                      <div className="absolute top-4 right-4 bg-gray-950/80 border border-amber-500/20 px-2.5 py-1 rounded text-[10px] font-mono text-amber-500">
                        {lang === 'en' ? "ACTIVE VECTOR LAB" : "مختبر النماذج النشط"}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col space-y-4 p-3 sm:p-4 animate-fadeIn">
                      
                      {/* Double images layered display showing pure mastery */}
                      <div className="relative w-full h-[220px] sm:h-[260px] rounded-xl overflow-hidden border border-gray-850 bg-gray-900">
                        <img 
                          src={HERO_IMAGE} 
                          alt="Main Industrial Build" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-80 filter brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono bg-black/55 backdrop-blur-xs p-2 rounded-lg border border-gray-800">
                          <span className="text-white font-bold">{lang === 'en' ? "PROJECT: RIYADH INDUSTRIAL AXIS" : "مشروع: محور الرياض الصناعي"}</span>
                          <span className="text-amber-500 font-bold">{lang === 'en' ? "LIVE MONITOR" : "مراقبة حية"}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative h-24 sm:h-28 rounded-xl overflow-hidden border border-gray-850 bg-gray-900">
                          <img 
                            src={STRUCTURE_IMAGE} 
                            alt="Reinforce Concrete structural work" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-80 filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <span className="absolute bottom-2 left-2 text-[8px] sm:text-[9px] font-mono text-gray-350 font-bold">
                            {lang === 'en' ? "#01 Steel Trusses" : "#01 هيكل فولاذي"}
                          </span>
                        </div>
                        <div className="relative h-24 sm:h-28 rounded-xl overflow-hidden border border-gray-850 bg-gray-900">
                          <img 
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80" 
                            alt="Tower Crane Concrete casting" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-80 filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <span className="absolute bottom-2 left-2 text-[8px] sm:text-[9px] font-mono text-gray-350 font-bold">
                            {lang === 'en' ? "#02 Heavy Casting" : "#02 صب الخرسانات"}
                          </span>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>

            </section>

            {/* CORPORATE GENERAL REAL-WORLD STATISTICS NUMBERS */}
            <section id="statistics-ticker" className="bg-[#050812] border-y border-gray-800/80 py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <div className="mb-10 text-center">
                  <h2 id="stats-ticker-heading" className="text-2xl font-display font-medium text-white tracking-tight">
                    {currentTexts.statsTitle}
                  </h2>
                  <p className="text-xs text-gray-400 mt-2 font-mono">
                    {currentTexts.statsSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {STATISTICS.map((stat) => (
                    <div id={`stat-node-${stat.id}`} key={stat.id} className="text-center p-6 border border-gray-850 bg-[#090e18]/40 rounded-xl hover:border-amber-500/20 transition-all duration-300">
                      <div className="text-4xl lg:text-5xl font-display font-bold text-amber-500 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-gray-200 mt-2 font-mono">
                        {stat.label[lang]}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 lines-clamp-2 leading-relaxed">
                        {stat.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PRESTIGE "WHY AL-MIRAJ" FEATURES GRID */}
            <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.whyChooseUs}</span>
                <h2 id="why-choose-us-heading" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                  {lang === 'en' ? "Superior Civil & Geotechnical Engineering" : "هندسة مدنية وجيوتقنية متفوقة"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {currentTexts.whyChooseUsSub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {WHY_CHOOSE_ITEMS.map((item) => (
                  <div id={`why-${item.id}`} key={item.id} className="flex flex-col justify-between p-5 rounded-xl border border-gray-850/80 bg-gray-950/40 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      {renderIcon(item.icon, "w-6 h-6")}
                    </div>
                    <div>
                      <h4 id={`why-title-${item.id}`} className="text-sm font-semibold text-white tracking-widest font-mono mb-2 uppercase">
                        {item.title[lang]}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {item.desc[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SERVICES PREVIEW CONTEXT */}
            <section id="services-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900/10 border-y border-gray-900 py-16 sm:py-20 rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left controls column */}
                <div className="lg:col-span-4 space-y-6">
                  <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.services}</span>
                  <h2 id="services-preview-heading" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {currentTexts.ourServices}
                  </h2>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {currentTexts.ourServicesSub}
                  </p>

                  <div className="flex flex-col gap-2 font-mono text-xs pt-4">
                    {SERVICES.map((serv) => (
                      <button
                        id={`srv-btn-${serv.id}`}
                        key={serv.id}
                        onClick={() => setSelectedServiceId(serv.id)}
                        className={`w-full text-left px-4 py-3 rounded-md border transition-all flex items-center justify-between cursor-pointer ${
                          selectedServiceId === serv.id 
                            ? 'bg-amber-600 border-amber-500 text-white font-bold shadow-md' 
                            : 'bg-gray-950 border-gray-850 text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                      >
                        <span className="truncate">{serv.title[lang]}</span>
                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                    ))}
                  </div>

                  <button
                    id="all-srv-btn"
                    onClick={() => { setActivePage('services'); window.scrollTo(0, 0); }}
                    className="w-full py-3 border border-dashed border-amber-500/30 text-amber-500 hover:bg-amber-500/5 rounded-lg text-xs font-bold uppercase font-mono tracking-wider transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? "Compare Technical Processes" : "مقارنة العمليات التفصيلية"}
                  </button>
                </div>

                {/* Right detailed display panels */}
                <div className="lg:col-span-8 bg-gray-950/60 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                  
                  {/* Visual Category Illustration */}
                  {activeService.image && (
                    <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-gray-900 bg-black/40">
                      <img
                        src={activeService.image}
                        alt={activeService.title[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-60 hover:opacity-75 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-amber-500 font-bold uppercase bg-[#02050b]/80 px-2.5 py-1 rounded border border-amber-500/20">
                          {lang === 'en' ? "Field Site Perspective" : "معاينة العمل الموقعي"}
                        </span>
                        <span className="text-[9.5px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded border border-gray-800">
                          32.0725° N, 46.8291° E
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                        {renderIcon(activeService.iconName, "w-8 h-8")}
                      </div>
                      <div>
                        <h3 id="active-service-title" className="text-lg font-bold text-white uppercase">{activeService.title[lang]}</h3>
                        <span className="text-[10px] font-mono text-gray-500 uppercase mt-1 block flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {activeService.duration[lang]}
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-1.5">
                      <span className="text-[9px] font-mono text-amber-500 uppercase block font-bold">HISTORICAL METRIC</span>
                      <span className="text-xs font-mono font-bold text-white">{activeService.industrialStat[lang]}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                    {activeService.longDesc[lang]}
                  </p>

                  <div className="h-[1px] bg-gray-850"></div>

                  <div className="space-y-3.5">
                    <h4 id="active-service-benefits-heading" className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                      {lang === 'en' ? "Integrated Benefits & QA Audits" : "المزايا المدمجة وضمان الجودة"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeService.benefits[lang].map((benefit, bIdx) => (
                        <div id={`benefit-${bIdx}`} key={bIdx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-300 font-sans leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-gray-850"></div>

                  {/* Operational Process Tracker Timeline */}
                  <div className="space-y-4">
                    <h4 id="active-service-process-heading" className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                      {lang === 'en' ? "Phased Site Implementation Pathway" : "مراحل التنفيذ الفعلي في الموقع"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                      {activeService.process.map((step, sIdx) => (
                        <div id={`process-idx-${sIdx}`} key={sIdx} className="relative bg-black/40 border border-gray-900/60 rounded-xl p-4 flex flex-col justify-between">
                          <span className="text-[18px] font-bold text-gray-800 leading-none">0{sIdx + 1}</span>
                          <div className="mt-3.5">
                            <h5 id={`p-step-title-${sIdx}`} className="text-xs font-semibold text-white uppercase">{step.title[lang]}</h5>
                            <p className="text-[10px] text-gray-500 mt-1 lines-clamp-3 leading-relaxed">{step.desc[lang]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* PORTFOLIO GRID PREVIEW FILTER */}
            <section id="portfolio-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-3 max-w-xl">
                  <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.portfolio}</span>
                  <h2 id="portfolio-preview-heading" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {currentTexts.ourPortfolio}
                  </h2>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {currentTexts.ourPortfolioSub}
                  </p>
                </div>

                <button
                  id="all-por-btn"
                  onClick={() => { setActivePage('portfolio'); window.scrollTo(0, 0); }}
                  className="px-5 py-2.5 bg-gray-950 border border-gray-800 hover:border-amber-500/50 text-gray-300 hover:text-white transition-all text-xs font-bold uppercase font-mono tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === 'en' ? "View Full Project Archives" : "تصفح كامل أرشيف المشاريع"}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Showcase highlights Projects Limit 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROJECTS.slice(0, 3).map((project) => (
                  <div
                    id={`p-card-${project.id}`}
                    key={project.id}
                    className="group border border-gray-850 bg-gray-950/40 rounded-xl overflow-hidden focus:outline-none text-left flex flex-col justify-between"
                  >
                    {/* Project Snapshot representation */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-900 object-cover">
                      <img
                        src={project.image}
                        alt={project.title[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
                      
                      <span className="absolute bottom-3 left-3 bg-amber-600 text-white font-mono text-[9.5px] font-bold px-2.5 py-1 rounded uppercase">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          {project.location[lang]}
                        </div>
                        <h4 id={`p-title-${project.id}`} className="text-sm font-semibold uppercase text-white mt-1.5">
                          {project.title[lang]}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2 lines-clamp-2 leading-relaxed">
                          {project.overview[lang]}
                        </p>
                      </div>

                      <div className="h-[1.5px] bg-gray-850 my-4" />

                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <div>
                          <span className="text-gray-500 block text-[9px]">{lang === 'en' ? "BUDGET" : "ميزانية العقد"}</span>
                          <span className="text-amber-500 font-bold">{project.valValue[lang]}</span>
                        </div>
                        <button
                          id={`p-modal-btn-${project.id}`}
                          onClick={() => setSelectedProject(project)}
                          className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-amber-500 hover:text-white hover:bg-amber-600 hover:border-amber-500 font-bold uppercase rounded text-[10px] transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{currentTexts.viewCaseStudy}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE COMPREHENSIVE MAP & REGIONAL INFRASTRUCTURE SEGMENTS */}
            <section id="interactive-hq-map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-[#03060f] border border-gray-850/80 rounded-2xl">
              <div className="text-center max-w-2xl mx-auto gap-2 mb-12">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.mapsTitle}</span>
                <h2 id="maps-main-heading" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight mt-1">
                  {lang === 'en' ? "Metropolitan General Headquarters" : "المقر والمساندة الميدانية الإقليمية"}
                </h2>
                <p className="text-xs text-gray-400 mt-2">
                  {currentTexts.mapsSub}
                </p>
              </div>

              <InteractiveMap isRtl={lang === 'ar'} />
            </section>

            {/* TESTIMONIALS SEC */}
            <section id="testimonials-block" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-12">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.testimonials}</span>
                <h2 id="testimonials-main-heading" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                  {lang === 'en' ? "Verified Structural Client Testimony" : "أراء شركاء النجاح في جودة التنفيذ"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {currentTexts.testimonialsSub}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div id={`testimonial-card-${t.id}`} key={t.id} className="p-6 rounded-xl border border-gray-850 bg-gray-950/20 relative flex flex-col justify-between">
                    <Quote className="absolute top-4 right-4 w-10 h-10 text-amber-500/5 rotate-180" />
                    
                    <div className="space-y-4">
                      {/* Star score */}
                      <div className="flex gap-1 text-amber-500">
                        {[...Array(t.rating)].map((_, rIdx) => (
                          <Star key={rIdx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic font-sans">
                        &ldquo;{t.content[lang]}&rdquo;
                      </p>
                    </div>

                    <div className="flex gap-3 items-center pt-6 mt-6 border-t border-gray-850">
                      <img
                        src={t.image}
                        alt={t.name[lang]}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                      />
                      <div>
                        <h4 id={`testimonial-client-name-${t.id}`} className="text-xs font-bold text-white uppercase">{t.name[lang]}</h4>
                        <span className="text-[10px] text-amber-500 font-mono uppercase block">{t.role[lang]}</span>
                        <span className="text-[9px] text-gray-500 font-mono block mt-0.5">{t.company[lang]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EXPERT INTERACTIVE FAQS EXPAND PANELS */}
            <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center space-y-3 mb-10 sm:mb-12">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.faq}</span>
                <h2 id="faqs-main-heading" className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                  {lang === 'en' ? "Expert Project Management Inquiries" : "التدقيق والتساؤلات الفنية المتداولة"}
                </h2>
                <p className="text-xs text-gray-400 font-mono">
                  {currentTexts.faqSub}
                </p>
              </div>

              <div className="space-y-3.5 font-mono">
                {FAQS.map((faq, fIdx) => (
                  <FAQAccordionItem key={faq.id} item={faq} index={fIdx} lang={lang} />
                ))}
              </div>
            </section>

          </div>
        )}

        {/* 2. ABOUT US MODULE VIEW */}
        {activePage === 'about' && (
          <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-6 sm:py-10">
            
            {/* Split layout about hero grid block with high-tech visual graphics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: text narrative */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.about}</span>
                <h2 id="about-main-title" className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
                  {lang === 'en' ? "A Monument of Engineering Perfection" : "صرح عظيم للكمال الهندسي"}
                </h2>
                <div className="h-[2px] w-20 bg-amber-500 rounded"></div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                  {currentTexts.aboutIntro}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {lang === 'en' 
                    ? "Through decades of heavy civil contracting, Al-Miraj has scaled to handle massive multi-million dollar masterworks with meticulous precision. We combine high-performance materials like pozzolan eco-concrete, Building Information Modeling, and rigorous osha safety policies."
                    : "عبر عقود من المقاولات العامة الثقيلة والهندسة الإنشائية، تطورت مجموعة المعراج لتتولى مشاريع ضخمة بمتطلبات دقيقة. نجمع بين المواد المتقدمة كالخرسانة الصديقة للبيئة والنمذجة السحابية وإدارة السلامة الصارمة لحفظ الأرواح وتحقيق دقة هندسية."
                  }
                </p>
              </div>

              {/* Right Column: Beautiful scenic grid of construction work images */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-gray-900 group aspect-[4/5] bg-gray-950">
                    <img 
                      src={HERO_IMAGE} 
                      alt="Industrial site Al-Miraj" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 filter brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 text-[9px] font-mono text-amber-500 font-bold uppercase px-2 py-0.5 rounded bg-[#010309]/80 border border-amber-500/20">
                      {lang === 'en' ? "Heavy Civil" : "إنشاءات ثقيلة"}
                    </span>
                  </div>
                  <div className="border border-gray-900 bg-[#060a16]/40 p-4 rounded-2xl flex flex-col justify-between">
                    <span className="text-[20px] font-bold text-amber-500 font-mono">150+</span>
                    <span className="text-[10px] text-gray-450 font-mono uppercase tracking-wider mt-1">{lang === 'en' ? "Landmarks Built" : "معلم تم تشييده"}</span>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6">
                  <div className="border border-gray-900 bg-[#060a16]/40 p-4 rounded-2xl flex flex-col justify-between">
                    <span className="text-[20px] font-bold text-[#10b981] font-mono">100%</span>
                    <span className="text-[10px] text-gray-450 font-mono uppercase tracking-wider mt-1">{lang === 'en' ? "OSHA Compliance" : "معايير السلامة"}</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-900 group aspect-[4/5] bg-gray-950">
                    <img 
                      src={STRUCTURE_IMAGE} 
                      alt="Industrial Steel structure Al-Miraj" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 filter brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 text-[9px] font-mono text-amber-500 font-bold uppercase px-2 py-0.5 rounded bg-[#010309]/80 border border-amber-500/20">
                      {lang === 'en' ? "Metal Structures" : "صناعي ومعماري"}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Mission Vision Values Grid */}
            <section id="mission-vision-values" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="border border-gray-850 bg-gray-950/20 p-6 sm:p-8 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg flex items-center justify-center font-bold font-mono mb-4">
                    MV
                  </div>
                  <h3 id="vision-box-heading" className="text-base font-mono font-bold text-white uppercase tracking-wider mb-2">{currentTexts.vision}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">{currentTexts.visionDesc}</p>
                </div>
              </div>

              <div className="border border-gray-850 bg-gray-950/20 p-6 sm:p-8 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg flex items-center justify-center font-bold font-mono mb-4">
                    MC
                  </div>
                  <h3 id="mission-box-heading" className="text-base font-mono font-bold text-white uppercase tracking-wider mb-2">{currentTexts.mission}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">{currentTexts.missionDesc}</p>
                </div>
              </div>
            </section>

            {/* Corporate Values Strip with Lucide icons */}
            <section id="values-strip" className="space-y-10">
              <h3 id="values-box-title" className="text-lg font-mono tracking-wide text-white uppercase font-bold text-center">
                {currentTexts.values}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-center">
                <div className="p-4 border border-gray-900 rounded-lg bg-gray-950/10">
                  <span className="text-amber-500 font-bold block mb-1">01. SOLID TRUTHFULNESS</span>
                  <span className="text-gray-400">{lang === 'en' ? "Honest, metric-based structural calculations" : "حسابات إنشائية صادقة واقعية"}</span>
                </div>
                <div className="p-4 border border-gray-900 rounded-lg bg-gray-950/10">
                  <span className="text-amber-500 font-bold block mb-1">02. HUMAN SECURITY FIRST</span>
                  <span className="text-gray-400">{lang === 'en' ? "Our OSHA policy takes precedent over speeds" : "معايير السلامة والأرواح مقدمة على السرعة"}</span>
                </div>
                <div className="p-4 border border-gray-900 rounded-lg bg-gray-950/10">
                  <span className="text-amber-500 font-bold block mb-1">03. THERMAL LONGEVITY</span>
                  <span className="text-gray-400">{lang === 'en' ? "Durable cement compounds to offset extreme sun cycles" : "إسمنت معالج يقاوم أقسى درجات الحرارة والتعرية"}</span>
                </div>
              </div>
            </section>

            {/* CHRONOLOGICAL MILESTONE TIMELINE */}
            <section id="milestones-timeline" className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.timelineTitle}</span>
                <p className="text-xs text-gray-400 font-mono">{currentTexts.timelineSub}</p>
              </div>

              <div className="relative border-l border-gray-800 ml-4 md:ml-0 md:border-l-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:bg-gray-800 space-y-10">
                {MILESTONES.map((stone, idx) => (
                  <div id={`milestone-node-${idx}`} key={idx} className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Circle marker nodes */}
                    <div className="absolute left-0 -translate-x-[4.5px] md:left-1/2 md:-translate-x-[4px] top-1.5 w-2 h-2 rounded-full bg-amber-500 border border-white shadow shadow-amber-500 animate-pulse"></div>

                    {/* Left/Right Container box spacing bounds */}
                    <div className="md:w-1/2 px-4 md:px-10">
                      <div className="p-5 border border-gray-850 bg-gray-950/40 rounded-xl">
                        <span className="text-xs font-mono font-bold text-amber-500 block mb-1">{stone.year}</span>
                        <h4 id={`milestone-title-${idx}`} className="text-sm font-semibold text-white uppercase">{stone.title[lang]}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">{stone.description[lang]}</p>
                      </div>
                    </div>
                    {/* Empty placeholder spacer */}
                    <div className="hidden md:block w-1/2"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* EXECUTIVE LEADERS LIST */}
            <section id="corporate-leaders" className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.teamTitle}</span>
                <p className="text-xs text-gray-400 font-mono">{currentTexts.teamSub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TEAM.map((member, mIdx) => (
                  <div id={`member-card-${mIdx}`} key={mIdx} className="border border-gray-850/80 bg-[#060811] p-5 rounded-xl text-center hover:border-amber-500/20 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name[lang]}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-amber-500/30 filter grayscale hover:grayscale-0 transition-all"
                    />
                    <h4 id={`member-name-${mIdx}`} className="text-sm font-bold text-white uppercase">{member.name[lang]}</h4>
                    <span className="text-[10.5px] text-amber-500 font-mono uppercase block tracking-wider mt-1">{member.role[lang]}</span>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans mt-3 px-2">
                      {member.bio[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ACCREDITED CERTIFICATIONS PANEL */}
            <section id="certifications" className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.certTitle}</span>
                <p className="text-xs text-gray-400 font-mono">{currentTexts.certSub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CERTIFICATIONS.map((cert) => (
                  <div id={`cert-it-${cert.id}`} key={cert.id} className="p-5 border border-gray-900 rounded-xl bg-gray-950/20 text-center relative flex flex-col justify-between">
                    <Award className="w-8 h-8 text-amber-500/80 mx-auto mb-1.5" />
                    <div>
                      <h4 id={`cert-title-${cert.id}`} className="text-xs font-semibold text-white uppercase tracking-wider">{cert.title[lang]}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-mono">{cert.issuer[lang]}</p>
                    </div>
                    <span className="text-[10.5px] text-amber-500 font-mono block mt-2.5">Year Accredited: {cert.year}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* 3. SERVICES SPECIFIC DETAILS TAB CONTAINER */}
        {activePage === 'services' && (
          <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-6 sm:py-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.services}</span>
              <h2 id="services-main-title" className="text-3xl font-display font-bold text-white uppercase tracking-tight">{currentTexts.ourServices}</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{currentTexts.ourServicesSub}</p>
            </div>

            <div className="space-y-16">
              {SERVICES.map((s, idx) => (
                <div id={`detailed-service-row-${s.id}`} key={s.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-gray-900 first:border-t-0">
                  
                  {/* Text Details Column */}
                  <div className={`lg:col-span-7 space-y-5 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="flex gap-4 items-center">
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                        {renderIcon(s.iconName, "w-6 h-6")}
                      </div>
                      <div>
                        <h3 id={`detailed-srv-title-${s.id}`} className="text-base sm:text-lg font-bold text-white uppercase">{s.title[lang]}</h3>
                        <span className="text-[10px] font-mono text-gray-500 block uppercase mt-0.5">{s.duration[lang]}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                      {s.longDesc[lang]}
                    </p>

                    <div className="space-y-3 bg-[#060a13] p-4 rounded-xl border border-gray-850">
                      <span className="text-[10px] font-mono text-amber-500 uppercase block font-bold">Key Project Deliverables:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {s.benefits[lang].map((ben, bIx) => (
                          <div id={`benefit-row-${bIx}`} key={bIx} className="flex gap-2 items-start">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-300 font-sans leading-relaxed">{ben}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Flow Chart Process Pathway Graphic representation Columns */}
                  <div className={`lg:col-span-5 space-y-4 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    {s.image && (
                      <div className="relative h-44 w-full rounded-xl overflow-hidden border border-gray-850 bg-gray-900 group">
                        <img 
                          src={s.image} 
                          alt={s.title[lang]} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500 filter brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono bg-black/75 backdrop-blur-xs p-2 rounded-lg border border-gray-800/80">
                          <span className="text-white font-semibold">{s.industrialStat[lang]}</span>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-950/60 border border-gray-850 p-5 rounded-xl space-y-4 font-mono text-xs">
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest block">Structural Workflow Sequence</span>
                      <div className="space-y-3 relative before:absolute before:inset-y-3 before:left-3.5 before:w-px before:bg-gray-800">
                        {s.process.map((step, sIdx) => (
                          <div id={`wf-node-${sIdx}`} key={sIdx} className="flex gap-4 items-start relative z-10">
                            <div className="w-7 h-7 rounded-full bg-gray-900 border border-gray-850 text-amber-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                              0{sIdx + 1}
                            </div>
                            <div>
                              <h5 id={`p-step-headline-${sIdx}`} className="text-xs font-semibold text-white uppercase">{step.title[lang]}</h5>
                              <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{step.desc[lang]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PORTFOLIO PAGE MODULE GALLERY */}
        {activePage === 'portfolio' && (
          <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-6 sm:py-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.portfolio}</span>
              <h2 id="portfolio-main-title" className="text-3xl font-display font-bold text-white uppercase tracking-tight">{currentTexts.ourPortfolio}</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{currentTexts.ourPortfolioSub}</p>
            </div>

            {/* Filtrations & Search Toolbar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-gray-950/40 p-3.5 rounded-xl border border-gray-900">
              {/* Category filter tabs */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['all', 'villas', 'towers', 'warehouses', 'roads', 'government'].map((cat) => (
                  <button
                    id={`filter-tab-${cat}`}
                    key={cat}
                    onClick={() => setPortfolioCategory(cat)}
                    className={`px-3 py-1.5 rounded transition-all uppercase font-medium cursor-pointer ${
                      portfolioCategory === cat 
                        ? 'bg-amber-600 text-white shadow-md font-semibold' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                    }`}
                  >
                    {/* Retrieve simple localized name tag */}
                    {cat === 'all' ? currentTexts.all : currentTexts[cat] || cat}
                  </button>
                ))}
              </div>

              {/* Dynamic search bar panel */}
              <div className="relative font-mono text-xs w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="portfolio-search-input"
                  type="text"
                  placeholder={currentTexts.searchPlaceholder}
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-lg pl-9 pr-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>

            {/* Showcase grid of matched items */}
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center font-mono text-sm text-gray-500">
                {lang === 'en' ? "No architectural projects found matching your filters." : "لم يتم العثور على أي مشاريع مطابقة لمعايير البحث."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    id={`portfolio-gallery-item-${project.id}`}
                    key={project.id}
                    className="group border border-gray-850 bg-gray-950/40 rounded-xl overflow-hidden focus:outline-none text-left flex flex-col justify-between"
                  >
                    {/* Render visual snapshots */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-900 object-cover">
                      <img
                        src={project.image}
                        alt={project.title[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
                      <span className="absolute top-3 left-3 bg-amber-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          {project.location[lang]}
                        </div>
                        <h4 id={`p-title-${project.id}`} className="text-sm font-semibold uppercase text-white mt-1.5">
                          {project.title[lang]}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2 lines-clamp-3 leading-relaxed font-sans">
                          {project.overview[lang]}
                        </p>
                      </div>

                      <div className="h-[1.5px] bg-gray-850 my-4" />

                      <div className="flex justify-between items-center text-[10.5px] overflow-hidden font-mono">
                        <div>
                          <span className="text-gray-500 block text-[9px] uppercase">INVESTMENT</span>
                          <span className="text-amber-500 font-bold">{project.valValue[lang]}</span>
                        </div>
                        <button
                          id={`p-modal-detail-btn-${project.id}`}
                          onClick={() => setSelectedProject(project)}
                          className="px-3 py-1.5 bg-gray-900 border border-gray-850 text-amber-500 hover:text-white hover:bg-amber-600 hover:border-amber-500 font-bold uppercase rounded text-[10px] transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{currentTexts.viewCaseStudy}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Construction Schedule Timeline */}
            <div className="pt-8 sm:pt-14 border-t border-gray-950/80">
              <ProjectTimeline 
                isRtl={lang === 'ar'} 
                activeProjectId={activeTimelineProjectId} 
                onSelectProject={(id) => setActiveTimelineProjectId(id)}
              />
            </div>

          </div>
        )}

        {/* 5. BLOG / ESSAYS MODULES */}
        {activePage === 'blog' && (
          <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-6 sm:py-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.blogTitle}</span>
              <h2 id="blog-main-title" className="text-3xl font-display font-gradient text-white uppercase tracking-tight">{currentTexts.blogTitle}</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{currentTexts.blogSub}</p>
            </div>

            {/* Dynamic searching */}
            <div className="flex justify-end p-2 border-b border-gray-900">
              <div className="relative font-mono text-xs w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="blog-search-input"
                  type="text"
                  placeholder={currentTexts.searchPlaceholder}
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-lg pl-9 pr-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="py-20 text-center font-mono text-xs text-gray-500">
                {lang === 'en' ? "No industrial articles matched your query." : "لم يتم العثور على أي مقالات هندسية مطابقة."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <div
                    id={`blog-card-item-${post.id}`}
                    key={post.id}
                    className="group border border-gray-900 bg-gray-950/20 rounded-xl overflow-hidden text-left flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                      <img
                        src={post.image}
                        alt={post.title[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Meta strip */}
                        <div className="flex gap-4 items-center text-[9.5px] font-mono text-gray-500 uppercase">
                          <span className="text-amber-500 font-bold">{post.category[lang]}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime[lang]}</span>
                        </div>

                        <h4 id={`b-title-${post.id}`} className="text-sm font-semibold uppercase text-white mt-3 select-none">
                          {post.title[lang]}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2 lines-clamp-3 leading-relaxed font-sans">
                          {post.excerpt[lang]}
                        </p>
                      </div>

                      <div className="pt-5 mt-5 border-t border-gray-900 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gray-500 truncate max-w-[130px]">{post.author[lang]}</span>
                        <button
                          id={`b-read-btn-${post.id}`}
                          onClick={() => setSelectedBlogPost(post)}
                          className="px-3 py-1.5 bg-gray-900 hover:bg-amber-600 border border-gray-850 hover:border-amber-500/50 text-amber-500 hover:text-white rounded text-[10px] font-mono uppercase font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{lang === 'en' ? "Read Insight" : "اقرأ المقال"}</span>
                          <ArrowRight className={`w-3 h-3 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. CONTACT US CONTEXT FORMS TAB SCREEN */}
        {activePage === 'contact' && (
          <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6 sm:py-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-amber-500 text-[10.5px] font-mono tracking-widest font-bold uppercase">{currentTexts.contact}</span>
              <h2 id="contact-main-heading" className="text-3xl font-display font-bold text-white uppercase tracking-tight">{currentTexts.contactTitle}</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{currentTexts.contactSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column Form Input Fields */}
              <div className="lg:col-span-7 bg-[#050811] border border-gray-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
                <form id="consultation-request-form" onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                  
                  {formSubmitted ? (
                    <div className="p-5 border border-emerald-500/20 bg-emerald-500/10 rounded-xl space-y-4">
                      <div className="flex gap-2 items-center text-emerald-400 font-bold uppercase">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{lang === 'en' ? "COMMUNICATION SECURED" : "تم استلام الطلب بأمان"}</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        {currentTexts.formSuccess}
                      </p>
                      <button
                        id="form-reset-btn"
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded text-[11px] font-mono cursor-pointer"
                      >
                        {lang === 'en' ? "Log Another Inquiry" : "تسجيل استشارة أخرى"}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label id="lbl-name" className="text-gray-400 block font-bold uppercase">{currentTexts.nameLabel} *</label>
                          <input
                            id="input-name"
                            required
                            type="text"
                            placeholder="e.g. Samir Al-Miraj"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label id="lbl-phone" className="text-gray-400 block font-bold uppercase">{currentTexts.phoneLabel}</label>
                          <input
                            id="input-phone"
                            type="text"
                            placeholder="+966 50 000 0000"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label id="lbl-email" className="text-gray-400 block font-bold uppercase">{currentTexts.emailLabel} *</label>
                          <input
                            id="input-email"
                            required
                            type="email"
                            placeholder="name@organization.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label id="lbl-company" className="text-gray-400 block font-bold uppercase">{currentTexts.companyLabel}</label>
                          <input
                            id="input-company"
                            type="text"
                            placeholder="e.g. Al-Yasmin Group"
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label id="lbl-message" className="text-gray-400 block font-bold uppercase">{currentTexts.msgLabel} *</label>
                        <textarea
                          id="input-message"
                          required
                          rows={4}
                          placeholder={currentTexts.msgPlaceholder}
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                        ></textarea>
                      </div>

                      {/* Submit dispatch button */}
                      <button
                        id="submit-form-btn"
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-500/20 text-white font-bold tracking-wider uppercase rounded-lg text-xs shadow hover:shadow-amber-500/15 cursor-pointer"
                      >
                        {currentTexts.sendMsg}
                      </button>
                    </>
                  )}
                </form>
              </div>

              {/* Right Column Office detail strips and Direct WhatsApp helpline */}
              <div className="lg:col-span-5 flex flex-col justify-between spacing-y-6 bg-gray-950/40 p-6 rounded-2xl border border-gray-900/60">
                <div className="space-y-6">
                  <h4 id="quick-contact-title" className="text-sm font-bold font-mono tracking-wider uppercase text-amber-500">
                    {lang === 'en' ? "Direct Procurement Helplines" : "خطوط المشتريات والارتباط الهيكلي"}
                  </h4>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="flex gap-3 items-start">
                      <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">SAUDI ARABIA CO-ORDINATES</span>
                        <a href="tel:+966114090011" id="procure-sa-call" className="text-white hover:text-amber-500">+966 11 409 0011</a>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">UNITED ARAB EMIRATES CONTACT</span>
                        <a href="tel:+97143309900" id="procure-uae-call" className="text-white hover:text-amber-500">+971 4 330 9900</a>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">OFFICIAL SECURED CORRESPONDENCES</span>
                        <a href="mailto:epc.bid@al-miraj.com" id="procure-email" className="text-white hover:text-amber-500">epc.bid@al-miraj.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-850"></div>

                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {lang === 'en' 
                      ? "Submitting custom architectural packages to the left will immediately sync with the regional CRM module panel displayed below." 
                      : "إرسال حزم الهندسة والمخططات الخاصة بك سينعكس تلقائياً على لوحة معالجة CRM المباشرة والمدرجة بالأسفل بمستند ميزانية أولي."}
                  </p>
                </div>

                <div className="pt-6 sm:pt-0">
                  <button
                    id="contact-whatsapp"
                    onClick={() => window.open('https://wa.me/96650000000', '_blank')}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-lg font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>{currentTexts.whatsappBtn}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Google Map Embed section for Contact page */}
            <div className="bg-gray-950/20 border border-gray-900/60 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="text-sm font-bold font-mono tracking-wider uppercase text-amber-500">
                    {lang === 'en' ? "Headquarters Location" : "موقع المقر الرئيسي"}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans mt-1">
                    {lang === 'en' ? "Kingdom Centre, King Fahd Rd, Riyadh, Saudi Arabia" : "برج المملكة، طريق الملك فهد، الرياض، المملكة العربية السعودية"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-gray-300">{lang === 'en' ? "Active Live Route" : "مسار نشط مباشر"}</span>
                </div>
              </div>
              <div className="h-[300px] sm:h-[380px] w-full rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.846549925206!2d46.67184207604474!3d24.711516678028212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0326490696b9%3A0xf67f8fb8cf60eb24!2sKingdom%20Centre!5e0!3m2!1sen!2ssa!4v1717600000000!5m2!1sen!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: theme === 'light' ? 'none' : 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER BLOCK INTEGRAL SYSTEM */}
      <footer id="app-footer" className="bg-[#050a1b] border-t border-gray-900 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 items-stretch">
          
          {/* Brand Intro info col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 border-2 border-amber-500 rounded flex items-center justify-center bg-gray-950 font-mono font-bold text-amber-500 text-sm">
                AM
              </div>
              <span className="font-display text-base font-bold text-white tracking-widest">{currentTexts.brand}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              {currentTexts.footerIntro}
            </p>
          </div>

          {/* Quick link sections col */}
          <div>
            <h5 id="footer-links-title" className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">{currentTexts.quickLinks}</h5>
            <div className="flex flex-col gap-2.5 font-mono text-[11px] text-gray-400">
              {(['home', 'about', 'services', 'portfolio'] as Page[]).map((p) => (
                <button
                  id={`foot-lnk-${p}`}
                  key={p}
                  onClick={() => { setActivePage(p); window.scrollTo(0, 0); }}
                  className="text-left hover:text-amber-500 transition-colors uppercase w-fit cursor-pointer"
                >
                  {currentTexts[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Insight articles col */}
          <div>
            <h5 id="footer-insights-title" className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Latest Insights</h5>
            <div className="flex flex-col gap-2.5 font-mono text-[11px] text-gray-400">
              {(['blog', 'contact'] as Page[]).map((p) => (
                <button
                  id={`foot-lnk-${p}`}
                  key={p}
                  onClick={() => { setActivePage(p); window.scrollTo(0, 0); }}
                  className="text-left hover:text-amber-500 transition-colors uppercase w-fit cursor-pointer"
                >
                  {currentTexts[p]}
                </button>
              ))}
              <span className="text-[10px] text-gray-600 block pt-1">OSHA Standard 319-X2 Compliant</span>
            </div>
          </div>

          {/* Contact coordinates and direct mail bid col */}
          <div className="space-y-4">
            <h5 id="footer-corporate-coordinates-title" className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Coordinates</h5>
            <div className="space-y-2.5 font-mono text-[11px] text-gray-400">
              <span className="block">{lang === 'en' ? "Kingdom Plaza Tower, Olaya, Riyadh, Saudi Arabia" : "برج كينجدوم سنتر، العليا، حي الرياض، المملكة العربية السعودية"}</span>
              <span className="block text-amber-500 font-bold">{lang === 'en' ? "Direct lines: +966 11 409 0011" : "الهاتف المباشر: +966 11 409 0011"}</span>
              <a href="mailto:info@al-miraj.com" id="foot-mail" className="block text-gray-300 hover:text-amber-500 underline underline-offset-2">info@al-miraj.com</a>
            </div>
          </div>

        </div>

        {/* Outer credit line */}
        <div className="border-t border-gray-900/60 py-6 text-center text-[10px] font-mono text-gray-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>{currentTexts.allRightsReserved}</span>
          <button
            id="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-amber-500/60 hover:text-amber-500 uppercase transition-colors cursor-pointer"
          >
            {currentTexts.backToTop} ↑
          </button>
        </div>
      </footer>


      {/* ---------------------------------------------------- */}
      {/* 7. PORTFOLIO CASE STUDY EXPAND MODAL VIEW */}
      {selectedProject && (
        <div id="project-detail-modal-bg" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#050811] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header toolbar */}
            <div className="p-4 border-b border-gray-850 flex items-center justify-between bg-[#080d19]">
              <div>
                <span className="text-[9px] font-mono uppercase text-amber-500 font-bold tracking-wider">{selectedProject.category} // CASE STUDY</span>
                <h3 id="modal-project-title" className="text-base font-bold text-white uppercase">{selectedProject.title[lang]}</h3>
              </div>
              <button
                id="close-project-modal"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 border border-gray-850 hover:border-amber-500 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable sheet body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Visual rendering left */}
                <div className="md:col-span-7 relative aspect-video rounded-xl bg-gray-950 overflow-hidden shrink-0 border border-gray-850/60">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent"></div>
                </div>

                {/* Key metadata cards right */}
                <div className="md:col-span-5 bg-[#070b13] border border-gray-850/80 rounded-xl p-4 font-mono text-[11px] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">{lang === 'en' ? "PROJECT OVERVIEW DATA" : "المعطيات الإنشائية للمشروع"}</span>
                    <div className="flex justify-between border-b border-gray-900 pb-1.5 text-gray-400">
                      <span>{currentTexts.client}:</span>
                      <span className="text-white font-semibold">{selectedProject.client[lang]}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-900 pb-1.5 text-gray-400">
                      <span>{currentTexts.location}:</span>
                      <span className="text-white font-semibold">{selectedProject.location[lang]}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-900 pb-1.5 text-gray-400">
                      <span>{currentTexts.area}:</span>
                      <span className="text-white font-semibold">{selectedProject.area[lang]}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>{currentTexts.year}:</span>
                      <span className="text-white font-semibold">{selectedProject.year}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/5 rounded border border-amber-500/10 text-center">
                    <span className="text-[9px] text-gray-500 uppercase block font-bold">{currentTexts.projectVal}</span>
                    <span className="text-xs text-amber-500 font-bold block mt-0.5">{selectedProject.valValue[lang]}</span>
                  </div>
                </div>
              </div>

              {/* Problem/Solution descriptive core */}
              <div className="space-y-4">
                <div className="p-4 border-l-2 border-amber-500 bg-[#060a14] rounded-r-lg">
                  <h4 id="case-study-overview-heading" className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold mb-1">{currentTexts.overview}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedProject.overview[lang]}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-[#050812]/50 p-4 rounded-xl border border-gray-900/40">
                    <h5 id="case-study-challenge-heading" className="text-xs font-mono uppercase text-red-400 font-bold mb-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      {currentTexts.challenges}
                    </h5>
                    <p className="text-[11.5px] text-gray-400 leading-relaxed font-sans">{selectedProject.challenge[lang]}</p>
                  </div>

                  <div className="bg-[#050812]/50 p-4 rounded-xl border border-gray-900/40">
                    <h5 id="case-study-solution-heading" className="text-xs font-mono uppercase text-amber-500 font-bold mb-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {currentTexts.solution}
                    </h5>
                    <p className="text-[11.5px] text-gray-400 leading-relaxed font-sans">{selectedProject.solution[lang]}</p>
                  </div>

                  <div className="bg-[#050812]/50 p-4 rounded-xl border border-gray-900/40">
                    <h5 id="case-study-results-heading" className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {currentTexts.results}
                    </h5>
                    <p className="text-[11.5px] text-gray-400 leading-relaxed font-sans">{selectedProject.result[lang]}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer triggers */}
            <div className="p-4 border-t border-gray-850 bg-[#070b13] flex justify-between items-center">
              <span className="text-[9.5px] font-mono text-gray-500 uppercase">OSHA incident coefficient audited</span>
              <button
                id="close-project-modal-bottom"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold font-mono uppercase rounded transition-all cursor-pointer"
              >
                {currentTexts.closeBtn}
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ---------------------------------------------------- */}
      {/* 8. BLOG / ESSAY DETAIL READ MODAL VIEW */}
      {selectedBlogPost && (
        <div id="blog-detail-modal-bg" className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#050811] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-4 border-b border-gray-850 flex items-center justify-between bg-[#080d19]">
              <div>
                <span className="text-[9.5px] font-mono uppercase text-amber-500 font-bold tracking-wider">{selectedBlogPost.category[lang]} // RESEARCH INSIGHT</span>
                <h3 id="modal-blog-title" className="text-base font-bold text-white uppercase">{selectedBlogPost.title[lang]}</h3>
              </div>
              <button
                id="close-blog-modal"
                onClick={() => setSelectedBlogPost(null)}
                className="p-1.5 border border-gray-850 hover:border-amber-500 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              <div className="relative aspect-video w-full rounded-xl bg-gray-950 overflow-hidden shrink-0 border border-gray-850">
                <img
                  src={selectedBlogPost.image}
                  alt={selectedBlogPost.title[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Author & reading values */}
              <div className="flex justify-between items-center border-b border-gray-900 pb-4 font-mono text-xs text-gray-500 uppercase">
                <div>
                  <span className="text-[9.5px] text-gray-500 block">AUTHOR</span>
                  <span className="text-white font-bold block">{selectedBlogPost.author[lang]}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] text-gray-500 block">PUBLICATION DATE</span>
                  <span className="text-white font-bold block">{selectedBlogPost.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] text-gray-500 block">{currentTexts.readTime}</span>
                  <span className="text-amber-500 font-bold block">{selectedBlogPost.readTime[lang]}</span>
                </div>
              </div>

              {/* Detailed scientific essay text body */}
              <div className="space-y-4 font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                <p className="italic text-gray-400 font-mono text-xs pl-3 border-l-2 border-amber-600">
                  {selectedBlogPost.excerpt[lang]}
                </p>
                <div className="whitespace-pre-line space-y-3 pt-2">
                  {/* Generate rich paragraphs from essay structure content */}
                  {selectedBlogPost.content[lang]}
                  <br /><br />
                  {lang === 'en' ? (
                    <>
                      Following empirical mechanical and geotechnical reviews, Al-Miraj Construction continues implementing automated telemetry across structural girders. In complex climate areas, material density monitoring remains our primary benchmark to prevent long-term environmental degradation...
                    </>
                  ) : (
                    <>
                      بناءً على عمليات المراجعة الجيوتقنية والميكانيكية المستمرة، تواصل مجموعة المعراج دمج الأجهزة الرقمية ومستشعرات الرصد اللاسلكية. في البيئات والمناطق المناخية القاسية، يعتبر الحفاظ على كثافة المكونات وجودتها الحرارية هو ركيزتنا الأولى لمنع التحلل الطبيعي على المدى الطويل...
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Footer Close control */}
            <div className="p-4 border-t border-gray-850 bg-[#070b13] flex justify-between items-center">
              <span className="text-[9px] font-mono text-gray-500">AL-MIRAJ JOURNAL OF ADVANCED STRUCTURAL CONCRETE</span>
              <button
                id="close-blog-modal-bottom"
                onClick={() => setSelectedBlogPost(null)}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold font-mono uppercase rounded transition-all cursor-pointer"
              >
                {currentTexts.closeBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

interface FAQAccordionProps {
  key?: string;
  item: any;
  index: number;
  lang: Language;
}

// Sub-Component: FAQ Accordion Item with active local state toggle
function FAQAccordionItem({ item, index, lang }: FAQAccordionProps) {
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  return (
    <div id={`faq-accordion-item-${item.id}`} className="border border-gray-850 rounded-xl overflow-hidden bg-[#060a13]">
      <button
        id={`faq-accordion-title-${item.id}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 focus:outline-none flex items-center justify-between text-white font-mono hover:text-amber-500 transition-colors cursor-pointer"
      >
        <span className="text-xs sm:text-sm font-semibold pr-4">{item.question[lang]}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${expanded ? 'rotate-180 text-amber-500' : 'text-gray-500'}`} />
      </button>

      {expanded && (
        <div id={`faq-accordion-ans-${item.id}`} className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed font-sans border-t border-gray-900/60 transition-all">
          {item.answer[lang]}
        </div>
      )}
    </div>
  );
}
