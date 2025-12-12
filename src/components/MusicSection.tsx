import { Play, ExternalLink } from 'lucide-react';

const albums = [
  {
    title: "Echoes of Home",
    year: "2024",
    tracks: 12,
    type: "Album",
  },
  {
    title: "Midnight Strings",
    year: "2023",
    tracks: 8,
    type: "EP",
  },
  {
    title: "Roots & Wings",
    year: "2022",
    tracks: 10,
    type: "Album",
  },
];

const MusicSection = () => {
  return (
    <section id="music" className="py-24 md:py-32 bg-charcoal relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Discography
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Listen to the Music
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Albums Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {albums.map((album, index) => (
            <div
              key={album.title}
              className="group relative bg-secondary/50 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Album Art Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-charcoal-dark via-secondary to-charcoal-dark relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Play className="w-12 h-12 text-primary ml-1" />
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6">
                <span className="text-primary/70 text-xs uppercase tracking-widest">
                  {album.type} • {album.year}
                </span>
                <h3 className="text-xl font-serif text-foreground mt-2 mb-1">
                  {album.title}
                </h3>
                <p className="text-foreground/50 text-sm">
                  {album.tracks} tracks
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Streaming Links */}
        <div className="text-center">
          <p className="text-foreground/60 font-sans mb-6">Available on all platforms</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Spotify', 'Apple Music', 'YouTube', 'SoundCloud'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 border border-border/50 rounded-full text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 font-sans text-sm"
              >
                {platform}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
