import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ParseService } from '../../services/parse.service';
import { AppModule } from '../../app.module';
import { LocationService } from '../../services/location.service';
import { RequestService } from '../../services/request.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [LocationService, RequestService, ParseService],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the episode 1', async () => {
    const location = await service.getLocationByUrl('https://rickandmortyapi.com/api/location/1');
    expect(location).not.toBeNull();
    expect(location.success).toBeTruthy();
    expect(location.data).not.toBeNull();
    expect(location.data.id).toBeGreaterThan(0);
  });
});
