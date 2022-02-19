// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app } from "../../../../shared/infra/http/app";
import prismaClient from "../../../../shared/infra/prisma/prismaClient";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

describe("Authenticate User", () => {
  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterAll(async () => {
    const deleteUsers = prismaClient.user.deleteMany();

    await prismaClient.$transaction([deleteUsers]);

    await prismaClient.$disconnect();
  });

  it("Should be able to authenticate a User", async () => {
    const newUser: ICreateUserDTO = {
      userName: "Tarcizio Barbosa",
      userEmail: "tarcizio@io.com.br",
      userPassword: "k9sonwow11",
    };

    await request(app).post("/users").send(newUser);

    const userAuthenticated = await request(app).post("/sessions").send({
      userEmail: newUser.userEmail,
      userPassword: newUser.userPassword,
    });

    expect(userAuthenticated.body).toHaveProperty("userToken");
  });
});
