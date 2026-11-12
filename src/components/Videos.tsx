import { useEffect, useState } from 'react';
import { ArrowRight, Film, Play } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type VideoItem = {
  id: string;
  title: string;
  description?: string;
};

// Os cartões da página inicial mantêm imagens genéricas, entregues como WebP.
const imagensGenericas = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=520&fit=crop&fm=webp&q=78',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&h=520&fit=crop&fm=webp&q=78',
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&h=520&fit=crop&fm=webp&q=78',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=520&fit=crop&fm=webp&q=78',
];

const imagemYoutubeWebp = (id: string) =>
  'https://i.ytimg.com/vi_webp/' + id + '/maxresdefault.webp';

const imagemYoutubeAlternativa = (id: string) =>
  'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';

const Videos = ({
  paginaCompleta = false,
  ativo = true,
  aoAtivar,
}: {
  paginaCompleta?: boolean;
  ativo?: boolean;
  aoAtivar?: () => void;
}) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [estado, setEstado] = useState<'carregando' | 'pronto' | 'erro'>('carregando');
  const [reproduzirAoAbrir, setReproduzirAoAbrir] = useState(false);
  useEffect(() => {
    if (!ativo) setReproduzirAoAbrir(false);
  }, [ativo]);

  const location = useLocation();
  const idSelecionado = new URLSearchParams(location.search).get('v');

  useEffect(() => {
    const controle = new AbortController();
    fetch(import.meta.env.BASE_URL + 'videos/catalogo.json', {
      signal: controle.signal,
      cache: 'no-store',
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Catálogo não encontrado');
        return resposta.json();
      })
      .then((dados: unknown) => {
        if (!Array.isArray(dados)) throw new Error('Catálogo inválido');
        const lista: VideoItem[] = dados.filter(
          (item): item is VideoItem =>
            item !== null &&
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            /^[A-Za-z0-9_-]{11}$/.test(item.id) &&
            typeof item.title === 'string' &&
            item.title.length > 0
        );
        if (!controle.signal.aborted) {
          setVideos(lista);
          setEstado('pronto');
        }
      })
      .catch(() => {
        if (!controle.signal.aborted) setEstado('erro');
      });
    return () => controle.abort();
  }, []);

  const selecionado = videos.find((video) => video.id === idSelecionado) || videos[0];

  return (
    <section id="videos" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
              {paginaCompleta ? 'Canal Charles e Pierre' : 'Assista aqui'}
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">
              {paginaCompleta ? 'VIDEOTECA' : 'VÍDEOS'}
            </h2>
          </div>
          {!paginaCompleta && (
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-foreground/70 hover:text-foreground tracking-wider uppercase transition-colors"
            >
              Ver todos <ArrowRight size={17} />
            </Link>
          )}
        </div>

        {estado === 'carregando' && <p className="text-foreground/60 font-body">Carregando vídeos…</p>}
        {estado === 'erro' && <p className="text-foreground/60 font-body">Não foi possível carregar a videoteca.</p>}

        {estado === 'pronto' && videos.length === 0 && (
          <div className="border border-foreground/15 bg-background/30 px-8 py-16 text-center">
            <Film className="w-10 h-10 mx-auto mb-5 text-foreground/50" aria-hidden="true" />
            <h3 className="text-3xl font-display text-foreground tracking-wider mb-3">VÍDEOS EM BREVE</h3>
          </div>
        )}

        {estado === 'pronto' && videos.length > 0 && !paginaCompleta && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.slice(0, 4).map((video, indice) => (
              <Link
                key={video.id}
                to={'/videos?v=' + video.id}
                className="group block overflow-hidden border border-foreground/10 bg-background/20 hover:border-foreground/40 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={imagensGenericas[indice % imagensGenericas.length]}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/25 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="w-14 h-14 border-2 border-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-display text-foreground tracking-wider">{video.title}</h3>
                  <p className="text-xs font-body text-foreground/50 tracking-wider uppercase mt-2">Assistir no site →</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {estado === 'pronto' && paginaCompleta && selecionado && (
          <div className="space-y-10">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-black border border-foreground/10">
                {ativo ? (
                  <iframe
                    key={selecionado.id}
                    src={'https://www.youtube-nocookie.com/embed/' + selecionado.id + '?rel=0&playsinline=1&controls=1&autoplay=' + (reproduzirAoAbrir ? '1' : '0')}
                    title={'Reproduzir ' + selecionado.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => { setReproduzirAoAbrir(true); aoAtivar?.(); }}
                    className="group relative block w-full h-full text-white"
                    aria-label={'Reproduzir ' + selecionado.title}
                  >
                    <img
                      src={imagemYoutubeWebp(selecionado.id)}
                      alt=""
                      className="w-full h-full object-cover opacity-65"
                      onError={(evento) => {
                        const imagem = evento.currentTarget;
                        if (!imagem.src.endsWith('hqdefault.jpg')) imagem.src = imagemYoutubeAlternativa(selecionado.id);
                      }}
                    />
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25 group-hover:bg-black/10 transition-colors">
                      <Play className="w-14 h-14 drop-shadow-lg" />
                      <span className="font-body text-sm tracking-widest uppercase">Reproduzir este vídeo</span>
                    </span>
                  </button>
                )}
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-display text-foreground tracking-wider">
                {selecionado.title}
              </h3>
              {selecionado.description && (
                <p className="mt-2 font-body text-foreground/60">{selecionado.description}</p>
              )}
              <p className="mt-2 font-body text-sm text-foreground/50">
                Reprodução incorporada do YouTube. O vídeo permanece hospedado no canal original.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-display text-foreground tracking-wider mb-5">ESCOLHA OUTRO VÍDEO</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                {videos.map((video) => (
                  <Link
                    key={video.id}
                    to={'/videos?v=' + video.id}
                    onClick={() => {
                      setReproduzirAoAbrir(true);
                      aoAtivar?.();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    aria-current={selecionado.id === video.id ? 'page' : undefined}
                    className={
                      'group block overflow-hidden border transition-colors ' +
                      (selecionado.id === video.id
                        ? 'border-foreground/70 bg-background/30'
                        : 'border-foreground/10 hover:border-foreground/40')
                    }
                  >
                    <div className="relative aspect-video bg-background/70 overflow-hidden">
                      <img
                        src={imagemYoutubeWebp(video.id)}
                        alt={'Capa do vídeo ' + video.title}
                        loading="lazy"
                        onError={(evento) => {
                          const imagem = evento.currentTarget;
                          if (!imagem.src.endsWith('hqdefault.jpg')) imagem.src = imagemYoutubeAlternativa(video.id);
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors" aria-hidden="true">
                        <Play className="w-10 h-10 text-white drop-shadow-lg" />
                      </span>
                    </div>
                    <div className="px-4 py-3 font-display text-lg text-foreground tracking-wider">{video.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Videos;
