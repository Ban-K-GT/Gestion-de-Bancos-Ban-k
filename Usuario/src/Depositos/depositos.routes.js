import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import {
    getMisDepositos,
    getMisDepositosPorCuenta,
    crearDeposito
} from './depositos.controller.js';

const router = Router();

// Rutas de depósitos
router.get('/mis-depositos', getMisDepositos); // Depósitos de todas las cuentas del usuario
router.get('/mis-depositos/:numeroCuenta', getMisDepositosPorCuenta); // Mis depósitos por número de cuenta
router.post('/', crearDeposito);

export default router;