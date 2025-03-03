// src/country/dto/country-info.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { CountryBorders } from './country-borders.dto';
import { CountryPopulation } from './country-population.dto';

@ObjectType()
export class CountryInfo {
  @Field(() => CountryPopulation, { nullable: true })
  population: CountryPopulation | null;

  @Field(() => [CountryBorders], { nullable: true })
  borders: CountryBorders[] | null;
}
