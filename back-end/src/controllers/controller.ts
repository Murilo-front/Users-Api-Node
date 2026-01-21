import { userDisponivel, idAleatorio, idUser } from "./controller.cadastro";
import { AppError } from "../erros/AppError";
import { userReadService } from "../database/services/userRead.service";
import { userWriteService } from "../database/services/userWrite.service";

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
    await userWriteService.create(userInfo);
    await idAleatorio();
    return userInfo;
  }
  throw new AppError(igualdade, 409);
}

// Method GET
export async function procuraUser(userInfo: { nome: string; senha: string }) {
  let divergencia: string = "";
  let usuarioLogado: Usuario = { id: 0, nome: "", senha: "" };

  const usuariosdb: Usuario[] | null = await userReadService.getAll();
  if (usuariosdb.length) {
    usuariosdb.forEach((usuario: Usuario) => {
      // Confere se pelo menos alguma das informações digitadas coincide com as armazenadas
      if (usuario.nome == userInfo.nome && usuario.senha != userInfo.senha) {
        divergencia = "senha";
      } else if (
        usuario.nome == userInfo.nome &&
        usuario.senha == userInfo.senha
      ) {
        divergencia = "nenhuma";
        usuarioLogado = usuario;
      }
    });
    // Caso nennhuma informação coincida informa que a divergencia é o usuario
    if (divergencia === "") {
      divergencia = "usuario";
    }
  } else {
    // Caso não tenha informações de cadastro
    divergencia = "cadastro";
  }

  // Condicional de retorno
  if (divergencia !== "nenhuma") {
    throw new AppError(divergencia, 401);
  } else {
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
  const usuarios = await userReadService.getAll();
  if (usuarios.length) {
    const user = await userReadService.getById(usuarioId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return user;
  }
  throw new AppError("Nenhum usuário cadastro", 204);
}
