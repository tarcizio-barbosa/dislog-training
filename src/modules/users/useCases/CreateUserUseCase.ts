import { hash } from "bcryptjs";

import { IUsersRepository } from "../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { ICreateUserDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userName, userEmail, userPassword }: ICreateUserDTO) {
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
