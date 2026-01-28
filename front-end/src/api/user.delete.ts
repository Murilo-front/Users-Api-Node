export async function userDelete() {
  try {
    const res = await fetch(`/users/`, {
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
