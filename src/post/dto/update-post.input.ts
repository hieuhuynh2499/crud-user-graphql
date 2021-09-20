import { Field, InputType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";

@InputType()
export class UpdatePostInput{

  @Field()
  @IsString()
  @Length(5,100)
  postTitle:string

  @Field()
  @IsString()
  @Length(5,1000)
  postContent:string
}
