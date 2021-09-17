import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, updatePostInput: UpdatePostInput): Promise<Post> {
    const postUpdate = await this.postRepository.findOne(id);
    postUpdate.postTitle = updatePostInput.postTitle;
    postUpdate.postContent = updatePostInput.postContent;
    return await this.postRepository.save(postUpdate);
  }

  async delete(id: string) {
    const postDelete = await this.postRepository.findOne(id);
    if (postDelete) {
      let res = await this.postRepository.delete(postDelete);
      if (res.affected === 1) {
        return postDelete;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
