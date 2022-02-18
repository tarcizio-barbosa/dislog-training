import { Prisma, User } from "@prisma/client";

import { ICreateUserDTO } from "../useCases/ICreateUserDTO";

const userCreatedData = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    userName: true,
    userEmail: true,
  },
});

export type UserCreatedData = Prisma.UserGetPayload<typeof userCreatedData>;

export interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<UserCreatedData>;
  getUserByEmail(userEmail: string): Promise<User | null>;
}
