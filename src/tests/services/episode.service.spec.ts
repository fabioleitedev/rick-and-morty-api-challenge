import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from '../../services/request.service';
import { EpisodeService } from '../../services/episode.service';
import { AppModule } from '../../app.module';
import { ParseService } from '../../services/parse.service';

describe('EpisodeService', () => {
  let service: EpisodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [EpisodeService, RequestService, ParseService],
    }).compile();

    service = module.get<EpisodeService>(EpisodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the episode 1', async () => {
    const episode = await service.getEpisodeByUrl('https://rickandmortyapi.com/api/episode/1');
    expect(episode).not.toBeNull();
    expect(episode.success).toBeTruthy();
    expect(episode.data).not.toBeNull();
    expect(episode.data.id).toBeGreaterThan(0);
  });
});
