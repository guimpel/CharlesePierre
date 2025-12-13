const albuns = [
  {
    ano: '1995',
    titulo: 'São Teus Olhos',
    tipo: 'LP',
    musicas: [
      'São Teus Olhos',
      'Não Deixei De Te Amar',
      'Anjo Da Noite',
      'Era Tudo Mentira',
      'Eu Digo Não',
      'Só Por Amor',
      'Papel De Bobo',
      'Sempre Na Estrada',
      'Quem é Você?',
    ],
  },
  {
    ano: '1994',
    titulo: 'Por Te Amar Demais',
    tipo: 'LP',
    musicas: [
      'Por Te Amar Demais',
      'Amor Livre',
    ],
  },
  {
    ano: '1993',
    titulo: 'Brasil Rural',
    tipo: 'LP',
    musicas: [
      'Garota Especial',
      'Abelha Malvada',
    ],
  },
  {
    ano: '1990',
    titulo: 'Single',
    tipo: 'Single',
    musicas: [
      'Me Dê Um Sinal',
    ],
  },
];

const Discografia = () => {
  return (
    <section id="musica" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
            Discografia
          </span>
          <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">
            ÁLBUNS & MÚSICAS
          </h2>
        </div>

        {/* Albums Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {albuns.map((album) => (
            <div
              key={`${album.ano}-${album.titulo}`}
              className="group bg-background/50 p-6 border border-foreground/10 hover:border-foreground/30 transition-colors"
            >
              {/* Album Art Placeholder */}
              <div className="aspect-square bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                <div className="text-center">
                  <span className="text-6xl font-display text-foreground/20">{album.ano}</span>
                </div>
              </div>

              {/* Album Info */}
              <div className="space-y-2">
                <span className="text-xs font-body text-foreground/40 tracking-wider uppercase">
                  {album.tipo} • {album.ano}
                </span>
                <h3 className="text-xl font-display text-foreground tracking-wide">
                  {album.titulo}
                </h3>
                
                {/* Track List */}
                <ul className="pt-4 space-y-1">
                  {album.musicas.map((musica, idx) => (
                    <li key={musica} className="text-sm font-body text-foreground/60 flex items-center gap-2">
                      <span className="text-xs text-foreground/30">{String(idx + 1).padStart(2, '0')}</span>
                      {musica}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Streaming Links */}
        <div className="mt-16 text-center">
          <p className="text-foreground/50 font-body mb-6">
            Ouça Charles e Pierre nas plataformas digitais
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://open.spotify.com/artist/charles-e-pierre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white font-body font-semibold text-sm tracking-wider uppercase hover:bg-[#1ed760] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Spotify
            </a>
            <a
              href="http://www.deezer.com/br/album/14221052"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground text-foreground font-body font-semibold text-sm tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Deezer
            </a>
            <a
              href="https://www.youtube.com/results?search_query=charles+e+pierre+sertanejo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-body font-semibold text-sm tracking-wider uppercase hover:bg-[#CC0000] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discografia;
