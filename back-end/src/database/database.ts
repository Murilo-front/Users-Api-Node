import fs from "fs";
import path from "path";

const caminhoArquivo = path.join(__dirname, "data", "usuarios.json");

export interface Usuario {
  id: number;
  nome: string;
  senha: string;
  email?: string;
}

// Array em memória
export let usuarios: Usuario[] = carregarUsuarios();

// Lê o JSON ao iniciar o servidor
function carregarUsuarios(): Usuario[] {
  try {
    const data = fs.readFileSync(caminhoArquivo, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Salva o array inteiro no JSON
export function salvarUsuarios() {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(usuarios, null, 2), "utf-8");
}
