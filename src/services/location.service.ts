import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import IServiceResponse from '../model/IServiceResponse';
import ILocation from '../model/ILocation';
import IRickMortyLocationResponse from '../model/rickmortyapi/IRickMortyLocationResponse';
import { ParseService } from './parse.service';
import { RequestService } from './request.service';

@Injectable()
export class LocationService {
  constructor(private requestService: RequestService, private parseService: ParseService) {}

  /**
   * @description Returns a location from the Rick And Morty API by the URL.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param url The Rick And Morty API url to be requested.
   * @returns A Promise<IServiceResponse<ILocation>>
   */
  async getLocationByUrl(url: string) {
    if (!url || url.trim().length === 0) {
      return <IServiceResponse<ILocation>>{
        success: false,
      };
    }

    const locationFromAPI = await firstValueFrom(this.requestService.executeGet<IRickMortyLocationResponse>(url));

    if (locationFromAPI.status !== 200) {
      return <IServiceResponse<ILocation>>{
        success: false,
        errorMessage: [locationFromAPI.statusText],
      };
    }

    const parsedResult = await this.parseService.parseLocation(locationFromAPI.data);

    return <IServiceResponse<ILocation>>{
      success: true,
      data: parsedResult,
    };
  }
}
