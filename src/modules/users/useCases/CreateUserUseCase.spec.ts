import { InMemoryUsersRepository } from "../repositories/inMemory/InMemoryUsersRepository";
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

    console.log(newUser);

    expect(newUser).toHaveProperty("id");
  });
});
