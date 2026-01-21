import { raw } from "express";
import { User } from "../models/user.models";

class UserWriteService {
  async create(data: {
    id: number;
    nome: string;
    senha: string;
    email?: string;
  }) {
    return await User.create(data);
  }

  async update(id: number, data: any) {
    const user = (await User.update(data, { where: { id } }))
      ? await User.findOne({ where: { id }, raw: true })
      : null;
    return user;
    // data = {"key of Usuario": "valor"}
  }

  async delete(id: number) {
    return await User.destroy({ where: { id } });
  }
}

export const userWriteService = new UserWriteService();
