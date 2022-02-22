import { randomUUID } from "crypto";

import { InMemoryUsersRepository } from "../../../../users/repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryPilarsRepository } from "../../../pilars/repositories/inMemory/InMemoryPilarsRepository";
import { CreatePilarUseCase } from "../../../pilars/useCases/createPilar/CreatePilarUserCase";
import { InMemoryAreasRepository } from "../../repositories/inMemory/InMemoryAreasRepository";
import { CreateAreaError } from "./CreateAreaError";
import { CreateAreaUseCase } from "./CreateAreaUseCase";
import { GetPilarError } from "./GetPilarError";

let inMemoryAreasRepository: InMemoryAreasRepository;
let createAreaUseCase: CreateAreaUseCase;
let inMemoryPilarsRepository: InMemoryPilarsRepository;
let createPilarUseCase: CreatePilarUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create Pilar", () => {
  beforeEach(() => {
    inMemoryAreasRepository = new InMemoryAreasRepository();
    inMemoryPilarsRepository = new InMemoryPilarsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createPilarUseCase = new CreatePilarUseCase(inMemoryPilarsRepository);
    createAreaUseCase = new CreateAreaUseCase(
      inMemoryAreasRepository,
      inMemoryPilarsRepository
    );
  });

  it("Should be able to create a new Area", async () => {
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

    const newArea = await createAreaUseCase.execute({
      areaName: "Atendimento",
      pilarId: newPilar.id,
      userId: newUser.id,
    });

    expect(newArea).toHaveProperty("id");
  });

  it("Should not be able to create a new Area with the same name", async () => {
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

    await createAreaUseCase.execute({
      areaName: "Atendimento",
      pilarId: newPilar.id,
      userId: newUser.id,
    });

    await expect(
      createAreaUseCase.execute({
        areaName: "Atendimento",
        pilarId: newPilar.id,
        userId: newUser.id,
      })
    ).rejects.toEqual(new CreateAreaError());
  });

  it("Should not be able to create a new Area if the pilar doesn't exist", async () => {
    const newUser = await createUserUseCase.execute({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    });

    await expect(
      createAreaUseCase.execute({
        areaName: "Atendimento",
        pilarId: randomUUID(),
        userId: newUser.id,
      })
    ).rejects.toEqual(new GetPilarError());
  });
});
