import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userEmail, userPassword } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { user, userToken } = await authenticateUserUseCase.execute({
      userEmail,
      userPassword,
    });

    return response.json({ user, userToken });
  }
}
