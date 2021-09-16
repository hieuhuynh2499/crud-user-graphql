import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entity/post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}
  @Mutation(() => Post, { name: 'createPostNew' })
  create(@Args('createPost') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'getAllPost' })
  findAll() {
    return this.postService.findAll();
  }
}
