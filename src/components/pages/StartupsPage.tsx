import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Startups } from '@/entities';
import { Button } from '@/components/ui/button';

export default function StartupsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startups, setStartups] = useState<Startups[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedStage, setSelectedStage] = useState(searchParams.get('stage') || '');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  const categories = ['Technology', 'AI / Machine Learning', 'SaaS', 'FinTech', 'HealthTech', 'Consumer', 'EdTech', 'Enterprise / B2B', 'Mobility / Transportation', 'Sustainability / Climate'];
  const stages = ['Idea', 'MVP', 'Early Revenue', 'Growth', 'Scale'];

  useEffect(() => {
    loadStartups();
  }, [skip]);

  useEffect(() => {
    setSkip(0);
    loadStartups(true);
  }, [selectedCategory, selectedStage, searchTerm]);

  const loadStartups = async (reset = false) => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Startups>('startups', {}, { 
        limit: 12,
        skip: reset ? 0 : skip 
      });
      
      const filtered = result.items.filter(startup => {
        const matchesSearch = !searchTerm || 
          startup.startupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.founderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.productServiceDescription?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || startup.category === selectedCategory;
        const matchesStage = !selectedStage || startup.stage === selectedStage;
        
        return matchesSearch && matchesCategory && matchesStage;
      });
      
      if (reset) {
        setStartups(filtered);
      } else {
        setStartups(prev => [...prev, ...filtered]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading startups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setSkip(prev => prev + 12);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStage('');
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedStage;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="w-full bg-gray-50 py-16 lg:py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
          <h1 className="font-heading text-5xl lg:text-6xl text-gray-900 mb-4">
            Explore Startups
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-gray-600 max-w-3xl">
            Browse our curated collection of innovative startups across various industries and stages
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-16 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, founder, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 focus:outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Stage Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 focus:outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">All Stages</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            
            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="lg:col-span-1">
                <button
                  onClick={clearFilters}
                  className="w-full h-full px-4 py-3 border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center"
                  title="Clear filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 font-paragraph text-sm text-gray-900">
                  Search: {searchTerm}
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 font-paragraph text-sm text-gray-900">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedStage && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 font-paragraph text-sm text-gray-900">
                  Stage: {selectedStage}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Startups Grid */}
      <section className="w-full py-12 lg:py-16 flex-grow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading && skip === 0 ? null : startups.length > 0 ? (
              startups.map((startup, index) => (
                <motion.div
                  key={startup._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/startups/${startup._id}`}>
                    <div className="bg-white border border-gray-200 p-8 hover:border-sky-500 hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 font-paragraph text-xs text-gray-900 uppercase tracking-wider">
                          {startup.category}
                        </span>
                        <span className="font-paragraph text-xs text-gray-600 uppercase">
                          {startup.stage}
                        </span>
                      </div>
                      
                      <h3 className="font-heading text-2xl text-gray-900 mb-2">
                        {startup.startupName}
                      </h3>
                      
                      <p className="font-paragraph text-sm text-gray-600 mb-4">
                        Founded by {startup.founderName}
                      </p>
                      
                      <p className="font-paragraph text-base text-gray-700 mb-6 flex-grow line-clamp-3">
                        {startup.productServiceDescription}
                      </p>
                      
                      <div className="space-y-2 pt-4 border-t border-gray-200">
                        {startup.monthlyRecurringRevenue !== undefined && startup.monthlyRecurringRevenue > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="font-paragraph text-sm text-gray-600">MRR</span>
                            <span className="font-paragraph text-sm text-gray-900 font-semibold">
                              ${startup.monthlyRecurringRevenue.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {startup.numberOfUsers !== undefined && startup.numberOfUsers > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="font-paragraph text-sm text-gray-600">Users</span>
                            <span className="font-paragraph text-sm text-gray-900 font-semibold">
                              {startup.numberOfUsers.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-end mt-4 text-sky-500">
                        <span className="font-paragraph text-sm mr-2">View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-2xl text-gray-900 mb-2">
                  No startups found
                </h3>
                <p className="font-paragraph text-base text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    className="border border-gray-300 text-gray-900 hover:bg-gray-100"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Load More */}
          {!isLoading && hasNext && startups.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 text-gray-900 font-paragraph text-base hover:bg-gray-100 transition-colors"
              >
                Load More Startups
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
