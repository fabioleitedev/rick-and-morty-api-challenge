import { Injectable } from '@nestjs/common';
import RickMortyCharacterResponse from '../model/rickmortyapi/IRickMortyCharacterResponse';
import { RequestService } from './request.service';
import { firstValueFrom } from 'rxjs';
import ICharacterServiceResponse from '../model/ICharacterServiceResponse';
import ICharacter from '../model/ICharacter';
import IServiceResponse from '../model/IServiceResponse';
import { ParseService } from './parse.service';

@Injectable()
export class CharacterService {
  constructor(private requestService: RequestService, private parseService: ParseService) {}

  /**
   * @description Returns on or more characters and other characters of the same location from the Rick And Morty API.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param name The name of the character searched.
   * @returns A Promise<CharactersResponse>
   */
  async getCharactersByName(name: string) {
    try {
      const charactersFromAPI = await firstValueFrom(
        this.requestService.executeGet<RickMortyCharacterResponse>(
          `${process.env.RICKANDMORTY_API_HOST}${process.env.RICKANDMORTY_API_CHARACTERS_ENDPOINT}`,
          `?name=${name}`,
        ),
      );

      if (charactersFromAPI.status !== 200) {
        return <IServiceResponse<Array<ICharacter>>>{
          success: false,
          errorMessage: [charactersFromAPI.statusText],
        };
      }

      const parserResult = await this.parseService.parseCharacters(charactersFromAPI.data);
      return <IServiceResponse<Array<ICharacter>>>{
        success: true,
        data: parserResult,
      };
    } catch (error) {
      return <IServiceResponse<Array<ICharacter>>>{
        success: false,
        errorMessage: error,
      };
    }
  }
}
