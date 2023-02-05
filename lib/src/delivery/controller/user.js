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
exports.UserController = void 0;
/**
 * @description UserController class for User controller
 * @class UserController
 * @constructor UserController(userUseCase: UserUseCaseImpl)
 */
class UserController {
    constructor(userUseCase) {
        UserController.userUseCase = userUseCase;
    }
    /**
     * @openapi
     * /api/v1/user/{id}:
     *  get:
     *   summary: Find user
     *   tags:
     *   - Users
     *   parameters:
     *     - name: id
     *       in: path
     *       description: User id
     *       required: true
     *       schema:
     *         type: string
     *   responses:
     *     200:
     *       description: Find User successfully
     *     404:
     *       description: User not found
     *
     */
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield UserController.userUseCase.findById(id);
                const response = {
                    message: "User found successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "User not found",
                    status: 404,
                    error: error,
                };
                res.status(404).json(response);
            }
        });
    }
    /**
     * @openapi
     * /api/v1/user:
     *  get:
     *   summary: Find All user
     *   tags:
     *   - Users
     *   responses:
     *     200:
     *       description: Find User successfully
     *     404:
     *       description: User not found
     *
     */
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserController.userUseCase.find({});
                if (data.length === 0) {
                    const response = {
                        message: "User is empty",
                        status: 200,
                    };
                    res.status(200).json(response);
                }
                else {
                    const response = {
                        message: "User found successfully",
                        data: data,
                        status: 200,
                    };
                    res.status(200).json(response);
                }
            }
            catch (error) {
                const response = {
                    message: "User not found",
                    status: 404,
                    error: error,
                };
                res.status(404).json(response);
            }
        });
    }
    /**
     * @openapi
     * /api/v1/user:
     *  post:
     *   summary: Create user
     *   tags:
     *   - Users
     *   requestBody:
     *     required: true
     *     content:
     *       application/json:
     *         schema:
     *           $ref: '#/components/schemas/CreateUser'
     *   responses:
     *     201:
     *       description: Create successfully
     *     500:
     *       description: Create failed
     *
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserController.userUseCase.create(req.body);
                const response = {
                    message: "User created successfully",
                    data: data,
                    status: 201,
                };
                res.status(201).json(response);
            }
            catch (error) {
                const response = {
                    message: "User not created",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
    }
    /**
     * @openapi
     * /api/v1/user/{id}:
     *  put:
     *   summary: Update user
     *   tags:
     *   - Users
     *   parameters:
     *     - name: id
     *       in: path
     *       description: User id
     *       required: true
     *       schema:
     *         type: string
     *   requestBody:
     *     required: true
     *     content:
     *       application/json:
     *         schema:
     *           $ref: '#/components/schemas/UpdateUser'
     *   responses:
     *     200:
     *       description: Update User successfully
     *     500:
     *       description: User not updated
     *
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield UserController.userUseCase.update(id, req.body);
                const response = {
                    message: "User updated successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "User not updated",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
    }
    /**
     * @openapi
     * /api/v1/user/{id}:
     *  delete:
     *   summary: Find user
     *   tags:
     *   - Users
     *   parameters:
     *     - name: id
     *       in: path
     *       description: User id
     *       required: true
     *       schema:
     *         type: string
     *   responses:
     *     200:
     *       description: Delete User successfully
     *     500:
     *       description: User not deleted
     *
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield UserController.userUseCase.delete(id);
                const response = {
                    message: "User deleted successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "User not deleted",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
    }
}
exports.UserController = UserController;
