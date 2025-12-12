import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoFull from '@/assets/logo-full.jpg';

const navLinks = [
  { href: '#inicio', label: 'HOME' },
  { href: '#sobre', label: 'SOBRE' },
  { href: '#agenda', label: 'AGENDA' },
  { href: '#musica', label: 'DISCOGRAFIA' },
  { href: '#videos', label: 'VÍDEOS' },
  { href: '#contato', label: 'CONTATO' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="relative z-10">
          <img
            src={logoFull}
            alt="Logotipo da dupla Charles & Pierre"
            className="h-10 md:h-12 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body font-medium text-foreground/80 hover:text-foreground tracking-wider transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-10 text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-2xl font-display text-foreground tracking-widest hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
