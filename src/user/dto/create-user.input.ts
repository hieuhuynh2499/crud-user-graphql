import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateUserInput{

    @Field()
    userName:string;

    @Field()
    age:number;

    @Field()
    address:string

}