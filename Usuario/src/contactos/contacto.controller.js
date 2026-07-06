'use strict';
import Contacto from './contacto.model.js';
import Cuentas from '../cuenta/cuenta.model.js';

export const agregarContacto = async (req, res) => {
    try {
        const { alias, numeroCuenta, banco } = req.body;
        const usuarioId = req.uid;

        // Verificar si la cuenta destino existe (asumiendo banco interno Ban-k por ahora)
        if (!banco || banco.toLowerCase() === 'ban-k') {
            const cuentaDestino = await Cuentas.findOne({ numeroCuenta });
            if (!cuentaDestino) {
                return res.status(404).json({
                    success: false,
                    message: 'La cuenta no existe en Ban-k'
                });
            }
            if (cuentaDestino.usuarioId.toString() === usuarioId) {
                return res.status(400).json({
                    success: false,
                    message: 'No puedes agregar tus propias cuentas como contacto'
                });
            }
        }

        const nuevoContacto = new Contacto({
            usuarioId,
            alias,
            numeroCuenta,
            banco: banco || 'Ban-k'
        });

        await nuevoContacto.save();

        return res.status(201).json({
            success: true,
            message: 'Contacto agregado correctamente',
            data: nuevoContacto
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya tienes este número de cuenta en tus contactos'
            });
        }
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al agregar contacto'
        });
    }
};

export const obtenerMisContactos = async (req, res) => {
    try {
        const usuarioId = req.uid;

        const contactos = await Contacto.find({ usuarioId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: contactos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener contactos'
        });
    }
};

export const eliminarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.uid;

        const contacto = await Contacto.findOneAndDelete({ _id: id, usuarioId });

        if (!contacto) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Contacto eliminado correctamente'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar contacto'
        });
    }
};
