import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-heading text-xl lg:text-2xl text-primary font-semibold tracking-wide">
            STARTUP VAULT
          </Link>
          <div className="flex items-center gap-6 lg:gap-10">
            <Link 
              to="/" 
              className="font-paragraph text-sm lg:text-base text-primary hover:text-linkcolor transition-colors"
            >
              HOME
            </Link>
            <Link 
              to="/startups" 
              className="font-paragraph text-sm lg:text-base text-primary hover:text-linkcolor transition-colors"
            >
              STARTUPS
            </Link>
            <Link 
              to="/contact" 
              className="font-paragraph text-sm lg:text-base text-primary hover:text-linkcolor transition-colors"
            >
              CONTACT
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
