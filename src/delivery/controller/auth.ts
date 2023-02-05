import { Response, Request } from "express";
import { UserUseCaseImpl } from "../../use-cases/user";
import { ResponseData } from "../../domain/entities/response";

/**
 * @description UserController class for User controller
 * @class UserController
 * @constructor UserController(userUseCase: UserUseCaseImpl)
 */
export class AuthController {
  /**
   * @description UserUseCaseImpl instance for UserUseCaseImpl
   * @property userUseCase
   * @type UserUseCaseImpl
   */
  private static userUseCase: UserUseCaseImpl;

  constructor(userUseCase: UserUseCaseImpl) {
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
  async login(req: Request, res: Response) {
    try {
      const data = await AuthController.userUseCase.login(req.body);

      const response: ResponseData = {
        message: "Login successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Login failed",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
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
  async register(req: Request, res: Response) {
    try {
      const data = await AuthController.userUseCase.register(req.body);

      const response: ResponseData = {
        message: "Register successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ResponseData = {
        message: error,
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }
}
