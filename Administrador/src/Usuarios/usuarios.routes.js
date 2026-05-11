import { Router } from 'express';

import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    changeUsuarioStatus
} from './usuarios.controller.js';

import { validateUsuarioId } from '../../middlewares/usuario-validation.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();
router.get('/', getUsuarios);
router.post('/', validateJWT, createUsuario);
router.put('/status/:id', validateJWT, changeUsuarioStatus);
router.get('/:id', validateUsuarioId, getUsuarioById);
router.put('/:id', validateJWT, validateUsuarioId, updateUsuario);

export default router;