import { DOM } from "../../shared/dom.js";
import { inputSelected } from "./conta.js";
import {
  formataInputs,
  formataDefault,
} from "./contaFunctions/conta.inputs.js";
import {
  alteracaoConfirmada,
  alteracaoCancelada,
} from "./contaFunctions/conta.alteracoes.js";
import { abrirConfirmDialog } from "./contaFunctions/conta.dialogs.js";

export function eventoChange(): void {
  let nameInput = inputSelected!.getAttribute("name");
  formataInputs(nameInput!);
  formataDefault(inputSelected!);
}

export function eventoBlur(): void {
  formataDefault(inputSelected!);
}

export function eventoConfirm(): void {
  // Remove demais ouvintes para evitar que sejam executados
  inputSelected!.removeEventListener("change", eventoChange);
  inputSelected!.removeEventListener("blur", eventoBlur);
  // Mostra caixa de dialogo e eventlistner para ambas opições
  abrirConfirmDialog();
  DOM.confirmButton!.focus();
  DOM.confirmButton!.addEventListener("click", alteracaoConfirmada);
  DOM.cancelButton!.addEventListener("click", alteracaoCancelada);
}

// Caso o usuario clique no enter dispara evento de moseDown
export function eventoEnter(event: any): void {
  let editIcon = inputSelected!.nextElementSibling;

  if (editIcon!.nodeName == "SPAN") {
    editIcon = editIcon!.firstElementChild;
  }
  let confirmIcon = editIcon!.nextElementSibling;
  if (event.key == "Enter") {
    event.preventDefault();
    const evt = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    confirmIcon!.dispatchEvent(evt);
  }
}
