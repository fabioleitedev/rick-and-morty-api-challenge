import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import IServiceResponse from '../model/IServiceResponse';
import IEpisode from '../model/IEpisode';
import IRickMortyEpisodeResponse from '../model/rickmortyapi/IRickMortyEpisodeResponse';
import { ParseService } from './parse.service';
import { RequestService } from './request.service';

@Injectable()
export class EpisodeService {
  constructor(private requestService: RequestService, private parseService: ParseService) {}

  /**
   * @description Returns an episode from the Rick And Morty API by the URL.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param url The Rick And Morty API url to be requested.
   * @returns A Promise<IServiceResponse<IEpisode>>
   */
  async getEpisodeByUrl(url: string) {
    if (!url || url.trim().length === 0) {
      return <IServiceResponse<IEpisode>>{
        success: false,
      };
    }

    const episodeFromApi = await firstValueFrom(this.requestService.executeGet<IRickMortyEpisodeResponse>(url));

    if (episodeFromApi.status !== 200) {
      return <IServiceResponse<IEpisode>>{
        success: false,
        errorMessage: [episodeFromApi.statusText],
      };
    }

    const parsedResult = await this.parseService.parseEpisode(episodeFromApi.data);
    return <IServiceResponse<IEpisode>>{
      success: true,
      data: parsedResult,
    };
  }
}
