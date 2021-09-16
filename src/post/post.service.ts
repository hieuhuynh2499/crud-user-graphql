import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {


    constructor(@InjectRepository(Post) private postRepository: Repository<Post>){}
    
    async create(createPostInput:CreatePostInput):Promise<Post>{
        let newPost = this.postRepository.create(createPostInput)
        return this.postRepository.save(newPost)
    }

    async findAll():Promise<Post[]>{
        return this.postRepository.find()
    }

}
