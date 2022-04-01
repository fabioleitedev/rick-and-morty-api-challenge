import ICharacter from './ICharacter';

export default interface ICharacterServiceResponse {
  success: boolean;
  data?: Array<ICharacter>;
  errorMessage?: string;
}
