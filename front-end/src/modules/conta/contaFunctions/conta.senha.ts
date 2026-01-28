import { DOM } from "../../../shared/dom.js";
import { novaSenhaVista, novaSenhaEscondida } from "./conta.inputs.js";
import { senhaVista, senhaEscondida } from "../conta.js";

export function mostraSenha() {
  DOM.eyeIcon!.style.display = "none";
  DOM.eyeBlockedIcon!.style.display = "block";
  if (novaSenhaVista) {
    DOM.usuarioSenha!.value = novaSenhaVista;
  } else {
    DOM.usuarioSenha!.value = senhaVista;
  }

  DOM.eyeBlockedIcon!.addEventListener("click", escondeSenha);
}

export function escondeSenha() {
  DOM.eyeIcon!.style.display = "block";
  DOM.eyeBlockedIcon!.style.display = "none";

  if (novaSenhaEscondida) {
    DOM.usuarioSenha!.value = novaSenhaEscondida;
  } else {
    DOM.usuarioSenha!.value = senhaEscondida;
  }

  DOM.eyeBlockedIcon!.removeEventListener("click", escondeSenha);
}
