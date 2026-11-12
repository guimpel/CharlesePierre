import { Link } from 'react-router-dom';
import Videos from '@/components/Videos';
import logo from '@/assets/logo-oficial.png';

const Videoteca = () => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-foreground/10 bg-background">
      <div className="container mx-auto px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" aria-label="Voltar ao início">
          <img src={logo} alt="Charles & Pierre" className="h-12 md:h-14 w-auto" />
        </Link>
        <Link to="/" className="text-sm font-body text-foreground/70 hover:text-foreground uppercase tracking-wider">
          ← Voltar ao site
        </Link>
      </div>
    </header>
    <main><Videos paginaCompleta /></main>
  </div>
);

export default Videoteca;
