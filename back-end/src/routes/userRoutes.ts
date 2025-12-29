import express from "express";
import {
  criaUser,
  procuraUser,
  recuperaUserLogin,
  recuperaUsers,
  atualizaConta,
  deletarConta,
} from "../controllers/controller";
import { Usuario } from "../database/database";

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

router.get("/search", async (req, res, next) => {
  try {
    const usuario = {
      nome: req.query.nome as string,
      senha: req.query.senha as string,
    };
    const usuarioLogado = await procuraUser(usuario);
    console.log("usuario logado: ", usuarioLogado);

    res.status(201).json(usuarioLogado);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuarioLogado: Usuario | undefined = await recuperaUserLogin(
      parseInt(id)
    );
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

router.patch("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const [[nameInput, infoAtualizada]] = Object.entries(req.body) as [
      [keyof Usuario, Usuario[keyof Usuario]]
    ];
    const usuarioAtualizado: Usuario | undefined = atualizaConta(
      parseInt(id),
      nameInput,
      infoAtualizada as string
    );

    console.log(usuarioAtualizado);
    res.status(201).json(usuarioAtualizado);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await deletarConta(parseInt(id));
    res.status(201).json("Usuario deletado");
  } catch (error) {
    next(error);
  }
});

export default router;
