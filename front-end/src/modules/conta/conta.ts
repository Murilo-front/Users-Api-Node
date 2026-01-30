import { DOM } from "../../shared/dom.js";
import { removeEspaco } from "../../shared/shared.js";
import { getUsuario } from "../../api/shared.get.js";
import {
  eventoBlur,
  eventoConfirm,
  eventoEnter,
  eventoChange,
} from "./user.contaEvents.js";
import { deletaConta } from "./contaFunctions/conta.delete.js";

export let senhaEscondida: string = "";
export let senhaVista: string = "";
export let indexUsuario: number = 0;
export let inputSelected: HTMLInputElement | null;

removeEspaco();

// Preenche os campos com as informações de cadastro
getUsuario()
  .then((data) => {
    DOM.usuarioNome!.value = data!.nome as string;
    DOM.usuarioEmail!.value = data!.email as string;
    DOM.usuarioSenha!.value = "******";
  })
  .catch((error) => {
    console.log(error.message);
  });

DOM.editIcons.forEach((icon: HTMLImageElement): void => {
  icon.addEventListener("click", () => {
    // Seleciona os icones e inputs por parentesco
    let divPai: ParentNode | null = icon.parentNode;
    inputSelected = divPai!.querySelector("input");
    let confirmIcon = icon.nextElementSibling as HTMLImageElement;
    inputSelected!.disabled = false;
    inputSelected!.focus();
    icon.style.display = "none";
    confirmIcon.style.display = "block";

    let nameInput = inputSelected!.getAttribute("name") as string;
    if (nameInput == "senha") {
      DOM.usuarioSenha!.value = "";
    }

    // Três opições de evento:
    // Caso o usuário mude a informação mas clique fora do input
    // Caso o usuário não mude nada e só clique fora
    // Caso o usuário mude informação e confirme
    // Caso o ussuario clique no enter
    confirmIcon.addEventListener("mousedown", eventoConfirm, { capture: true });
    inputSelected!.addEventListener("keydown", eventoEnter);
    inputSelected!.addEventListener("change", eventoChange);
    inputSelected!.addEventListener("blur", eventoBlur);
  });
});

// Funcionalidade para o botão de deletar conta
DOM.deleteBtn!.addEventListener("click", deletaConta);
