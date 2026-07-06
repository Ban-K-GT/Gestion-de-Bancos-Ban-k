import { Router } from 'express';
import {
    crearPrestamo,
    obtenerPrestamosUsuario,
    obtenerPrestamosPorCuenta
} from './prestamos.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

// Crear préstamo
// Crear préstamo
router.post('/', validateJWT, crearPrestamo);

// Obtener préstamos del usuario logueado
router.get('/mis-prestamos', validateJWT, obtenerPrestamosUsuario);

// Obtener préstamos por número de cuenta
router.get('/mis-prestamos/:numeroCuenta', validateJWT, obtenerPrestamosPorCuenta);

export default router;