import heroImage from '@/assets/guitar-hero.jpg';
import logoFull from '@/assets/logo-full.jpg';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Violão acústico"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <div className="animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <img
            src={logoFull}
            alt="Charles E. Pierre"
            className="w-72 md:w-96 lg:w-[28rem] mx-auto mb-10 drop-shadow-2xl"
          />
        </div>

        <p 
          className="text-lg md:text-xl lg:text-2xl font-body font-light text-foreground/70 tracking-[0.2em] uppercase mb-12 animate-fade-up"
          style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Cantor · Compositor · Violonista
        </p>

        <div 
          className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-up"
          style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <a
            href="#musica"
            className="group inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-body font-medium tracking-wider rounded-full hover:bg-primary/90 transition-all duration-500 glow"
          >
            Ouvir Agora
          </a>
          <a
            href="#shows"
            className="inline-flex items-center justify-center px-10 py-4 border border-foreground/20 text-foreground font-body tracking-wider rounded-full hover:border-primary hover:text-primary transition-all duration-500"
          >
            Próximos Shows
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a 
        href="#sobre"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40 hover:text-primary transition-colors animate-float"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </a>
    </section>
  );
};

export default HeroSection;
