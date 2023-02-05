import { Response, Request } from "express";
import { UserUseCaseImpl } from "../../use-cases/user";
import { ResponseData } from "../../domain/entities/response";
import { User } from "../../domain/entities/user";

/**
 * @description UserController class for User controller
 * @class UserController
 * @constructor UserController(userUseCase: UserUseCaseImpl)
 */
export class UserController {
  /**
   * @description UserUseCaseImpl instance for UserUseCaseImpl
   * @property userUseCase
   * @type UserUseCaseImpl
   */
  private static userUseCase: UserUseCaseImpl;

  constructor(userUseCase: UserUseCaseImpl) {
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
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await UserController.userUseCase.findById(id);

      const response: ResponseData = {
        message: "User found successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "User not found",
        status: 404,
        error: error,
      };

      res.status(404).json(response);
    }
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
  async findAll(req: Request, res: Response) {
    try {
      const data = await UserController.userUseCase.find(<User>{});

      if (data.length === 0) {
        const response: ResponseData = {
          message: "User is empty",
          status: 200,
        };

        res.status(200).json(response);
      } else {
        const response: ResponseData = {
          message: "User found successfully",
          data: data,
          status: 200,
        };

        res.status(200).json(response);
      }
    } catch (error) {
      const response: ResponseData = {
        message: "User not found",
        status: 404,
        error: error,
      };

      res.status(404).json(response);
    }
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
  async create(req: Request, res: Response) {
    try {
      const data = await UserController.userUseCase.create(req.body);

      const response: ResponseData = {
        message: "User created successfully",
        data: data,
        status: 201,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "User not created",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
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
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await UserController.userUseCase.update(id, req.body);

      const response: ResponseData = {
        message: "User updated successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "User not updated",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
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
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await UserController.userUseCase.delete(id);

      const response: ResponseData = {
        message: "User deleted successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "User not deleted",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }
}
