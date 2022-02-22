// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app } from "../../../../shared/infra/http/app";
import prismaClient from "../../../../shared/infra/prisma/prismaClient";

describe("Create User", () => {
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

  it("Should be able to create a new User", async () => {
    const response = await request(app).post("/users").send({
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@dislog.com.br",
      userPassword: "k9sonwow11",
    });

    expect(response.status).toBe(201);
  });
});
