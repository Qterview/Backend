import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { isValidObjectId, Types } from 'mongoose';

export class SearchDto {
  @IsNotEmpty({ message: '검색어를 입력해주세요' })
  @IsString()
  @ApiProperty({ description: '검색 내용', required: true })
  search: string;
}

export class ObjectIdDto {
  @IsNotEmpty({ message: '검색어를 입력해주세요' })
  @IsMongoId({ message: 'Id형식이 잘못되었습니다' })
  id: string;
}
