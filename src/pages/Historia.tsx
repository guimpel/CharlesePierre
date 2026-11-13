import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Disc3, FileText, Headphones, Images, Music2, Play, Radio, X } from 'lucide-react';
import logo from '@/assets/logo-oficial.png';
import capa1 from '@/assets/capas-web/vol-01.webp';
import capa2 from '@/assets/capas-web/vol-02.webp';
import capa3 from '@/assets/capas-web/vol-03.webp';
import capa4 from '@/assets/capas-web/vol-04.webp';
import capa5 from '@/assets/capas-web/vol-05.webp';
import capa6 from '@/assets/capas-web/vol-06.webp';

type Documento = {
  nome: string;
  endereco: string;
  tipo: 'acervo' | 'pdf' | 'jornal' | 'video';
  pagina?: number;
  observacao?: string;
  origem?: string;
};
type Marco = {
  id: string;
  ano: string;
  tipo: 'disco' | 'documento' | 'foto' | 'internet' | 'radio';
  titulo: string;
  descricao: string;
  detalhe: string;
  imagem?: string;
  legenda: string;
  documentos: Documento[];
};
type Estacao = {
  id: string;
  nome: string;
  local: string;
  faixa: string;
  horario: string;
  sequencia: string;
  playlist: string;
  radio: string;
  programa?: string;
};

const capas = [
  {ano: '1990', titulo: 'Primeiro LP • Charles e Pierre', imagem: capa1},
  {ano: '1991–1992', titulo: 'Made in Sertão', imagem: capa2},
  {ano: '1994', titulo: 'Por Te Amar Demais', imagem: capa3},
  {ano: '1995–1996', titulo: 'São Teus Olhos', imagem: capa4},
  {ano: '1997', titulo: 'Só Uma Vez', imagem: capa5},
  {ano: '2000', titulo: 'Charles & Pierre • Vol. 6', imagem: capa6},
];

