import { Router } from 'express';
import {
    getPrestamos,
    getPrestamosAprobados,
    getPrestamosPendientes,
    getPrestamoById,
    getPrestamosByCuenta,
    aprobarPrestamo,
    denegarPrestamo,
    getPrestamosDenegados
} from './prestamos.controller.js';
import {
    validatePrestamoId,
    validatePrestamosByCuenta
} from '../../middlewares/prestamos-validation.js';

const router = Router();

// listar todos los préstamos
router.get('/', getPrestamos);

// listar aprobados
router.get('/aprobados', getPrestamosAprobados);

// listar pendientes
router.get('/pendientes', getPrestamosPendientes);

// listar denegados
router.get('/denegados', getPrestamosDenegados);

// obtener por id
router.get('/:id', validatePrestamoId, getPrestamoById);

// obtener por numero de cuenta
router.get('/cuenta/:numeroCuenta', validatePrestamosByCuenta, getPrestamosByCuenta);

// aprobar o rechazar préstamo
router.put('/:id/aprobar', validatePrestamoId, aprobarPrestamo);
router.put('/:id/denegar', validatePrestamoId, denegarPrestamo);

export default router;
