import { DOM } from "../../shared/dom.js";
import { removeEspaco } from "../../shared/shared.js";
import { cadastroPost } from "../../api/cadastro.post.js";

removeEspaco();

DOM.cadastroForm!.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nomeValor: string = DOM.usuarioNome!.value;
  let emailValor: string = DOM.usuarioEmail!.value;
  let senhaValor: string = DOM.usuarioSenha!.value;

  // Requisição pelo metodo POST
  await cadastroPost(nomeValor, senhaValor, emailValor);

  DOM.usuarioNome!.value = "";
  DOM.usuarioEmail!.value = "";
  DOM.usuarioSenha!.value = "";
  DOM.usuarioNome!.focus();
});
