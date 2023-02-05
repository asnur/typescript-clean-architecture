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
exports.PatientsUseCasesImpl = void 0;
const sequelize_1 = require("sequelize");
/**
 * @description PatientsUseCasesImpl class implements PatientsUseCases interface
 * @class PatientsUseCasesImpl
 * @constructor PatientsUseCasesImpl(patientsRepository: PatientsRepository)
 * @implements  PatientsUseCases
 */
class PatientsUseCasesImpl {
    constructor(patientsRepository, statusRepository) {
        this.patientsRepository = patientsRepository;
        this.statusRepository = statusRepository;
        this.patientsRepository = patientsRepository;
        this.statusRepository = statusRepository;
    }
    /**
     * @description Create Patients
     * @param data Patients
     * @returns  Promise<Patients>
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate Status is exist or not
            const status = yield this.statusRepository.findById(String(data.id_status));
            if (!status) {
                return Promise.reject("Status not found");
            }
            return yield this.patientsRepository.create(data);
        });
    }
    /**
     * @description Update Patients
     * @param id string
     * @param data Patients
     * @returns  Promise<Patients>
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate Status is exist or not
            if (data.id_status) {
                const status = yield this.statusRepository.findById(String(data.id_status));
                if (!status) {
                    return Promise.reject("Status not found");
                }
            }
            const patients = yield this.findById(id);
            if (!patients) {
                return Promise.reject("Patients not found");
            }
            return yield this.patientsRepository.update(id, data);
        });
    }
    /**
     * @description Delete Patients
     * @param id string
     * @returns  Promise<boolean>
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield this.findById(id);
            if (!patients) {
                return Promise.reject("Patients not found");
            }
            return yield this.patientsRepository.delete(id);
        });
    }
    /**
     * @description Find Patients by id
     * @param id string
     * @returns  Promise<Patients>
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.patientsRepository.findById(id);
            if (!patient) {
                return Promise.reject("Patients not found");
            }
            return patient;
        });
    }
    /**
     * @description Find all Patients
     * @returns Promise<Patients[]>
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientsRepository.find({});
        });
    }
    /**
     * @description Search Patients by status
     * @param status  string
     * @returns Promise<Patients[]>
     */
    searchByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield this.patientsRepository.find({
                "$status.name$": status,
            });
            return patients;
        });
    }
    /**
     * @description Search Patients by name
     * @param name string
     * @returns Promise<Patients[]>
     */
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield this.patientsRepository.find({
                "$patients.name$": {
                    [sequelize_1.Op.like]: `%${name}%`,
                },
            });
            return patients;
        });
    }
}
exports.PatientsUseCasesImpl = PatientsUseCasesImpl;
