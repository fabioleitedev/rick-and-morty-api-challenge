import ICharacter from './ICharacter';

export default interface ICharacterLocation extends ICharacter {
  otherCharactersInLocation: Array<string>;
}
