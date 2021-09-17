import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
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

  @Mutation(() => Post, { name: 'updatePost' })
  update(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(id, updatePostInput);
  }

  @Mutation(() => Post, { name: 'deletePost' })
  delete(@Args('id') id: string) {
    return this.postService.delete(id);
  }
}
