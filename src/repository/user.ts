import { User } from "../domain/entities/user";
import { UserModel } from "../domain/model/user";
import { UserRepository } from "../domain/interface/repository/user";
import { Sequelize } from "sequelize";

/**
 * @description UserRepositoryImpl class for UserRepository implementation
 * @implements UserRepository
 * @class UserRepositoryImpl
 * @constructor UserRepositoryImpl(connection: Sequelize)
 */
export class UserRepositoryImpl implements UserRepository {
  private UserModels: any;

  constructor(connection: Sequelize) {
    this.UserModels = UserModel(connection);
  }

  /**
   * @description Find user by property in entity user
   * @param data User
   * @returns Promise<User[]>
   */
  async find(data: User): Promise<User[]> {
    const users = await this.UserModels.findAll({
      where: data,
    });

    if (!users) {
      return Promise.reject("User not found");
    }

    return users;
  }

  /**
   * @description Find user by id and return user
   * @param id string
   * @returns Promise<User>
   */
  async findById(id: string): Promise<User> {
    const user = await this.UserModels.findByPk(id);

    if (!user) {
      return Promise.reject("User not found");
    }

    return user;
  }

  /**
   * @description Create user and return user
   * @param data User
   * @returns Promise<User>
   */
  async create(data: User): Promise<User> {
    const created_user = await this.UserModels.create(data);
    const user = await this.findById(created_user.id);
    return user;
  }

  /**
   * @description Update user by id and return user
   * @param id string
   * @param data User
   * @returns Promise<User>
   */
  async update(id: string, data: User): Promise<User> {
    const updated_user = await this.UserModels.update(data, {
      where: { id },
    });

    if (!updated_user) {
      return Promise.reject("User not found");
    }
    const user = await this.findById(id);

    return user;
  }
  /**
   * @description Delete user by id
   * @param id string
   * @returns Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    const user = await this.UserModels.destroy({
      where: { id },
    });

    if (!user) {
      return Promise.reject("User not found");
    }

    return true;
  }
}
