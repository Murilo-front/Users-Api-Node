import { DOM } from "../../shared/dom.js";

export async function cadastroFeito() {
  DOM.dialog!.style.display = "block";
  DOM.fecharDialogBtn!.focus();
  DOM.body!.style.setProperty("--display_after_body", "flex");
  // Desabilita o botões e links, assim como os inputs
  DOM.loguinBtn!.removeAttribute("href");
  DOM.cadastroBtn!.disabled = true;
  DOM.inputs.forEach((input) => {
    input.disabled = true;
  });

  // Cria event listner de click para o botão de fechar o dialog
  DOM.fecharDialogBtn!.addEventListener(
    "click",
    (): void => {
      // Remove todas as propriedades e formatações acrescentadas
      DOM.dialog!.style.display = "none";
      DOM.body!.style.removeProperty("--display_after_body");
      // Abilita novamente os botões e os inputs
      DOM.inputs!.forEach((input) => {
        input.disabled = false;
      });
      DOM.usuarioNome!.focus();
      DOM.loguinBtn!.setAttribute("href", "loguin.html");
      DOM.cadastroBtn!.disabled = false;
    },
    { once: true }
  );
  return null;
}

export function userIndisponivel(igualdade: string): void {
  if (igualdade) {
    switch (igualdade) {
      case "email":
        alert("Já existe um usuário com esse email!");
        break;
      case "nome":
        alert("Já existe um usuário com esse nome");
        break;
    }
  }
}
