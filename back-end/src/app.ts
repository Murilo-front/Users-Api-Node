import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { errorMiddleware } from "./erros/errorMiddleware";
import { sequelize } from "./database/db";
import SQLiteStore from "connect-sqlite3";
const session = require("express-session");

const app = express();

app.use(cors());

app.use(express.json());

// Cria conexão da session com o SQLite
const StoreInitiator = SQLiteStore(session);

// Inicializa db que amazena informações da session
const storeSession = new StoreInitiator({
  db: "sessions.db",
  table: "session",
  dir: "./data",
});

app.use(
  session({
    secret: "node_ts_users",
    storeSession,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  }),
);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", userRoutes);

app.use(errorMiddleware);

sequelize.sync().then(() => {
  console.log("DB conectado");
  app.listen(3000, () => console.log("server ON"));
});
