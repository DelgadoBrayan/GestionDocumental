import express from 'express';
import { agregarInforme, leerInforme, actualizarInforme, borrarInforme} from "../controllers/informeController";
const router= express.Router();

router.post('/agregarInforme',agregarInforme)
router.get('/leerInformes', leerInforme)
router.put('/actualizarInforme/:id', actualizarInforme)
router.delete('/borrarInforme/:id', borrarInforme)


export default router
