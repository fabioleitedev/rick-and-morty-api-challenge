import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';
import { AppModule } from '../../app.module';
import { RequestService } from '../../services/request.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [RequestService],
    }).compile();

    service = module.get<RequestService>(RequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a character.', async () => {
    const data = await firstValueFrom(service.executeGet('https://rickandmortyapi.com/api/character', '/1'));
    expect(data).not.toBeNull();
    expect(data.status).toBe(200);
  });

  it('should return an episode.', async () => {
    const data = await firstValueFrom(service.executeGet('https://rickandmortyapi.com/api/episode', '/1'));
    expect(data).not.toBeNull();
    expect(data.status).toBe(200);
  });

  it('should return a location.', async () => {
    const data = await firstValueFrom(service.executeGet('https://rickandmortyapi.com/api/location', '/1'));
    expect(data).not.toBeNull();
    expect(data.status).toBe(200);
  });
});
