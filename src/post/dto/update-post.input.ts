import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdatePostInput{
  @Field()
  postTitle:string
  @Field()
  postContent:string
}
