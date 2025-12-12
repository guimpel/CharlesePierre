import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const upcomingShows = [
  {
    date: "Dec 20",
    year: "2024",
    venue: "Blue Note Jazz Club",
    city: "New York, NY",
    time: "8:00 PM",
    status: "tickets",
  },
  {
    date: "Dec 28",
    year: "2024",
    venue: "House of Blues",
    city: "Chicago, IL",
    time: "9:00 PM",
    status: "tickets",
  },
  {
    date: "Jan 5",
    year: "2025",
    venue: "The Troubadour",
    city: "Los Angeles, CA",
    time: "8:30 PM",
    status: "tickets",
  },
  {
    date: "Jan 15",
    year: "2025",
    venue: "Ryman Auditorium",
    city: "Nashville, TN",
    time: "7:30 PM",
    status: "soon",
  },
];

const ShowsSection = () => {
  return (
    <section id="shows" className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            On Tour
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Upcoming Shows
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Shows List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {upcomingShows.map((show, index) => (
            <div
              key={`${show.date}-${show.venue}`}
              className="group bg-secondary/30 border border-border/30 rounded-xl p-6 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Date */}
                <div className="flex-shrink-0 text-center md:text-left md:w-24">
                  <span className="text-3xl font-serif text-primary block">{show.date}</span>
                  <span className="text-foreground/50 text-sm">{show.year}</span>
                </div>

                {/* Venue Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-serif text-foreground mb-1">{show.venue}</h3>
                  <div className="flex flex-wrap gap-4 text-foreground/60 text-sm">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} className="text-primary/70" />
                      {show.city}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} className="text-primary/70" />
                      {show.time}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  {show.status === 'tickets' ? (
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-wider rounded-full hover:bg-primary/90 transition-all duration-300 group-hover:shadow-glow"
                    >
                      Get Tickets
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-6 py-2.5 border border-foreground/20 text-foreground/50 font-sans text-sm uppercase tracking-wider rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-sans uppercase tracking-wider text-sm hover:text-primary/80 transition-colors group"
          >
            View All Tour Dates
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowsSection;
