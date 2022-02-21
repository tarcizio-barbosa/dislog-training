import { Router } from "express";

import { areasRoutes } from "./areas.routes";
import { pilarsRoutes } from "./pilars.routes";
import { sessionsRoutes } from "./sessions.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/pilars", pilarsRoutes);
router.use("/areas", areasRoutes);

export { router };
