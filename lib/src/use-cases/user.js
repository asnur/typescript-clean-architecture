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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCaseImpl = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @description UserUseCasesImpl class for UserUseCases implementation
 * @implements UserUseCases
 * @class UserUseCasesImpl
 * @constructor UserUseCasesImpl(repository: UserRepository)
 */
class UserUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * @description Find user by property in entity user
     * @param data User
     * @returns Promise<User[]>
     */
    find(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find(data);
        });
    }
    /**
     * @description Find user by id and return user
     * @param id string
     * @returns Promise<User>
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findById(id);
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
            const check_user = yield this.repository.find({ email: data.email });
            if (check_user.length > 0) {
                return Promise.reject("Email User Already Exist");
            }
            // Encrypt password
            data.password = yield bcrypt_1.default.hash(data.password, 10);
            return yield this.repository.create(data);
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
            const check_user = yield this.repository.find({ email: data.email });
            if (check_user.length > 0 && check_user[0].email !== data.email) {
                return Promise.reject("Email User Already Exist");
            }
            // Encrypt password
            if (data.password) {
                data.password = yield bcrypt_1.default.hash(data.password, 10);
            }
            return yield this.repository.update(id, data);
        });
    }
    /**
     * @description Delete user by id and return boolean
     * @param id string
     * @returns Promise<boolean>
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check_user = yield this.repository.find({ id });
            if (!check_user) {
                return Promise.reject("User not found");
            }
            return yield this.repository.delete(id);
        });
    }
    /**
     * @description Login user and return token
     * @param data User
     * @returns Promise<any>
     */
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data_user = yield this.find({ email: data.email });
            if (!data_user) {
                return Promise.reject("User Does Not Exist");
            }
            // Check Password
            const password = data_user[0].password;
            const match = yield bcrypt_1.default.compare(data.password, password);
            if (!match) {
                return Promise.reject("Password is not correct");
            }
            // Generate Token JWT
            const { JWT_SECRET } = process.env;
            const token = yield jsonwebtoken_1.default.sign({ data_user }, String(JWT_SECRET), {
                expiresIn: "1h",
            });
            return Promise.resolve({
                token: token,
            });
        });
    }
    /**
     * @description Register user and return user
     * @param data User
     * @returns Promise<User>
     */
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data_user = yield this.find({ email: data.email });
            if (data_user.length !== 0) {
                return Promise.reject("User Already Exist");
            }
            else {
                // Hash Password
                const hash = yield bcrypt_1.default.hash(data.password, 10);
                data.password = hash;
                return yield this.repository.create(data);
            }
        });
    }
}
exports.UserUseCaseImpl = UserUseCaseImpl;
