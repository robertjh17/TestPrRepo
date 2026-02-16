import { getUsersSearch } from './index';

test('returns matching users for query', () => {
  const response = getUsersSearch({ query: { q: 'ali' } });

  expect(response.users).toHaveLength(1);
  expect(response.users[0].id).toBe(1);
});
