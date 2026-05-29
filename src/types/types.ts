export interface Character {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
  detailsUrl?: string;
}

export interface CharacterResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

export interface GetCharactersArgs {
  query: string;
  page: number;
}
