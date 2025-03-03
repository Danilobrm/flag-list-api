import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountryDetails {
  @Field()
  name: string;

  @Field()
  flag: string;

  @Field()
  iso2: string;

  @Field()
  iso3: string;
}
