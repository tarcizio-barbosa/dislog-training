import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userName, userEmail, userPassword } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const newUser = await createUserUseCase.execute({
      userName,
      userEmail,
      userPassword,
    });

    return response.status(201).json(newUser);
  }
}
