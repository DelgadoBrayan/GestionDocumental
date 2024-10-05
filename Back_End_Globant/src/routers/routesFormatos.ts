import express from 'express';
import { agregarFormato, leerFormato, actualizarFormato, borrarFormato } from '../controllers/formatoController';
const router= express.Router();

router.post('/agregarFormato/',agregarFormato)
router.get('/leerFormatos', leerFormato)
router.put('/actualizarFormato/:id', actualizarFormato)
router.delete('/borrarFormato/:id', borrarFormato)
export default router