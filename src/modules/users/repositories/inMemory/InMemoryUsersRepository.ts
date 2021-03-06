import { User } from "@prisma/client";

import { UserEntity } from "../../entities/UserEntity";
import { ICreateUserDTO } from "../../useCases/createUser/ICreateUserDTO";
import { IUsersRepository, UserCreatedData } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: UserEntity[] = [];

  async createUser({
    userName,
    userEmail,
    userPassword,
  }: ICreateUserDTO): Promise<UserCreatedData> {
    const newUser = new UserEntity();

    Object.assign(newUser, {
      userName,
      userEmail,
      userPassword,
    });

    this.users.push(newUser);

    return newUser;
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.users.find((user) => user.userEmail === userEmail);
  }
}
