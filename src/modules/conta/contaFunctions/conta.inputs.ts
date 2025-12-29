import { DOM } from "../../../shared/dom.js";
import {
  eventoConfirm,
  eventoChange,
  eventoBlur,
  eventoEnter,
} from "../user.contaEvents.js";
import { getUsuario } from "../../../api/shared.get.js";
import { getUsuarioId } from "../../../shared/shared.js";
import { alteracaoConfirmada, alteracaoCancelada } from "./conta.alteracoes.js";

export let novaSenhaVista: string;
export let novaSenhaEscondida: string;

export async function formataInputs(nameInput: string, valorDigitado?: string) {
  // Caso confirmado alteração, atualiza inputs
  if (valorDigitado) {
    switch (nameInput) {
      case "nome":
        DOM.usuarioNome!.value = valorDigitado;
        break;
      case "email":
        DOM.usuarioEmail!.value = valorDigitado;
        break;
      case "senha":
        novaSenhaVista = valorDigitado;
        // Esconde a senha dependendo da sitação do icone de olho
        if (DOM.eyeIcon!.style.display != "none") {
          novaSenhaEscondida = "";
          for (let i = 0; i < valorDigitado.length; i++) {
            novaSenhaEscondida += "*";
          }
          DOM.usuarioSenha!.value = novaSenhaEscondida;
        } else {
          DOM.usuarioSenha!.value = valorDigitado;
        }
        break;
    }
  } else {
    const data = await getUsuario(getUsuarioId()!);

    // Caso valor alterado mas não confirmado a alteração retorna valores originais
    switch (nameInput) {
      case "nome":
        DOM.usuarioNome!.value = data!.nome as string;
        break;
      case "email":
        DOM.usuarioEmail!.value = data!.email as string;
        break;
      case "senha":
        if (DOM.eyeIcon!.style.display != "none") {
          novaSenhaEscondida = "";
          for (let i = 0; i < data!.senha.length; i++) {
            novaSenhaEscondida += "*";
          }
          DOM.usuarioSenha!.value = novaSenhaEscondida;
        } else {
          DOM.usuarioSenha!.value = data!.senha;
        }
        break;
    }
  }
}

// Volta a formatação original
export function formataDefault(input: HTMLInputElement): void {
  let editIcon = input.nextElementSibling as HTMLImageElement;
  if (editIcon!.nodeName == "SPAN") {
    editIcon! = editIcon!.firstElementChild as HTMLImageElement;
  }

  let confirmIcon = editIcon!.nextElementSibling as HTMLImageElement;
  editIcon!.style.display = "block";
  confirmIcon!.style.display = "none";
  input.disabled = true;

  confirmIcon!.removeEventListener("mousedown", eventoConfirm);
  DOM.confirmButton!.removeEventListener("click", alteracaoConfirmada);
  DOM.cancelButton!.addEventListener("click", alteracaoCancelada);
  input.removeEventListener("change", eventoChange);
  input.removeEventListener("blur", eventoBlur);
  input.removeEventListener("keydown", eventoEnter);
}
