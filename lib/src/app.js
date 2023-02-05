"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./delivery/router/api"));
const figlet_1 = __importDefault(require("figlet"));
const database_1 = require("./config/database");
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_1 = require("./utils/swagger");
/**
 * @Patients
 * @description Import Patients module
 */
const patients_1 = require("./repository/patients");
const patients_2 = require("./use-cases/patients");
const patients_3 = require("./delivery/controller/patients");
/**
 * @Status
 * @description Import Status module
 */
const status_1 = require("./repository/status");
const status_2 = require("./use-cases/status");
const status_3 = require("./delivery/controller/status");
/**
 * @Users
 * @description Import Users module
 */
const user_1 = require("./repository/user");
const user_2 = require("./use-cases/user");
const user_3 = require("./delivery/controller/user");
/**
 * @Authentications
 */
const auth_1 = require("./delivery/controller/auth");
/**
 * @description Set Express App
 */
const { APP_PORT } = process.env;
const app = (0, express_1.default)();
app.listen(APP_PORT || 3000, () => {
    // Print Figlet
    figlet_1.default.text("API PATIENTS COVID", {
        horizontalLayout: "default",
        verticalLayout: "default",
        whitespaceBreak: true,
    }, (err, data) => {
        if (err) {
            console.info("Something went wrong...");
            console.dir(err);
        }
        console.info(data);
    });
    console.info(`Server running in port ${APP_PORT} by Muhammad Asnur Ramdani`);
});
/**
 * @description Set Another Middleware
 */
app.use(express_1.default.json());
/**
 * @description Set Morgan Middleware and Logger
 */
const logDirectory = __dirname + "/logs";
const logFileName = "access.log";
const logFilePath = logDirectory + "/" + logFileName;
// ensure log directory exists
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logFilePath);
}
const accessLogStream = fs_1.default.createWriteStream(logFilePath, { flags: "a" });
const formatLog = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use((0, morgan_1.default)(formatLog, { stream: accessLogStream }));
/**
 * @description Swagger UI
 */
(0, swagger_1.swagger)(app);
(0, swagger_1.swaggerJson)(app);
/**
 * @description Set Database Connection
 */
const db = database_1.connection;
db.authenticate().then(() => {
    console.info("Database connected");
});
/**
 * @description Set Repository
 */
const statusRepository = new status_1.StatusRepositoryImpl(db);
const patientsRepository = new patients_1.PatientsRepositoryImpl(db);
const userRepository = new user_1.UserRepositoryImpl(db);
/**
 * @description Set Use Cases
 */
const statusUseCases = new status_2.StatusUseCaseImpl(statusRepository);
const patientsUseCases = new patients_2.PatientsUseCasesImpl(patientsRepository, statusRepository);
const userUseCases = new user_2.UserUseCaseImpl(userRepository);
/**
 * Set Controller
 */
const statusController = new status_3.StatusController(statusUseCases);
const patientsController = new patients_3.PatientsController(patientsUseCases);
const userController = new user_3.UserController(userUseCases);
const authController = new auth_1.AuthController(userUseCases);
/**
 * @description Set Router
 */
const routing = (0, api_1.default)(express_1.default.Router(), patientsController, statusController, userController, authController);
app.use("/api/v1", routing);
