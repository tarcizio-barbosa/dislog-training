import { InMemoryUsersRepository } from "../repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to create a new User", async () => {
    const newUser: ICreateUserDTO = {
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@dislog.com.br",
      userPassword: "k9sonwow11",
    };

    await createUserUseCase.execute(newUser);

    console.log(newUser);

    expect(newUser).toHaveProperty("id");
  });
});
