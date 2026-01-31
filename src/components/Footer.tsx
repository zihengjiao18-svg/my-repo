export default function Footer() {
  return (
    <footer className="w-full bg-footerbackground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3 className="font-heading text-lg text-primary-foreground mb-4">
              STARTUP VAULT
            </h3>
            <p className="font-paragraph text-sm text-primary-foreground/80">
              A curated database connecting VCs with innovative startups across multiple industries.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-base text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/startups" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Browse Startups
                </a>
              </li>
              <li>
                <a href="/contact" className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-base text-primary-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              <li className="font-paragraph text-sm text-primary-foreground/80">FinTech</li>
              <li className="font-paragraph text-sm text-primary-foreground/80">HealthTech</li>
              <li className="font-paragraph text-sm text-primary-foreground/80">AI</li>
              <li className="font-paragraph text-sm text-primary-foreground/80">EdTech</li>
              <li className="font-paragraph text-sm text-primary-foreground/80">Consumer Products</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="font-paragraph text-sm text-primary-foreground/60 text-center">
            © {new Date().getFullYear()} Startup Vault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
