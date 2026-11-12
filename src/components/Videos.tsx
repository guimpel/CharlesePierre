import { useEffect, useState } from 'react';
import { Film, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type VideoItem = {
  id: string;
  title: string;
  file: string;
  poster?: string;
  description?: string;
};

const base = import.meta.env.BASE_URL;

const localPath = (path: string) => {
  const clean = path.replace(/^\/+/, '');
  // Os arquivos de vídeo devem permanecer na pasta public/videos.
  return `${base}videos/${encodeURI(clean)}`;
};

const Videos = ({ paginaCompleta = false }: { paginaCompleta?: boolean }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [falhaReproducao, setFalhaReproducao] = useState(false);

  useEffect(() => {
    let ativo = true;
    fetch(`${base}videos/catalogo.json`)
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Catálogo indisponível');
        return resposta.json();
      })
      .then((dados: unknown) => {
        if (!ativo) return;
        if (!Array.isArray(dados)) throw new Error('Catálogo inválido');
        const lista = dados.filter(
          (item): item is VideoItem =>
            item !== null &&
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.file === 'string' &&
            /^[^/\\]+\.(mp4|webm|ogg)$/i.test(item.file)
        );
        setVideos(lista);
        setSelecionado(lista[0]?.id ?? null);
        setErro(false);
      })
      .catch(() => {
        if (ativo) setErro(true);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => { ativo = false; };
  }, []);

  const atual = videos.find((video) => video.id === selecionado) ?? videos[0];
  const exibidos = paginaCompleta ? videos : videos.slice(0, 6);

  return (
    <section id="videos" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">
              Assista aqui
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">VÍDEOS</h2>
          </div>
          {!paginaCompleta && (
            <Link to="/videos" className="inline-flex items-center gap-2 text-sm font-body font-medium text-foreground/70 hover:text-foreground tracking-wider uppercase transition-colors">
              Ver todos <ArrowRight size={17} />
            </Link>
          )}
        </div>

        {carregando ? (
          <p className="text-foreground/60 font-body">Carregando videoteca…</p>
        ) : erro ? (
          <p className="text-foreground/60 font-body">Videoteca temporariamente indisponível.</p>
        ) : videos.length === 0 ? (
          <div className="border border-foreground/15 bg-background/30 px-8 py-16 text-center">
            <Film className="w-10 h-10 mx-auto mb-5 text-foreground/50" aria-hidden="true" />
            <h3 className="text-3xl font-display text-foreground tracking-wider mb-3">VÍDEOS EM BREVE</h3>
            <p className="text-foreground/60 font-body">
              Os videoclipes de Charles & Pierre serão reproduzidos diretamente neste site.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="mx-auto max-w-5xl">
              <div className="aspect-video bg-black overflow-hidden">
                <video
                  key={atual.id}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full"
                  poster={atual.poster ? localPath(atual.poster) : undefined}
                  onError={() => setFalhaReproducao(true)}
                  onLoadedMetadata={() => setFalhaReproducao(false)}
                >
                  <source src={localPath(atual.file)} type={/\.webm$/i.test(atual.file) ? 'video/webm' : /\.ogg$/i.test(atual.file) ? 'video/ogg' : 'video/mp4'} />
                  Seu navegador não suporta reprodução de vídeo HTML5.
                </video>
              </div>
              <h3 className="font-display tracking-wider text-2xl md:text-3xl mt-5 text-foreground">{atual.title}</h3>
              {atual.description && <p className="mt-2 font-body text-foreground/60">{atual.description}</p>}
              {falhaReproducao && <p className="mt-3 font-body text-sm text-foreground/70">Não foi possível carregar este vídeo. Verifique se o arquivo está publicado.</p>}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exibidos.map((video) => (
                <button
                  type="button"
                  key={video.id}
                  onClick={() => { setSelecionado(video.id); setFalhaReproducao(false); }}
                  aria-current={atual.id === video.id ? 'true' : undefined}
                  className={`text-left group border transition-colors ${atual.id === video.id ? 'border-foreground/70' : 'border-foreground/10 hover:border-foreground/40'}`}
                >
                  <div className="relative aspect-video bg-background/70 flex items-center justify-center overflow-hidden">
                    {video.poster ? (
                      <img src={localPath(video.poster)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
                    ) : <Film className="w-10 h-10 text-foreground/40" aria-hidden="true" />}
                    <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background/80 text-foreground"><Play size={20} /></span>
                  </div>
                  <div className="p-4 font-display text-lg tracking-wider text-foreground">{video.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Videos;
