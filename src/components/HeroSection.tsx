import heroImage from '@/assets/guitar-hero.jpg';
import logoFull from '@/assets/logo-full.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Acoustic guitar with warm bokeh lights"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Animated bokeh effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-amber/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gold-light/20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fade-up">
        <img
          src={logoFull}
          alt="Charles E. Pierre"
          className="w-64 md:w-80 lg:w-96 mx-auto mb-8 drop-shadow-2xl"
        />
        <p className="text-lg md:text-xl font-sans text-foreground/80 tracking-wide max-w-md mx-auto mb-10">
          Singer • Songwriter • Guitarist
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#music"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest rounded-full hover:bg-primary/90 transition-all duration-300 shadow-glow"
          >
            Listen Now
          </a>
          <a
            href="#shows"
            className="inline-flex items-center justify-center px-8 py-3 border border-foreground/30 text-foreground font-sans text-sm uppercase tracking-widest rounded-full hover:border-primary hover:text-primary transition-all duration-300"
          >
            Upcoming Shows
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
