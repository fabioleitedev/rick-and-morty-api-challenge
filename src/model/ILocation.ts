import ICharacter from './ICharacter';

export default interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  characters: Array<string>;
}
