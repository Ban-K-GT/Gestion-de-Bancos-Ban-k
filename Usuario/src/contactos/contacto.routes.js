import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { agregarContacto, obtenerMisContactos, eliminarContacto } from './contacto.controller.js';

const router = Router();

router.post('/', validateJWT, agregarContacto);
router.get('/', validateJWT, obtenerMisContactos);
router.delete('/:id', validateJWT, eliminarContacto);

export default router;
