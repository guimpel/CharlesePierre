import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import logo from '@/assets/logo-oficial.png';

type Config = { formId: string | null; submissoesAbertas: boolean };
type Anexo = { titulo: string; tipo: 'foto' | 'audio' | 'pdf'; caminho: string };
type Registro = {
  id: string;
  nome: string;
  cidade?: string;
  epoca?: string;
  resumo: string;
  relato: string;
  foto?: string;
  anexos?: Anexo[];
};

const base = import.meta.env.BASE_URL;
const caminhoPublico = (caminho: string) =>
  /^livro-de-visitas\/[a-zA-Z0-9/_-]+\.(webp|jpe?g|png|mp3|m4a|pdf)$/i.test(caminho)
    ? base + caminho : '';

const LivroDeVisitas = () => {
  const [config, setConfig] = useState<Config>({ formId: null, submissoesAbertas: false });
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [selecionado, setSelecionado] = useState<Registro | null>(null);

  useEffect(() => {
    document.title = 'Livro de Visitas | Charles & Pierre';
    window.scrollTo(0, 0);
    const controller = new AbortController();
    Promise.all([
      fetch(base + 'livro-de-visitas/config.json', { signal: controller.signal, cache: 'no-store' })
        .then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(base + 'livro-de-visitas/aprovados.json', { signal: controller.signal, cache: 'no-store' })
        .then(r => r.ok ? r.json() : []).catch(() => [])
    ]).then(([c, data]: [unknown, unknown]) => {
      if (controller.signal.aborted) return;
      if (c && typeof c === 'object' && 'formId' in c && 'submissoesAbertas' in c) {
        const o = c as Config;
        setConfig({
          formId: typeof o.formId === 'string' && /^[a-zA-Z0-9]{5,24}$/.test(o.formId) ? o.formId : null,
          submissoesAbertas: o.submissoesAbertas === true
        });
      }
      if (Array.isArray(data)) {
        setRegistros(data.filter((x: unknown): x is Registro =>
          x !== null && typeof x === 'object' &&
          typeof (x as Registro).id === 'string' &&
          typeof (x as Registro).nome === 'string' &&
          typeof (x as Registro).resumo === 'string' &&
          typeof (x as Registro).relato === 'string'
        ).slice(0, 200));
      }
    });
    return () => { controller.abort(); document.title = 'Charles e Pierre'; };
  }, []);

  const formularioAtivo = !!config.formId && config.submissoesAbertas;

  useEffect(() => {
    if (!formularioAtivo) return;
    const w = window as Window & { Tally?: { loadEmbeds: () => void } };
    const carrega = () => w.Tally?.loadEmbeds();
    if (w.Tally) { carrega(); return; }
    const antigo = document.querySelector<HTMLScriptElement>('script[src="https://tally.so/widgets/embed.js"]');
    if (antigo) {
      antigo.addEventListener('load', carrega, { once: true });
      return () => antigo.removeEventListener('load', carrega);
    }
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = carrega;
    document.body.appendChild(script);
    return () => { script.onload = null; };
  }, [formularioAtivo]);

  useEffect(() => {
    if (!selecionado) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelecionado(null); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [selecionado]);

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-black/95 border-b border-white/10 backdrop-blur-sm">
        <nav className="container mx-auto h-full px-5 md:px-10 flex items-center justify-between gap-5">
          <Link to="/" aria-label="Charles & Pierre — voltar ao site" className="shrink-0 inline-flex items-center">
            <img
              src={logo}
              alt="Charles & Pierre"
              className="h-12 md:h-14 w-auto max-w-[165px] object-contain"
              loading="eager"
            />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-white/65 hover:text-white text-[11px] md:text-xs tracking-widest uppercase transition-colors">
            <ArrowLeft size={15} /> Voltar ao site
          </Link>
        </nav>
      </header>

      <main className="pt-20">
        {formularioAtivo ? (
          <div className="w-full overflow-hidden bg-black" aria-label="Formulário para registrar sua lembrança">
            {/*
              O Tally usa um iframe de outro domínio: o site não pode ajustar a
              apresentação da logomarca dentro dele. O recorte superior do embed oculta a repetição da logomarca.
              A barra fixa mantém a marca oficial e evita logotipos duplicados.
              O cabeçalho fixo acima usa a arte oficial com proporção preservada.
            */}
            <iframe
              title="Charles & Pierre — Livro de Visitas"
              data-tally-src={'https://tally.so/embed/' + config.formId + '?alignLeft=0&hideTitle=0&transparentBackground=1&dynamicHeight=1'}
              loading="eager"
              allow="clipboard-write"
              className="block w-full bg-black"
              style={{ border: 0, minHeight: 'calc(100dvh + 189px)', marginTop: '-170px' }}
            />
          </div>
        ) : (
          <div className="min-h-[80vh] flex items-center justify-center px-6 text-center">
            <div>
              <h1 className="font-display text-4xl md:text-6xl tracking-wider">LIVRO DE VISITAS</h1>
              <p className="text-white/60 mt-4">Assinaturas em preparação.</p>
            </div>
          </div>
        )}

        {registros.length > 0 && (
          <section aria-labelledby="mural" className="border-t border-white/15 px-6 py-16 md:py-20">
            <div className="mx-auto max-w-6xl">
              <span className="text-accent text-xs uppercase tracking-[.2em]">Memórias compartilhadas</span>
              <h2 id="mural" className="font-display text-4xl md:text-5xl mt-3 mb-9">LIVRO DE LEMBRANÇAS</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {registros.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelecionado(r)}
                    className="text-left border border-white/15 bg-[#0f0f0f] hover:border-accent/70 transition-colors overflow-hidden"
                  >
                    {r.foto && caminhoPublico(r.foto) && (
                      <img src={caminhoPublico(r.foto)} alt="Lembrança compartilhada" className="w-full aspect-video object-cover" loading="lazy" />
                    )}
                    <div className="p-6">
                      <p className="text-accent text-xs uppercase tracking-widest">{r.epoca || 'Lembrança especial'}</p>
                      <h3 className="font-display text-2xl mt-3">{r.nome}</h3>
                      {r.cidade && <p className="text-white/50 text-xs mt-2 inline-flex gap-1 items-center"><MapPin size={12} />{r.cidade}</p>}
                      <p className="text-white/65 leading-7 text-sm mt-4 line-clamp-3">{r.resumo}</p>
                      <span className="text-xs text-accent uppercase tracking-widest block mt-5">Ler depoimento →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {selecionado && (
        <div
          role="dialog" aria-modal="true" aria-label={'Depoimento de ' + selecionado.nome}
          className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-10 overflow-y-auto flex items-start justify-center"
          onMouseDown={e => { if (e.target === e.currentTarget) setSelecionado(null); }}
        >
          <article className="relative w-full max-w-2xl bg-[#111] border border-white/20 p-7 md:p-10">
            <button aria-label="Fechar" onClick={() => setSelecionado(null)} className="absolute top-3 right-3 p-3 text-xl">×</button>
            <span className="text-accent text-xs tracking-widest uppercase">{selecionado.epoca}</span>
            <h2 className="font-display text-4xl mt-3">{selecionado.nome}</h2>
            {selecionado.cidade && <p className="text-white/50 text-sm mt-1">{selecionado.cidade}</p>}
            <p className="text-white/75 leading-8 whitespace-pre-wrap mt-6">{selecionado.relato}</p>
            {selecionado.anexos?.map((anexo, i) => {
              const uri = caminhoPublico(anexo.caminho);
              if (!uri) return null;
              return (
                <div key={i} className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/65 text-sm mb-2">{anexo.titulo}</p>
                  {anexo.tipo === 'foto' ? <img src={uri} alt={anexo.titulo} className="max-w-full max-h-96 object-contain" /> :
                    anexo.tipo === 'audio' ? <audio controls src={uri} className="w-full" /> :
                    <iframe src={uri} title={anexo.titulo} className="w-full h-80 bg-white" />}
                </div>
              );
            })}
          </article>
        </div>
      )}
    </div>
  );
};

export default LivroDeVisitas;
