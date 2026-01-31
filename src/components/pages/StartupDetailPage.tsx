import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Users, DollarSign, TrendingUp, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Startups } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function StartupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startups | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStartup();
  }, [id]);

  const loadStartup = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await BaseCrudService.getById<Startups>('startups', id);
        setStartup(data);
      }
    } catch (error) {
      console.error('Error loading startup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-grow min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !startup ? (
          <div className="max-w-[120rem] mx-auto px-6 lg:px-16 py-20 text-center">
            <h2 className="font-heading text-3xl text-primary mb-4">
              Startup Not Found
            </h2>
            <p className="font-paragraph text-lg text-primary/60 mb-8">
              The startup you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/startups"
              className="inline-flex items-center gap-2 px-6 py-3 border border-buttonborder text-primary hover:bg-buttonborder hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Startups
            </Link>
          </div>
        ) : (
          <>
            {/* Back Navigation */}
            <div className="w-full border-b border-buttonborder/20 bg-background">
              <div className="max-w-[120rem] mx-auto px-6 lg:px-16 py-4">
                <Link
                  to="/startups"
                  className="inline-flex items-center gap-2 font-paragraph text-sm text-primary hover:text-linkcolor transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Startups
                </Link>
              </div>
            </div>

            {/* Startup Header */}
            <section className="w-full bg-secondary/10 py-16 lg:py-20">
              <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="inline-block px-4 py-2 bg-secondary/60 font-paragraph text-sm text-primary uppercase tracking-wider">
                      {startup.category}
                    </span>
                    <span className="inline-block px-4 py-2 bg-background border border-buttonborder/30 font-paragraph text-sm text-primary uppercase tracking-wider">
                      {startup.stage}
                    </span>
                  </div>
                  
                  <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
                    {startup.startupName}
                  </h1>
                  
                  <p className="font-paragraph text-xl lg:text-2xl text-primary/70 mb-8">
                    Founded by {startup.founderName}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Main Content */}
            <section className="w-full py-16 lg:py-20">
              <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                  {/* Left Column - Details */}
                  <div className="lg:col-span-2 space-y-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <h2 className="font-heading text-3xl text-primary mb-6">
                        About the Product
                      </h2>
                      <p className="font-paragraph text-lg text-primary/80 leading-relaxed">
                        {startup.productServiceDescription}
                      </p>
                    </motion.div>

                    {/* Key Metrics */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h2 className="font-heading text-3xl text-primary mb-6">
                        Key Metrics
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {startup.monthlyRecurringRevenue !== undefined && startup.monthlyRecurringRevenue > 0 && (
                          <div className="bg-secondary/20 border border-buttonborder/20 p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <DollarSign className="w-6 h-6 text-linkcolor" />
                              <h3 className="font-heading text-lg text-primary">
                                Monthly Recurring Revenue
                              </h3>
                            </div>
                            <p className="font-paragraph text-3xl text-primary font-semibold">
                              ${startup.monthlyRecurringRevenue.toLocaleString()}
                            </p>
                          </div>
                        )}
                        
                        {startup.numberOfUsers !== undefined && startup.numberOfUsers > 0 && (
                          <div className="bg-secondary/20 border border-buttonborder/20 p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <Users className="w-6 h-6 text-linkcolor" />
                              <h3 className="font-heading text-lg text-primary">
                                Total Users
                              </h3>
                            </div>
                            <p className="font-paragraph text-3xl text-primary font-semibold">
                              {startup.numberOfUsers.toLocaleString()}
                            </p>
                          </div>
                        )}
                        
                        <div className="bg-secondary/20 border border-buttonborder/20 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <TrendingUp className="w-6 h-6 text-linkcolor" />
                            <h3 className="font-heading text-lg text-primary">
                              Current Stage
                            </h3>
                          </div>
                          <p className="font-paragraph text-2xl text-primary font-semibold">
                            {startup.stage}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column - Contact Card */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="sticky top-24"
                    >
                      <div className="bg-secondary/20 border border-buttonborder/30 p-8">
                        <h3 className="font-heading text-2xl text-primary mb-6">
                          Connect with Founder
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                          <div>
                            <p className="font-paragraph text-sm text-primary/60 mb-1">
                              Founder
                            </p>
                            <p className="font-paragraph text-lg text-primary font-semibold">
                              {startup.founderName}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-paragraph text-sm text-primary/60 mb-1">
                              Company
                            </p>
                            <p className="font-paragraph text-lg text-primary font-semibold">
                              {startup.startupName}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-paragraph text-sm text-primary/60 mb-1">
                              Industry
                            </p>
                            <p className="font-paragraph text-lg text-primary font-semibold">
                              {startup.category}
                            </p>
                          </div>
                        </div>
                        
                        {startup.contactLink && (
                          <a
                            href={startup.contactLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-buttonborder text-primary font-paragraph text-base hover:bg-buttonborder hover:text-primary-foreground transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Contact Founder
                          </a>
                        )}
                        
                        <div className="mt-6 pt-6 border-t border-buttonborder/30">
                          <p className="font-paragraph text-sm text-primary/60 text-center mb-4">
                            Interested in learning more?
                          </p>
                          <Link
                            to="/contact"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-background border border-buttonborder/30 text-primary font-paragraph text-sm hover:border-buttonborder transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            Send Inquiry
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Startups CTA */}
            <section className="w-full bg-secondary/10 py-16 lg:py-20">
              <div className="max-w-[120rem] mx-auto px-6 lg:px-16 text-center">
                <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-4">
                  Explore More Startups
                </h2>
                <p className="font-paragraph text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
                  Discover other innovative companies in {startup.category} and beyond
                </p>
                <Link
                  to={`/startups?category=${startup.category}`}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-buttonborder text-primary font-paragraph text-base hover:bg-buttonborder hover:text-primary-foreground transition-colors"
                >
                  View {startup.category} Startups
                </Link>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
