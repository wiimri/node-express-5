import { Router } from "express";
import { getJoyas, getJoyasByFiltros } from "../controllers/joyas.controller.js";

const router = Router();

router.get("/joyas", getJoyas);

router.get("/joyas/filtros", getJoyasByFiltros);

export default router;
