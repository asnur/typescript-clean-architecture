"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../middleware/validator");
const jwttoken_1 = require("../middleware/jwttoken");
/**
 * @description Router function
 * @param router Router
 * @param Patients PataientsController`
 * @returns Router
 */
const router = (router, Patients, Status, User, Auth) => {
    router.get("/", (req, res) => {
        res.send("API Patients Covid is running");
    });
    /**
     * @Patients_Controller
     */
    router.get("/patients", jwttoken_1.verifyToken, Patients.findAll);
    router.get("/patients/:id", jwttoken_1.verifyToken, Patients.findById);
    router.get("/patients/search/:name", jwttoken_1.verifyToken, Patients.searchByName);
    router.get("/patients/status/:status", jwttoken_1.verifyToken, Patients.searchByStatus);
    router.post("/patients", jwttoken_1.verifyToken, (0, validator_1.createPatientsValidator)(), Patients.create);
    router.put("/patients/:id", jwttoken_1.verifyToken, (0, validator_1.updatePatientsValidator)(), Patients.update);
    router.delete("/patients/:id", jwttoken_1.verifyToken, Patients.delete);
    /**
     * @Status_Controller
     */
    router.get("/status", jwttoken_1.verifyToken, Status.findAll);
    router.get("/status/:id", jwttoken_1.verifyToken, Status.findById);
    router.post("/status", jwttoken_1.verifyToken, (0, validator_1.createStatusValidator)(), Status.create);
    router.put("/status/:id", jwttoken_1.verifyToken, (0, validator_1.updateStatusValidator)(), Status.update);
    router.delete("/status/:id", jwttoken_1.verifyToken, Status.delete);
    /**
     * @User_Controller
     */
    router.get("/user", jwttoken_1.verifyToken, User.findAll);
    router.get("/user/:id", jwttoken_1.verifyToken, User.findById);
    router.post("/user", jwttoken_1.verifyToken, (0, validator_1.createUserValidator)(), User.create);
    router.put("/user/:id", jwttoken_1.verifyToken, (0, validator_1.updateUserValidator)(), User.update);
    router.delete("/user/:id", jwttoken_1.verifyToken, User.delete);
    /**
     * @Auth_Controller
     */
    router.post("/auth/login", (0, validator_1.loginValidator)(), Auth.login);
    router.post("/auth/register", (0, validator_1.registerValidator)(), Auth.register);
    return router;
};
exports.default = router;
