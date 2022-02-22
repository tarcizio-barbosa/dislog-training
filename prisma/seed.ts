import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  const userDefault = await prismaClient.user.upsert({
    where: { userEmail: "dislog@dislog.com.br" },
    update: {},
    create: {
      userEmail: "dislog@dislog.com.br",
      userName: "Dislog Default",
      userPassword: "12345",
    },
  });

  const pilar = await prismaClient.pilar.upsert({
    where: { pilarName: "Qualidade" },
    update: {},
    create: {
      pilarName: "Qualidade",
      pilarManager: "Jakeline Silva",
      userId: userDefault.id,
    },
  });

  const area = await prismaClient.area.upsert({
    where: { areaName: "Atendimento" },
    update: {},
    create: {
      areaName: "Atendimento",
      pilarId: pilar.id,
      userId: userDefault.id,
    },
  });

  const activity = await prismaClient.activity.upsert({
    where: { activityName: "Auxiliar de Qualidade - Auditoria de Pedidos" },
    update: {},
    create: {
      activityName: "Auxiliar de Qualidade - Auditoria de Pedidos",
      areaId: area.id,
      userId: userDefault.id,
    },
  });

  console.log({ userDefault, pilar, area, activity });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
