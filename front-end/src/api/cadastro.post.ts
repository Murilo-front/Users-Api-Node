import { Usuario } from "../shared/shared.js";
import {
  cadastroFeito,
  userIndisponivel,
} from "../modules/cadastro/user.cadastro.js";

export async function cadastroPost(
  nomeValor: string,
  senhaValor: string,
  emailValor: string
) {
  try {
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeValor,
        senha: senhaValor,
        email: emailValor,
      }),
    });
    if (!res.ok) {
      const erro = await res.json();
      userIndisponivel(erro.message);
      throw new Error(erro.message);
    }

    // Formatação DOM
    cadastroFeito();

    const cadastroInfo: Usuario = await res.json();
    return cadastroInfo;
  } catch (erro: any) {
    console.log("Erro ao realizar cadastro");
    return null;
  }
}
