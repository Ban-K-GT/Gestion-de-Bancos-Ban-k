'use strict';

import Retiro from './retiros.model.js';
import Cuentas from '../cuenta/cuenta.model.js';
import { getUserEmailById } from '../utils/pg.service.js';
import { sendWithdrawalEmail } from '../utils/email.service.js';

// Listar todos los retiros con paginación
export const getRetiros = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const [total, retiros] = await Promise.all([
            Retiro.countDocuments(),
            Retiro.find()
                .populate('cuentaId', 'numeroCuenta tipoCuenta')
                .skip(Number(desde))
                .limit(Number(limite))
                .sort({ date: -1 })
        ]);

        return res.status(200).json({
            success: true,
            total,
            retiros
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los retiros',
            error: err.message
        });
    }
};

// Obtener retiros de un año y mes específicos
export const getRetirosByYearAndMonth = async (req, res) => {
    try {
        const { year, month } = req.params;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const query = {
            date: { $gte: startDate, $lte: endDate }
        };

        const retiros = await Retiro.find(query)
            .populate('cuentaId', 'numeroCuenta tipoCuenta')
            .sort({ date: -1 });

        return res.status(200).json({
            success: true,
            total: retiros.length,
            retiros
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los retiros por fecha',
            error: err.message
        });
    }
};

// Obtener retiros de una cuenta específica
export const getRetirosByCuenta = async (req, res) => {
    try {
        const { numeroCuenta } = req.params;

        // Buscar la cuenta usando el modelo importado
        const cuenta = await Cuentas.findOne({ numeroCuenta });

        if (!cuenta) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la cuenta con el número ${numeroCuenta}`
            });
        }

        const retiros = await Retiro.find({ cuentaId: cuenta._id })
            .populate('cuentaId', 'numeroCuenta tipoCuenta')
            .sort({ date: -1 });

        return res.status(200).json({
            success: true,
            total: retiros.length,
            retiros
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los retiros de la cuenta',
            error: err.message
        });
    }
};

// Crear un retiro y restar del saldo
export const crearRetiro = async (req, res) => {
    try {
        const { amount, account_number } = req.body;

        if (!amount || !account_number) {
            return res.status(400).json({
                success: false,
                message: 'Monto y número de cuenta son obligatorios'
            });
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El monto debe ser un número mayor a 0'
            });
        }

        // Buscar la cuenta usando el numero de cuenta
        const cuenta = await Cuentas.findOne({ numeroCuenta: account_number });

        if (!cuenta) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la cuenta con el número ${account_number}`
            });
        }

        if (cuenta.usuarioId.toString() !== req.uid) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para retirar de esta cuenta'
            });
        }

        // Verificar saldo suficiente
        if (cuenta.saldo < amount) {
            return res.status(400).json({
                success: false,
                message: 'Saldo insuficiente'
            });
        }

        // Restar el monto del saldo
        cuenta.saldo -= amount;
        await cuenta.save();

        // Guardar el retiro
        const retiro = new Retiro({
            cuentaId: cuenta._id,
            account_number,
            amount
        });

        await retiro.save();

        // Enviar correo al propietario de la cuenta
        try {
            const emailRetiro = await getUserEmailById(cuenta.usuarioId);
            if (emailRetiro) {
                sendWithdrawalEmail(emailRetiro, amount);
            }
        } catch (mailError) {
            console.error('Error enviando correo de retiro:', mailError);
        }

        return res.status(201).json({
            success: true,
            message: 'Retiro realizado y saldo actualizado correctamente',
            retiro
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear el retiro',
            error: error.message
        });
    }
};

export const getMisRetiros = async (req, res) => {
    try {
        // Obtener todas las cuentas del usuario
        const cuentasUsuario = await Cuentas.find({ usuarioId: req.uid });
        if (!cuentasUsuario.length) {
            return res.status(200).json({
                success: true,
                total: 0,
                retiros: []
            });
        }

        const cuentasIds = cuentasUsuario.map(c => c._id);

        const retiros = await Retiro.find({ cuentaId: { $in: cuentasIds } })
            .populate('cuentaId', 'numeroCuenta tipoCuenta')
            .sort({ date: -1 });

        return res.status(200).json({
            success: true,
            total: retiros.length,
            retiros
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los retiros del usuario',
            error: error.message
        });
    }
};