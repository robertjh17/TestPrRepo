import { getTrainerDetailLookupCount, getTrainerList, resetTrainerServiceState } from './trainers';

describe('getTrainerList', () => {
  beforeEach(() => {
    resetTrainerServiceState();
  });

  test('returns trainer data', async () => {
    const trainers = await getTrainerList('repo-a');

    expect(trainers.length).toBeGreaterThan(0);
    expect(trainers[0]).toHaveProperty('fullName');
  });

  test('returns cached results on repeat calls', async () => {
    const first = await getTrainerList('repo-a');
    const second = await getTrainerList('repo-a');

    expect(second).toBe(first);
    expect(getTrainerDetailLookupCount()).toBe(3);
  });
});
