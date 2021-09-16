import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User, { name: 'createUserNew' })
  create(@Args('createUser') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
  
  @Query(() => [User], { name: 'getAllUser' })
  findAll() {
    return this.userService.findAll();
  }
}
