import { Injectable } from '@nestjs/common';
import ICharacterEpisode from '../model/ICharacterEpisode';
import IEpisode from '../model/IEpisode';
import ILocation from '../model/ILocation';
import IRickMortyCharacterResponse from '../model/rickmortyapi/IRickMortyCharacterResponse';
import IRickMortyEpisodeResponse from '../model/rickmortyapi/IRickMortyEpisodeResponse';
import IRickMortyLocationResponse from '../model/rickmortyapi/IRickMortyLocationResponse';
import ICharacter from '../model/ICharacter';
import ICharacterLocation from '../model/ICharacterLocation';

@Injectable()
export class ParseService {
  constructor() {}

  /**
   * @description Parse the data from IRickMortyCharacterResponse to ICharacter.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param charactersFromAPI The IRickMortyCharacterResponse object.
   * @returns A Promise<Array<ICharacter>>
   */
  async parseCharacters(charactersFromAPI: IRickMortyCharacterResponse) {
    let characters: Array<ICharacter> = [];
    for (const c of charactersFromAPI.results) {
      characters.push({
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        type: c.type,
        gender: c.gender,
        origin: {
          name: c.origin.name,
          url: c.origin.url,
        },
        location: {
          name: c.location.name,
          url: c.location.url,
        },
        image: c.image,
        episode: c.episode,
        url: c.url,
      });
    }
    return characters;
  }

  /**
   * @description Parse the data from IRickMortyEpisodeResponse to IEpisode.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param episodeFromApi The IRickMortyEpisodeResponse object.
   * @returns A Promise<IEpisode>
   */
  async parseEpisode(episodeFromApi: IRickMortyEpisodeResponse) {
    return <IEpisode>{
      id: episodeFromApi.id,
      name: episodeFromApi.name,
      air_date: episodeFromApi.air_date,
      episode: episodeFromApi.episode,
      characters: episodeFromApi.characters,
    };
  }

  /**
   * @description Parse the data from IRickMortyLocationResponse to ILocation.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param locationFromApi The IRickMortyLocationResponse object.
   * @returns A Promise<Array<ILocation>>
   */
  async parseLocation(locationFromApi: IRickMortyLocationResponse) {
    return <ILocation>{
      id: locationFromApi.id,
      name: locationFromApi.name,
      type: locationFromApi.type,
      dimension: locationFromApi.dimension,
      characters: locationFromApi.residents,
    };
  }

  /**
   * @description Parse the data from ICharacter to ICharacterLocation.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param character The ICharacter object.
   * @param residents The Array<string> of residents.
   * @returns A Promise<ICharacterLocation>
   */
  async parseCharacterAndLocations(character: ICharacter, residents: Array<string>) {
    const parsed: ICharacterLocation = {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: {
        name: character.origin.name,
        url: character.origin.url,
      },
      location: {
        name: character.location.name,
        url: character.location.url,
      },
      image: character.image,
      episode: character.episode,
      url: character.url,
      created: character.created,
      otherCharactersInLocation: residents,
    };

    return parsed;
  }

  /**
   * @description Parse the data from ICharacter to ICharacterLocation.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param character The ICharacter object.
   * @param firstEpisodeUrl The url of the first episode.
   * @param characters The Array<string> of characters.
   * @returns A Promise<ICharacterLocation>
   */
  async parseCharacterAndEpisodes(character: ICharacter, firstEpisodeUrl: string, characters: Array<string>) {
    const parsed: ICharacterEpisode = {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: {
        name: character.origin.name,
        url: character.origin.url,
      },
      location: {
        name: character.location.name,
        url: character.location.url,
      },
      image: character.image,
      firstSeenInEpisode: firstEpisodeUrl,
      otherCharactersFirstSeenInTheEpisode: characters,
    };

    return parsed;
  }
}
