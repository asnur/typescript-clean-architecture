import { Request, Response } from "express";
import { PatientsUseCasesImpl } from "../../use-cases/patients";
import { ResponseData } from "../../domain/entities/response";

/**
 * @description PatientsController class
 * @class PatientsController
 * @constructor PatientsController(patientsUseCases: PatientsUseCasesImpl, statusUseCases: StatusUseCasesImpl)
 */
export class PatientsController {
  /**
   * @description PatientsUseCasesImpl instance for PatientsUseCasesImpl
   * @property patientsUseCases
   * @type PatientsUseCasesImpl
   */
  private static patientsUseCases: PatientsUseCasesImpl;

  constructor(patientsUseCases: PatientsUseCasesImpl) {
    PatientsController.patientsUseCases = patientsUseCases;
  }

  /**
   * @openapi
   * /api/v1/patients:
   *  get:
   *   summary: Find All patients
   *   tags:
   *   - Patients
   *   responses:
   *     200:
   *       description: Find patients successfully
   *     404:
   *       description: Patients not Found
   *     500:
   *       description: Internal Server Error
   *
   */
  async findAll(req: Request, res: Response) {
    try {
      const data = await PatientsController.patientsUseCases.findAll();

      if (data.length > 0) {
        const response: ResponseData = {
          message: "Patients found successfully",
          data: data,
          status: 200,
        };

        res.status(200).json(response);
      } else {
        const response: ResponseData = {
          message: "Patients is empty",
          status: 200,
        };

        res.status(200).json(response);
      }
    } catch (error) {
      const response: ResponseData = {
        message: "Patients not found",
        status: 500,
        error: error,
      };

      res.status(500).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/patients/{id}:
   *  get:
   *   summary: Find patients
   *   tags:
   *   - Patients
   *   parameters:
   *     - name: id
   *       in: path
   *       description: patients id
   *       required: true
   *       schema:
   *         type: string
   *   responses:
   *     200:
   *       description: Find patients successfully
   *     404:
   *       description: Patients not Found
   *
   */
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await PatientsController.patientsUseCases.findById(id);

      const response: ResponseData = {
        message: "Patients found successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Patients not found",
        status: 404,
      };
      res.status(404).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/patients:
   *  post:
   *   summary: Create patients
   *   tags:
   *   - Patients
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/CreatePatients'
   *   responses:
   *     201:
   *       description: Create patients successfully
   *     422:
   *       description: Patients not Created
   *
   */
  async create(req: Request, res: Response) {
    try {
      const data = await PatientsController.patientsUseCases.create(req.body);

      const response: ResponseData = {
        message: "Patients created successfully",
        data: data,
        status: 201,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Patients created failed",
        error: error,
        status: 422,
      };
      res.status(422).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/patients/{id}:
   *  put:
   *   summary: Update patients
   *   tags:
   *   - Patients
   *   parameters:
   *     - name: id
   *       in: path
   *       description: patients id
   *       required: true
   *       schema:
   *         type: string
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/UpdatePatients'
   *   responses:
   *     200:
   *       description: Update patients successfully
   *     404:
   *       description: Patients not updated
   *
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await PatientsController.patientsUseCases.update(
        id,
        req.body
      );

      const response: ResponseData = {
        message: "Patients updated successfully",
        data: data,
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Patients updated failed",
        error: error,
        status: 404,
      };
      res.status(404).json(response);
    }
  }

  /**
   * @openapi
   * /api/v1/patients/{id}:
   *  delete:
   *   summary: Update patients
   *   tags:
   *   - Patients
   *   parameters:
   *     - name: id
   *       in: path
   *       description: patients id
   *       required: true
   *       schema:
   *         type: string
   *   responses:
   *     200:
   *       description: Update patients successfully
   *     404:
   *       description: Patients not updated
   *
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await PatientsController.patientsUseCases.delete(id);

      const response: ResponseData = {
        message: "Patients deleted successfully",
        status: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ResponseData = {
        message: "Patients deleted failed",
        error: error,
        status: 404,
      };
      res.status(404).json(response);
    }
  }

  async searchByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const data = await PatientsController.patientsUseCases.searchByStatus(
        status
      );

      if (data.length > 0) {
        const response: ResponseData = {
          message: "Patients found successfully",
          data: data,
          status: 200,
        };

        res.status(200).json(response);
      } else {
        const response: ResponseData = {
          message: "Patients not found",
          status: 404,
        };

        res.status(404).json(response);
      }
    } catch (error) {
      const response: ResponseData = {
        message: "Search status patients failed",
        error: error,
        status: 404,
      };
      res.status(404).json(response);
    }
  }

  async searchByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const data = await PatientsController.patientsUseCases.searchByName(name);

      if (data.length > 0) {
        const response: ResponseData = {
          message: "Patients found successfully",
          data: data,
          status: 200,
        };

        res.status(200).json(response);
      } else {
        const response: ResponseData = {
          message: "Patients not found",
          status: 404,
        };

        res.status(404).json(response);
      }
    } catch (error) {
      const response: ResponseData = {
        message: "Search patients failed",
        error: error,
        status: 404,
      };
      res.status(404).json(response);
    }
  }
}
