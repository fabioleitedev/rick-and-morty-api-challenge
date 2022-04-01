import ICharacter from './ICharacter';

export default interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}
