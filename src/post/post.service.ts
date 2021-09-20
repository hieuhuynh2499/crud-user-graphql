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

  // async update(id: string, updatePostInput: UpdatePostInput): Promise<Post> {
  //   const postUpdate = await this.postRepository.findOne(id);
  //   postUpdate.postTitle = updatePostInput.postTitle;
  //   postUpdate.postContent = updatePostInput.postContent;
  //   return await this.postRepository.save(postUpdate);
  // }

  async update(id: string, updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.postRepository.findOne(id);
    if(post){
      const resPostUpdate = await this.postRepository.update(id,{
        postTitle: updatePostInput.postTitle,
        postContent: updatePostInput.postContent,
      });
      const postUpdate = await this.postRepository.findOne(id);
      if(resPostUpdate.affected === 1){
        return postUpdate
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }

  // async delete(id: string):Promise<Post> {
  //   const postDelete = await this.postRepository.findOne(id);
  //   if (postDelete) {
  //     console.log("dfkjghdkfg")
  //     let res = await this.postRepository.delete(postDelete);
  //     console.log(res)
  //     if (res.affected === 1) {
  //       return postDelete;
  //     }
  //   }
  //   throw new NotFoundException(`Record cannot find by id ${id}`);
  // }
  
  async delete(id: string):Promise<Post> {
      const postDelete = await this.postRepository.findOne(id);
      let res = await this.postRepository.softDelete(id);
      if(res.affected === 1){
        return postDelete;
      }else{
        throw new NotFoundException('not found id post')
      }
  } 

  async restore(id:string): Promise<Post> {
    const postDelete = await this.postRepository.findOne(id);
      let res = await this.postRepository.restore(id);
      if(res.affected === 1){
        return postDelete;
      }else{
        throw new NotFoundException('not found id post')
      }
  }

}
