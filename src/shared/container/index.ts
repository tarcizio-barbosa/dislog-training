import { container, delay } from "tsyringe";

import { ActivitiesRepository } from "../../modules/company/activities/repositories/ActivitiesRepository";
import { IActivitiesRepository } from "../../modules/company/activities/repositories/IActivitiesRepository";
import { AreasRepository } from "../../modules/company/areas/repositories/AreasRepository";
import { IAreasRepository } from "../../modules/company/areas/repositories/IAreasRepository";
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

container.registerSingleton<IAreasRepository>(
  "AreasRepository",
  AreasRepository
);

container.registerSingleton<IActivitiesRepository>(
  "ActivitiesRepository",
  ActivitiesRepository
);
