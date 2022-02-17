import { User } from "@prisma/client";

import { ICreateUserDTO } from "../useCases/ICreateUserDTO";

export interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  getUserByEmail(userEmail: string): Promise<User | null>;
}
