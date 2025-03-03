import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Holiday {
  @Field()
  date: string;

  @Field()
  localName: string;

  @Field()
  name: string;

  @Field()
  countryCode: string;

  @Field()
  fixed: boolean;

  @Field()
  global: boolean;

  @Field(() => [String], { nullable: true })
  counties: string[] | null;

  @Field(() => Int, { nullable: true })
  launchYear: number | null;

  @Field(() => [String])
  types: string[];
}
