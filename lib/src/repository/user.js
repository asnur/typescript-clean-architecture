"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const user_1 = require("../domain/model/user");
/**
 * @description UserRepositoryImpl class for UserRepository implementation
 * @implements UserRepository
 * @class UserRepositoryImpl
 * @constructor UserRepositoryImpl(connection: Sequelize)
 */
class UserRepositoryImpl {
    constructor(connection) {
        this.UserModels = (0, user_1.UserModel)(connection);
    }
    /**
     * @description Find user by property in entity user
     * @param data User
     * @returns Promise<User[]>
     */
    find(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.UserModels.findAll({
                where: data,
            });
            if (!users) {
                return Promise.reject("User not found");
            }
            return users;
        });
    }
    /**
     * @description Find user by id and return user
     * @param id string
     * @returns Promise<User>
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserModels.findByPk(id);
            if (!user) {
                return Promise.reject("User not found");
            }
            return user;
        });
    }
    /**
     * @description Create user and return user
     * @param data User
     * @returns Promise<User>
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created_user = yield this.UserModels.create(data);
            const user = yield this.findById(created_user.id);
            return user;
        });
    }
    /**
     * @description Update user by id and return user
     * @param id string
     * @param data User
     * @returns Promise<User>
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated_user = yield this.UserModels.update(data, {
                where: { id },
            });
            if (!updated_user) {
                return Promise.reject("User not found");
            }
            const user = yield this.findById(id);
            return user;
        });
    }
    /**
     * @description Delete user by id
     * @param id string
     * @returns Promise<boolean>
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserModels.destroy({
                where: { id },
            });
            if (!user) {
                return Promise.reject("User not found");
            }
            return true;
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
