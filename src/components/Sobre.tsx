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
                alt="Charles & Pierre em apresentação acústica"
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
                <strong className="text-foreground">Charles & Pierre</strong> formam um duo mineiro de
                irmãos que traz para o palco a combinação de harmonias vocais, violões e batidas
                eletrônicas sutis. Cresceram em Belo Horizonte cercados por rodas de viola e pelo
                jazz que ouviram com a família, e transformaram essas referências em canções
                confessionais e modernas.
              </p>
              <p>
                O repertório do duo mistura folk-pop com elementos de synth e percussão brasileira,
                criando um som cinematográfico que conquistou público fiel em playlists editoriais e
                festivais independentes. As letras falam de reencontros, viagens de estrada e do
                afeto que une a dupla dentro e fora do estúdio.
              </p>
              <p>
                Desde 2018, já somaram mais de 320 shows em turnês pelo Brasil e Europa, ultrapassaram
                180 milhões de streams e reúnem uma comunidade de 1,4 milhão de seguidores entre
                redes sociais e plataformas de música, consolidando Charles & Pierre como um dos
                duos mais prestigiados da cena contemporânea.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-12 pt-8 border-t border-foreground/10">
              <div>
                <span className="text-4xl font-display text-foreground">320+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Shows</span>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">180M+</span>
                <span className="text-foreground/50 text-sm block mt-1 font-body">Streams</span>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">1.4M</span>
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
