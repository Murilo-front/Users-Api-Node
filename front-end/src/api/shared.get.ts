import { Usuario } from "../shared/shared.js";

// Recupera todo o array de usuarios
export async function getSavedData() {
  try {
    const res = await fetch(`/users`);

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.message);
    }

    let usuarios: Usuario[] = await res.json();
    return usuarios;
  } catch (erro: any) {
    console.log("Erro ao recuperar os usuarios", erro.message);
    return null;
  }
}

export async function getUsuario() {
  try {
    const res = await fetch(`/users/userLogin`);

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.message);
    }

    let userLogin: Usuario = await res.json();
    return userLogin;
  } catch (erro: any) {
    console.log("Erro ao recuperar o usuario logado", erro.message);
    return null;
  }
}
