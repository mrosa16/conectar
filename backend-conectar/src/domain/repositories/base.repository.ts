export abstract class BaseRepository<T, F = any> {
  abstract create(data: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(filter?: F): Promise<T[]>;
  abstract update(data: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
