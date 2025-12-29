import { DOM } from "../../shared/dom.js";
import { Usuario, removeEspaco } from "../../shared/shared.js";
import { loginGet } from "../../api/login.get.js";

export class NewUser {
  constructor(private nome: string, private senha: string) {}

  get getUser() {
    return {
      nome: this.nome,
      senha: this.senha,
    };
  }
}

removeEspaco();

DOM.loguinForm!.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nomeValor: string = DOM.usuarioNome!.value;
  let senhaValor: string = DOM.usuarioSenha!.value;

  let userLoguin = new NewUser(nomeValor, senhaValor);
  let userInfoLoguin = userLoguin.getUser;

  // Converte em query string
  const params = new URLSearchParams({
    nome: userInfoLoguin.nome,
    senha: userInfoLoguin.senha,
  });

  // Requisição pelo metodo GET
  let usuario: Usuario | null = await loginGet(params);
  if (usuario) {
    window.location.href = "conta.html";
  }
});
