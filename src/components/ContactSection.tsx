import { Mail, Instagram, Youtube, Music } from 'lucide-react';

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Music, label: 'Spotify', href: '#' },
];

const ContactSection = () => {
  return (
    <section id="contato" className="py-32 lg:py-40 bg-card relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[150px]" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6 block">
            Contato
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
            Vamos <span className="italic text-gradient">Conversar</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10" />

          <p className="text-foreground/50 font-body text-lg leading-relaxed mb-12">
            Para shows, parcerias ou apenas para trocar uma ideia — 
            entre em contato.
          </p>

          {/* Email */}
          <a
            href="mailto:contato@charlespierre.com.br"
            className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground font-body tracking-wider hover:bg-primary/90 transition-all duration-500 glow mb-16"
          >
            <Mail size={20} />
            contato@charlespierre.com.br
          </a>

          {/* Social */}
          <div className="flex justify-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-14 h-14 border border-border/40 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 pt-8 border-t border-border/20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xl font-display italic text-gradient">
              Charles E. Pierre
            </span>
            <p className="text-foreground/30 text-sm font-body">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
