import { InMemoryUsersRepository } from "../repositories/inMemory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to create a new User", async () => {
    const newUser = await createUserUseCase.execute({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    });

    expect(newUser).toHaveProperty("id");
  });

  it("Should not be able to create a new User with the same e-mail address", async () => {
    await createUserUseCase.execute({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    });

    await expect(
      createUserUseCase.execute({
        userName: "Tarcizio Barbosa",
        userEmail: "tarcizio@io.com.br",
        userPassword: "k9sonwow11",
      })
    ).rejects.toEqual(new CreateUserError());
  });
});
