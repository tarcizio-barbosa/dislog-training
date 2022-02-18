import "reflect-metadata";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import {
  IUsersRepository,
  UserCreatedData,
} from "../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { ICreateUserDTO } from "./ICreateUserDTO";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userName,
    userEmail,
    userPassword,
  }: ICreateUserDTO): Promise<UserCreatedData> {
    const userAlreadyExists = await this.usersRepository.getUserByEmail(
      userEmail
    );

    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHashed = await hash(userPassword, 8);

    const newUser = await this.usersRepository.createUser({
      userName,
      userEmail,
      userPassword: passwordHashed,
    });

    return newUser;
  }
}
