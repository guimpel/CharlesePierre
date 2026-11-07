import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import capaVol1 from '@/assets/capas-web/vol-01.webp';
import capaVol2 from '@/assets/capas-web/vol-02.webp';
import capaVol3 from '@/assets/capas-web/vol-03.webp';
import capaVol4 from '@/assets/capas-web/vol-04.webp';
import capaVol5 from '@/assets/capas-web/vol-05.webp';
import capaVol6 from '@/assets/capas-web/vol-06.webp';
// CAPAS_OTIMIZADAS_WEBP_JPEG
type Faixa = { chave: string; titulo: string; album: string; url: string };
type Letra = { chave: string; titulo: string; texto: string; estado: 'carregando' | 'disponivel' | 'ausente' };

// Padrão: 01-Nome_da_Música_vol3.mp3 — título obtido da discografia.
const nomeMp3 = (volume: number, numero: number, titulo: string) =>
  `${String(numero).padStart(2, '0')}-${titulo.normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_+|_+$/g, '')}_vol${volume}.mp3`;

const caminho = (tipo: 'musicas' | 'letras', volume: number, faixa: number, titulo = '') => {
  const pasta = `${import.meta.env.BASE_URL}${tipo}/vol-${String(volume).padStart(2, '0')}/`;
  return pasta + (tipo === 'musicas' ? nomeMp3(volume, faixa, titulo) : `${String(faixa).padStart(2, '0')}.txt`);
};

const albuns: { ano: string; titulo: string; tipo: string; musicas: string[]; capa?: string; volume: number }[] = [
  { volume: 6, ano: '', titulo: 'Charles & Pierre', tipo: 'CD • Vol. 6', capa: capaVol6, musicas: ['Mulher Indomada','Só Te Amar','Minha Menina','Feitiço','Diga de Uma Vez por Todas','Só Com Você','Fica Comigo Agora','Tô Pro Amor','Namoro Antigo','Senhora Aparecida'] },
  { volume: 5, ano: '1997', titulo: 'Só Uma Vez', tipo: 'CD • Vol. 5', capa: capaVol5, musicas: ['Só Uma Vez','Eu Quero Fazer Amor','Diga Pra Mim','Não Peça Bis','Quando Ela Passa Por Mim','Riozinho','Não Volta','Corre-Corre','Mundo de Amor','Blá Blá Blá','De Cidade em Cidade','Meu Pensamento É Todo Você','Briguenta'] },
  { volume: 4, ano: '1995', titulo: 'São Teus Olhos', tipo: 'LP • Vol. 4', capa: capaVol4, musicas: ['São Teus Olhos','Não Deixei de Te Amar','Anjo da Noite','Era Tudo Mentira','Eu Digo Não','Só Por Amor','Papel de Bobo','Sempre na Estrada','Quem É Você?','Noite Colorida','Volta Pra Mim','Por Te Amar Demais'] },
  { volume: 3, ano: '1994', titulo: 'Por Te Amar Demais', tipo: 'LP • Vol. 3', capa: capaVol3, musicas: ['Por Te Amar Demais','Você Foi Bobo Demais, Coração','Volta Pra Mim','Um Coração Não É Brinquedo','Estou Feliz','Amor Livre','Eu Digo Sim, Você Diz Não','Namorada','Diferenças','Amor Livre — Karaokê'] },
  { volume: 2, ano: '1992', titulo: 'Made In Sertão', tipo: 'LP • Vol. 2', capa: capaVol2, musicas: ['Cama Gostosa','É Só Me Chamar Que Eu Vou','A Cola na Coxa Dela','Que Gostoso','Cama Gostosa — Karaokê','Dia Sim, Dia Sim','Sala de Aula','Homenagem à Aparecida','Quando','Dia Sim, Dia Sim — Karaokê'] },
  { volume: 1, ano: '1990', titulo: 'Brasil Rural', tipo: 'LP • Vol. 1', capa: capaVol1, musicas: ['Me Dê Um Sinal','O Inferno É Aqui Mesmo','Garota Especial','Férias no Amor','Não Faça Assim Comigo','Abelha Malvada','Menina Paixão','Vale Postal','Sofrimento','Coração Indefeso'] },
];

