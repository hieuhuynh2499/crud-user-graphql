import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/entity/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class User{


    @Field(()=>String)
    @PrimaryGeneratedColumn('uuid')
    userId:string

    @Field(()=>String,{ nullable: false })
    @Column({ type:'varchar',length:50,unique:true})
    userName: string;

    @Field(()=>Int,{ nullable: true })
    @Column({ type:'int'})
    age: number;

    @Field(()=>String,{ nullable: true })
    @Column({type:'varchar',length:200})
    address: string;


    @OneToMany(()=>Post,post =>post.user)
    @Field(()=>[Post],{ nullable: true })
    posts:Post[]


}