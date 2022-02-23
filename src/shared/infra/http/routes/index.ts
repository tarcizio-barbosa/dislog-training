import { Router } from "express";

import { activitiesRoutes } from "./activities.routes";
import { areasRoutes } from "./areas.routes";
import { documentsRoutes } from "./documents.routes";
import { employeesRoutes } from "./employees.routes";
import { pilarsRoutes } from "./pilars.routes";
import { sessionsRoutes } from "./sessions.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/pilars", pilarsRoutes);
router.use("/areas", areasRoutes);
router.use("/activities", activitiesRoutes);
router.use("/employees", employeesRoutes);
router.use("/documents", documentsRoutes);

export { router };
