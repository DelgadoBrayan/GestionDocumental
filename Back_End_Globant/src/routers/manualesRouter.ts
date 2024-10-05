import express from 'express';
import { addManual, readManuales, actualizarPDF, borrarPDF } from '../controllers/manualController';
const router = express.Router()

router.post('/agregarManual', addManual);
router.get('/leerManuales', readManuales);
router.put('/actualizarManual/:id', actualizarPDF);
router.delete('/borrarManual/:id', borrarPDF)

export default router