import { randomUUID } from "crypto";

import { InMemoryUsersRepository } from "../../../../users/repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryAreasRepository } from "../../../areas/repositories/inMemory/InMemoryAreasRepository";
import { CreateAreaUseCase } from "../../../areas/useCases/createArea/CreateAreaUseCase";
import { InMemoryPilarsRepository } from "../../../pilars/repositories/inMemory/InMemoryPilarsRepository";
import { CreatePilarUseCase } from "../../../pilars/useCases/createPilar/CreatePilarUserCase";
import { InMemoryActivitiesRepository } from "../../repositories/inMemory/InMemoryActivitiesRepository";
import { CreateActivityError } from "./CreateActivityError";
import { CreateActivityUseCase } from "./CreateActivityUseCase";
import { GetAreaError } from "./GetAreaError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryPilarsRepository: InMemoryPilarsRepository;
let inMemoryAreasRepository: InMemoryAreasRepository;
let inMemoryActivitiesRepository: InMemoryActivitiesRepository;

let createUserUseCase: CreateUserUseCase;
let createPilarUseCase: CreatePilarUseCase;
let createAreaUseCase: CreateAreaUseCase;
let createActivityUseCase: CreateActivityUseCase;

describe("Create Activity", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryPilarsRepository = new InMemoryPilarsRepository();
    inMemoryAreasRepository = new InMemoryAreasRepository();
    inMemoryActivitiesRepository = new InMemoryActivitiesRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createPilarUseCase = new CreatePilarUseCase(inMemoryPilarsRepository);
    createAreaUseCase = new CreateAreaUseCase(
      inMemoryAreasRepository,
      inMemoryPilarsRepository
    );
    createActivityUseCase = new CreateActivityUseCase(
      inMemoryActivitiesRepository,
      inMemoryAreasRepository
    );
  });

  it("Should be able to create a new Activity", async () => {
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

    const newActivity = await createActivityUseCase.execute({
      activityName: "Auxiliar de Qualidade - Auditoria de Pedidos",
      areaId: newArea.id,
      userId: newUser.id,
    });

    expect(newActivity).toHaveProperty("id");
  });

  it("Should not be able to create a new Activity with the same name", async () => {
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

    await createActivityUseCase.execute({
      activityName: "Auxiliar de Qualidade - Auditoria de Pedidos",
      areaId: newArea.id,
      userId: newUser.id,
    });

    await expect(
      createActivityUseCase.execute({
        activityName: "Auxiliar de Qualidade - Auditoria de Pedidos",
        areaId: newArea.id,
        userId: newUser.id,
      })
    ).rejects.toEqual(new CreateActivityError());
  });

  it("Should not be able to create a new Activity if the area doesn't exist", async () => {
    const newUser = await createUserUseCase.execute({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    });

    await expect(
      createActivityUseCase.execute({
        activityName: "Auxiliar de Qualidade - Auditoria de Pedidos",
        areaId: randomUUID(),
        userId: newUser.id,
      })
    ).rejects.toEqual(new GetAreaError());
  });
});
