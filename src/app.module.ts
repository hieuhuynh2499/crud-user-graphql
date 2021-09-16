import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    UserModule, 
    PostModule,
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/schema.gql'),}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      database:'users',
      entities:["dist/**/*.entity{.ts,.js}"],
      synchronize:true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
