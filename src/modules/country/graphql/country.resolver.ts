// src/country/country.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryService } from '../application/services/country.service';
import { CountryPopulation } from '../models/dto/country-population.dto';
import { CountryBorders } from '../models/dto/country-borders.dto';
import { CountryInfo } from '../models/dto/country-info.dto';
import { CountryDetails } from '../models/dto/country-details.dto';
import { Holiday } from '../models/dto/country-holidays.dto';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => CountryInfo)
  async getCountryInfo(
    @Args('countryCode') countryCode: string,
  ): Promise<CountryInfo> {
    // Use forkJoin to combine both observables
    const response = await forkJoin({
      population: this.countryService
        .getCountryPopulation()
        .pipe(
          map(
            (countries) =>
              countries.find((country) => country.code === countryCode) || null,
          ),
        ),
      borders: this.countryService.getBorderCountries(countryCode),
    }).toPromise();

    // Fallback for undefined or null values
    if (!response) {
      return {
        population: null,
        borders: [],
      };
    }

    // Return the response, ensuring we handle undefined values
    return {
      population: response.population || null, // Ensure population is either a CountryPopulation or null
      borders: response.borders || [], // Ensure borders is always an array (empty if undefined)
    };
  }

  // A query to get only the population for a specific country code
  @Query(() => CountryPopulation, { nullable: true })
  getCountryPopulationByCode(
    @Args('countryCode') countryCode: string,
  ): Observable<CountryPopulation | null> {
    return this.countryService
      .getCountryPopulation()
      .pipe(
        map(
          (countries) =>
            countries.find((country) => country.code === countryCode) || null,
        ),
      );
  }

  // A query to get only the border countries for a specific country code
  @Query(() => [CountryBorders])
  getCountryBorders(
    @Args('countryCode') countryCode: string,
  ): Observable<CountryBorders[]> {
    return this.countryService.getBorderCountries(countryCode);
  }

  @Query(() => CountryDetails)
  getCountryDetails(
    @Args('countryCode') countryCode: string,
  ): Observable<CountryDetails> {
    return this.countryService.getCountryDetails().pipe(
      map((countries) => {
        const country = countries.find(
          (country) => country.iso2 === countryCode,
        );
        if (!country) {
          throw new Error('Country not found');
        }
        return country;
      }),
    );
  }

  @Query(() => [Holiday]) // Returning an array of Holiday objects
  getCountryHolidays(
    @Args('year') year: string,
    @Args('countryCode') countryCode: string,
  ): Observable<Holiday[]> {
    return this.countryService.getCountryHolidays(year, countryCode).pipe(
      map((holidays) => {
        const filteredHolidays = holidays.filter(
          (holiday) => holiday.countryCode === countryCode,
        );
        if (!filteredHolidays.length) {
          throw new Error('No holidays found for the given country code');
        }
        return filteredHolidays; // Returning an array of holidays
      }),
    );
  }
}