const fotosShow = [
  {ano:'2004 • EXIF',titulo:'Apresentação — palco e músicos • foto 01',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9545.webp',origem:'IMG_9545.JPG'},
  {ano:'2004 • EXIF',titulo:'Apresentação — palco e violão • foto 02',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9547.webp',origem:'IMG_9547.JPG'},
  {ano:'2004 • EXIF',titulo:'Apresentação — músicos em palco • foto 03',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9558.webp',origem:'IMG_9558.JPG'},
  {ano:'2004 • EXIF',titulo:'Bastidores da apresentação • foto 04',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9566.webp',origem:'IMG_9566.JPG'},
  {ano:'2004 • EXIF',titulo:'Convidados e músicos • foto 05',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9577.webp',origem:'IMG_9577.JPG'},
  {ano:'2004 • EXIF',titulo:'Convidados e músicos • foto 06',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9581.webp',origem:'IMG_9581.JPG'},
  {ano:'2004 • EXIF',titulo:'Registro de bastidores • foto 07',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9794.webp',origem:'IMG_9794.JPG'},
  {ano:'2004 • EXIF',titulo:'Registro de bastidores • foto 08',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9795.webp',origem:'IMG_9795.JPG'},
  {ano:'2004 • EXIF',titulo:'Público e apresentação • foto 09',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9817.webp',origem:'IMG_9817.JPG'},
  {ano:'2004 • EXIF',titulo:'Música ao vivo • foto 10',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9843.webp',origem:'IMG_9843.JPG'},
  {ano:'2004 • EXIF',titulo:'Palco e plateia • foto 11',imagem:import.meta.env.BASE_URL+'historia/fotos/img_9845.webp',origem:'IMG_9845.JPG'},
];

const marcos: Marco[] = [
  {
    id: 'lp1990', ano: '1990', tipo: 'disco', titulo: 'O primeiro LP',
    descricao: 'A dupla registra seu trabalho pela Brasil Rural, catálogo 74.005.',
    detalhe: 'O Instituto Memória Musical Brasileira cataloga o LP de Charles e Pierre em 1990, pela Brasil Rural. No repertório estão Me Dê Um Sinal, Garota Especial, Abelha Malvada e Coração Indefeso. A imagem apresentada é a capa do disco, não uma fotografia de show atribuída a 1990.',
    imagem: capa1, legenda: 'Capa do LP • Brasil Rural 74.005',
    documentos: [{nome:'IMMuB — ficha do LP de 1990',endereco:'https://immub.org/album/charles-e-pierre',tipo:'acervo'}]
  },
  {
    id: 'made', ano: '1991–92', tipo: 'disco', titulo: 'Made in Sertão',
    descricao: 'Um LP da dupla preservado em acervo universitário.',
    detalhe: 'O IMMuB indica 1991 para Made in Sertão; outros catálogos apresentam 1992. O Núcleo de Documentação e Pesquisa Histórica da Universidade Estadual de Londrina registra o exemplar CRU-0151 como sem data. A divergência foi preservada até exame do selo e da contracapa.',
    imagem: capa2, legenda: 'Capa do LP • Made in Sertão',
    documentos: [
      {nome:'UEL — inventário CRU-0151 (página 7)',endereco:'https://sites.uel.br/ndph/wp-content/uploads/2022/08/CRU.RELACAO-FONTES.pdf',tipo:'pdf',pagina:7},
      {nome:'IMMuB — discografia da dupla',endereco:'https://immub.org/artista/charles-e-pierre',tipo:'acervo'}
    ]
  },
  {
    id: 'cruzilia', ano: '1993–94', tipo: 'documento', titulo: 'Apresentação registrada em Cruzília',
    descricao: 'Jornal municipal de dezembro de 1994 menciona um show de Charles e Pierre.',
    detalhe: 'O jornal Ação Participativa, edição nº 25 de dezembro de 1994, registra a apresentação de Charles e Pierre na relação cultural de Cruzília, Minas Gerais. A página 13 foi preservada integralmente.',
    imagem: import.meta.env.BASE_URL+'historia/documentos/cruzilia-1994-pagina-13.webp',
    legenda: 'Jornal Ação Participativa • página 13 • dezembro de 1994',
    documentos: [{nome:'Ação Participativa — página 13 (1994)',endereco:import.meta.env.BASE_URL+'historia/documentos/cruzilia-1994-pagina-13.pdf',tipo:'pdf',origem:'https://pt.scribd.com/document/1032043197/Jornal-Acao-Participativa-1994-Dezembro-Numero-25'}]
  },
  {
    id: 'lp1994', ano: '1994', tipo: 'disco', titulo: 'Por Te Amar Demais',
    descricao: 'O LP aparece também no catálogo físico da Discoteca Rádio UFSM.',
    detalhe: 'O catálogo da Discoteca Rádio UFSM registra o LP Por Te Amar Demais, Charles e Pierre, Magno, 1994, mídia vinil, código 403.850. A presença no acervo confirma a catalogação do disco, mas não comprova quando ele foi tocado pela rádio.',
    imagem: capa3, legenda: 'Capa do LP • Por Te Amar Demais',
    documentos: [
      {nome:'Discoteca Rádio UFSM — registro 403.850 (página 102)',endereco:'https://www.ufsm.br/app/uploads/sites/400/2019/01/Discoteca-Rdio-UFSM-ndice-completo-2-1.pdf',tipo:'pdf',pagina:102},
      {nome:'Cifra Club — ficha do álbum',endereco:'https://www.cifraclub.com.br/charles-e-pierre/discografia/por-te-amar-demais-1994/',tipo:'acervo'}
    ]
  },
  {
    id: 'olhos', ano: '1995–96', tipo: 'disco', titulo: 'São Teus Olhos',
    descricao: 'O quarto volume amplia o repertório romântico da dupla.',
    detalhe: 'A discografia do site da dupla registra o LP em 1995; o IMMuB cataloga São Teus Olhos — Vol. 4 em 1996 pela Magno, MGCD 013/6. A divergência está sinalizada em vez de escolher uma data sem prova conclusiva.',
    imagem: capa4, legenda: 'Capa do volume 4 • São Teus Olhos',
    documentos: [{nome:'IMMuB — registro do álbum',endereco:'https://immub.org/artista/charles-e-pierre',tipo:'acervo'}]
  },
  {
    id: 'so-uma-vez', ano: '1997', tipo: 'disco', titulo: 'Só Uma Vez',
    descricao: 'O quinto volume reúne novas gravações da dupla.',
    detalhe: 'O álbum Só Uma Vez aparece nos catálogos musicais com o ano de 1997. A capa mostrada pertence ao acervo da discografia já publicada no site.',
    imagem: capa5, legenda: 'Capa do volume 5 • Só Uma Vez',
    documentos: [{nome:'Cifra Club — discografia de 1997',endereco:'https://www.cifraclub.com.br/charles-e-pierre/discografia/so-uma-vez-1997/',tipo:'acervo'}]
  },
  {
    id: 'volume6', ano: '2000', tipo: 'disco', titulo: 'Volume 6',
    descricao: 'Repertório documentado em ficha técnica retrospectiva.',
    detalhe: 'O sexto volume é referido como edição de 2000 em arquivo discográfico retrospectivo. Entre as faixas estão Mulher Indomada, Minha Menina, Feitiço e Senhora Aparecida. É necessário confirmar uma cópia original para fechar os créditos e a data da edição.',
    imagem: capa6, legenda: 'Capa do volume 6 • acervo da dupla',
    documentos: [{nome:'Pra Sempre Sertanejo — ficha do volume 6',endereco:'https://www.prasempresertanejo.com.br/2025/08/charles-e-pierre-2000.html',tipo:'acervo'}]
  },
  {
    id: 'show2004', ano: '2004', tipo: 'foto', titulo: 'Fotografias de uma apresentação',
    descricao: 'Onze fotografias preservam uma apresentação registrada na câmera em setembro de 2004.',
    detalhe: 'Os onze JPG originais foram fornecidos pela dupla. Os metadados EXIF da câmera Canon EOS 10D registram captura em 29 e 30 de setembro de 2004. Isso é um indicativo histórico relevante, mas o relógio da câmera, o local e a identificação dos participantes ainda precisam ser confrontados com outras fontes. As imagens não foram reconstruídas; apenas redimensionadas para WebP na publicação, com os originais mantidos em separado.',
    imagem: import.meta.env.BASE_URL+'historia/fotos/img_9817.webp',
    legenda: 'Fotografia da apresentação • data conforme EXIF da câmera',
    documentos: [{nome:'Fotografia original do acervo — IMG_9817.JPG',endereco:import.meta.env.BASE_URL+'historia/fotos/img_9817.webp',tipo:'acervo'}]
  },
  {
    id: 'youtube', ano: '2011', tipo: 'internet', titulo: 'O repertório aparece na internet',
    descricao: 'Uma publicação de Me Dê Um Sinal no YouTube preserva imagens anteriores da dupla.',
    detalhe: 'A referência de 2011 corresponde ao registro de publicação digital do vídeo. Não indica a data em que a fotografia foi tirada, nem permite datar uma apresentação. A reprodução abre dentro desta página.',
    imagem: 'https://i.ytimg.com/vi/aYFsB4KTZg8/hqdefault.jpg',
    legenda: 'Miniatura do vídeo no YouTube • foto sem data atribuída',
    documentos: [{nome:'YouTube — Me Dê Um Sinal',endereco:'https://www.youtube.com/watch?v=aYFsB4KTZg8',tipo:'video'}]
  },
  {
    id: 'radio2026', ano: '2026', tipo: 'radio', titulo: 'As gravações continuam no rádio',
    descricao: 'Em 2026, músicas da dupla aparecem em rádios de Minas Gerais e Santa Catarina.',
    detalhe: 'Me Dê Um Sinal — Montes Claros 98 FM, 20h40; Eu Digo Sim, Você Diz Não — Guanaã FM, 23h22; Diferenças — 106 FM Blumenau, 02h47. São horários de execuções registradas em 2026.',
    legenda: 'Monitoramento de playlists digitais • 2026',
    documentos: [{nome:'Montes Claros 98 FM — playlist',endereco:'https://onlineradiobox.com/br/98montesclaros/playlist/1',tipo:'acervo'},
      {nome:'Guanaã FM — playlist',endereco:'https://onlineradiobox.com/br/guanaa879/playlist/5',tipo:'acervo'},
      {nome:'106 FM — playlist',endereco:'https://onlineradiobox.com/br/mix1063/playlist/5',tipo:'acervo'}]
  }
];

const radios: Estacao[] = [
  {
    id:'montes',nome:'Montes Claros 98 FM',local:'Montes Claros • MG',
    faixa:'Me Dê Um Sinal',horario:'20h40',
    programa:'Buteco 98 • 19h às 21h',
    sequencia:'Registro em playlist de 2026',
    playlist:'https://onlineradiobox.com/br/98montesclaros/playlist/1',
    radio:'https://montesclaros.com/aovivo/stream98.asp'
  },
  {
    id:'guanaa',nome:'Guanaã FM 87,9',local:'Guanhães • MG',
    faixa:'Eu Digo Sim, Você Diz Não',horario:'23h22',
    sequencia:'Registro em playlist de 2026',
    playlist:'https://onlineradiobox.com/br/guanaa879/playlist/5',
    radio:'https://onlineradiobox.com/br/guanaa879/'
  },
  {
    id:'106',nome:'106 FM',local:'Blumenau • SC',
    faixa:'Diferenças',horario:'02h47',
    sequencia:'Registro em playlist de 2026',
    playlist:'https://onlineradiobox.com/br/mix1063/playlist/5',
    radio:'https://tudoradio.com/player/radio/1029-106-fm'
  },
];

const marca = {
  disco: {icone:Disc3,texto:'Disco'},
  documento: {icone:FileText,texto:'Documento de época'},
  internet: {icone:Play,texto:'Registro digital'},
  radio: {icone:Radio,texto:'Rádio'},
  foto: {icone:Images,texto:'Fotografia de acervo'}
};

const Historia = () => {
  const [aba, setAba] = useState<'tempo' | 'fotos' | 'radios'>('tempo');
  const [filtro, setFiltro] = useState<'todos' | 'disco' | 'documento' | 'foto' | 'internet' | 'radio'>('todos');
  const [aberto, setAberto] = useState<Marco | null>(null);
  const [foto, setFoto] = useState<(typeof capas)[number] | null>(null);
  const [docAtual, setDocAtual] = useState(0);

  const fechar = () => {
    setAberto(null);
    setFoto(null);
    setDocAtual(0);
  };
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {if(e.key === 'Escape') fechar();};
    document.addEventListener('keydown',esc);
    return () => document.removeEventListener('keydown',esc);
  }, []);
  useEffect(() => {
    document.title = 'Nossa História | Charles & Pierre';
    window.scrollTo({top:0,behavior:'instant'});
    return () => { document.title = 'Charles e Pierre'; };
  }, []);

  const abrirMarco = (m: Marco) => { setDocAtual(0); setAberto(m); };
  const dialogo = !!aberto || !!foto;
  const doc = aberto?.documentos[docAtual];
  const previewDocumento = doc?.tipo === 'pdf' ? doc.endereco + (doc.pagina ? '#page=' + doc.pagina : '') : null;
  const youtube = doc?.tipo === 'video' ? 'https://www.youtube-nocookie.com/embed/aYFsB4KTZg8' : null;
  const itens = marcos.filter(m => filtro === 'todos' || m.tipo === filtro);

  return (
    <div className="min-h-screen bg-[#100d0b] text-[#f3e9d8] selection:bg-[#b9935b] selection:text-black">
      <style>{`
        @keyframes cp-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cp-pulse{0%,100%{opacity:.55}50%{opacity:1}}
        .cp-rise{animation:cp-rise .8s both}
        .cp-timeline{position:relative}
        .cp-timeline::before{content:'';position:absolute;top:0;bottom:0;left:18px;width:2px;background:linear-gradient(#b68a49,#403324 88%,transparent)}
        .cp-card{transition:transform .3s,border-color .3s,box-shadow .3s}
        .cp-card:hover{transform:translateY(-4px);border-color:#b9935b;box-shadow:0 16px 35px #0006}
        @media(min-width:768px){.cp-timeline::before{left:calc(50% - 1px)}}
        @media(prefers-reduced-motion:reduce){.cp-rise{animation:none}.cp-card{transition:none}}
      `}</style>
      <header className="sticky top-0 z-40 border-b border-[#ad8753]/25 bg-[#100d0b]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0"><img src={logo} alt="Charles & Pierre" className="h-11 md:h-14 w-auto" /></Link>
          <nav className="flex items-center gap-4 md:gap-8 text-[11px] md:text-xs font-body uppercase tracking-widest">
            <button onClick={() => setAba('tempo')} className={aba==='tempo'?'text-[#e9bd79]':'text-[#d5c7b6] hover:text-white'}>História</button>
            <button onClick={() => setAba('fotos')} className={aba==='fotos'?'text-[#e9bd79]':'text-[#d5c7b6] hover:text-white'}>Fotos</button>
            <button onClick={() => setAba('radios')} className={aba==='radios'?'text-[#e9bd79]':'text-[#d5c7b6] hover:text-white'}>Rádios</button>
            <Link to="/" className="hidden sm:inline-flex items-center gap-2 text-[#d5c7b6] hover:text-white"><ArrowLeft size={14}/> Início</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#a9804b]/20">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_75%_30%,#ad713c,transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
            <div className="cp-rise">
              <span className="font-body text-xs uppercase tracking-[.3em] text-[#dfb477]">Acervo histórico • Charles & Pierre</span>
              <h1 className="font-display text-6xl md:text-[6rem] leading-[.96] tracking-wide mt-6">O TEMPO <br/><span className="text-[#dfb477]">GUARDA</span><br/>A MÚSICA</h1>
              <p className="mt-8 max-w-2xl text-[#d2c3b0] leading-8 font-body">Uma viagem pelas capas, documentos e registros que preservam a trajetória da dupla sertaneja mineira. Cada época apresenta sua fonte — e o que ainda falta descobrir.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => setAba('tempo')} className="px-6 py-3 bg-[#c69e66] text-[#1b140d] font-semibold uppercase text-xs tracking-widest hover:bg-[#e3bd85]">Explorar a história</button>
                <button onClick={() => setAba('radios')} className="px-6 py-3 border border-[#a88756]/60 text-[#e3bd85] uppercase text-xs tracking-widest hover:bg-[#b18b58]/10 inline-flex items-center gap-2"><Headphones size={16}/> Ouvir rádios</button>
              </div>
            </div>
            <div className="relative max-w-lg mx-auto w-full cp-rise" style={{animationDelay:'.15s'}}>
              <div className="grid grid-cols-3 gap-2 md:gap-3 -rotate-3">
                {[capa1,capa2,capa3].map((c,i)=>(
                  <button key={i} onClick={()=>{setFoto(capas[i]);setAba('fotos');}} className={'overflow-hidden border-4 border-[#d9c49e] bg-[#2b2116] shadow-2xl ' + (i===1?'translate-y-7':'')}><img src={c} alt={capas[i].titulo} className="aspect-[3/4] object-cover w-full" /></button>
                ))}
              </div>
              <p className="text-right text-[#bb9d73] text-xs tracking-widest mt-12 uppercase">Capas do acervo discográfico</p>
            </div>
          </div>
        </section>

        <div className="sticky top-[76px] md:top-[86px] z-30 bg-[#18130f]/95 backdrop-blur-lg border-b border-[#8c6d43]/25">
          <div className="mx-auto max-w-7xl flex gap-2 md:gap-4 px-5 md:px-8 py-4 overflow-x-auto">
            {([
              ['tempo','Linha do tempo',CalendarDays],
              ['fotos','Fotografias e capas',Images],
              ['radios','Nas rádios',Radio],
            ] as const).map(([chave,nome,Icone])=><button key={chave} onClick={()=>setAba(chave)} className={'px-4 md:px-5 py-3 shrink-0 inline-flex items-center gap-2 text-xs tracking-wider uppercase border transition-colors ' + (aba===chave?'bg-[#bd965f] border-[#bd965f] text-[#17110b]':'border-[#81623d]/35 text-[#e4d1b5] hover:border-[#bd965f]')}><Icone size={16}/>{nome}</button>)}
          </div>
        </div>

        {aba==='tempo' && <section className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div><span className="text-[#c7a06b] text-xs uppercase tracking-[.26em]">Uma trajetória documentada</span><h2 className="font-display text-4xl md:text-6xl mt-3 tracking-wide">LINHA DO TEMPO</h2></div>
            <p className="max-w-md text-[#ae9b85] text-sm leading-7">Clique em qualquer marco para ler a história, conferir a fonte e visualizar o documento sem abandonar esta página.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-14">
            {([['todos','Todos'],['disco','Discos'],['documento','Jornais'],['foto','Fotos'],['internet','Internet'],['radio','Rádios']] as const).map(([v,t])=><button key={v} onClick={()=>setFiltro(v)} className={'px-4 py-2 text-xs uppercase tracking-widest border '+(filtro===v?'bg-[#c69e66] text-[#21160a] border-[#c69e66]':'text-[#bdad96] border-[#6f5333] hover:text-white')}>{t}</button>)}
          </div>
          <div className="cp-timeline space-y-9">
            {itens.map((m,i)=>{
              const Icone=marca[m.tipo].icone;
              return (
                <article key={m.id} className={'relative flex md:justify-between items-start gap-5 cp-rise ' + (i%2===0?'md:flex-row-reverse':'md:flex-row')} style={{animationDelay:Math.min(i,9)*.07+'s'}}>
                  <div className="absolute top-7 left-[11px] md:left-[calc(50%-8px)] h-4 w-4 rounded-full bg-[#d1ac75] ring-[5px] ring-[#100d0b] z-10" />
                  <div className="hidden md:block w-[calc(50%-34px)]" />
                  <div className="ml-11 md:ml-0 md:w-[calc(50%-34px)] w-full">
                    <button onClick={()=>abrirMarco(m)} className="cp-card w-full text-left block overflow-hidden rounded-sm border border-[#8c6a40]/40 bg-[#1d1713]">
                      {m.imagem ? <div className="relative overflow-hidden bg-[#241b15]">
                        <img src={m.imagem} alt={m.legenda} loading="lazy" className="w-full max-h-60 object-contain object-center" />
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1d1713] to-transparent" />
                      </div> : <div className="h-32 flex items-center justify-center bg-gradient-to-br from-[#3a271c] to-[#211712]"><FileText size={48} className="text-[#b59564]" /></div>}
                      <div className="px-5 md:px-7 pb-6 pt-4">
                        <div className="flex items-center justify-between gap-2 mb-3"><span className="text-[#d9ab71] text-3xl font-display tracking-wide">{m.ano}</span><span className="uppercase text-[10px] tracking-widest text-[#a58f76] inline-flex gap-1 items-center"><Icone size={14}/>{marca[m.tipo].texto}</span></div>
                        <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-3">{m.titulo}</h3>
                        <p className="font-body text-sm leading-7 text-[#c6b6a4]">{m.descricao}</p>
                        <div className="mt-5 pt-4 border-t border-[#8a6b46]/20 flex items-center justify-between text-[#e3b878] text-xs tracking-widest uppercase"><span>Explorar registro</span><ArrowRight size={18}/></div>
                      </div>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="text-xs mt-12 text-[#9e8b72] leading-6">As datas divergentes são indicadas como intervalos. Uma capa de disco representa o lançamento, não uma fotografia datada de apresentação. Um registro digital não transforma uma execução recente em prova de audiência nos anos 1990.</p>
        </section>}

        {aba==='fotos' && <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <span className="text-[#d3a773] uppercase tracking-[.24em] text-xs">Memória visual</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3">FOTOGRAFIAS E CAPAS</h2>
          <p className="max-w-3xl text-[#c0ae95] mt-5 leading-8">As capas abaixo pertencem aos seis volumes da discografia. O segundo conjunto reúne onze fotografias de apresentação: a data indicada é a registrada no EXIF da câmera, ainda pendente de validação externa.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 mt-10">
            {capas.map(c=><button key={c.titulo} onClick={()=>setFoto(c)} className="cp-card group text-left border border-[#735435]/35 p-3 bg-[#201913]">
              <img src={c.imagem} alt={c.titulo} className="w-full aspect-square object-contain bg-black/30" loading="lazy" />
              <div className="px-2 pt-4 text-[#dfba85] font-display text-2xl">{c.ano}</div>
              <div className="px-2 pb-2 text-[#d4c5b1] text-sm">{c.titulo}</div>
            </button>)}
          </div>
          <div id="fotos-2004" className="mt-12 border border-[#8a6840]/40 bg-[#241c16] p-6 md:p-8">
            <span className="text-xs uppercase tracking-[.24em] text-[#c5a16d]">Arquivo fotográfico • 2004 segundo EXIF</span>
            <h3 className="font-display text-3xl text-[#e8c18b] mt-3">Registros de apresentações</h3>
            <p className="text-[#c7b9a5] mt-3 leading-7">São onze fotografias de palco, público e bastidores. O EXIF dos arquivos registra 29 e 30 de setembro de 2004; local, nomes de convidados e precisão do relógio ainda estão em apuração. Clique em qualquer fotografia para ampliar dentro do site.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-7">
              {fotosShow.map(f=>(
                <button key={f.origem} onClick={()=>setFoto(f)} className="group cp-card border border-[#a28155]/25 bg-[#100d0b] overflow-hidden text-left">
                  <img src={f.imagem} alt={f.titulo} className="w-full aspect-[3/2] object-cover" loading="lazy" />
                  <div className="p-3">
                    <p className="text-[#f0d4aa] font-display text-base">{f.titulo}</p>
                    <p className="text-[11px] mt-2 text-[#a58c70]">{f.origem} • EXIF 2004</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 border border-[#8a6840]/40 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <img src="https://i.ytimg.com/vi/aYFsB4KTZg8/hqdefault.jpg" alt="Miniatura de Me Dê Um Sinal" className="w-full md:w-64 aspect-video object-cover" />
            <div><span className="text-[#b8915b] text-xs uppercase tracking-widest">Registro público na internet • 2011</span><h3 className="text-2xl font-display mt-2">Me Dê Um Sinal</h3><p className="text-[#a9957f] text-sm mt-2">O ano refere-se ao vídeo publicado na internet. A fotografia em si permanece sem data comprovada.</p><button onClick={()=>abrirMarco(marcos.find(m=>m.id==='youtube')!)} className="text-[#e8c18b] uppercase tracking-widest text-xs mt-4">Ver publicação ▸</button></div>
          </div>
        </section>}

        {aba==='radios' && <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <span className="text-[#d3a773] uppercase tracking-[.24em] text-xs">Rádios • 2026</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3">CHARLES & PIERRE NO RÁDIO</h2>
          <p className="max-w-3xl text-[#c0ae95] mt-5">Ouça as emissoras que registraram músicas da dupla em 2026.</p>
          <div className="grid lg:grid-cols-3 gap-5 mt-10">
            {radios.map((r,i)=>(
              <article key={r.id} className={'cp-card border p-6 md:p-7 ' + (i===0?'bg-[#2e2518] border-[#c8a36d]':'bg-[#1c1713] border-[#80613b]/40')}>
                <div className="flex items-center justify-between"><Radio className="text-[#ddb67c]" size={28}/><span className="uppercase text-[10px] tracking-widest text-[#e7c28b]">2026</span></div>
                <h3 className="font-display text-2xl mt-5">{r.nome}</h3>
                <p className="text-[#a9957f] text-xs mt-1">{r.local}</p>
                <div className="text-[#e5c18a] font-display text-xl mt-7">{r.faixa}</div>
                <p className="mt-2 text-[#c5ad8f] text-sm">Tocou às {r.horario}</p>
                {r.programa && <p className="mt-2 text-[#e1c39c] text-sm">{r.programa}</p>}
                <a href={r.radio} target="_blank" rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center justify-center w-full gap-2 py-3 bg-[#c69e66] hover:bg-[#e0b77e] text-[#20140b] text-xs font-semibold uppercase tracking-widest">
                  <Headphones size={18}/> Ouvir rádio ao vivo <ArrowRight size={16}/>
                </a>
                <a href={r.playlist} target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs text-[#bda789] hover:text-white underline underline-offset-4">
                  Registro da música na playlist
                </a>
              </article>
            ))}
          </div>
        </section>}
      </main>

      <footer className="border-t border-[#86603a]/35 py-10 bg-[#130f0d]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-[#a9947b]">
          <span>Charles & Pierre • Memória e música • Fonte identificada em cada registro</span>
          <Link to="/" className="inline-flex gap-2 items-center hover:text-white"><ArrowLeft size={14}/> Voltar ao site</Link>
        </div>
      </footer>

      {dialogo && <div role="dialog" aria-modal="true" aria-label="Detalhes do acervo" className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm overflow-y-auto p-3 md:p-10" onMouseDown={(e)=>{if(e.target===e.currentTarget)fechar();}}>
        <div className="max-w-4xl mx-auto bg-[#211913] border border-[#a78357]/50 shadow-2xl relative min-h-[240px]">
          <button onClick={fechar} aria-label="Fechar janela" className="absolute top-3 right-3 z-10 p-3 text-[#e9d8bd] bg-black/60 hover:bg-[#775334]"><X size={22}/></button>
          {aberto && <>
            <div className="p-6 md:p-9 border-b border-[#886b43]/40">
              <span className="text-xs uppercase tracking-widest text-[#d3a66c]">{aberto.ano} • {marca[aberto.tipo].texto}</span>
              <h2 className="text-3xl md:text-5xl font-display mt-3 pr-7">{aberto.titulo}</h2>
              <p className="text-sm text-[#cbb9a3] leading-7 mt-5">{aberto.detalhe}</p>
            </div>
            {aberto.imagem && <div className="px-6 md:px-9 pt-6"><img src={aberto.imagem} alt={aberto.legenda} className="max-h-[360px] max-w-full mx-auto object-contain" /><p className="text-center text-[#b4a083] text-xs mt-3">{aberto.legenda}</p></div>}
            <div className="p-6 md:p-9">
              <h3 className="text-[#dfb579] font-display text-2xl mb-4">Fontes e documentos</h3>
              <div className="flex flex-wrap gap-2 mb-5">{aberto.documentos.map((d,i)=><button key={i} onClick={()=>setDocAtual(i)} className={'border text-xs p-3 ' + (i===docAtual?'text-[#17120d] bg-[#cba46f] border-[#cba46f]':'text-[#c9b59c] border-[#765d42]')}>{d.nome}</button>)}</div>
              {doc && <>
                {previewDocumento && <div className="aspect-[3/4] sm:aspect-[4/3] bg-[#e9e7e0]"><iframe title={doc.nome} loading="lazy" className="w-full h-full" src={previewDocumento}/></div>}
                {youtube && <div className="aspect-video bg-black"><iframe title="Vídeo histórico" className="w-full h-full" src={youtube} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div>}

                {doc.tipo==='acervo' && <div className="bg-[#302519] p-6 border border-[#a17d51]/30"><BookOpen size={28} className="text-[#c7a373]"/><p className="text-sm leading-7 text-[#b6a38d] mt-3">Esta ficha foi transcrita e contextualizada acima. A fonte original é uma página de outro acervo; o site não reproduz artificialmente sua aparência.</p></div>}
                <div className="mt-5 text-xs leading-6 text-[#b7a18a]"><b className="text-[#e3bf88]">Fonte:</b> {doc.nome}<br/><span className="break-all">{doc.origem || doc.endereco}</span>{doc.observacao && <p>{doc.observacao}</p>}
                {doc.tipo !== 'pdf' && <a href={doc.endereco} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-3 underline underline-offset-4 text-[#e4b980]">Abrir fonte original ↗</a>}</div>
              </>}
            </div>
          </>}
          {foto && <div className="p-6 md:p-9"><span className="text-xs uppercase tracking-widest text-[#e1b77c]">{foto.ano} • material do acervo</span><h2 className="font-display text-3xl mt-3">{foto.titulo}</h2><img src={foto.imagem} className="max-w-full max-h-[70vh] object-contain mx-auto mt-6" alt={foto.titulo}/><p className="text-xs text-[#baa386] mt-5">{foto.ano.startsWith('2004') ? 'Fotografia original de apresentação fornecida ao acervo. A data de 2004 provém de metadados da câmera, não de um anúncio ou jornal; local a confirmar.' : 'Imagem da capa original da discografia; não se trata de fotografia datada de uma apresentação.'}</p></div>}

        </div>
      </div>}
    </div>
  );
};

export default Historia;
