import ICharacter from './ICharacter';

export default interface ICharacterEpisode extends ICharacter {
  firstSeenInEpisode: string;
  otherCharactersFirstSeenInTheEpisode: Array<string>;
}
