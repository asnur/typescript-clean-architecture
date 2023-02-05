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
exports.AuthController = void 0;
/**
 * @description UserController class for User controller
 * @class UserController
 * @constructor UserController(userUseCase: UserUseCaseImpl)
 */
class AuthController {
    constructor(userUseCase) {
        AuthController.userUseCase = userUseCase;
    }
    /**
     * @openapi
     * /api/v1/auth/login:
     *  post:
     *   summary: Login User
     *   tags:
     *   - Auth
     *   requestBody:
     *     required: true
     *     content:
     *       application/json:
     *         schema:
     *           $ref: '#/components/schemas/Login'
     *   responses:
     *     200:
     *        description: Login successfully
     *     500:
     *        description: Login failed
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AuthController.userUseCase.login(req.body);
                const response = {
                    message: "Login successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Login failed",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
    }
    /**
     * @openapi
     * /api/v1/auth/register:
     *  post:
     *   summary: Register new user
     *   tags:
     *   - Auth
     *   requestBody:
     *     required: true
     *     content:
     *       application/json:
     *         schema:
     *           $ref: '#/components/schemas/Register'
     *   responses:
     *     200:
     *       description: Register successfully
     *     500:
     *       description: Register failed
     *
     */
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AuthController.userUseCase.register(req.body);
                const response = {
                    message: "Register successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: error,
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
    }
}
exports.AuthController = AuthController;
