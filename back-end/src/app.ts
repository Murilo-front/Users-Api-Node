import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { errorMiddleware } from "./erros/errorMiddleware";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", userRoutes);

app.use(errorMiddleware);

app.listen(3000, () => console.log("server ON"));
