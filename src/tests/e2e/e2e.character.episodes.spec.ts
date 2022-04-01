import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { RequestService } from '../../services/request.service';
import IRickMortyCharacter from '../../model/rickmortyapi/IRickMortyCharacter';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

describe('Testing Resource /v1/characters/episodes', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [RequestService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should GET the character Rick, in which episode Rick appeared first and the list of other characters who appeared in the same episode.', async () => {
    jest.setTimeout(30000);
    const response = await request(app.getHttpServer()).get('/v1/characters/episodes?name=Rick');
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);

    for (const character of response.body) {
      expect(character.id).toBeGreaterThan(0);
      expect(character.name).toContain('Rick');
      expect(character.firstSeenInEpisode).not.toBeNull();
      expect(character.otherCharactersFirstSeenInTheEpisode.length).toBeGreaterThan(0);

      // Checking if another character is in the same episode
      const requestService = new RequestService(new HttpService());
      const characterResponse = await firstValueFrom(
        requestService.executeGet<IRickMortyCharacter>(character.otherCharactersFirstSeenInTheEpisode[0]),
      );
      expect(characterResponse.status).toEqual(200);
      expect(characterResponse.data.episode).toContain(character.firstSeenInEpisode);
    }
  });
});
