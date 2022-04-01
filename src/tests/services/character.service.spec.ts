import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { MainService } from '../../services/main.service';
import { RequestService } from '../../services/request.service';
import { CharacterService } from '../../services/character.service';
import { EpisodeService } from '../../services/episode.service';
import { LocationService } from '../../services/location.service';
import { CacheService } from '../../services/cache.service';
import { ParseService } from '../../services/parse.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [
        CharacterService,
        RequestService,
        MainService,
        LocationService,
        EpisodeService,
        CacheService,
        ParseService,
        { provide: CACHE_MANAGER, useFactory: jest.fn() },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  afterEach(() => {});

  it('should get the character Alan Rails.', async () => {
    expect(service).toBeDefined();

    const character = await service.getCharactersByName('Alan Rails');
    expect(character.success).toBeTruthy();
    expect(character.data).not.toBeNull();
    expect(character.data.length).toBe(1);
    expect(character.data[0].name).toBe('Alan Rails');
  });

  it('should get the characters with Rick in the name.', async () => {
    expect(service).toBeDefined();

    const character = await service.getCharactersByName('Rick');
    expect(character.success).toBeTruthy();
    expect(character.data).not.toBeNull();
    expect(character.data.length).toBeGreaterThan(1);

    for (const c of character.data) {
      expect(c.name).toContain('Rick');
    }
  });
});
