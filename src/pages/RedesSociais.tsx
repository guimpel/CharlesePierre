import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Search, RefreshCw, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useMedia } from '@/components/MediaPlayer';
import logo from '@/assets/logo-oficial.png.asset.json';

export default function RedesSociais() {
  const [params] = useSearchParams();
  const { videos, play } = useMedia();
  const [query, setQuery] = useState('');
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <main className="min-h-screen bg-background text-foreground font-body">
    <header className="border-b border-border"><div className="container mx-auto px-6 py-5 flex items-center justify-between"><Link to="/#inicio"><img src={logo.url} alt="Charles e Pierre" className="h-14" /></Link><Button variant="ghost" asChild><Link to="/#videos"><ArrowLeft />Voltar</Link></Button></div></header>
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <span className="text-sm text-muted-foreground uppercase">Charles e Pierre</span>
      <h1 className="font-display text-5xl md:text-7xl mt-3 mb-10">REDES SOCIAIS</h1>
      <Tabs defaultValue={params.get('rede') || 'youtube'}>
        <TabsList className="h-auto flex flex-wrap justify-start gap-2 bg-transparent mb-10">
          {['YouTube','Instagram','Facebook','Spotify'].map(name => <TabsTrigger key={name} value={name.toLowerCase()} className="px-5 py-3 border border-border rounded-none">{name}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="youtube">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8"><h2 className="font-display text-3xl">VÍDEOS DO CANAL OFICIAL</h2><label className="flex items-center gap-3 border border-border px-4 py-2"><Search size={18} /><input aria-label="Buscar vídeos" placeholder="Buscar vídeos" value={query} onChange={e => setQuery(e.target.value)} className="bg-transparent outline-none min-w-0 w-48" /></label></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{videos.filter(v => v.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())).map(video => <Button key={video.id} variant="ghost" className="h-auto p-0 block text-left whitespace-normal rounded-none overflow-hidden border border-border" onClick={() => play(video)}><div className="aspect-video bg-muted flex items-center justify-center"><Play className="h-10 w-10" /></div><span className="block p-4 font-display text-xl">{video.title}</span></Button>)}</div>
          {!videos.filter(v => v.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())).length && <p className="py-12 text-muted-foreground">Nenhum vídeo encontrado.</p>}
        </TabsContent>
        <TabsContent value="instagram"><h2 className="font-display text-3xl mb-6">INSTAGRAM</h2><div className="border-y border-border py-10 space-y-5"><Instagram size={32} /><h3 className="font-display text-2xl">@charlesepierre</h3><p className="text-muted-foreground max-w-lg">As publicações ainda não estão conectadas. A autorização da conta é necessária para carregar novos posts automaticamente.</p><Button variant="outline" asChild><a href="https://www.instagram.com/charlesepierre/" target="_blank" rel="noopener noreferrer">Perfil oficial</a></Button></div></TabsContent>
        <TabsContent value="facebook"><h2 className="font-display text-3xl mb-6">FACEBOOK</h2><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCharlesePierre&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false" title="Publicações de Charles e Pierre no Facebook" className="w-full max-w-[500px] h-[700px] border-0" loading="lazy" allow="encrypted-media" /><p className="text-sm text-muted-foreground mt-4">Publicações públicas, conforme disponibilizadas pelo Facebook.</p></TabsContent>
        <TabsContent value="spotify"><h2 className="font-display text-3xl mb-6">SPOTIFY</h2><iframe src="https://open.spotify.com/embed/artist/0f0nqLrqYir5p8m3dXab1t?utm_source=generator" title="Charles e Pierre no Spotify" className="w-full h-[500px] border-0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></TabsContent>
      </Tabs>
    </div>
  </main>;
}