import { Router } from 'express';

import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  changeUsuarioStatus
} from './usuarios.controller.js';

import { validateUsuarioId } from '../../middlewares/usuario-validation.js';

const router = Router();
router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/status/:id', changeUsuarioStatus);
router.get('/:id', validateUsuarioId, getUsuarioById);
router.put('/:id', validateUsuarioId, updateUsuario);

export default router;