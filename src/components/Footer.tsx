export default function Footer() {
  return (
    <footer className="w-full bg-gray-900">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3 className="font-heading text-lg text-white mb-4">
              STARTUP VAULT
            </h3>
            <p className="font-paragraph text-sm text-gray-300">
              A curated database connecting VCs with innovative startups across multiple industries.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-base text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/startups" className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors">
                  Browse Startups
                </a>
              </li>
              <li>
                <a href="/contact" className="font-paragraph text-sm text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-base text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              <li className="font-paragraph text-sm text-gray-300">FinTech</li>
              <li className="font-paragraph text-sm text-gray-300">HealthTech</li>
              <li className="font-paragraph text-sm text-gray-300">AI</li>
              <li className="font-paragraph text-sm text-gray-300">EdTech</li>
              <li className="font-paragraph text-sm text-gray-300">Consumer Products</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="font-paragraph text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Startup Vault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
