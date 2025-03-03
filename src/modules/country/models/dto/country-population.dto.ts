import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PopulationCount {
  @Field()
  year: number;

  @Field()
  value: number;
}

@ObjectType()
export class CountryPopulation {
  @Field(() => [PopulationCount])
  populationCounts: PopulationCount[];
}
