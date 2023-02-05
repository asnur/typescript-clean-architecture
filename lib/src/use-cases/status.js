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
exports.StatusUseCaseImpl = void 0;
/**
 * @description Status use case implementation class that implements StatusUseCase interface
 * @class StatusUseCaseImpl
 * @implements  StatusUseCase
 */
class StatusUseCaseImpl {
    constructor(statusRepository) {
        this.statusRepository = statusRepository;
        this.statusRepository = statusRepository;
    }
    /**
     * @description Create Status
     * @param data Status
     * @returns  Promise<Status>
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.statusRepository.create(data);
            return status;
        });
    }
    /**
     * @description Update Status
     * @param id string
     * @param data Status
     * @returns  Promise<Status>
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const check_status = yield this.findById(id);
            if (!check_status) {
                return Promise.reject("Status not found");
            }
            const status = yield this.statusRepository.update(id, data);
            return status;
        });
    }
    /**
     * @description Delete Status
     * @param id string
     * @returns  Promise<boolean>
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.findById(id);
            if (!status) {
                return Promise.reject("Status not found");
            }
            return yield this.statusRepository.delete(id);
        });
    }
    /**
     * @description Find Status by id
     * @param id string
     * @returns Promise<Status>
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.statusRepository.findById(id);
            return status;
        });
    }
    /**
     * @description Find all Status
     * @returns Promise<Status[]>
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.statusRepository.findAll();
            return status;
        });
    }
}
exports.StatusUseCaseImpl = StatusUseCaseImpl;
