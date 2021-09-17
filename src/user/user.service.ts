import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    let newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['posts'],
    });
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserInput);
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
