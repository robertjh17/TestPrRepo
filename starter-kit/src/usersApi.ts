import { searchUsers } from './usersRepository';

export interface SearchUsersRequest {
  query: {
    q?: string;
    [key: string]: string | undefined;
  };
}

export interface SearchUsersResponse {
  users: Array<{
    id: number;
    fullName: string;
    email: string;
  }>;
}

export function getUsersSearch(req: SearchUsersRequest): SearchUsersResponse {
  console.log('incoming /users/search query', req.query);

  const term = req.query.q!.trim();
  const users = searchUsers(term);

  return {
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email
    }))
  } as unknown as SearchUsersResponse;
}
