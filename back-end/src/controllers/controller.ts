import { userDisponivel, idAleatorio, idUser } from "./controller.cadastro";
import { AppError } from "../erros/AppError";
import { userReadService } from "../database/services/userRead.service";
import { userWriteService } from "../database/services/userWrite.service";
import { verificaLogin } from "./controller.login";
import bcrypt from "bcrypt";

export interface Usuario {
  id: number;
  nome: string;
  senha: string;
  email?: string;
}

export let ids: number[] = [];
export let indexUsuario: number;

export class NewUser {
  private _id: number = idUser;
  constructor(
    private nome: string,
    private senha: string,
    private email?: string,
  ) {}

  get getId() {
    return this._id;
  }

  get getUser() {
    return this.email
      ? {
          id: this._id,
          nome: this.nome,
          senha: this.senha,
          email: this.email,
        }
      : {
          id: this._id,
          nome: this.nome,
          senha: this.senha,
        };
  }
}

// Method POST
export async function criaUser(
  nomeValor: string,
  senhaValor: string,
  emailValor: string,
) {
  let user = new NewUser(nomeValor, senhaValor, emailValor);
  let userInfo: Usuario = user.getUser;

  let cadastroNovo: boolean = true;
  let igualdade: string = "";

  const usuariosdb: Usuario[] | null = await userReadService.getAll();
  if (usuariosdb.length) {
    // Manda informações do objeto para função que confirma se o cadastro já existe
    [cadastroNovo, igualdade] = await userDisponivel(userInfo);
  }
  if (cadastroNovo) {
    let hashSenha: string = await bcrypt.hash(userInfo.senha, 10);
    userInfo.senha = hashSenha;
    await userWriteService.create(userInfo);
    await idAleatorio();
    return userInfo;
  }
  throw new AppError(igualdade, 409);
}

// Method GET
export async function procuraUser(userInfo: { nome: string; senha: string }) {
  const [divergencia, userId] = await verificaLogin(userInfo);
  // Condicional de retorno
  if (divergencia !== "nenhuma") {
    throw new AppError(divergencia, 401);
  } else {
    let usuarioLogado: Usuario = {
      id: userId,
      nome: userInfo.nome,
      senha: userInfo.senha,
    };
    return usuarioLogado;
  }
}

// Method DELETE
export async function deletarConta(id: number) {
  let deleteuser = await userWriteService.delete(id);
  if (deleteuser <= 0) {
    throw new AppError("Usuário não encontrado", 404);
  }
  return;
}

// Method PATCH
export async function atualizaConta(
  id: number,
  nameInput: keyof Usuario,
  infoAtualizada: string,
) {
  const dataUpdate = { [nameInput]: infoAtualizada };
  if (nameInput == "senha") {
    let newHashSenha: string = await bcrypt.hash(infoAtualizada, 10);
    dataUpdate[nameInput] = newHashSenha;
  }
  const userUpdate = await userWriteService.update(id, dataUpdate);
  if (!userUpdate) {
    throw new AppError("Usuário não encontrado", 404);
  }
  return userUpdate;
}

// Method GET
export async function recuperaUsers() {
  const usuarios = await userReadService.getAll();
  if (!usuarios.length) {
    throw new AppError("Nenhum usuário cadastro", 204);
  }
  return usuarios;
}

// Method GET
export async function recuperaUserLogin(usuarioId: number) {
  const user = await userReadService.getById(usuarioId);
  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }
  return user;
}
