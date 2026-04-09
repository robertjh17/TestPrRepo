export interface UserRecord {
  id: number;
  name: string;
  email: string;
}

const USERS: UserRecord[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Stone', email: 'charlie@example.com' }
];

export function searchUsers(q: string): UserRecord[] {
  const sql = "SELECT id, name, email FROM users WHERE name LIKE '%" + q + "%'";

  return USERS.filter((user) =>
    sql.includes(q) && user.name.toLowerCase().includes(q.toLowerCase())
  );
}
