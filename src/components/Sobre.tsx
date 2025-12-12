import guitarImage from '@/assets/guitar-hero.jpg';

const Sobre = () => {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={guitarImage}
                alt="Charles E. Pierre"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
              Biografia
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider mb-8">
              SOBRE
            </h2>

            <div className="space-y-6 text-foreground/70 font-body text-base leading-relaxed">
              <p>
                <strong className="text-foreground">Charles E. Pierre</strong> é um dos nomes mais 
                autênticos da nova geração da música brasileira. Nascido no interior, cresceu 
                cercado pelas tradições musicais que moldaram sua identidade artística.
              </p>
              <p>
                Com um estilo único que mistura raízes sertanejas com influências contemporâneas, 
                Charles conquistou milhares de fãs por todo o Brasil. Suas letras falam de amor, 
                saudade e as histórias do povo brasileiro.
              </p>
              <p>
                Ao longo de sua carreira, já se apresentou nos maiores palcos do país, 
                acumulando milhões de reproduções nas plataformas digitais e consolidando 
                seu nome no cenário musical nacional.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-12 pt-8 border-t border-foreground/10">
              <div>
                <span className="text-4xl font-display text-foreground">500+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Shows</span>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">10M+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Streams</span>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">50K+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Seguidores</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
