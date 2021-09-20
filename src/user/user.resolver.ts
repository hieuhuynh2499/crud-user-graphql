import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entity/user.entity';
import { UserValidationPipe } from './user-validation.pipe';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User, { name: 'createUserNew' })
  @UsePipes(ValidationPipe)
  @UsePipes(new UserValidationPipe())
  create(@Args('createUser') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UsePipes(ValidationPipe)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  delete(@Args('id') id: string) {
    const userDelete = this.userService.delete(id);
    return userDelete
  }


}
