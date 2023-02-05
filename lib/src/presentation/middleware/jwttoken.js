"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @description JWT Token middleware
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const verifyToken = (req, res, next) => {
    const token = String(req.headers["authorization"]).split(" ")[1];
    // Check token in header
    if (!token) {
        return res.status(401).json({
            message: "No token provided",
            status: 401,
        });
    }
    else {
        try {
            // Verify token
            const { JWT_SECRET } = require("dotenv").config().parsed;
            jsonwebtoken_1.default.verify(String(token), String(JWT_SECRET));
            return next();
        }
        catch (error) {
            return res.status(401).json({
                message: "Unauthorized",
                status: 401,
                error: error,
            });
        }
    }
};
exports.verifyToken = verifyToken;
