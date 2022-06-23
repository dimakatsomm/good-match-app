import express from "express";
import { Container } from "typedi";
import { MatchController } from "../controllers/match.controller";
import { validateCsvMiddleware, validateInputMiddleware } from "../middleware";

const router = express.Router();
const controller = Container.get(MatchController);

router.post("/match", validateInputMiddleware(), controller.matchNames);
router.post("/bulk-match", validateCsvMiddleware(), controller.bulkMatchNames);
router.post("/average-match", validateCsvMiddleware(), controller.averageMatchNames);

export default router;
