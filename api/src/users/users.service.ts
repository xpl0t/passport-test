import { Injectable } from '@nestjs/common';
import { User } from './user.model';

export interface GetUserFilter {
  id?: number;
  username?: string;
}

@Injectable()
export class UsersService {
  // BEWARE: INSECURE!! In production environments the password should never be stored in plain text. Use hashing!
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async get(filter: GetUserFilter): Promise<User> {
    return this.users.find(user => {
      return (filter.id == null || user.id === filter.id)
        && (filter.username == null || user.username === filter.username);
    });
  }
}
