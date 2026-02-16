export class SimpleCache<T> {
  private store = new Map<string, { value: T; expiresAt: number }>();

  get(key: string): T | undefined {
    const item = this.store.get(key);
    if (!item) {
      return undefined;
    }

    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return item.value;
  }

  async set(key: string, value: T, ttlMs = 5000): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }

  clear(): void {
    this.store.clear();
  }
}
