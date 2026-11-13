import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const ConviteLivroVisitas = () => (
  <section aria-label="Livro de Visitas" className="bg-secondary border-y border-foreground/10 py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-9">
        <div>
          <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.25em] text-xs font-body mb-4">
            <BookOpen size={18} strokeWidth={1.5} aria-hidden="true" /> Nossa história, contada por você
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider">
            ASSINE NOSSO LIVRO DE VISITAS
          </h2>
          <p className="font-body text-foreground/60 mt-3 leading-7 max-w-xl">
            Você guarda uma lembrança, foto ou história de Charles & Pierre?
            Compartilhe com a dupla e ajude a preservar essa memória.
          </p>
        </div>
        <Link
          to="/livro-de-visitas"
          className="shrink-0 inline-flex items-center justify-center gap-3 bg-accent hover:brightness-110 text-black px-6 py-4 text-xs font-semibold font-body tracking-widest uppercase"
        >
          Deixe seu registro <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

export default ConviteLivroVisitas;
