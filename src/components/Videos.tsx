import { Play } from 'lucide-react';

const videos = [
  {
    title: 'Ao Vivo em São Paulo',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    title: 'Clipe Oficial - Saudade',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    title: 'Acústico Especial',
    thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
  },
];

const Videos = () => {
  return (
    <section id="videos" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
              Assista
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">
              VÍDEOS
            </h2>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 text-sm font-body font-medium text-foreground/60 hover:text-foreground tracking-wider uppercase transition-colors"
          >
            Ver Todos →
          </a>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <a
              key={video.title}
              href="#"
              className="group relative aspect-video overflow-hidden bg-muted"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-foreground flex items-center justify-center group-hover:bg-foreground transition-colors duration-300">
                  <Play className="w-6 h-6 text-foreground group-hover:text-background ml-1 transition-colors duration-300" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-display text-foreground tracking-wider">
                  {video.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* YouTube Subscribe */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] text-white font-body font-semibold text-sm tracking-wider uppercase hover:bg-[#CC0000] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            Inscreva-se no Canal
          </a>
        </div>
      </div>
    </section>
  );
};

export default Videos;
