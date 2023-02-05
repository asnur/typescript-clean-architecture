import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ResponseData } from "../../domain/entities/response";

/**
 * @Patients_Validator
 * */
const createPatientsValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isString()
      .withMessage("name must be string"),
    body("phone")
      .notEmpty()
      .withMessage("name is required")
      .isMobilePhone("id-ID")
      .withMessage("phone must be mobile phone id-ID"),
    body("address")
      .notEmpty()
      .withMessage("address is required")
      .isString()
      .withMessage("address must be string"),
    body("id_status")
      .isUUID(4)
      .withMessage("id_status must be UUIDV4 format")
      .notEmpty()
      .withMessage("id_status is required"),
    body("in_date_at")
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
    body("out_date_at")
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

const updatePatientsValidator = () => {
  return [
    body("name").isString().withMessage("name must be string").optional(),
    body("phone")
      .isMobilePhone("id-ID")
      .withMessage("phone must be mobile phone id-ID")
      .optional(),
    body("address").isString().withMessage("address is required").optional(),
    body("id_status")
      .isUUID(4)
      .withMessage("phone must be mobile phone id-ID")
      .optional(),
    body("in_date_at")
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
    body("out_date_at")
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

/**
 * @Status_Validator
 */
const createStatusValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isString()
      .withMessage("name must be string"),
    errorHandler,
  ];
};

const updateStatusValidator = () => {
  return [
    body("name").isString().withMessage("name must be string").optional(),
    errorHandler,
  ];
};

/**
 * @User_Validator
 */

const createUserValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isString()
      .withMessage("name must be string"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email must be email"),
    body("password").notEmpty().withMessage("password is required"),
    errorHandler,
  ];
};

const updateUserValidator = () => {
  return [
    body("name").isString().withMessage("name must be string").optional(),
    body("email").isEmail().withMessage("email must be email").optional(),
    body("password").optional(),
    errorHandler,
  ];
};

/**
 * @Auth_Validator
 */
const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email must be email"),
    body("password").notEmpty().withMessage("password is required"),
    errorHandler,
  ];
};

const registerValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isString()
      .withMessage("name must be string"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email must be email"),
    body("password").notEmpty().withMessage("password is required"),
    errorHandler,
  ];
};

/**
 * @description Error Handler
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Response | void
 */
const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors: any[] = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json(<ResponseData>{
      message: "Validation failed",
      error: extractedErrors,
      status: 422,
    });
  }
  return next();
};

export {
  createPatientsValidator,
  updatePatientsValidator,
  createStatusValidator,
  updateStatusValidator,
  createUserValidator,
  updateUserValidator,
  loginValidator,
  registerValidator,
};
