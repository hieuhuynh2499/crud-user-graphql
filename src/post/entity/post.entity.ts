import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/user/entity/user.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 100, unique: true })
  postTitle: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 2000 })
  postContent: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user: User;

  @Field()
  @Column({ type: 'uuid' })
  userId: string;

  @Field()
  @Column({ type:'date' })
  @DeleteDateColumn()
  deleteDate:Date;
}
