import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreatePostInput{

    @Field()
    postTitle:string

    @Field(()=>String)
    postContent:string

    @Field(()=>String)
    userId:string
}