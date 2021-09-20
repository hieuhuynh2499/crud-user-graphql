import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @Field()
  @IsInt()
  @Min(18)
  @Max(60)
  age: number;

  @Field()
  @IsString()
  address: string;
}
