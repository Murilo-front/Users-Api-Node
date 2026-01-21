import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {
  id!: number;
  nome!: string;
  senha!: string;
  email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "usuarios",
  },
);
