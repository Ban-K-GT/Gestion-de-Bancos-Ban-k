import { Router } from 'express';
import {
    crearPrestamo,
    obtenerPrestamosUsuario,
    obtenerPrestamosPorCuenta
} from './prestamos.controller.js';

const router = Router();

// Crear préstamo
router.post('/', crearPrestamo);

// Obtener préstamos del usuario logueado
router.get('/mis-prestamos', obtenerPrestamosUsuario);

// Obtener préstamos por número de cuenta
router.get('/mis-prestamos/:numeroCuenta', obtenerPrestamosPorCuenta);

export default router;