import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { errorMiddleware } from "./erros/errorMiddleware";
import { sequelize } from "./database/db";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", userRoutes);

app.use(errorMiddleware);

sequelize.sync().then(() => {
  console.log("DB conectado");
  app.listen(3000, () => console.log("server ON"));
});
