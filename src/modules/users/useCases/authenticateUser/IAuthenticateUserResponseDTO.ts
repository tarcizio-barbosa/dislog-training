import { User } from "@prisma/client";

export interface IAuthenticateUserResponseDTO {
  userToken: string;
  user: Pick<User, "id" | "userName" | "userEmail">;
}
