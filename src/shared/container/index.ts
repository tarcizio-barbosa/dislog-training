import { container } from "tsyringe";

import { ActivitiesRepository } from "../../modules/company/activities/repositories/ActivitiesRepository";
import { IActivitiesRepository } from "../../modules/company/activities/repositories/IActivitiesRepository";
import { AreasRepository } from "../../modules/company/areas/repositories/AreasRepository";
import { IAreasRepository } from "../../modules/company/areas/repositories/IAreasRepository";
import { EmployeesRepository } from "../../modules/company/employees/repositories/EmployeesRepository";
import { IEmployeesRepository } from "../../modules/company/employees/repositories/IEmployeesRepository";
import { IPilarsRepository } from "../../modules/company/pilars/repositories/IPilarsRepository";
import { PilarsRepository } from "../../modules/company/pilars/repositories/PilarsRepository";
import { DocumentsActivitiesRepository } from "../../modules/documents/repositories/DocumentsActivitiesRepository";
import { DocumentsRepository } from "../../modules/documents/repositories/DocumentsRepository";
import { IDocumentsActivitiesRepository } from "../../modules/documents/repositories/IDocumentsActivitiesRepository";
import { IDocumentsRepository } from "../../modules/documents/repositories/IDocumentsRepository";
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

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
);

container.registerSingleton<IDocumentsRepository>(
  "DocumentsRepository",
  DocumentsRepository
);

container.registerSingleton<IDocumentsActivitiesRepository>(
  "DocumentsActivitiesRepository",
  DocumentsActivitiesRepository
);
