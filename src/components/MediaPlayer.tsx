import { createContext, useContext, useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { featuredVideos, matchingVideos, videoEmbedUrl, type ChannelVideo } from '@/lib/media-catalog';

type Selection = { title: string; id?: string };
const MediaContext = createContext<{ play: (selection: Selection) => void; videos: ChannelVideo[]; setVideos: (videos: ChannelVideo[]) => void }>({ play: () => {}, videos: [], setVideos: () => {} });
export const useMedia = () => useContext(MediaContext);
export function MediaProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [videos, setVideos] = useState<ChannelVideo[]>(featuredVideos);
  const candidates = selection ? matchingVideos(selection.title, videos) : [];
  const embed = selection?.id ? videoEmbedUrl(selection.id) : undefined;
  return <MediaContext.Provider value={{ play: setSelection, videos, setVideos }}>
    {children}
    <Dialog open={Boolean(selection)} onOpenChange={open => { if (!open) setSelection(null); }}>
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] p-5 rounded-none">
        <DialogTitle className="font-display text-2xl pr-8">{selection?.title}</DialogTitle>
        <DialogDescription className="sr-only">Reprodução de Charles e Pierre</DialogDescription>
        {embed ? <iframe key={embed} src={embed} title={selection?.title} className="w-full aspect-video border-0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <div className="space-y-3 py-4">
          {candidates.length ? candidates.map(video => <Button key={video.id} variant="outline" className="w-full h-auto py-3 whitespace-normal justify-start" onClick={() => setSelection({ title: video.title, id: video.id })}><Play />{video.title}</Button>) : <p className="text-muted-foreground">Ainda não localizamos uma gravação identificada desta faixa no canal oficial.</p>}
        </div>}
      </DialogContent>
    </Dialog>
  </MediaContext.Provider>;
}