import { Injectable, Logger } from '@nestjs/common';
import IServiceResponse from '../model/IServiceResponse';
import ICharacterEpisode from '../model/ICharacterEpisode';
import ICharacterLocation from '../model/ICharacterLocation';
import { CacheService } from './cache.service';
import { CharacterService } from './character.service';
import { EpisodeService } from './episode.service';
import { LocationService } from './location.service';
import { ParseService } from './parse.service';

@Injectable()
export class MainService {
  private CHARACTERS_LOCATIONS_CACHE_PREFIX = 'cl';
  private CHARACTERS_EPISODES_CACHE_PREFIX = 'ce';

  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private episodeService: EpisodeService,
    private cacheService: CacheService,
    private parseService: ParseService,
  ) {}

  /**
   * @description Returns the characters information together with information regarding other characters residing in the same location.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param name The name or part of the character's name to be searched.
   * @returns A Promise<IServiceResponse<Array<ICharacterLocation>>>
   */
  async getCharactersAndLocationsByName(name: string) {
    try {
      Logger.log('Veryfing memory cache to get the data');

      const cachedData = await this.cacheService.getCachedData<Array<ICharacterLocation>>(
        `${this.CHARACTERS_LOCATIONS_CACHE_PREFIX}.${name}`,
      );

      if (cachedData) {
        Logger.log(`Key [${this.CHARACTERS_LOCATIONS_CACHE_PREFIX}.${name}] found. Return from cache`);
        return <IServiceResponse<Array<ICharacterLocation>>>{
          success: true,
          data: cachedData,
        };
      }

      const result: Array<ICharacterLocation> = [];
      const characters = await this.characterService.getCharactersByName(name);

      if (!characters.success) {
        return <IServiceResponse<Array<ICharacterLocation>>>{
          success: false,
          errorMessage: characters.errorMessage,
        };
      }

      for (const c of characters.data) {
        const location = await this.locationService.getLocationByUrl(c.location.url);

        if (location.success) {
          const filteredCharacters = location.data.characters.filter((l) => l !== c.location.url);
          const parsedResult = await this.parseService.parseCharacterAndLocations(c, filteredCharacters);
          result.push(parsedResult);
        }
      }

      Logger.log('Adding to cache');
      this.cacheService.addToCache<Array<ICharacterLocation>>(
        `${this.CHARACTERS_LOCATIONS_CACHE_PREFIX}.${name}`,
        result,
      );

      return <IServiceResponse<Array<ICharacterLocation>>>{
        success: true,
        data: result,
      };
    } catch (error) {
      return <IServiceResponse<Array<ICharacterLocation>>>{
        success: false,
        errorMessage: [error.message],
      };
    }
  }

  /**
   * @description Returns the characters information together with information in which episode the character appeared
   * first and the list of other characters who appeard in the same episode.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param name The name or part of the character's name to be searched.
   * @returns A Promise<IServiceResponse<Array<ICharacterEpisode>>>
   */
  async getCharactersAndEpisodesByName(name: string) {
    try {
      Logger.log('Veryfing memory cache to get the data');
      const cachedData = await this.cacheService.getCachedData<Array<ICharacterEpisode>>(
        `${this.CHARACTERS_EPISODES_CACHE_PREFIX}.${name}`,
      );

      if (cachedData) {
        Logger.log(`Key [${this.CHARACTERS_EPISODES_CACHE_PREFIX}.${name}] found. Return from cache`);
        return <IServiceResponse<Array<ICharacterEpisode>>>{
          success: true,
          data: cachedData,
        };
      }

      const result: Array<ICharacterEpisode> = [];
      const characters = await this.characterService.getCharactersByName(name);

      if (!characters.success) {
        return <IServiceResponse<Array<ICharacterEpisode>>>{
          success: false,
          errorMessage: characters.errorMessage,
        };
      }

      for (const c of characters.data) {
        const firstEpisodeUrl = c.episode[0];

        Logger.log('Getting the episode object representing the first episode of this character');
        const episode = await this.episodeService.getEpisodeByUrl(firstEpisodeUrl);

        if (episode.success) {
          const filteredCharacters = episode.data.characters.filter((e) => e !== c.url);
          const parsedResult = await this.parseService.parseCharacterAndEpisodes(
            c,
            firstEpisodeUrl,
            filteredCharacters,
          );
          result.push(parsedResult);
        }
      }

      Logger.log('Adding to the cache');
      this.cacheService.addToCache<Array<ICharacterEpisode>>(
        `${this.CHARACTERS_EPISODES_CACHE_PREFIX}.${name}`,
        result,
      );

      return <IServiceResponse<Array<ICharacterEpisode>>>{
        success: true,
        data: result,
      };
    } catch (error) {
      return <IServiceResponse<Array<ICharacterEpisode>>>{
        success: false,
        errorMessage: [error],
      };
    }
  }
}
