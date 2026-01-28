import { DOM } from "./dom.js";

export interface Usuario {
  id: number;
  nome: string;
  senha: string;
  email?: string;
}

// Cria event listner de input para inpedir que o usuário coloque espaço em qualquer input
export function removeEspaco() {
  DOM.inputs?.forEach((input) => {
    input.addEventListener("input", (e) => {
      let valorDigitado = (e.target as HTMLInputElement).value;
      let achaEspaco = valorDigitado.indexOf(" ");
      if (achaEspaco >= 0) {
        input.value = valorDigitado.replace(" ", "");
      }
    });
  });
}
