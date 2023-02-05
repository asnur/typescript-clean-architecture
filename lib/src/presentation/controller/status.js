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
exports.StatusController = void 0;
/**
 * @description StatusController class for Status controller
 * @class StatusController
 * @constructor StatusController(statusUseCase: StatusUseCaseImpl)
 */
class StatusController {
    constructor(statusUseCase) {
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
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield StatusController.statusUseCase.findById(String(id));
                const response = {
                    message: "Status found successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Status not found",
                    status: 404,
                    error: error,
                };
                res.status(404).json(response);
            }
        });
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield StatusController.statusUseCase.create(req.body);
                const response = {
                    message: "Status created successfully",
                    data: data,
                    status: 201,
                };
                res.status(201).json(response);
            }
            catch (error) {
                const response = {
                    message: "Status not created",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield StatusController.statusUseCase.update(String(id), req.body);
                const response = {
                    message: "Status updated successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Status not updated",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield StatusController.statusUseCase.delete(String(id));
                const response = {
                    message: "Status deleted successfully",
                    data: data,
                    status: 200,
                };
                res.status(200).json(response);
            }
            catch (error) {
                const response = {
                    message: "Status not deleted",
                    status: 500,
                    error: error,
                };
                res.status(500).json(response);
            }
        });
    }
}
exports.StatusController = StatusController;
