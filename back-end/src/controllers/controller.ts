import { userDisponivel, idAleatorio, idUser } from "./controller.cadastro";
import { AppError } from "../erros/AppError";
import { salvarUsuarios, usuarios } from "../database/database";

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
    private email?: string
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
  emailValor: string
) {
  let user = new NewUser(nomeValor, senhaValor, emailValor);
  let userInfo: Usuario = user.getUser;
  let userIdInfo: number = user.getId;

  let cadastroNovo: boolean = true;
  let igualdade: string = "";

  if (usuarios.length) {
    // Manda informações do objeto para função que confirma se o cadastro já existe
    [cadastroNovo, igualdade] = userDisponivel(userInfo);
  }
  if (cadastroNovo) {
    usuarios.push(userInfo);
    ids.push(userIdInfo);
    console.log(usuarios);
    salvarUsuarios();
    await idAleatorio();
    return userInfo;
  }
  throw new AppError(igualdade, 409);
}

// Method GET
export async function procuraUser(userInfo: { nome: string; senha: string }) {
  let divergencia: string = "";
  let usuarioLogado: Usuario = { id: 0, nome: "", senha: "" };

  if (usuarios.length) {
    usuarios.forEach((usuario: Usuario) => {
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
  indexUsuario = usuarios.findIndex((usuario) => usuario.id === id);
  if (indexUsuario < 0) {
    throw new AppError("Usuário não encontrado", 404);
  }
  usuarios.splice(indexUsuario, 1);
  salvarUsuarios();
  return;
}

// Method PATCH
export function atualizaConta(
  id: number,
  nameInput: keyof Usuario,
  infoAtualizada: string
) {
  indexUsuario = usuarios.findIndex((usuario) => usuario.id === id);
  if (indexUsuario < 0) {
    throw new AppError("Usuário não encontrado", 404);
  }
  // Atauliza no array as informações do usuario
  (usuarios[indexUsuario]![nameInput] as string) = infoAtualizada;
  salvarUsuarios();
  return usuarios[indexUsuario];
}

// Method GET
export async function recuperaUsers() {
  if (!usuarios.length) {
    throw new AppError("Nenhum usuário cadastro", 204);
  }
  return usuarios;
}

// Method GET
export async function recuperaUserLogin(usuarioId: number) {
  if (usuarios.length) {
    indexUsuario = usuarios.findIndex((usuario) => usuario.id === usuarioId);
    if (indexUsuario < 0) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return usuarios[indexUsuario];
  }
  throw new AppError("Nenhum usuário cadastro", 204);
}
