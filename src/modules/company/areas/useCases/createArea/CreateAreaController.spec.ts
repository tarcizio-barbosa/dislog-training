// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app } from "../../../../../shared/infra/http/app";
import prismaClient from "../../../../../shared/infra/prisma/prismaClient";
import { ICreateUserDTO } from "../../../../users/useCases/createUser/ICreateUserDTO";

describe("Create Area", () => {
  beforeEach(async () => {
    await prismaClient.$connect();
  });

  afterEach(async () => {
    // const deleteActivities = prismaClient.activity.deleteMany();
    const deleteAreas = prismaClient.area.deleteMany();
    const deletePilars = prismaClient.pilar.deleteMany();
    const deleteUsers = prismaClient.user.deleteMany();

    await prismaClient.$transaction([
      // deleteActivities,
      deleteAreas,
      deletePilars,
      deleteUsers,
    ]);

    await prismaClient.$disconnect();
  });

  it("Should be able to create a new Area", async () => {
    const newUser: ICreateUserDTO = {
      userName: "Tarcizio",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    };

    await request(app).post("/users").send(newUser);

    const newSession = await request(app).post("/sessions").send({
      userEmail: newUser.userEmail,
      userPassword: newUser.userPassword,
    });

    const { userToken } = newSession.body;

    const newPilar = await request(app)
      .post("/pilars")
      .send({
        pilarName: "Qualidade",
        pilarManager: "Jakeline Silva",
      })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    const { id: pilarId } = newPilar.body;

    const newArea = await request(app)
      .post("/areas")
      .send({
        areaName: "Atendimento",
        pilarId,
      })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(newArea.status).toBe(201);
  });
});
