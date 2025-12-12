import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#musica', label: 'Música' },
  { href: '#shows', label: 'Shows' },
  { href: '#contato', label: 'Contato' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-8 flex items-center justify-between">
        <a 
          href="#inicio" 
          className="text-2xl font-display italic text-gradient tracking-wide"
        >
          Charles E. Pierre
        </a>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-body text-foreground/60 hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground/80 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-background/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <button
          className="absolute top-6 right-8 text-foreground/80 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={28} />
        </button>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="text-3xl font-display text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Navigation;
