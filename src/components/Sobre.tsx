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
                alt="Charles e Pierre"
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
              SOBRE A DUPLA
            </h2>

            <div className="space-y-6 text-foreground/70 font-body text-base leading-relaxed">
              <p>
                <strong className="text-foreground">Charles e Pierre</strong> são uma dupla sertaneja 
                de Belo Horizonte, Minas Gerais. Charles é médico e Pierre é professor de matemática, 
                mas a música sempre foi a grande paixão que uniu os dois artistas.
              </p>
              <p>
                Com um estilo versátil que vai da música de raiz ao romântico, a dupla conquistou 
                o público realizando shows por todo o interior do Brasil. Em 1993, gravaram seu 
                primeiro disco, "Brasil Rural", com destaque para as músicas "Garota Especial" 
                e "Abelha Malvada".
              </p>
              <p>
                Em 1994, lançaram o LP "Por Te Amar Demais", onde se destacaram as composições 
                "Por Te Amar Demais" e "Amor Livre". Em 1995, veio o álbum "São Teus Olhos" com 
                sucessos como "Anjo da Noite" e "Papel de Bobo". Ao longo de mais de três décadas, 
                a dupla se consolidou como referência no cenário sertanejo mineiro.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-12 pt-8 border-t border-foreground/10">
              <div>
                <span className="text-4xl font-display text-foreground">30+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Anos de Carreira</span>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">500+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Shows</span>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">5</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Álbuns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
