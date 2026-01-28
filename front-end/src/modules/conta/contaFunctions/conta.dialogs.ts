import { DOM } from "../../../shared/dom.js";

export function fecharDialog() {
  DOM.body!.style.setProperty("--display_after_body", "none");
  DOM.dialog!.style.display = "none";
  DOM.loguinBtn!.setAttribute("href", "loguin.html");
  DOM.deleteBtn!.disabled = false;
  DOM.fecharDialogBtn!.removeEventListener("click", fecharDialog);
}

export function abrirConfirmDialog() {
  DOM.confirmDialog!.style.display = "block";
  DOM.body!.style.setProperty("--display_after_body", "flex");
  DOM.loguinBtn!.removeAttribute("href");
  DOM.deleteBtn!.disabled = true;
}

export function fecharConfirmDialog() {
  DOM.confirmDialog!.style.display = "none";
  DOM.body!.style.setProperty("--display_after_body", "none");
  DOM.loguinBtn!.setAttribute("href", "loguin.html");
  DOM.deleteBtn!.disabled = false;
}
