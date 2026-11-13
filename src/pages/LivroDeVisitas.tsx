import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, FileAudio, FileText, Image as ImageIcon, MapPin, ShieldCheck } from 'lucide-react';
import logo from '@/assets/logo-oficial.png';

type GuestbookConfig = { formId: string | null; submissoesAbertas: boolean };
type Registro = {
  id: string;
  nome: string;
  cidade?: string;
  epoca?: string;
  resumo: string;
  relato: string;
  foto?: string;
  anexos?: { titulo: string; tipo: 'foto' | 'audio' | 'pdf'; caminho: string }[];
};
const base = import.meta.env.BASE_URL;

const asset = (caminho: string) => {
  if (!/^livro-de-visitas\/[a-zA-Z0-9/_-]+\.(webp|jpg|jpeg|png|mp3|m4a|pdf)$/i.test(caminho)) return '';
  return base + caminho;
};
const LivroDeVisitas = () => {
  const [config, setConfig] = useState<GuestbookConfig>({ formId: null, submissoesAbertas: false });
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [selecionado, setSelecionado] = useState<Registro | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch(base + 'livro-de-visitas/config.json', { signal: controller.signal, cache: 'no-store' })
        .then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(base + 'livro-de-visitas/aprovados.json', { signal: controller.signal, cache: 'no-store' })
        .then(r => r.ok ? r.json() : []).catch(() => [])
    ]).then(([conf, data]: [unknown, unknown]) => {
      if (controller.signal.aborted) return;
      if (conf && typeof conf === 'object' && 'formId' in conf && 'submissoesAbertas' in conf) {
        const c = conf as GuestbookConfig;
        setConfig({ formId: typeof c.formId === 'string' && /^[a-zA-Z0-9]{5,24}$/.test(c.formId) ? c.formId : null,
          submissoesAbertas: c.submissoesAbertas === true });
      }
      if (Array.isArray(data)) setRegistros(data.filter((x: unknown): x is Registro =>
        x !== null && typeof x === 'object' && typeof (x as Registro).id === 'string' &&
        typeof (x as Registro).nome === 'string' && typeof (x as Registro).resumo === 'string' &&
        typeof (x as Registro).relato === 'string').slice(0, 200));
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.title = 'Livro de Visitas | Charles & Pierre';
    window.scrollTo(0, 0);
    return () => { document.title = 'Charles e Pierre'; };
  }, []);

  useEffect(() => {
    if (!selecionado) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelecionado(null); };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [selecionado]);

  const formularioAtivo = config.submissoesAbertas && !!config.formId;

  useEffect(() => {
    if (!formularioAtivo) return;
    // Script oficial Tally: redimensiona o formulário conforme seu conteúdo.
    const win = window as Window & { Tally?: { loadEmbeds: () => void } };
    const load = () => win.Tally?.loadEmbeds();
    if (win.Tally) { load(); return; }
    const selector = 'script[src="https://tally.so/widgets/embed.js"]';
    let script = document.querySelector<HTMLScriptElement>(selector);
    if (script) { script.addEventListener('load', load, { once: true }); return () => script?.removeEventListener('load', load); }
    script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = load;
    document.body.appendChild(script);
    return () => { if (script) script.onload = null; };
  }, [formularioAtivo]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <header className="border-b border-white/10 bg-black">
        <div className="container mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-3">
          <Link to="/" aria-label="Voltar à página inicial">
            <img src={logo} alt="Charles & Pierre" className="w-auto h-12 md:h-14 object-contain" />
          </Link>
          <Link to="/" className="text-xs tracking-widest uppercase text-white/60 hover:text-white inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Voltar ao site
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-white/10 py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <span className="text-xs font-medium uppercase tracking-[.3em] text-accent">Nossa história, contada por você</span>
            <h1 className="font-display tracking-wider text-6xl md:text-8xl mt-5 leading-none">LIVRO DE VISITAS</h1>
            <p className="font-body max-w-2xl mt-6 text-lg leading-8 text-white/65">
              As canções passam. As lembranças ficam.
            </p>
            <p className="font-body max-w-2xl mt-4 text-base leading-8 text-white/55">
              Você conheceu Charles & Pierre em um show? Guardou uma fotografia, um ingresso, uma gravação?
              Conte essa história. Sua lembrança também faz parte da nossa.
            </p>
            <a href="#assinar" className="inline-flex items-center gap-2 mt-9 px-7 py-4 bg-accent text-black hover:brightness-110 font-semibold uppercase text-xs tracking-widest">
              Deixe seu registro <ChevronRight size={18} />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24" aria-labelledby="titulo-lembrancas">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-xs uppercase tracking-[.26em] text-accent">Memórias compartilhadas</span>
                <h2 id="titulo-lembrancas" className="text-4xl md:text-5xl font-display mt-3 tracking-wider">QUEM FEZ PARTE DESSA HISTÓRIA</h2>
              </div>
              {registros.length > 0 && <span className="text-sm text-white/50">{registros.length} {registros.length === 1 ? 'registro' : 'registros'}</span>}
            </div>

            {registros.length === 0 ? (
              <div className="border border-white/15 bg-[#101010] px-7 py-14 text-center">
                <BookOpen size={30} className="text-accent mx-auto mb-4" strokeWidth={1.5}/>
                <p className="font-display text-3xl tracking-wider">AS PRIMEIRAS MEMÓRIAS VIRÃO AQUI</p>
                <p className="mt-3 text-white/55 text-sm">As histórias são publicadas depois de serem conferidas.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {registros.map(r => (
                  <button type="button" key={r.id} onClick={() => setSelecionado(r)}
                    className="text-left border border-white/15 bg-[#101010] hover:border-accent/60 transition-colors overflow-hidden">
                    {r.foto && asset(r.foto) && <img src={asset(r.foto)} alt="Fotografia compartilhada" loading="lazy" className="w-full aspect-[16/9] object-cover" />}
                    <div className="p-6">
                      <p className="text-accent text-xs uppercase tracking-widest">{r.epoca || 'Uma lembrança especial'}</p>
                      <h3 className="font-display text-2xl tracking-wider mt-3">{r.nome}</h3>
                      {r.cidade && <p className="text-xs text-white/50 mt-2 inline-flex items-center gap-1"><MapPin size={13} />{r.cidade}</p>}
                      <p className="text-white/65 leading-7 text-sm mt-5 line-clamp-3">{r.resumo}</p>
                      <span className="text-accent text-xs uppercase tracking-widest mt-5 inline-flex items-center gap-1">Ler história <ChevronRight size={15} /></span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="assinar" className="py-16 md:py-24 border-t border-white/10 bg-[#090909]">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            <span className="text-xs uppercase tracking-[.25em] text-accent">Deixe sua assinatura</span>
            <h2 className="font-display text-4xl md:text-6xl tracking-wider mt-3">CONTE SUA LEMBRANÇA</h2>
            <p className="mt-5 text-white/55 leading-8 max-w-2xl">
              Escreva como conheceu a dupla, em que cidade ou apresentação esteve e o que aquele momento significa para você.
              Fotografias, PDFs e áudios são bem-vindos.
            </p>
            <div className="mt-10 border border-white/15 bg-black p-5 md:p-9">
              {formularioAtivo ? (
                <div className="mx-auto max-w-2xl text-center py-10 md:py-16">
                  <BookOpen size={34} className="mx-auto text-accent mb-6" strokeWidth={1.4} aria-hidden="true" />
                  <p className="font-display text-3xl md:text-4xl tracking-wider">SUA HISTÓRIA FAZ PARTE DA NOSSA</p>
                  <p className="text-white/60 mt-5 mb-9 max-w-lg mx-auto leading-7 text-sm">
                    Compartilhe como conheceu Charles & Pierre, sua melhor lembrança e,
                    se desejar, uma fotografia ou gravação.
                  </p>
                  <button
                    type="button"
                    data-tally-open={config.formId ?? undefined}
                    data-tally-layout="modal"
                    data-tally-width="650"
                    data-tally-hide-title="1"
                    data-tally-overlay="1"
                    className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-accent hover:brightness-110 text-black text-xs font-semibold uppercase tracking-widest transition-colors"
                  >
                    Escrever minha lembrança <ChevronRight size={18} aria-hidden="true" />
                  </button>
                  <p className="mt-6 text-xs text-white/40">Envio privado. Publicação somente após aprovação.</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen size={30} className="mx-auto mb-5 text-accent" strokeWidth={1.5} />
                  <p className="font-display tracking-wider text-3xl">ASSINATURAS EM PREPARAÇÃO</p>
                  <p className="mt-4 text-white/55 text-sm">O formulário será disponibilizado nesta página.</p>
                </div>
              )}
            </div>
            <div className="flex items-start gap-3 max-w-3xl mt-7 text-white/50 text-xs leading-6">
              <ShieldCheck size={20} className="shrink-0 text-accent/80"/>
              <p>Os relatos e anexos enviados são examinados antes de aparecer no livro.
                Seu contato não será exibido publicamente. Limite previsto: até 5 MB por arquivo.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="container mx-auto px-6 lg:px-12 flex flex-wrap justify-between gap-4 text-xs text-white/45">
          <span>Charles & Pierre • Livro de Visitas</span><Link className="hover:text-white" to="/">Voltar ao site</Link>
        </div>
      </footer>

      {selecionado && (
        <div role="dialog" aria-modal="true" aria-label={'Memória de ' + selecionado.nome}
          className="fixed inset-0 z-[100] bg-black/85 p-4 md:p-10 overflow-y-auto flex items-start justify-center"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setSelecionado(null); }}>
          <article className="relative w-full max-w-2xl bg-[#121212] border border-white/20 p-7 md:p-10">
            <button type="button" onClick={() => setSelecionado(null)} aria-label="Fechar" className="absolute right-4 top-4 text-white/60 hover:text-white text-xl">×</button>
            <p className="text-accent text-xs uppercase tracking-widest">{selecionado.epoca}</p>
            <h2 className="font-display text-4xl mt-4">{selecionado.nome}</h2>
            {selecionado.cidade && <p className="mt-1 text-sm text-white/50">{selecionado.cidade}</p>}
            <p className="mt-6 whitespace-pre-wrap text-white/75 leading-8">{selecionado.relato}</p>
            {selecionado.anexos && selecionado.anexos.length > 0 && (
              <div className="mt-7 space-y-4">
                {selecionado.anexos.map((a, i) => {
                  const url = asset(a.caminho);
                  if (!url) return null;
                  return <div key={i} className="border-t border-white/10 pt-4">
                    <p className="text-sm text-white/65 mb-2">
                      {a.tipo === 'foto' ? <ImageIcon size={14} className="inline mr-2" /> : a.tipo === 'audio' ? <FileAudio size={14} className="inline mr-2" /> : <FileText size={14} className="inline mr-2" />}{a.titulo}
                    </p>
                    {a.tipo === 'foto' ? <img src={url} alt={a.titulo} className="max-w-full max-h-[520px] object-contain" /> :
                      a.tipo === 'audio' ? <audio controls preload="none" src={url} className="w-full" /> :
                      <iframe title={a.titulo} src={url} className="w-full h-80 bg-white" />}
                  </div>;
                })}
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  );
};

export default LivroDeVisitas;
