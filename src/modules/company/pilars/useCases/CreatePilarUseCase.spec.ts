import { InMemoryUsersRepository } from "../../../users/repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryPilarsRepository } from "../repositories/inMemory/InMemoryPilarsRepository";
import { CreatePilarError } from "./CreatePilarError";
import { CreatePilarUseCase } from "./CreatePilarUserCase";

let inMemoryPilarsRepository: InMemoryPilarsRepository;
let createPilarUseCase: CreatePilarUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create Pilar", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    inMemoryPilarsRepository = new InMemoryPilarsRepository();
    createPilarUseCase = new CreatePilarUseCase(inMemoryPilarsRepository);
  });

  it("Should be able to create a new Pilar", async () => {
    const newUser = await createUserUseCase.execute({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    });

    const newPilar = await createPilarUseCase.execute({
      pilarName: "Qualidade",
      pilarManager: "Jakeline Silva",
      userId: newUser.id,
    });

    expect(newPilar).toHaveProperty("id");
  });

  it("Should not be able to create a new Pilar with the same name", async () => {
    const newUser = await createUserUseCase.execute({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    });

    await createPilarUseCase.execute({
      pilarName: "Qualidade",
      pilarManager: "Jakeline Silva",
      userId: newUser.id,
    });

    await expect(
      createPilarUseCase.execute({
        pilarName: "Qualidade",
        pilarManager: "Jakeline Silva",
        userId: newUser.id,
      })
    ).rejects.toEqual(new CreatePilarError());
  });
});
