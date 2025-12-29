import { DOM } from "../../../shared/dom.js";
import { inputSelected } from "../conta.js";
import {
  formataInputs,
  formataDefault,
  novaSenhaVista,
} from "./conta.inputs.js";
import { fecharDialog, fecharConfirmDialog } from "./conta.dialogs.js";
import { disponibilidade, validaInfo } from "./conta.valida.js";
import { userPatch } from "../../../api/user.patch.js";

// Caso confirmado pela caixa de dialogo
export async function alteracaoConfirmada() {
  // Recupera valor digitado e identifica pelo atributo name o input
  let valorDigitado: string = inputSelected!.value;
  let nameInput = inputSelected!.getAttribute("name") as string;

  // Verifica se não existem usuarios cadastrados com a mesma informação alterada
  let disponivel: boolean = await disponibilidade(nameInput, valorDigitado);
  let valido: boolean = validaInfo(nameInput, valorDigitado);

  if (disponivel && valido) {
    formataDefault(inputSelected!);

    formataInputs(nameInput, valorDigitado);

    // Mostra caixa de dialogo de alteração confirmada
    DOM.confirmDialog!.style.display = "none";
    DOM.dialog!.style.display = "block";

    // Desabilita botões enquanto caixa tiver o dialog
    DOM.loguinBtn!.removeAttribute("href");
    DOM.deleteBtn!.disabled = true;
    DOM.fecharDialogBtn!.focus();
    DOM.fecharDialogBtn!.addEventListener("click", fecharDialog);

    if (nameInput === "senha") {
      // Se funão ativada, novaSenhaVista vai existir
      valorDigitado = novaSenhaVista;
    }

    // Requisição pelo metodo PATCH
    await userPatch(nameInput, valorDigitado);
  } else {
    alteracaoCancelada();
  }
}

// Caso cancelado a alteração pela caixa de dialogo
export async function alteracaoCancelada() {
  // Volta a formatação original
  let nameInput = inputSelected!.getAttribute("name");
  await formataInputs(nameInput!);
  formataDefault(inputSelected!);

  fecharConfirmDialog();
}
