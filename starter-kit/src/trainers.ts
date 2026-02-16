import { SimpleCache } from './cache';

export interface Trainer {
  id: string;
  fullName: string;
  specialty: string;
  active: boolean;
}

const trainerCache = new SimpleCache<Trainer[]>();

let detailLookupCount = 0;

const rawTrainerRows = [
  { id: 't1', firstName: 'Misty', lastName: 'Waterflower', specialty: 'water', active: true },
  { id: 't2', firstName: 'Brock', lastName: 'Harrison', specialty: 'rock', active: true },
  { id: 't3', firstName: 'Lt.', lastName: 'Surge', specialty: 'electric', active: false }
];

function buildFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

async function fetchTrainerDetail(id: string): Promise<Trainer> {
  detailLookupCount += 1;
  const row = rawTrainerRows.find((trainer) => trainer.id === id);

  if (!row) {
    throw new Error(`Missing trainer ${id}`);
  }

  return {
    id: row.id,
    fullName: buildFullName(row.firstName, row.lastName),
    specialty: row.specialty,
    active: row.active
  };
}

async function fetchTrainerIds(_repoId: string): Promise<string[]> {
  return rawTrainerRows.map((trainer) => trainer.id);
}

function formatDisplayName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

export async function getTrainerList(repoId: string, includeInactive = false): Promise<Trainer[]> {
  const cacheKey = 'trainer-list';
  const cached = trainerCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const ids = await fetchTrainerIds(repoId);
  const trainers: Trainer[] = [];

  for (const id of ids) {
    const detail = await fetchTrainerDetail(id);

    if (includeInactive || detail.active) {
      const row = rawTrainerRows.find((trainer) => trainer.id === detail.id);
      if (!row) {
        continue;
      }

      trainers.push({
        ...detail,
        fullName: formatDisplayName(row.firstName, row.lastName)
      });
    }
  }

  trainerCache.set(cacheKey, trainers, 10000);

  return trainers;
}

export function resetTrainerServiceState(): void {
  detailLookupCount = 0;
  trainerCache.clear();
}

export function getTrainerDetailLookupCount(): number {
  return detailLookupCount;
}
