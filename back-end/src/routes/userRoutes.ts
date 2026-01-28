import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  criaUser,
  procuraUser,
  recuperaUserLogin,
  recuperaUsers,
  atualizaConta,
  deletarConta,
  Usuario,
} from "../controllers/controller";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { nome, senha, email } = req.body;
    const usuario = await criaUser(nome, senha, email);

    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = {
        nome: req.query.nome as string,
        senha: req.query.senha as string,
      };
      const usuarioLogado = await procuraUser(usuario);

      req.session.userId = usuarioLogado.id;

      res.status(201).json(usuarioLogado);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/userLogin", async (req, res, next) => {
  try {
    const id = req.session.userId;
    const usuarioLogado: Usuario | undefined = await recuperaUserLogin(id!);
    res.status(201).json(usuarioLogado);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const usuarios: Usuario[] | undefined = await recuperaUsers();
    res.status(201).json(usuarios);
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const id = req.session.userId;
    const [[nameInput, infoAtualizada]] = Object.entries(req.body) as [
      [keyof Usuario, Usuario[keyof Usuario]],
    ];
    const usuarioAtualizado: Usuario | null = await atualizaConta(
      id!,
      nameInput,
      infoAtualizada as string,
    );

    console.log(usuarioAtualizado);
    res.status(201).json(usuarioAtualizado);
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const id = req.session.userId;
    await deletarConta(id!);
    res.status(201).json("Usuario deletado");
  } catch (error) {
    next(error);
  }
});

export default router;
