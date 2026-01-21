import { Usuario } from "./controller";
import { userReadService } from "../database/services/userRead.service";

export let idUser: number = Math.floor(Math.random() * 1000);

export async function idAleatorio() {
  const usersIds = await userReadService.getAllIds();
  const ids = usersIds.map((u: { id: number }) => u.id);

  do {
    idUser = Math.floor(Math.random() * 1000);
  } while (ids.includes(idUser));
  return true;
}

export async function userDisponivel(
  userInfo: Usuario,
): Promise<[boolean, string]> {
  let userDisponivel: boolean = true;
  let igualdade: string = "";

  // Confirma qual das informações já tem cadastro: email ou nome de usuario (com prioridade no email)
  // Atribui texto a variavel igualdade para indicar qual dos campos estão já existe

  const usuariosdb: Usuario[] | null = await userReadService.getAll();

  usuariosdb.forEach((usuario: Usuario) => {
    if (usuario.email == userInfo.email) {
      igualdade = "email";
      userDisponivel = false;
    } else if (usuario.nome == userInfo.nome && igualdade != "email") {
      igualdade = "nome";
      userDisponivel = false;
    }
  });
  return [userDisponivel, igualdade];
}
