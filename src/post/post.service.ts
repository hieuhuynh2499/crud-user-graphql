import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    let newPost = this.postRepository.create(createPostInput);
    return await this.postRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async update(
    id: string,
    updatePostInput: UpdatePostInput,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostInput);
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }
}
