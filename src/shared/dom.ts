export const DOM = {
  usuarioNome: document.getElementById("input-nome") as HTMLInputElement | null,
  usuarioSenha: document.getElementById(
    "input-senha"
  ) as HTMLInputElement | null,
  usuarioEmail: document.getElementById(
    "input-email"
  ) as HTMLInputElement | null,
  inputs: document.querySelectorAll<HTMLInputElement>("input"),
  fecharDialogBtn: document.getElementById(
    "fechar-dialog"
  ) as HTMLButtonElement | null,
  dialog: document.getElementById("dialog") as HTMLDialogElement | null,
  body: document.querySelector("body") as HTMLBodyElement | null,
  cadastroBtn: document.getElementById(
    "cadastroBtn"
  ) as HTMLButtonElement | null,
  loguinBtn: document.getElementById("loguinBtn") as HTMLButtonElement | null,
  cadastroForm: document.getElementById(
    "cadastroForm"
  ) as HTMLFormElement | null,
  loguinForm: document.getElementById("loguinForm") as HTMLFormElement | null,
  confirmButton: document.getElementById(
    "confirm-dialog-button"
  ) as HTMLButtonElement | null,
  cancelButton: document.getElementById(
    "cancel-dialog-button"
  ) as HTMLButtonElement | null,
  confirmDialog: document.getElementById(
    "confirm-dialog"
  ) as HTMLDialogElement | null,
  editIcons: document.querySelectorAll<HTMLImageElement>(
    "img[alt='pencil icon']"
  ),
  eyeIcon: document.querySelector(
    "img[alt='eye icon']"
  ) as HTMLImageElement | null,
  eyeBlockedIcon: document.querySelector(
    "img[alt='eye-blocked icon']"
  ) as HTMLImageElement | null,
  confirmMsg: document.getElementById(
    "confirm-dialog-msg"
  ) as HTMLParagraphElement | null,
  deleteMsg: document.getElementById(
    "delete-dialog-msg"
  ) as HTMLParagraphElement | null,
  deleteBtn: document.getElementById("deleteBtn") as HTMLButtonElement | null,
};