const Discografia = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [faixaAtual, setFaixaAtual] = useState<Faixa | null>(null);
  const [tocando, setTocando] = useState(false);
  const [letra, setLetra] = useState<Letra | null>(null);
  const [capaAberta, setCapaAberta] = useState<{ volume: number; titulo: string } | null>(null);

  const tocar = (volume: number, numero: number, titulo: string, album: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    const chave = `${volume}-${numero}`;
    if (faixaAtual?.chave === chave) {
      if (audio.paused) {
        void audio.play().catch(() => toast.error('Não foi possível reproduzir este MP3.'));
      } else {
        audio.pause();
      }
      return;
    }

    const url = caminho('musicas', volume, numero, titulo);
    setFaixaAtual({ chave, titulo, album, url });
    setTocando(false);
    audio.pause();
    audio.src = url;
    audio.load();
    // Iniciar diretamente no clique permite reprodução também em navegadores móveis.
    void audio.play().catch(() => {
      setTocando(false);
      toast.info('MP3 ainda não disponível. Envie o arquivo para ' + `public/musicas/vol-${String(volume).padStart(2, '0')}/${nomeMp3(volume, numero, titulo)}`);
    });
  };

  const abrirLetra = async (volume: number, numero: number, titulo: string) => {
    const chave = `${volume}-${numero}`;
    setLetra({ chave, titulo, estado: 'carregando', texto: '' });
    try {
      const resposta = await fetch(caminho('letras', volume, numero));
      const contentType = resposta.headers.get('content-type')?.toLowerCase() ?? '';
      // O GitHub Pages pode servir index.html como fallback para arquivos inexistentes.
      if (!resposta.ok || !contentType.includes('text/plain')) throw new Error('Arquivo ausente');
      const texto = (await resposta.text()).trim();
      if (!texto) throw new Error('Letra vazia');
      setLetra(atual => atual?.chave === chave ? { chave, titulo, texto, estado: 'disponivel' } : atual);
    } catch {
      setLetra(atual => atual?.chave === chave ? { chave, titulo, estado: 'ausente', texto: '' } : atual);
    }
  };

  return (
    <>
      <section id="musica" className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-body font-medium text-foreground/50 tracking-[0.3em] uppercase mb-4 block">Discografia</span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">ÁLBUNS & MÚSICAS</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {albuns.map(album => (
              <div key={album.volume} className="group bg-background/50 p-6 border border-foreground/10 hover:border-foreground/30 transition-colors">
                {album.capa ? (
                  <button type="button" onClick={() => setCapaAberta({ volume: album.volume, titulo: album.titulo })} aria-label={`Ampliar capa do volume ${album.volume}`} className="block w-full mb-6 cursor-zoom-in">
                    <img src={album.capa} alt={`Capa ${album.titulo} — volume ${album.volume}`} loading="lazy" decoding="async" className="block aspect-square w-full object-contain" />
                  </button>
                ) : (
                  <div className="aspect-square bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                    <span className="text-6xl font-display text-foreground/20">{album.volume}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <span className="text-xs font-body text-foreground/40 tracking-wider uppercase">{album.tipo}{album.ano && ` • ${album.ano}`}</span>
                  <h3 className="text-xl font-display text-foreground tracking-wide">{album.titulo}</h3>
                  <ul className="pt-4 space-y-2">
                    {album.musicas.map((musica, idx) => {
                      const chave = `${album.volume}-${idx + 1}`;
                      return (
                        <li key={chave} className="text-sm font-body text-foreground/60 flex flex-wrap items-center gap-2">
                          <span className="text-xs text-foreground/30">{String(idx + 1).padStart(2, '0')}</span>
                          <span className="flex-1 min-w-0 break-words">{musica}</span>
                          <button type="button" onClick={() => tocar(album.volume, idx + 1, musica, album.titulo)} className="text-xs text-foreground/70 hover:text-foreground underline-offset-2 hover:underline" aria-label={`${faixaAtual?.chave === chave && tocando ? 'Pausar' : 'Ouvir'} ${musica}`}>
                            {faixaAtual?.chave === chave && tocando ? 'Pausar' : 'Ouvir'}
                          </button>
                          {!musica.endsWith(' — Karaokê') && (
                            <button type="button" onClick={() => void abrirLetra(album.volume, idx + 1, musica)} className="text-xs text-foreground/70 hover:text-foreground underline-offset-2 hover:underline" aria-label={`Ler letra de ${musica}`}>
                              Letra
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-foreground/50 font-body mb-6">Ouça Charles e Pierre nas plataformas digitais</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="https://open.spotify.com/artist/0f0nqLrqYir5p8m3dXab1t" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-[#1DB954] text-white font-body font-semibold text-sm tracking-wider uppercase hover:bg-[#1ed760] transition-colors">Spotify</a>
              <a href="https://www.deezer.com/pt/artist/449639" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-foreground text-foreground font-body font-semibold text-sm tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors">Deezer</a>
              <a href="https://www.youtube.com/@charlesepierre" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-[#FF0000] text-white font-body font-semibold text-sm tracking-wider uppercase hover:bg-[#CC0000] transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </section>

      <div className={faixaAtual ? 'fixed bottom-0 inset-x-0 z-[70] border-t border-foreground/20 bg-background/95 shadow-xl backdrop-blur-sm' : 'hidden'}>
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <div className="flex-1 min-w-0">
            <p className="font-body text-foreground text-sm font-semibold truncate">{faixaAtual?.titulo}</p>
            <p className="font-body text-foreground/60 text-xs truncate">{faixaAtual?.album} — Charles e Pierre</p>
          </div>
          <audio ref={audioRef} controls preload="none" className="w-full md:w-[min(540px,65vw)] h-10" onPlay={() => setTocando(true)} onPause={() => setTocando(false)} onEnded={() => setTocando(false)} onError={() => setTocando(false)} aria-label="Player musical Charles e Pierre" />
          <button type="button" className="text-xs text-foreground/60 hover:text-foreground self-end md:self-auto" onClick={() => { audioRef.current?.pause(); audioRef.current?.removeAttribute('src'); audioRef.current?.load(); setFaixaAtual(null); setTocando(false); }} aria-label="Fechar player">Fechar</button>
        </div>
      </div>

      <Dialog open={Boolean(letra)} onOpenChange={aberto => { if (!aberto) setLetra(null); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogTitle className="font-display text-2xl">{letra?.titulo}</DialogTitle>
          <DialogDescription>Letra da música — Charles e Pierre</DialogDescription>
          {letra?.estado === 'carregando' && <p className="text-sm text-muted-foreground">Carregando letra…</p>}
          {letra?.estado === 'ausente' && <p className="text-sm text-muted-foreground">Letra ainda não cadastrada neste site.</p>}
          {letra?.estado === 'disponivel' && <p className="whitespace-pre-wrap font-body text-sm text-foreground leading-7">{letra.texto}</p>}
          {letra?.estado === 'disponivel' && <p className="mt-8 text-right font-body text-xs" style={{ color: '#444444' }}>@GUIMPEL</p>}
        </DialogContent>
      </Dialog>
      <Dialog open={Boolean(capaAberta)} onOpenChange={aberto => { if (!aberto) setCapaAberta(null); }}>
        <DialogContent className="max-w-5xl w-[calc(100%-2rem)] max-h-[92vh] p-3 md:p-5 overflow-hidden">
          <DialogTitle className="sr-only">Capa ampliada — {capaAberta?.titulo}</DialogTitle>
          <DialogDescription className="sr-only">Imagem original do álbum Charles e Pierre, volume {capaAberta?.volume}</DialogDescription>
          {capaAberta && (
            <img
              src={`${import.meta.env.BASE_URL}capas/vol-${String(capaAberta.volume).padStart(2, '0')}.jpg`}
              alt={`Capa ampliada — ${capaAberta.titulo}`}
              className="w-full max-h-[84vh] object-contain"
              loading="eager"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Discografia;
