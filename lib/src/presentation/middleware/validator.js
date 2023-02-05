"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.loginValidator = exports.updateUserValidator = exports.createUserValidator = exports.updateStatusValidator = exports.createStatusValidator = exports.updatePatientsValidator = exports.createPatientsValidator = void 0;
const express_validator_1 = require("express-validator");
/**
 * @Patients_Validator
 * */
const createPatientsValidator = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("name is required")
            .isString()
            .withMessage("name must be string"),
        (0, express_validator_1.body)("phone")
            .notEmpty()
            .withMessage("name is required")
            .isMobilePhone("id-ID")
            .withMessage("phone must be mobile phone id-ID"),
        (0, express_validator_1.body)("address")
            .notEmpty()
            .withMessage("address is required")
            .isString()
            .withMessage("address must be string"),
        (0, express_validator_1.body)("id_status")
            .isUUID(4)
            .withMessage("id_status must be UUIDV4 format")
            .notEmpty()
            .withMessage("id_status is required"),
        (0, express_validator_1.body)("in_date_at")
            .isDate()
            .withMessage("in_date_at must be date")
            .notEmpty()
            .custom((value, { req }) => {
            let in_date_at = new Date(value);
            let out_date_at = new Date(req.body.out_date_at);
            if (in_date_at > out_date_at) {
                throw new Error("in_date_at must be less than out_date_at");
            }
            return true;
        }),
        (0, express_validator_1.body)("out_date_at")
            .isDate()
            .withMessage("out_date_at must be date")
            .optional()
            .custom((value, { req }) => {
            let in_date_at = new Date(req.body.in_date_at);
            let out_date_at = new Date(value);
            if (out_date_at < in_date_at) {
                throw new Error("out_date_at must be greater than in_date_at");
            }
            return true;
        }),
        errorHandler,
    ];
};
exports.createPatientsValidator = createPatientsValidator;
const updatePatientsValidator = () => {
    return [
        (0, express_validator_1.body)("name").isString().withMessage("name must be string").optional(),
        (0, express_validator_1.body)("phone")
            .isMobilePhone("id-ID")
            .withMessage("phone must be mobile phone id-ID")
            .optional(),
        (0, express_validator_1.body)("address").isString().withMessage("address is required").optional(),
        (0, express_validator_1.body)("id_status")
            .isUUID(4)
            .withMessage("phone must be mobile phone id-ID")
            .optional(),
        (0, express_validator_1.body)("in_date_at")
            .isDate()
            .withMessage("in_date_at must be date")
            .custom((value, { req }) => {
            let in_date_at = new Date(value);
            let out_date_at = new Date(req.body.out_date_at);
            if (in_date_at > out_date_at) {
                throw new Error("in_date_at must be less than out_date_at");
            }
            return true;
        })
            .optional(),
        (0, express_validator_1.body)("out_date_at")
            .isDate()
            .withMessage("out_date_at must be date")
            .custom((value, { req }) => {
            let in_date_at = new Date(req.body.in_date_at);
            let out_date_at = new Date(value);
            if (out_date_at < in_date_at) {
                throw new Error("out_date_at must be greater than in_date_at");
            }
            return true;
        })
            .optional(),
        errorHandler,
    ];
};
exports.updatePatientsValidator = updatePatientsValidator;
/**
 * @Status_Validator
 */
const createStatusValidator = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("name is required")
            .isString()
            .withMessage("name must be string"),
        errorHandler,
    ];
};
exports.createStatusValidator = createStatusValidator;
const updateStatusValidator = () => {
    return [
        (0, express_validator_1.body)("name").isString().withMessage("name must be string").optional(),
        errorHandler,
    ];
};
exports.updateStatusValidator = updateStatusValidator;
/**
 * @User_Validator
 */
const createUserValidator = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("name is required")
            .isString()
            .withMessage("name must be string"),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email must be email"),
        (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
        errorHandler,
    ];
};
exports.createUserValidator = createUserValidator;
const updateUserValidator = () => {
    return [
        (0, express_validator_1.body)("name").isString().withMessage("name must be string").optional(),
        (0, express_validator_1.body)("email").isEmail().withMessage("email must be email").optional(),
        (0, express_validator_1.body)("password").optional(),
        errorHandler,
    ];
};
exports.updateUserValidator = updateUserValidator;
/**
 * @Auth_Validator
 */
const loginValidator = () => {
    return [
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email must be email"),
        (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
        errorHandler,
    ];
};
exports.loginValidator = loginValidator;
const registerValidator = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("name is required")
            .isString()
            .withMessage("name must be string"),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email must be email"),
        (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
        errorHandler,
    ];
};
exports.registerValidator = registerValidator;
/**
 * @description Error Handler
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Response | void
 */
const errorHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
        return res.status(422).json({
            message: "Validation failed",
            error: extractedErrors,
            status: 422,
        });
    }
    return next();
};
