import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { RequestService } from '../../services/request.service';
import IRickMortyCharacter from '../../model/rickmortyapi/IRickMortyCharacter';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

describe('Testing Resource /v1/characters/locations', () => {
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

  it('should GET the character Alan Rails and a list of other characters residing in the same location.', async () => {
    jest.setTimeout(30000);
    const response = await request(app.getHttpServer()).get('/v1/characters/locations?name=Alan Rails');
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);

    for (const character of response.body) {
      expect(character.id).toBeGreaterThan(0);
      expect(character.name).toContain('Alan Rails');
      expect(character.url).toBeDefined();
      expect(character.otherCharactersInLocation.length).toBeGreaterThan(0);

      // Checking if one other character has the same location using the Rick And Morty API
      const requestService = new RequestService(new HttpService());
      const characterResponse = await firstValueFrom(
        requestService.executeGet<IRickMortyCharacter>(character.otherCharactersInLocation[0]),
      );
      expect(characterResponse.status).toEqual(200);
      expect(characterResponse.data.location.url).toEqual(character.location.url);
    }
  });
});
