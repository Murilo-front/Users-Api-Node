import { raw } from "express";
import { User } from "../models/user.models";

class UserReadService {
  async getAll() {
    return await User.findAll({ raw: true });
  }

  async getAllIds() {
    return await User.findAll({
      attributes: ["id"],
    });
  }

  async getById(id: number) {
    return await User.findByPk(id, { raw: true });
  }
}

export const userReadService = new UserReadService();
