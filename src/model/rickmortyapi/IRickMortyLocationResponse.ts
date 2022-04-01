export default interface IRickMortyLocationResponse {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
}
