import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CountryBorders {
  @Field()
  commonName: string;

  @Field()
  officialName: string;

  @Field()
  countryCode: string;

  @Field()
  region: string;

  @Field(() => [CountryBorders], { nullable: true })
  borders: CountryBorders[] | null; // Can be null or an array of CountryBorders
}
