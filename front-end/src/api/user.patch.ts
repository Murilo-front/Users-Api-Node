import { Usuario } from "../shared/shared.js";

export async function userPatch(nameInput: string, infoAtualizada: string) {
  try {
    const res = await fetch(`/users/`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        [nameInput]: infoAtualizada,
      }),
    });

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.message);
    }

    const userAtualizado: Usuario = await res.json();
    return userAtualizado;
  } catch (erro: any) {
    console.log("Erro ao tentar atualizar cadastro ", erro.message);
    return null;
  }
}
