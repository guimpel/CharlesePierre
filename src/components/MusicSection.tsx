import { Play } from 'lucide-react';

const albums = [
  {
    title: "Ecos do Coração",
    year: "2024",
    tracks: 12,
  },
  {
    title: "Noites de Violão",
    year: "2023",
    tracks: 8,
  },
  {
    title: "Raízes",
    year: "2022",
    tracks: 10,
  },
];

const platforms = ['Spotify', 'Apple Music', 'YouTube Music', 'Deezer'];

const MusicSection = () => {
  return (
    <section id="musica" className="py-32 lg:py-40 bg-card relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a855' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6 block">
            Discografia
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
            Ouça a <span className="italic text-gradient">Música</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Albums */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {albums.map((album, index) => (
            <div
              key={album.title}
              className="group relative"
            >
              <div className="aspect-square bg-secondary/50 relative overflow-hidden border border-border/30 transition-all duration-700 group-hover:border-primary/50">
                {/* Album art placeholder with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/10">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="mt-6 text-center">
                <span className="text-primary/60 text-xs tracking-[0.2em] uppercase">{album.year}</span>
                <h3 className="text-xl font-display text-foreground mt-2 group-hover:text-gradient transition-all duration-300">
                  {album.title}
                </h3>
                <p className="text-foreground/40 text-sm mt-1">{album.tracks} faixas</p>
              </div>
            </div>
          ))}
        </div>

        {/* Platforms */}
        <div className="text-center">
          <p className="text-foreground/40 font-body text-sm tracking-wider uppercase mb-8">
            Disponível em todas as plataformas
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform) => (
              <a
                key={platform}
                href="#"
                className="px-8 py-3 border border-border/40 text-foreground/50 font-body text-sm hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
