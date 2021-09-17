import { Injectable, NotFoundException } from '@nestjs/common';
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

  // async update(
  //   id: string,
  //   updateUserInput: UpdateUserInput,
  // ): Promise<UpdateResult> {
  //   console.log(id)
  //   return await this.userRepository.update(id, updateUserInput);
  // }
  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
   const userUpdate = await this.userRepository.findOne(id);
    userUpdate.userName = updateUserInput.userName;
    userUpdate.age = updateUserInput.age;
    userUpdate.address = updateUserInput.address;
    return await this.userRepository.save(userUpdate);
  }
  async delete(id: string): Promise<User> {
    const userDelete = await this.userRepository.findOne(id);
    if(userDelete) {
    let res =   await this.userRepository.delete(userDelete);
      if (res.affected === 1) {
        return userDelete;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }
}
