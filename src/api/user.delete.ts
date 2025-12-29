import { getUsuarioId } from "../shared/shared.js";

export async function userDelete() {
  try {
    const id: number = getUsuarioId()!;
    const res = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.message);
    }

    return;
  } catch (erro: any) {
    console.log("Erro ao tentar excluir a conta ", erro.message);
    return null;
  }
}
