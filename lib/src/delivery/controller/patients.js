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
exports.PatientsController = void 0;
/**
 * @description PatientsController class
 * @class PatientsController
 * @constructor PatientsController(patientsUseCases: PatientsUseCasesImpl, statusUseCases: StatusUseCasesImpl)
 */
class PatientsController {
    constructor(patientsUseCases) {
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
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PatientsController.patientsUseCases.findAll();
                if (data.length > 0) {
                    const response = {
                        message: "Patients found successfully",
                        data: data,
                        status: 200,
                    };
                    res.status(200).json(response);
                }
                else {
                    const response = {
                        message: "Patients is empty",
                        status: 200,
                    };
                    res.status(200).json(response);
                }
            }
            catch (error) {
                const response = {
                    message: "Patients not found",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
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
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield PatientsController.patientsUseCases.findById(id);
                const response = {
                    message: "Patients found successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Patients not found",
                    status: 404,
                };
                res.status(404).json(response);
            }
        });
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PatientsController.patientsUseCases.create(req.body);
                const response = {
                    message: "Patients created successfully",
                    data: data,
                    status: 201,
                };
                res.status(201).json(response);
            }
            catch (error) {
                const response = {
                    message: "Patients created failed",
                    error: error,
                    status: 422,
                };
                res.status(422).json(response);
            }
        });
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield PatientsController.patientsUseCases.update(id, req.body);
                const response = {
                    message: "Patients updated successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Patients updated failed",
                    error: error,
                    status: 404,
                };
                res.status(404).json(response);
            }
        });
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield PatientsController.patientsUseCases.delete(id);
                const response = {
                    message: "Patients deleted successfully",
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Patients deleted failed",
                    error: error,
                    status: 404,
                };
                res.status(404).json(response);
            }
        });
    }
    searchByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.params;
                const data = yield PatientsController.patientsUseCases.searchByStatus(status);
                if (data.length > 0) {
                    const response = {
                        message: "Patients found successfully",
                        data: data,
                        status: 200,
                    };
                    res.status(200).json(response);
                }
                else {
                    const response = {
                        message: "Patients not found",
                        status: 404,
                    };
                    res.status(404).json(response);
                }
            }
            catch (error) {
                const response = {
                    message: "Search status patients failed",
                    error: error,
                    status: 404,
                };
                res.status(404).json(response);
            }
        });
    }
    searchByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const data = yield PatientsController.patientsUseCases.searchByName(name);
                if (data.length > 0) {
                    const response = {
                        message: "Patients found successfully",
                        data: data,
                        status: 200,
                    };
                    res.status(200).json(response);
                }
                else {
                    const response = {
                        message: "Patients not found",
                        status: 404,
                    };
                    res.status(404).json(response);
                }
            }
            catch (error) {
                const response = {
                    message: "Search patients failed",
                    error: error,
                    status: 404,
                };
                res.status(404).json(response);
            }
        });
    }
}
exports.PatientsController = PatientsController;
