import { Request, Response } from "express";
import { StatusUseCaseImpl } from "../../use-cases/status";
import { ResponseData } from "../../domain/entities/response";

/**
 * @description StatusController class for Status controller
 * @class StatusController
 * @constructor StatusController(statusUseCase: StatusUseCaseImpl)
 */
export class StatusController {
  /**
   * @description StatusUseCaseImpl instance for StatusUseCaseImpl
   * @property statusUseCase
   * @type StatusUseCaseImpl
   */
  private static statusUseCase: StatusUseCaseImpl;

  constructor(statusUseCase: StatusUseCaseImpl) {
    StatusController.statusUseCase = statusUseCase;
  }

  /**
   * @openapi
   * /api/v1/status/{id}:
   *  get:
   *   summary: Find Status
   *   tags:
   *   - Status
   *   parameters:
   *     - name: id
   *       in: path
   *       description: Statud id
   *       required: true
   *       schema:
   *         type: string
   *   responses:
   *     200:
   *       description: Find Status successfully
   *     404:
   *       description: Status not found
   *
   */
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await StatusController.statusUseCase.findById(String(id));

      const response: ResponseData = {
        message: "Status found successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Status not found",
        status: 404,
        error: error,
      };

      res.status(404).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/status:
   *  get:
   *   summary: Find All Status
   *   tags:
   *   - Status
   *   responses:
   *     200:
   *       description: Find All Status successfully
   *     500:
   *       description: Status not found
   *
   */
  async findAll(req: Request, res: Response) {
    try {
      const data = await StatusController.statusUseCase.findAll();

      if (data.length === 0) {
        const response: ResponseData = {
          message: "Status is empty",
          status: 200,
        };

        res.status(200).json(response);
      } else {
        const response: ResponseData = {
          message: "Status found successfully",
          data: data,
          status: 200,
        };

        res.status(200).json(response);
      }
    } catch (error) {
      const response: ResponseData = {
        message: "Status not found",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/status:
   *  post:
   *   summary: Create Status
   *   tags:
   *   - Status
   *   parameters:
   *     - name: id
   *       in: path
   *       description: Statud id
   *       required: true
   *       schema:
   *         type: string
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/CreateStatus'
   *   responses:
   *     200:
   *       description: Create Status successfully
   *     500:
   *       description: Status not Created
   *
   */
  async create(req: Request, res: Response) {
    try {
      const data = await StatusController.statusUseCase.create(req.body);

      const response: ResponseData = {
        message: "Status created successfully",
        data: data,
        status: 201,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Status not created",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/status/{id}:
   *  put:
   *   summary: Update Status
   *   tags:
   *   - Status
   *   parameters:
   *     - name: id
   *       in: path
   *       description: Statud id
   *       required: true
   *       schema:
   *         type: string
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/UpdateStatus'
   *   responses:
   *     200:
   *       description: Update Status successfully
   *     500:
   *       description: Status not updated
   *
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await StatusController.statusUseCase.update(
        String(id),
        req.body
      );

      const response: ResponseData = {
        message: "Status updated successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Status not updated",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/status/{id}:
   *  delete:
   *   summary: Delete Status
   *   tags:
   *   - Status
   *   parameters:
   *     - name: id
   *       in: path
   *       description: Statud id
   *       required: true
   *       schema:
   *         type: string
   *   responses:
   *     200:
   *       description: Delete Status successfully
   *     500:
   *       description: Status not deleted
   *
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await StatusController.statusUseCase.delete(String(id));

      const response: ResponseData = {
        message: "Status deleted successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Status not deleted",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }
}
