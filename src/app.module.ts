import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { CharactersController } from './controllers/characters.controller';
import { RequestService } from './services/request.service';
import { ConfigModule } from '@nestjs/config';
import { CacheService } from './services/cache.service';
import { LocationService } from './services/location.service';
import { MainService } from './services/main.service';
import { EpisodeService } from './services/episode.service';
import * as redisStore from 'cache-manager-redis-store';
import { CharacterService } from './services/character.service';
import { ParseService } from './services/parse.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      max: 1000,
      ttl: process.env.REDIS_PERSISTENCE_PERIOD_IN_SECONDS
        ? parseInt(process.env.REDIS_PERSISTENCE_PERIOD_IN_SECONDS)
        : 60 * 60 * 24,
    }),
  ],
  controllers: [CharactersController],
  providers: [
    RequestService,
    CacheService,
    LocationService,
    MainService,
    CharacterService,
    EpisodeService,
    ParseService,
  ],
})
export class AppModule {}
