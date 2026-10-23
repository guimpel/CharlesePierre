// Only destinations verified against published song pages belong in these maps.
const lyricsLinks: Record<string, string> = {
  'Por Te Amar Demais': 'https://www.letras.mus.br/charles-e-pierre/por-te-amar-demais/',
  'Só Uma Vez': 'https://www.letras.mus.br/charles-e-pierre/so-uma-vez/',
  'São Teus Olhos': 'https://www.letras.mus.br/charles-e-pierre/sao-teus-olhos/',
  'Só Te Amar': 'https://www.letras.mus.br/charles-e-pierre/so-te-amar/',
  'De Cidade em Cidade': 'https://www.letras.mus.br/charles-e-pierre/de-cidade-em-cidade/',
  'Eu Digo Sim, Você Diz Não': 'https://www.letras.mus.br/charles-e-pierre/eu-digo-sim-voce-diz-nao/',
  'Eu Digo Não': 'https://www.letras.mus.br/charles-e-pierre/eu-digo-nao/',
  'Diga Pra Mim': 'https://www.letras.mus.br/charles-e-pierre/diga-pra-mim/',
  'Estou Feliz': 'https://www.letras.mus.br/charles-e-pierre/estou-feliz/',
  'Quando': 'https://www.letras.mus.br/charles-e-pierre/quando/',
};

const recordingLinks: Record<string, string> = {
  'Me Dê Um Sinal': 'https://www.youtube.com/watch?v=78xntAIdgl8',
};

export function getMusicLinks(title: string) {
  const isKaraoke = title.endsWith(' — Karaokê');
  const query = encodeURIComponent(`Charles e Pierre ${title}`);
  const recording = recordingLinks[title];
  const lyrics = isKaraoke ? undefined : lyricsLinks[title];

  return {
    listenUrl: recording ?? `https://www.youtube.com/results?search_query=${query}`,
    lyricsUrl: isKaraoke ? undefined : lyrics ?? `https://www.letras.mus.br/?q=${query}`,
    directRecording: Boolean(recording),
    directLyrics: Boolean(lyrics),
  };
}