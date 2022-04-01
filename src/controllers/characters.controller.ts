import { Controller, Get, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import { MainService } from '../services/main.service';

@Controller('/v1/characters')
export class CharactersController {
  constructor(private mainService: MainService) {}

  /**
   * @description Returns the characters information together with information regarding other characters residing in the same location.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param name The name or part of the character's name to be searched.
   * @returns A Promise<ICharacterLocation[]>
   */
  @Get('/locations')
  @HttpCode(200)
  async getCharactersAndLocations(@Query('name') name: string) {
    const response = await this.mainService.getCharactersAndLocationsByName(name);
    if (!response.success) {
      throw new HttpException(response.errorMessage, HttpStatus.BAD_REQUEST);
    }
    return response.data;
  }

  /**
   * @description Returns the characters information together with information in which episode the character appeared
   * first and the list of other characters who appeard in the same episode.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param name The name or part of the character's name to be searched.
   * @returns A Promise<ICharacterEpisode[]>
   */
  @Get('/episodes')
  @HttpCode(200)
  async getCharactersAndEpisodes(@Query('name') name: string) {
    const response = await this.mainService.getCharactersAndEpisodesByName(name);
    if (!response.success) {
      throw new HttpException(response.errorMessage, HttpStatus.BAD_REQUEST);
    }
    return response.data;
  }
}
