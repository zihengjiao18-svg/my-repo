import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const categories = [
    'Technology',
    'AI / Machine Learning',
    'SaaS',
    'FinTech',
    'HealthTech',
    'Consumer',
    'EdTech',
    'Enterprise / B2B',
    'Mobility / Transportation',
    'Sustainability / Climate'
  ];

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl text-white mb-4">
              LEADIFYA
            </h3>
            <p className="font-paragraph text-sm text-gray-300 leading-relaxed">
              A curated database of pre-seed startups for VCs to explore key metrics and connect with founders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base text-white mb-6 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  Home
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/startups" className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  Browse Startups
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  Contact Us
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories - Part 1 */}
          <div>
            <h4 className="font-heading text-base text-white mb-6 uppercase tracking-widest">
              Sectors (A-E)
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <Link 
                    to={`/startups?category=${cat}`}
                    className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {cat}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - Part 2 */}
          <div>
            <h4 className="font-heading text-base text-white mb-6 uppercase tracking-widest">
              Sectors (F-S)
            </h4>
            <ul className="space-y-3">
              {categories.slice(5).map((cat) => (
                <li key={cat}>
                  <Link 
                    to={`/startups?category=${cat}`}
                    className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {cat}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-paragraph text-sm text-gray-400">
              © {new Date().getFullYear()} Leadifya. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="font-paragraph text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
