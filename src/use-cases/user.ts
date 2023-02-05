import { User } from "../domain/entities/user";
import { UserUseCases } from "../domain/interface/use-cases/user";
import { UserRepository } from "../domain/interface/repository/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/**
 * @description UserUseCasesImpl class for UserUseCases implementation
 * @implements UserUseCases
 * @class UserUseCasesImpl
 * @constructor UserUseCasesImpl(repository: UserRepository)
 */
export class UserUseCaseImpl implements UserUseCases {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  /**
   * @description Find user by property in entity user
   * @param data User
   * @returns Promise<User[]>
   */
  async find(data: User): Promise<User[]> {
    return await this.repository.find(data);
  }

  /**
   * @description Find user by id and return user
   * @param id string
   * @returns Promise<User>
   */
  async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
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
    const check_user = await this.repository.find(<User>{ email: data.email });

    if (check_user.length > 0) {
      return Promise.reject("Email User Already Exist");
    }

    // Encrypt password
    data.password = await bcrypt.hash(data.password, 10);

    return await this.repository.create(data);
  }

  /**
   * @description Update user by id and return user
   * @param id string
   * @param data User
   * @returns Promise<User>
   */
  async update(id: string, data: User): Promise<User> {
    const check_user = await this.repository.find(<User>{ email: data.email });

    if (check_user.length > 0 && check_user[0].email !== data.email) {
      return Promise.reject("Email User Already Exist");
    }
    // Encrypt password
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.repository.update(id, data);
  }

  /**
   * @description Delete user by id and return boolean
   * @param id string
   * @returns Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    const check_user = await this.repository.find(<User>{ id });
    if (!check_user) {
      return Promise.reject("User not found");
    }
    return await this.repository.delete(id);
  }

  /**
   * @description Login user and return token
   * @param data User
   * @returns Promise<any>
   */
  async login(data: User): Promise<any> {
    const data_user = await this.find(<User>{ email: data.email });
    if (!data_user) {
      return Promise.reject("User Does Not Exist");
    }

    // Check Password
    const password = data_user[0].password;
    const match = await bcrypt.compare(data.password, password);
    if (!match) {
      return Promise.reject("Password is not correct");
    }

    // Generate Token JWT
    const { JWT_SECRET } = process.env;
    const token = await jwt.sign({ data_user }, String(JWT_SECRET), {
      expiresIn: "1h",
    });

    return Promise.resolve({
      token: token,
    });
  }

  /**
   * @description Register user and return user
   * @param data User
   * @returns Promise<User>
   */
  async register(data: User): Promise<User> {
    const data_user = await this.find(<User>{ email: data.email });
    if (data_user.length !== 0) {
      return Promise.reject("User Already Exist");
    } else {
      // Hash Password
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;
      return await this.repository.create(data);
    }
  }
}
