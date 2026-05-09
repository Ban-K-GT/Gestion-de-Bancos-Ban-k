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

const router = Router();

// 1. RUTAS SIN PARÁMETROS DINÁMICOS (O con prefijos específicos)
router.get('/', getAdmins);
router.post('/', validateCreateAdmin, createAdmin);

// 2. RUTAS PATCH (Acciones específicas)
// Al estar aquí, Express las encontrará antes de confundir 'deactivate' con un ':id'
router.patch('/deactivate/:id', validateAdminStatusChange, changeAdminStatus);
router.patch('/activate/:id', validateAdminStatusChange, changeAdminStatus);

// 3. RUTAS CON PARÁMETROS DINÁMICOS GENÉRICOS (SIEMPRE AL FINAL)
router.get('/:id', validateGetAdminById, getAdminById);
router.put('/:id', validateUpdateAdmin, updateAdmin);

export default router;