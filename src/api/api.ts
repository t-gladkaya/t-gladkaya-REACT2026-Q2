import type { Character } from '../components/Card';

export const API_URLS = ['https://rickandmortyapi.com/api/character'];

interface CharacterResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

export const fetchCharacter = async (
  query: string,
  page: number
): Promise<CharacterResponse> => {
  let lastError: unknown;

  for (const apiUrl of API_URLS) {
    try {
      const trimmedQuery = query.trim();

      const params = new URLSearchParams();

      if (trimmedQuery) {
        params.set('name', trimmedQuery);
      }
      params.set('page', page.toString());

      const response = await fetch(`${apiUrl}?${params.toString()}`);

      if (response.status === 404) {
        return { results: [], info: { pages: 0 } };
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return (await response.json()) as CharacterResponse;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('Failed to fetch characters.');
};
