import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.jpg" alt="Rise-Up Bible Church Logo" className="w-12 h-12 rounded-lg shadow-sm border border-border/50 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none text-secondary">Rise-Up</span>
              <span className="font-sans text-xs tracking-widest text-primary font-medium">BIBLE CHURCH</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/about"
              className="px-6 py-2.5 rounded-[28px] bg-primary text-white font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Join Us
            </Link>
          </nav>
          
          <button 
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium p-2 rounded-lg transition-colors hover:bg-primary/5 hover:text-primary ${
                location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-secondary'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/about"
            className="mt-2 text-center px-6 py-3 rounded-[28px] bg-primary text-white font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Us
          </Link>
        </div>
      )}
    </header>
  );
}
