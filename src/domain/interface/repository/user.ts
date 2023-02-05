import { User } from "../../entities/user";
/**
 * @description UserRepository interface for UserRepository implementation
 */
export interface UserRepository {
  find(data: User): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(data: User): Promise<User>;
  update(id: string, data: User): Promise<User>;
  delete(id: string): Promise<boolean>;
}
