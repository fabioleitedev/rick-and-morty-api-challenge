export default interface IRickMortyEpisodeResponse {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}
