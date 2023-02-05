import { Router, Response, Request } from "express";
import { PatientsController } from "../controller/patients";
import { StatusController } from "../controller/status";
import { UserController } from "../controller/user";
import { AuthController } from "../controller/auth";
import {
  createPatientsValidator,
  updatePatientsValidator,
  createStatusValidator,
  updateStatusValidator,
  createUserValidator,
  updateUserValidator,
  loginValidator,
  registerValidator,
} from "../middleware/validator";
import { verifyToken } from "../middleware/jwttoken";

/**
 * @description Router function
 * @param router Router
 * @param Patients PataientsController`
 * @returns Router
 */
const router = (
  router: Router,
  Patients: PatientsController,
  Status: StatusController,
  User: UserController,
  Auth: AuthController
): Router => {
  router.get("/", (req: Request, res: Response) => {
    res.send("API Patients Covid is running");
  });

  /**
   * @Patients_Controller
   */
  router.get("/patients", verifyToken, Patients.findAll);
  router.get("/patients/:id", verifyToken, Patients.findById);
  router.get("/patients/search/:name", verifyToken, Patients.searchByName);
  router.get("/patients/status/:status", verifyToken, Patients.searchByStatus);
  router.post(
    "/patients",
    verifyToken,
    createPatientsValidator(),
    Patients.create
  );
  router.put(
    "/patients/:id",
    verifyToken,
    updatePatientsValidator(),
    Patients.update
  );
  router.delete("/patients/:id", verifyToken, Patients.delete);

  /**
   * @Status_Controller
   */
  router.get("/status", verifyToken, Status.findAll);
  router.get("/status/:id", verifyToken, Status.findById);
  router.post("/status", verifyToken, createStatusValidator(), Status.create);
  router.put(
    "/status/:id",
    verifyToken,
    updateStatusValidator(),
    Status.update
  );
  router.delete("/status/:id", verifyToken, Status.delete);

  /**
   * @User_Controller
   */
  router.get("/user", verifyToken, User.findAll);
  router.get("/user/:id", verifyToken, User.findById);
  router.post("/user", verifyToken, createUserValidator(), User.create);
  router.put("/user/:id", verifyToken, updateUserValidator(), User.update);
  router.delete("/user/:id", verifyToken, User.delete);

  /**
   * @Auth_Controller
   */
  router.post("/auth/login", loginValidator(), Auth.login);
  router.post("/auth/register", registerValidator(), Auth.register);

  return router;
};

export default router;
