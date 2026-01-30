import { userReadService } from "../database/services/userRead.service";
import { Usuario } from "./controller";
import bcrypt from "bcrypt";

export async function verificaLogin(userInfo: {
  nome: string;
  senha: string;
}): Promise<[string, number]> {
  let divergencia: string = "";
  let userId: number = 0;
  const usuariosdb: Usuario[] | null = await userReadService.getAll();
  if (usuariosdb.length) {
    for (const usuario of usuariosdb) {
      // Confere se pelo menos alguma das informações digitadas coincide com as armazenadas
      if (usuario.nome == userInfo.nome) {
        let compareSenha: boolean = await bcrypt.compare(
          userInfo.senha,
          usuario.senha,
        );

        switch (compareSenha) {
          case false:
            divergencia = "senha";
            break;
          case true:
            userId = usuario.id;
            divergencia = "nenhuma";
            break;
        }
      }
    }
    // Caso nennhuma informação coincida informa que a divergencia é o usuario
    if (divergencia === "") {
      divergencia = "usuario";
    }
  } else {
    // Caso não tenha informações de cadastro
    divergencia = "cadastro";
  }
  return [divergencia, userId];
}
