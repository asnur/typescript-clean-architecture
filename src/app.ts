import express, { Application } from "express";
import router from "./delivery/router/api";
import figlet from "figlet";
import { connection } from "./config/database";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import { swagger, swaggerJson } from "./utils/swagger";
/**
 * @Patients
 * @description Import Patients module
 */
import { PatientsRepositoryImpl } from "./repository/patients";
import { PatientsUseCasesImpl } from "./use-cases/patients";
import { PatientsController } from "./delivery/controller/patients";
/**
 * @Status
 * @description Import Status module
 */
import { StatusRepositoryImpl } from "./repository/status";
import { StatusUseCaseImpl } from "./use-cases/status";
import { StatusController } from "./delivery/controller/status";
/**
 * @Users
 * @description Import Users module
 */
import { UserRepositoryImpl } from "./repository/user";
import { UserUseCaseImpl } from "./use-cases/user";
import { UserController } from "./delivery/controller/user";

/**
 * @Authentications
 */
import { AuthController } from "./delivery/controller/auth";

/**
 * @description Set Express App
 */
const { APP_PORT } = process.env;

const app: Application = express();

app.listen(APP_PORT || 3000, () => {
  // Print Figlet
  figlet.text(
    "API PATIENTS COVID",
    {
      horizontalLayout: "default",
      verticalLayout: "default",
      whitespaceBreak: true,
    },
    (err, data) => {
      if (err) {
        console.info("Something went wrong...");
        console.dir(err);
      }
      console.info(data);
    }
  );
  console.info(`Server running in port ${APP_PORT} by Muhammad Asnur Ramdani`);
});

/**
 * @description Set Another Middleware
 */
app.use(express.json());

/**
 * @description Set Morgan Middleware and Logger
 */

const logDirectory = __dirname + "/logs";
const logFileName = "access.log";
const logFilePath = logDirectory + "/" + logFileName;
// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logFilePath);
}
const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });
const formatLog =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use(morgan(formatLog, { stream: accessLogStream }));

/**
 * @description Swagger UI
 */
swagger(app);
swaggerJson(app);

/**
 * @description Set Database Connection
 */
const db = connection;

db.authenticate().then(() => {
  console.info("Database connected");
});

/**
 * @description Set Repository
 */
const statusRepository = new StatusRepositoryImpl(db);
const patientsRepository = new PatientsRepositoryImpl(db);
const userRepository = new UserRepositoryImpl(db);

/**
 * @description Set Use Cases
 */
const statusUseCases = new StatusUseCaseImpl(statusRepository);
const patientsUseCases = new PatientsUseCasesImpl(
  patientsRepository,
  statusRepository
);
const userUseCases = new UserUseCaseImpl(userRepository);
/**
 * Set Controller
 */
const statusController = new StatusController(statusUseCases);
const patientsController = new PatientsController(patientsUseCases);
const userController = new UserController(userUseCases);
const authController = new AuthController(userUseCases);

/**
 * @description Set Router
 */
const routing = router(
  express.Router(),
  patientsController,
  statusController,
  userController,
  authController
);

app.use("/api/v1", routing);
