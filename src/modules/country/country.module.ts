import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountryController } from './application/controllers/country.controller';
import { CountryService } from './application/services/country.service';
import { CountryResolver } from './graphql/country.resolver';

@Module({
  imports: [HttpModule],
  controllers: [CountryController],
  providers: [CountryService, CountryResolver],
})
export class CountryModule {}
