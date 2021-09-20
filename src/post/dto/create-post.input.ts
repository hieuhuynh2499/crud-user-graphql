import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @Length(5,100)
  postTitle: string;

  @Field(() => String)
  @IsString()
  @Length(5,1000)
  postContent: string;

  @Field(() => String)
  userId: string;
}
