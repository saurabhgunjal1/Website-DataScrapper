import { Router } from "express";
import {
  scrapController,
  getData,
  deleteData,
  getDataByid,
} from "../controllers/scrapController.js";

const scrapRouter = Router();

scrapRouter.post("/scrap", scrapController);
scrapRouter.get("/data", getData);
scrapRouter.post("/delete", deleteData);
scrapRouter.get("/data/:id", getDataByid);
export default scrapRouter;
