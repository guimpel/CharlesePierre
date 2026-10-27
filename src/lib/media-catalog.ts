export type ChannelVideo = { id: string; title: string };
export const featuredVideos: ChannelVideo[] = [
  { id: 'ZiSHFQNeq9U', title: 'São Teus Olhos - Disco Completo 1995' },
  { id: 'trfUyhqu1YI', title: 'Só Uma Vez - Charles e Pierre Vol.5' },
  { id: '78xntAIdgl8', title: 'Me Dê Um Sinal (1990)' },
];
export function videoEmbedUrl(id: string) {
  if (!/^[\w-]{11}$/.test(id)) return undefined;
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}
export function normalizeTitle(title: string) {
  return title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
export function matchingVideos(title: string, videos: ChannelVideo[]) {
  const query = normalizeTitle(title.replace(' — Karaokê', ''));
  const karaoke = title.endsWith(' — Karaokê');
  return videos.filter(video => {
    const normalized = normalizeTitle(video.title);
    const isInstrumental = /karaoke|instrumental/.test(normalized);
    return normalized.includes(query) && isInstrumental === karaoke;
  });
}