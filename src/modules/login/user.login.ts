import { DOM } from "../../shared/dom.js";

export function erroLoguin(divergencia: string): void {
  DOM.usuarioNome!.value = "";
  DOM.usuarioSenha!.value = "";
  DOM.usuarioNome!.focus();

  if (divergencia) {
    switch (divergencia) {
      case "senha":
        alert("Senha incorreta");
        break;
      case "usuario":
        alert("Usuário não cadastrado");
        break;
      case "cadastro":
        alert("Nenhum usuário cadastrado");
        break;
    }
  }
  return;
}
