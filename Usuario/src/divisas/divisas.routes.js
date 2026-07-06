import { Router } from 'express';
import { getRates } from './divisas.controller.js';

const router = Router();

// Endpoint para obtener las tasas de cambio
router.get('/rates', getRates);

export default router;
