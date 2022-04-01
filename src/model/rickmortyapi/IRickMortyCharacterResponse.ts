import RickMortyCharacter from './IRickMortyCharacter';

export default interface IRickMortyCharacterResponse {
  info: {
    count: number;
    pages: number;
    next: object;
    prev: object;
  };
  results: Array<RickMortyCharacter>;
}
