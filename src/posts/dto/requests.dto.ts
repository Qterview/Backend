import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { isValidObjectId, ObjectId, Types } from 'mongoose';

export class SearchDto {
  @ApiProperty({ description: '검색 내용', required: true })
  @IsNotEmpty({ message: '검색어를 입력해주세요' })
  @IsString()
  data: string;
}

export class QuestionDto {
  @ApiProperty({ description: '질문(제목)', required: true })
  @IsNotEmpty({ message: '질문을 입력해주세요' })
  @IsString()
  question: string;
}

export class ObjectIdDto {
  @ApiProperty({ description: '게시글ID(objectID)', required: true })
  @IsNotEmpty({ message: '검색어를 입력해주세요' })
  @IsMongoId({ message: 'Id형식이 잘못되었습니다' })
  id: string;
}

export class PageDto {
  @IsNumberString()
  @ApiProperty({ description: '페이지', required: false })
  page: number;
}
