import { Router } from 'express';
import {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    changeAdminStatus
} from './admin.controller.js';

import {
    validateCreateAdmin,
    validateUpdateAdmin,
    validateAdminStatusChange,
    validateGetAdminById
} from '../../middlewares/admin-validation.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

// Rutas GET
router.get('/', getAdmins);
router.get('/:id', validateGetAdminById, getAdminById);

// Rutas POST
router.post('/', validateJWT, validateCreateAdmin, createAdmin);

// Rutas PUT
router.put('/:id', validateJWT, validateUpdateAdmin, updateAdmin);
router.put('/:id/activate', validateJWT, validateAdminStatusChange, changeAdminStatus);
router.put('/:id/desactivate', validateJWT, validateAdminStatusChange, changeAdminStatus);

export default router;
