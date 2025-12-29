import { getSavedData } from "../../../api/shared.get";
import { Usuario } from "../../../shared/shared";

// Verifica disponibilidade da informação a ser alterada
export async function disponibilidade(
  nameInput: string,
  valorDigitado: string
) {
  let disponivel: boolean = true;
  const usuarios: Usuario[] | null = await getSavedData();
  usuarios!.forEach((usuario) => {
    if (nameInput == "email" && usuario.email == valorDigitado) {
      disponivel = false;
    } else if (nameInput == "nome" && usuario.nome == valorDigitado) {
      disponivel = false;
    }
  });

  if (!disponivel) {
    switch (nameInput) {
      case "email":
        alert("Já existe um usuário com esse email!");
        break;
      case "nome":
        alert("Já existe um usuário com esse nome");
        break;
    }
  }
  return disponivel;
}

// Verificação artificial do campo de email e senha
export function validaInfo(nameInput: string, valorDigitado: string): boolean {
  let formatoCorreto: boolean = true;
  switch (nameInput) {
    case "nome":
      if (valorDigitado.trim().length == 0) {
        formatoCorreto = false;
        alert("O nome deve conter ao menos um carácter");
      }
      break;
    case "email":
      let emailValido = valorDigitado.indexOf("@");
      if (emailValido < 0) {
        formatoCorreto = false;
        alert("O email digitado não é valido");
      }
      break;
    case "senha":
      if (valorDigitado.length < 6) {
        formatoCorreto = false;
        alert("A senha deve conter no mínimo 6 caracteres");
      }
  }
  return formatoCorreto;
}
