import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Country,
  CountryPopulation,
  CountryBorders,
  CountryDetails,
  Holiday,
} from '../../models/types/country';
// import { CountryDetails } from '../../dto/country-details.dto';

// Import the type

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  getCountries(): Observable<Country[]> {
    return this.httpService
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .pipe(
        map((response) => response.data as Country[]), // Return only the relevant data
        catchError(() => {
          throw new InternalServerErrorException(
            'Failed to fetch available countries',
          );
        }),
      );
  }

  getCountryPopulation(): Observable<CountryPopulation[]> {
    return this.httpService
      .get('https://countriesnow.space/api/v0.1/countries/population')
      .pipe(
        map(
          (response: { data: { data: CountryPopulation[] } }) =>
            response.data.data,
        ),
        catchError(() => {
          throw new InternalServerErrorException(
            'Failed to fetch country population',
          );
        }),
      );
  }

  getBorderCountries(countryCode: string): Observable<CountryBorders[]> {
    return this.httpService
      .get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
      .pipe(
        map((response) => response.data as CountryBorders[]), // Return an array of CountryBorders
        catchError(() => {
          throw new InternalServerErrorException(
            'Failed to fetch country borders',
          );
        }),
      );
  }

  // Inside the CountryService
  getCountryDetails(): Observable<CountryDetails[]> {
    return this.httpService
      .get('https://countriesnow.space/api/v0.1/countries/flag/images') // Replace with the actual API URL
      .pipe(
        map(
          (response: { data: { data: CountryDetails[] } }) =>
            response.data.data,
        ),
        catchError(() => {
          throw new InternalServerErrorException(
            'Failed to fetch country details',
          );
        }),
      );
  }

  getCountryHolidays(year: string, countryCode: string): Observable<Holiday[]> {
    return this.httpService
      .get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
      .pipe(
        map((response: { data: Holiday[] }) => response.data), // Make sure the response type is Holiday[]
        catchError(() => {
          throw new Error('Failed to fetch country holidays');
        }),
      );
  }
}
