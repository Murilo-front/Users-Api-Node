import "express-session";

// Acrescenta propriedade userId dentro do objeto SessionData da biblioteca
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}
