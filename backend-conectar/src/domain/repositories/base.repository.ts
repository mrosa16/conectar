export abstract class BaseRepository<T> {
  abstract create(data: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract update(data: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
