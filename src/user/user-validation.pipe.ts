import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(value.age <= 16){
      throw new BadRequestException('age not is 16 age okie')
    }
    if(value.userName.match(/^\d/)){
      throw new HttpException('name is not start with number', HttpStatus.NOT_ACCEPTABLE);
    }
    return value;
  }
}
