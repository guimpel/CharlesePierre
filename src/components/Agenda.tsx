import { MapPin, Music, Camera, Pen, Mic, Tv, Video, LucideIcon } from 'lucide-react';

type EventType = 'show' | 'exposicao' | 'autografo' | 'podcast' | 'tv' | 'clipe';

const eventTypeConfig: Record<EventType, { label: string; Icon: LucideIcon }> = {
  show: { label: 'Show', Icon: Music },
  exposicao: { label: 'Exposição', Icon: Camera },
  autografo: { label: 'Autógrafo', Icon: Pen },
  podcast: { label: 'Podcast', Icon: Mic },
  tv: { label: 'TV', Icon: Tv },
  clipe: { label: 'Clipe', Icon: Video },
};

const eventos = [
  { day: '20', month: 'DEZ', city: 'São Paulo/SP', venue: 'Espaço das Américas', type: 'show' as EventType, status: 'available' },
  { day: '27', month: 'DEZ', city: 'Rio de Janeiro/RJ', venue: 'Vivo Rio', type: 'show' as EventType, status: 'available' },
  { day: '31', month: 'DEZ', city: 'Florianópolis/SC', venue: 'Music Park', type: 'show' as EventType, status: 'available' },
  { day: '05', month: 'JAN', city: 'Belo Horizonte/MG', venue: 'Podcast Sertanejo', type: 'podcast' as EventType, status: 'soon' },
  { day: '12', month: 'JAN', city: 'Curitiba/PR', venue: 'Programa do Ratinho', type: 'tv' as EventType, status: 'soon' },
];

const Agenda = () => {
  return (
    <section id="agenda" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
              Próximos
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">
              EVENTOS
            </h2>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 text-sm font-body font-medium text-foreground/60 hover:text-foreground tracking-wider uppercase transition-colors"
          >
            Agenda Completa →
          </a>
        </div>

        {/* Eventos List */}
        <div className="space-y-0">
          {eventos.map((evento) => {
            const { label, Icon } = eventTypeConfig[evento.type];
            return (
              <div
                key={`${evento.day}-${evento.month}-${evento.city}`}
                className="group border-t border-foreground/10 py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 hover:bg-foreground/[0.02] transition-colors"
              >
                {/* Date */}
                <div className="md:w-32 flex-shrink-0 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-display text-foreground">{evento.day}</span>
                  <span className="text-lg font-display text-foreground/50">{evento.month}</span>
                </div>

                {/* Event Type Badge */}
                <div className="md:w-28 flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-foreground/5 text-foreground/70 font-body text-xs tracking-wider uppercase rounded">
                    <Icon size={12} />
                    {label}
                  </span>
                </div>

                {/* City & Venue */}
                <div className="flex-grow md:px-8">
                  <h3 className="text-xl md:text-2xl font-display text-foreground tracking-wide">
                    {evento.city}
                  </h3>
                  <p className="text-sm font-body text-foreground/50 mt-1 flex items-center gap-2">
                    <MapPin size={14} />
                    {evento.venue}
                  </p>
                </div>

                {/* CTA */}
                <div className="md:w-48 flex-shrink-0 md:text-right">
                  {evento.status === 'available' ? (
                    <a
                      href="#"
                      className="inline-block px-8 py-3 bg-foreground text-background font-body font-semibold text-sm tracking-wider uppercase hover:bg-foreground/90 transition-colors"
                    >
                      Ingressos
                    </a>
                  ) : (
                    <span className="inline-block px-8 py-3 border border-foreground/20 text-foreground/40 font-body text-sm tracking-wider uppercase">
                      Em Breve
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Agenda;
