import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getTest(): string {
    return 'hello!';
  }
  signup(): any {}
}
