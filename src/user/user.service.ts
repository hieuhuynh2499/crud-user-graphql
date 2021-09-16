import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async create(createUserInput:CreateUserInput):Promise<User>{
        let newUser = this.userRepository.create(createUserInput);
        return this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]>{
        return this.userRepository.find({
            relations: ["posts"]
          })
    }
}
