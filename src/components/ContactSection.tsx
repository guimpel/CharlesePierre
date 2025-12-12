import { Mail, Instagram, Youtube, Music2 } from 'lucide-react';
import logoFull from '@/assets/logo-full.jpg';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Music2, label: 'Spotify', href: '#' },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal-dark relative overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Let's Connect
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8" />

          <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-10">
            For booking inquiries, collaborations, or just to say hello—I'd love to hear from you.
          </p>

          {/* Email CTA */}
          <a
            href="mailto:hello@charlespierre.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-sans uppercase tracking-widest rounded-full hover:bg-primary/90 transition-all duration-300 shadow-glow mb-12"
          >
            <Mail size={20} />
            hello@charlespierre.com
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-border/30 pt-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img
              src={logoFull}
              alt="Charles E. Pierre"
              className="h-12 opacity-70"
            />
            <p className="text-foreground/40 text-sm font-sans">
              © {new Date().getFullYear()} Charles E. Pierre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
