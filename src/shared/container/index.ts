import { container } from "tsyringe";

import { IPilarsRepository } from "../../modules/company/pilars/repositories/IPilarsRepository";
import { PilarsRepository } from "../../modules/company/pilars/repositories/PilarsRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPilarsRepository>(
  "PilarsRepository",
  PilarsRepository
);
