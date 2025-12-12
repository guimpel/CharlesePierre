import { MapPin, ArrowRight } from 'lucide-react';

const shows = [
  {
    date: "20 Dez",
    year: "2024",
    venue: "Teatro Municipal",
    city: "São Paulo, SP",
    time: "20:00",
    available: true,
  },
  {
    date: "28 Dez",
    year: "2024",
    venue: "Casa de Shows Vivo Rio",
    city: "Rio de Janeiro, RJ",
    time: "21:00",
    available: true,
  },
  {
    date: "05 Jan",
    year: "2025",
    venue: "Espaço Cultural",
    city: "Belo Horizonte, MG",
    time: "20:30",
    available: true,
  },
  {
    date: "15 Jan",
    year: "2025",
    venue: "Arena Sunset",
    city: "Curitiba, PR",
    time: "19:30",
    available: false,
  },
];

const ShowsSection = () => {
  return (
    <section id="shows" className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/[0.03] to-transparent" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6 block">
            Agenda
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
            Próximos <span className="italic text-gradient">Shows</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Shows list */}
        <div className="max-w-4xl mx-auto">
          {shows.map((show, index) => (
            <div
              key={`${show.date}-${show.venue}`}
              className="group border-b border-border/30 py-8 first:border-t hover:bg-primary/[0.02] transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0">
                {/* Date */}
                <div className="lg:w-32 flex-shrink-0">
                  <span className="text-3xl lg:text-4xl font-display text-gradient block leading-none">
                    {show.date}
                  </span>
                  <span className="text-foreground/30 text-sm mt-1 block">{show.year}</span>
                </div>

                {/* Info */}
                <div className="flex-grow lg:px-8">
                  <h3 className="text-xl font-display text-foreground mb-2">{show.venue}</h3>
                  <div className="flex flex-wrap gap-4 text-foreground/40 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={14} className="text-primary/60" />
                      {show.city}
                    </span>
                    <span>{show.time}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="lg:w-48 flex-shrink-0 lg:text-right">
                  {show.available ? (
                    <a
                      href="#"
                      className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider hover:bg-primary/90 transition-all duration-300 group/btn"
                    >
                      Ingressos
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-8 py-3 border border-border/30 text-foreground/30 font-body text-sm tracking-wider">
                      Em breve
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-primary font-body tracking-wider text-sm hover:gap-4 transition-all group"
          >
            Ver Todas as Datas
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowsSection;
