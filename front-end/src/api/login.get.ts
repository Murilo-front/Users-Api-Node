import { Usuario } from "../shared/shared.js";
import { erroLoguin } from "../modules/login/user.login.js";

export async function loginGet(params: URLSearchParams) {
  try {
    const res = await fetch(`/users/search?${params.toString()}`);

    if (!res.ok) {
      const erro = await res.json();
      erroLoguin(erro.message);
      throw new Error(erro.message);
    }
    let usuario: Usuario = await res.json();
    return usuario;
  } catch (erro: any) {
    console.log("Erro ao realizar login");
    return null;
  }
}
