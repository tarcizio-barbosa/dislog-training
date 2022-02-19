import { PrismaClient, User } from "@prisma/client";

import prismaClient from "../../../shared/infra/prisma/prismaClient";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";
import { IUsersRepository, UserCreatedData } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createUser({
    userName,
    userEmail,
    userPassword,
  }: ICreateUserDTO): Promise<UserCreatedData> {
    return this.repository.user.create({
      data: {
        userName,
        userEmail,
        userPassword,
      },
      select: {
        id: true,
        userName: true,
        userEmail: true,
      },
    });
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.repository.user.findUnique({
      where: {
        userEmail,
      },
    });
  }
}
