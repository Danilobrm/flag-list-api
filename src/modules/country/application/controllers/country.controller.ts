import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '../services/country.service';
// import { forkJoin } from 'rxjs';

@Controller('/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getCountries() {
    //     const hashedPassword = await bcrypt.hash(password, 10);

    return this.countryService.getCountries();
  }

  @Get('/info/:countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    const population = await this.countryService
      .getCountryPopulation()
      .toPromise();

    const borders = await this.countryService
      .getBorderCountries(countryCode)
      .toPromise();

    const details = await this.countryService.getCountryDetails().toPromise();

    return {
      ...details?.find((country) => country.iso3 === countryCode),
      populationCounts: population?.find(
        (country) => country.code === countryCode,
      )?.populationCounts,
      ...borders,
    };
  }
}
