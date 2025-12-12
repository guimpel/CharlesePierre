import logoCp from '@/assets/logo-cp.jpg';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.03] to-transparent" />
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={logoCp}
                alt="Charles E. Pierre"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-l-2 border-t-2 border-primary/40" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-2 border-b-2 border-primary/40" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6 block">
              Sobre o Artista
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-8 leading-tight">
              Uma voz que<br />
              <span className="italic text-gradient">toca a alma</span>
            </h2>
            
            <div className="w-24 h-px bg-gradient-to-r from-primary to-transparent mb-8 animate-line-expand" />
            
            <div className="space-y-6 text-foreground/60 font-body text-lg leading-relaxed">
              <p>
                Charles E. Pierre é mais do que um músico — é um contador de histórias. 
                Com seu violão e voz marcante, ele transforma cada apresentação em uma 
                experiência íntima e inesquecível.
              </p>
              <p>
                Suas composições mesclam tradição e contemporaneidade, criando uma 
                sonoridade única que atravessa gerações. Cada acorde carrega emoção, 
                cada letra conta uma história que ressoa no coração do público.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-12 pt-12 border-t border-border/50">
              <div>
                <span className="text-4xl font-display text-gradient block">10+</span>
                <span className="text-foreground/40 text-sm tracking-wider uppercase mt-2 block">Anos</span>
              </div>
              <div>
                <span className="text-4xl font-display text-gradient block">500+</span>
                <span className="text-foreground/40 text-sm tracking-wider uppercase mt-2 block">Shows</span>
              </div>
              <div>
                <span className="text-4xl font-display text-gradient block">50K</span>
                <span className="text-foreground/40 text-sm tracking-wider uppercase mt-2 block">Ouvintes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
