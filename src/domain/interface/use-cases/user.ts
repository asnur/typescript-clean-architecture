import { User } from "../../entities/user";

/**
 * @description User interface for User Use Cases
 */
export interface UserUseCases {
  find(data: User): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(data: User): Promise<User>;
  update(id: string, data: User): Promise<User>;
  delete(id: string): Promise<boolean>;
  login(data: User): Promise<any>;
  register(data: User): Promise<User>;
}
