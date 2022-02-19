import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  const tarcizio = await prismaClient.user.upsert({
    where: { userEmail: "tarcizio@dislog.com.br" },
    update: {},
    create: {
      userEmail: "tarcizio@dislog.com.br",
      userName: "Tarcizio Barbosa",
      userPassword: "k9sonwow11",
    },
  });

  const bruna = await prismaClient.user.upsert({
    where: { userEmail: "bruna@dislog.com.br" },
    update: {},
    create: {
      userEmail: "bruna@dislog.com.br",
      userName: "Bruna Silva",
      userPassword: "k9sonwow12",
    },
  });

  console.log({ tarcizio, bruna });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
