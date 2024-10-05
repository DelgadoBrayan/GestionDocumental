import express from "express";
import { agregarReporte, leerReporte, actualizarReporte, borrarReporte } from "../controllers/reporteController";

const router = express.Router();

router.post('/agregarReporte', agregarReporte)
router.get ('/leerReportes', leerReporte)
router.put('/actualizarReporte/:id', actualizarReporte)
router.delete('/borrarReporte/:id', borrarReporte)

export default router;
