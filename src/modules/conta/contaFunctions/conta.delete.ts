import { DOM } from "../../../shared/dom.js";
import { abrirConfirmDialog, fecharConfirmDialog } from "./conta.dialogs.js";
import { userDelete } from "../../../api/user.delete.js";

// Função que abre opição para deletar conta do localStorege
export function deletaConta(): void {
  DOM.confirmMsg!.style.display = "none";
  DOM.deleteMsg!.style.display = "block";
  abrirConfirmDialog();
  DOM.confirmButton!.focus();
  DOM.confirmButton!.addEventListener("click", deletarConfirmado);
  DOM.cancelButton!.addEventListener("click", deletarCancelado);
}

// Requisição assincrona pelo metodo delete
async function deletarConfirmado() {
  await userDelete();

  DOM.confirmButton!.removeEventListener("click", deletarConfirmado);
  DOM.cancelButton!.removeEventListener("click", deletarCancelado);
  window.location.href = "loguin.html";
}

function deletarCancelado(): void {
  fecharConfirmDialog();
  DOM.confirmMsg!.style.display = "block";
  DOM.deleteMsg!.style.display = "none";
  DOM.confirmButton!.removeEventListener("click", deletarConfirmado);
  DOM.cancelButton!.removeEventListener("click", deletarCancelado);
}
