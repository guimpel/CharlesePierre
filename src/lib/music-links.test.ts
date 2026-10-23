import { describe, expect, test } from 'bun:test';
import { getMusicLinks } from './music-links';

describe('verified music destinations', () => {
  test('Por Te Amar Demais opens its matching lyrics page', () => {
    expect(getMusicLinks('Por Te Amar Demais').lyricsUrl).toBe('https://www.letras.mus.br/charles-e-pierre/por-te-amar-demais/');
  });
  test('Me Dê Um Sinal opens the verified recording', () => {
    expect(getMusicLinks('Me Dê Um Sinal').listenUrl).toBe('https://www.youtube.com/watch?v=78xntAIdgl8');
  });
  test('unknown tracks use a title-specific search instead of invented destinations', () => {
    const links = getMusicLinks('Música não verificada');
    expect(new URL(links.listenUrl).searchParams.get('search_query')).toBe('Charles e Pierre Música não verificada');
    expect(links.directRecording).toBe(false);
    expect(links.directLyrics).toBe(false);
  });
  test('karaoke searches retain the version and do not link to sung lyrics', () => {
    const links = getMusicLinks('Amor Livre — Karaokê');
    expect(new URL(links.listenUrl).searchParams.get('search_query')).toBe('Charles e Pierre Amor Livre — Karaokê');
    expect(links.lyricsUrl).toBeUndefined();
  });
});