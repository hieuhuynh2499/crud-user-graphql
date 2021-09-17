import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  userName: string;

  @Field()
  age: number;

  @Field()
  address: string;
}
