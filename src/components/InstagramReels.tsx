import { useEffect, useRef, useState } from 'react';
import { Instagram, Play, X } from 'lucide-react';

type Reel = {
  id: string;
  title: string;
  date: string;
  url: string;
  image: string | null;
};

type Catalogo = {
  updatedAt: string;
  profile: string;
  count: number;
  reels: Reel[];
};

const genericasWebp = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&h=600&fit=crop&fm=webp&q=75',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&h=600&fit=crop&fm=webp&q=75',
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=480&h=600&fit=crop&fm=webp&q=75',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&h=600&fit=crop&fm=webp&q=75',
];

const codigoReel = (url: string): string | null => {
  const match = /^https:\/\/www\.instagram\.com\/reel\/([A-Za-z0-9_-]+)\/?$/.exec(url);
  return match?.[1] ?? null;
};

const InstagramReels = ({ ativo = true, aoAtivar }: { ativo?: boolean; aoAtivar?: () => void }) => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [selecionado, setSelecionado] = useState<Reel | null>(null);
  const [estado, setEstado] = useState<'carregando' | 'pronto' | 'erro'>('carregando');
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controlador = new AbortController();
    fetch(import.meta.env.BASE_URL + 'instagram/catalogo.json', {
      signal: controlador.signal,
      cache: 'no-store',
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Catálogo indisponível');
        return resposta.json();
      })
      .then((dados: Catalogo) => {
        if (!Array.isArray(dados.reels)) throw new Error('Catálogo inválido');
        const validos = dados.reels
          .filter((item) => typeof item.title === 'string' && typeof item.date === 'string' && codigoReel(item.url))
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 30);
        if (!controlador.signal.aborted) {
          setReels(validos);
          setEstado('pronto');
        }
      })
      .catch(() => {
        if (!controlador.signal.aborted) setEstado('erro');
      });
    return () => controlador.abort();
  }, []);

  const escolher = (reel: Reel) => {
    aoAtivar?.();
    setSelecionado(reel);
    window.requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section id="instagram" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
            @charlesepierre
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-foreground tracking-wider">
            ÚLTIMOS REELS
          </h2>
          <p className="mt-4 font-body text-foreground/60">
            Os 30 vídeos mais recentes do Instagram, reproduzidos aqui mesmo.
          </p>
        </div>

        {estado === 'carregando' && <p className="font-body text-foreground/60">Carregando Reels…</p>}
        {estado === 'erro' && <p className="font-body text-foreground/60">Não foi possível carregar os Reels do Instagram.</p>}
        {estado === 'pronto' && reels.length === 0 && (
          <p className="font-body text-foreground/60">Nenhum Reel disponível no momento.</p>
        )}

        {ativo && selecionado && codigoReel(selecionado.url) && (
          <div ref={playerRef} className="scroll-mt-20 max-w-4xl mx-auto mb-14 border border-foreground/15 p-4 md:p-6 bg-secondary">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="font-body uppercase text-xs tracking-widest text-foreground/50">Reproduzindo Instagram</span>
                <h3 className="text-xl md:text-2xl font-display tracking-wide text-foreground mt-2">{selecionado.title}</h3>
              </div>
              <button
                type="button"
                className="text-foreground/70 hover:text-foreground p-2"
                onClick={() => setSelecionado(null)}
                aria-label="Fechar vídeo"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mx-auto max-w-[410px] w-full h-[670px] sm:h-[740px] bg-black">
              <iframe
                key={selecionado.id}
                title={'Reel ' + selecionado.title}
                src={'https://www.instagram.com/reel/' + codigoReel(selecionado.url) + '/embed/'}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="text-xs font-body text-foreground/50 mt-3 text-center">
              Vídeo incorporado do Instagram. A disponibilidade depende das permissões de reprodução da plataforma.
            </p>
          </div>
        )}

        {estado === 'pronto' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {reels.map((reel, indice) => (
              <button
                type="button"
                key={reel.id}
                onClick={() => escolher(reel)}
                className={
                  'group text-left overflow-hidden border transition-colors ' +
                  (selecionado?.id === reel.id
                    ? 'border-foreground/70 bg-secondary'
                    : 'border-foreground/10 bg-secondary/40 hover:border-foreground/40')
                }
              >
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <img
                    src={reel.image || genericasWebp[indice % genericasWebp.length]}
                    alt={'Miniatura de ' + reel.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = genericasWebp[indice % genericasWebp.length];
                      if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 flex items-center justify-center border border-white/90 bg-black/40 text-white">
                      <Play size={21} className="ml-1" />
                    </span>
                  </div>
                  <span className="absolute right-3 top-3 text-white drop-shadow-lg">
                    <Instagram size={19} />
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="font-display text-base md:text-lg text-foreground tracking-wide line-clamp-2 min-h-[2.8rem]">{reel.title}</p>
                  <span className="font-body text-xs text-foreground/50 mt-2 block">
                    {reel.date.split('-').reverse().join('/')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramReels;
