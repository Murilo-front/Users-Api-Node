import { Usuario, ids } from "./controller";
import { usuarios } from "../database/database";
export let idUser: number = Math.floor(Math.random() * 1000);

export async function idAleatorio() {
  do {
    idUser = Math.floor(Math.random() * 1000);
  } while (ids.includes(idUser));
  return true;
}

export function userDisponivel(userInfo: Usuario): [boolean, string] {
  let userDisponivel: boolean = true;
  let igualdade: string = "";

  // Confirma qual das informações já tem cadastro: email ou nome de usuario (com prioridade no email)
  // Atribui texto a variavel igualdade para indicar qual dos campos estão já existe
  usuarios.forEach((usuario: Usuario) => {
    if (usuario.email == userInfo.email) {
      igualdade = "email";
      userDisponivel = false;
    } else if (usuario.nome == userInfo.nome && igualdade[0] != "email") {
      igualdade = "nome";
      userDisponivel = false;
    }
  });

  return [userDisponivel, igualdade];
}
