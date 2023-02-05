import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseData } from "../../domain/entities/response";
import dotenv from "dotenv";

/**
 * @description JWT Token middleware
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = String(req.headers["authorization"]).split(" ")[1];
  // Check token in header
  if (!token) {
    return res.status(401).json(<ResponseData>{
      message: "No token provided",
      status: 401,
    });
  } else {
    try {
      // Verify token
      const { JWT_SECRET } = require("dotenv").config().parsed;
      jwt.verify(String(token), String(JWT_SECRET));

      return next();
    } catch (error) {
      return res.status(401).json(<ResponseData>{
        message: "Unauthorized",
        status: 401,
        error: error,
      });
    }
  }
};
