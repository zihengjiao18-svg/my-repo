// HPI 1.7-V
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Search, ArrowRight, ArrowUpRight, Filter, Activity, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Startups } from '@/entities';

// --- Types ---
interface CategoryCardProps {
  category: string;
  index: number;
}

interface StartupCardProps {
  startup: Startups;
  index: number;
}

// --- Components ---

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12 opacity-20">
    <div className="h-px w-full max-w-[120rem] bg-primary" />
  </div>
);

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  return (
    <Link to={`/startups?category=${category}`} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="relative h-full min-h-[240px] p-8 border border-primary/10 bg-background hover:bg-secondary/20 transition-colors duration-500 flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-6 h-6 text-primary" />
        </div>
        <span className="font-paragraph text-xs tracking-widest uppercase text-primary/60">
          Sector 0{index + 1}
        </span>
        <h3 className="font-heading text-3xl text-primary mt-4 relative z-10">
          {category}
        </h3>
        <div className="w-8 h-px bg-primary/20 group-hover:w-full transition-all duration-500 mt-auto" />
      </motion.div>
    </Link>
  );
};

const StartupCard: React.FC<StartupCardProps> = ({ startup, index }) => {
  return (
    <Link to={`/startups/${startup._id}`} className="group block w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-primary/20 group-hover:bg-secondary/10 transition-colors duration-500"
      >
        {/* Image Column */}
        <div className="md:col-span-4 lg:col-span-3 relative h-64 md:h-auto overflow-hidden border-r border-primary/10">
          <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500" />
          <Image
            src="https://static.wixstatic.com/media/0d3405_4dc4fe4df66b4b5eb59b642e2d7eeee9~mv2.png?originWidth=576&originHeight=384"
            alt={startup.startupName || 'Startup'}
            width={600}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Content Column */}
        <div className="md:col-span-8 lg:col-span-9 p-8 md:p-12 flex flex-col justify-between relative">
          <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
            <ArrowRight className="w-8 h-8 text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 border border-primary/20 rounded-full text-xs font-paragraph uppercase tracking-wider text-primary/80">
                {startup.category}
              </span>
              <span className="text-xs font-paragraph uppercase tracking-wider text-primary/60">
                {startup.stage}
              </span>
            </div>
            <h3 className="font-heading text-4xl md:text-5xl text-primary mb-4 group-hover:text-linkcolor transition-colors">
              {startup.startupName}
            </h3>
            <p className="font-paragraph text-lg text-primary/70 max-w-2xl line-clamp-2">
              {startup.productServiceDescription}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-8 pt-8 border-t border-primary/10">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-primary/40 mb-1">Founder</span>
              <span className="font-heading text-lg text-primary">{startup.founderName}</span>
            </div>
            {(startup.monthlyRecurringRevenue || 0) > 0 && (
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-primary/40 mb-1">MRR</span>
                <span className="font-heading text-lg text-primary">${startup.monthlyRecurringRevenue?.toLocaleString()}</span>
              </div>
            )}
             {(startup.numberOfUsers || 0) > 0 && (
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-primary/40 mb-1">Users</span>
                <span className="font-heading text-lg text-primary">{startup.numberOfUsers?.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function HomePage() {
  // --- State & Data ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [startups, setStartups] = useState<Startups[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['Technology', 'AI / Machine Learning', 'SaaS', 'FinTech', 'HealthTech', 'Consumer', 'EdTech', 'Enterprise / B2B', 'Mobility / Transportation', 'Sustainability / Climate'];
  const stages = ['Idea', 'MVP', 'Early Revenue', 'Growth', 'Scale'];

  // --- Effects ---
  useEffect(() => {
    const loadStartups = async () => {
      setIsLoading(true);
      try {
        const result = await BaseCrudService.getAll<Startups>('startups', {}, { limit: 6 });
        setStartups(result.items);
      } catch (error) {
        console.error('Error loading startups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStartups();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedStage) params.set('stage', selectedStage);
    window.location.href = `/startups?${params.toString()}`;
  };

  // --- Scroll Animations ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex flex-col overflow-x-hidden selection:bg-primary selection:text-background">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full flex flex-col">
        {/* Top Half: Typography & Search */}
        <div className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 lg:px-24 z-10 relative">
          <div className="max-w-[120rem] mx-auto">
            <motion.div 
              style={{ opacity: heroTextOpacity }}
              className="flex flex-col items-start"
            >
              <h1 className="font-heading text-[12vw] leading-[0.85] text-primary tracking-tight mb-8">
                LEADIFYA
              </h1>
              <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-t border-primary pt-8">
                <p className="font-heading text-2xl md:text-4xl text-primary max-w-2xl leading-tight">
                  A curated database of startups for VCs to explore key metrics and connect with founders.
                </p>
                
                {/* Search Interface */}
                <div className="w-full lg:w-auto flex flex-col md:flex-row gap-4 items-stretch">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Search startups..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-80 pl-12 pr-4 py-4 bg-transparent border border-primary/20 font-paragraph text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary focus:bg-secondary/10 transition-all"
                    />
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-6 py-4 bg-transparent border border-primary/20 font-paragraph text-primary focus:outline-none focus:border-primary focus:bg-secondary/10 transition-all cursor-pointer appearance-none min-w-[160px]"
                    >
                      <option value="">Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleSearch}
                      className="px-8 py-4 bg-primary text-primary-foreground font-paragraph hover:bg-primary/90 transition-colors flex items-center justify-center"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Half: Full Bleed Image */}
        <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
          <motion.div 
            style={{ y: heroImageY }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <Image
              src="https://static.wixstatic.com/media/0d3405_6a4699f30ff245c2b5fa468d7d069157~mv2.png?originWidth=2048&originHeight=832"
              alt="Artisanal workspace"
              width={2400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* --- TICKER SECTION --- */}
      <div className="w-full border-y border-primary/10 bg-secondary/10 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              {categories.map((cat) => (
                <span key={cat} className="font-heading text-xl md:text-2xl text-primary/60 uppercase tracking-widest flex items-center gap-12">
                  {cat} <span className="w-2 h-2 rounded-full bg-primary/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}</style>
      </div>

      {/* --- MANIFESTO / VISION SECTION (Sticky) --- */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="block font-paragraph text-xs uppercase tracking-[0.2em] text-primary/60 mb-6">
                  The Philosophy
                </span>
                <h2 className="font-heading text-5xl md:text-6xl text-primary leading-none mb-8">
                  Artisanal<br />Intelligence.
                </h2>
                <p className="font-paragraph text-lg text-primary/70 max-w-sm">
                  We believe that finding the next unicorn is an art form. We curate data with the precision of a craftsman.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-24">
              {[
                { icon: Activity, title: "Verified Metrics", text: "Every data point is rigorously checked. No estimates, only facts." },
                { icon: Users, title: "Founder Access", text: "Direct lines to the visionaries building the future." },
                { icon: TrendingUp, title: "Growth Signals", text: "Identify momentum before the market catches on." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row gap-8 items-start border-b border-primary/10 pb-16"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl text-primary mb-4">{item.title}</h3>
                    <p className="font-paragraph text-xl text-primary/60 max-w-xl">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED STARTUPS (The Collection) --- */}
      <section className="w-full py-24 bg-background relative">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="block font-paragraph text-xs uppercase tracking-[0.2em] text-primary/60 mb-4">
                The Collection
              </span>
              <h2 className="font-heading text-5xl md:text-7xl text-primary">
                Featured Startups
              </h2>
            </div>
            <Link 
              to="/startups" 
              className="hidden md:flex items-center gap-2 text-primary hover:text-primary/70 transition-colors font-paragraph uppercase tracking-widest text-sm border-b border-primary pb-1"
            >
              View Full Database <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col w-full">
            {isLoading ? (
              <div className="w-full h-96 flex items-center justify-center border border-primary/10 bg-secondary/5">
                <div className="animate-pulse font-heading text-2xl text-primary/40">Loading Collection...</div>
              </div>
            ) : startups.length > 0 ? (
              startups.map((startup, index) => (
                <StartupCard key={startup._id} startup={startup} index={index} />
              ))
            ) : (
              <div className="w-full py-32 text-center border border-primary/10">
                <p className="font-paragraph text-primary/60">No startups currently available.</p>
              </div>
            )}
          </div>

          <div className="mt-16 md:hidden flex justify-center">
            <Link 
              to="/startups" 
              className="flex items-center gap-2 text-primary font-paragraph uppercase tracking-widest text-sm border-b border-primary pb-1"
            >
              View Full Database <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES GRID --- */}
      <section className="w-full py-32 bg-secondary/10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">Curated Sectors</h2>
            <p className="font-paragraph text-lg text-primary/70">Explore innovation by industry vertical.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-primary/10 border border-primary/10">
            {categories.map((category, index) => (
              <div key={category} className="bg-background">
                <CategoryCard category={category} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-40 px-6 md:px-12 lg:px-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <Image
              src="https://static.wixstatic.com/media/0d3405_38dbbe6963ab4334b8bfdbaafda14f8a~mv2.png?originWidth=1920&originHeight=1024"
              alt="Background texture"
              width={1920}
              className="w-full h-full object-cover grayscale"
            />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl mb-8 leading-tight"
          >
            Ready to shape the future?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-primary-foreground/80 mb-12"
          >
            Join the network of visionaries and craftsmen building tomorrow's world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-background text-primary font-heading text-xl hover:bg-secondary transition-colors duration-300"
            >
              Get in Touch <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}