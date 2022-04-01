import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../../services/location.service';
import { CharacterService } from '../../services/character.service';
import { MainService } from '../../services/main.service';
import { EpisodeService } from '../../services/episode.service';
import { CacheService } from '../../services/cache.service';
import { ParseService } from '../../services/parse.service';
import { RequestService } from '../../services/request.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { AppModule } from '../../app.module';
import ICharacterLocation from 'src/model/ICharacterLocation';

describe('MainService', () => {
  let service: MainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [
        MainService,
        CharacterService,
        LocationService,
        EpisodeService,
        CacheService,
        ParseService,
        RequestService,
        { provide: CACHE_MANAGER, useFactory: jest.fn() },
      ],
    }).compile();

    service = module.get<MainService>(MainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should GET the character Alan Rails and a list of other characters residing in the same location.', async () => {
    const character = await service.getCharactersAndLocationsByName('Alan Rails');
    expect(character).toBeDefined();
    expect(character.success).toBeTruthy();
    expect(character.data).toBeDefined();
    expect(character.data.length).toBeGreaterThan(0);
    expect(character.data[0].name).toBe('Alan Rails');
    expect(character.data[0].otherCharactersInLocation.length).toBeDefined();
    expect(character.data[0].otherCharactersInLocation.length).toBeGreaterThan(0);
  });

  it('should GET characters with name containing Rick and a list of other characters residing in the same location.', async () => {
    jest.setTimeout(30000);
    const character = await service.getCharactersAndLocationsByName('Rick');
    expect(character).toBeDefined();
    expect(character.success).toBeTruthy();
    expect(character.data).toBeDefined();
    expect(character.data.length).toBeGreaterThan(0);
    expect(character.data[0].name).toContain('Rick');
    expect(character.data[0].otherCharactersInLocation.length).toBeDefined();
    expect(character.data[0].otherCharactersInLocation.length).toBeGreaterThan(0);
  });

  it('should GET the character Alan Rails, in which episode he appeared first and the list of other characters who appeared in the same episode.', async () => {
    const character = await service.getCharactersAndEpisodesByName('Alan Rails');
    expect(character).toBeDefined();
    expect(character.success).toBeTruthy();
    expect(character.data).toBeDefined();
    expect(character.data.length).toBeGreaterThan(0);
    expect(character.data[0].name).toBe('Alan Rails');
    expect(character.data[0].firstSeenInEpisode).toBeDefined();
    expect(character.data[0].otherCharactersFirstSeenInTheEpisode.length).toBeGreaterThan(0);
  });

  it('should GET the characters containing Rick in the name, in which episode they appeared first and the list of other characters who appeared in the same episode.', async () => {
    jest.setTimeout(30000);
    const character = await service.getCharactersAndEpisodesByName('Rick');
    expect(character).toBeDefined();
    expect(character.success).toBeTruthy();
    expect(character.data).toBeDefined();
    expect(character.data.length).toBeGreaterThan(0);
    expect(character.data[0].name).toContain('Rick');
    expect(character.data[0].firstSeenInEpisode).toBeDefined();
    expect(character.data[0].otherCharactersFirstSeenInTheEpisode.length).toBeGreaterThan(0);
  });
});
