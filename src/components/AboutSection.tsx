import logoCp from '@/assets/logo-cp.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-glow">
              <img
                src={logoCp}
                alt="Charles E. Pierre with guitar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
              The Artist
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              Charles E. Pierre
            </h2>
            <div className="w-20 h-0.5 bg-primary mb-8" />
            <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-6">
              With a voice that resonates through the soul and fingers that dance across guitar strings, 
              Charles E. Pierre has been captivating audiences for over a decade. His unique blend of 
              folk, blues, and contemporary acoustic music creates an intimate atmosphere that 
              transforms every performance into a shared experience.
            </p>
            <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-8">
              Drawing inspiration from the rich musical traditions of his heritage while pushing 
              creative boundaries, Charles crafts songs that speak to the human experience—love, 
              loss, hope, and the beauty found in everyday moments.
            </p>
            <div className="flex gap-8">
              <div>
                <span className="text-3xl font-serif text-primary">10+</span>
                <p className="text-foreground/50 text-sm uppercase tracking-wide mt-1">Years</p>
              </div>
              <div>
                <span className="text-3xl font-serif text-primary">500+</span>
                <p className="text-foreground/50 text-sm uppercase tracking-wide mt-1">Shows</p>
              </div>
              <div>
                <span className="text-3xl font-serif text-primary">50K+</span>
                <p className="text-foreground/50 text-sm uppercase tracking-wide mt-1">Listeners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
