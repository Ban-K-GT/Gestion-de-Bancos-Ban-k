import Usuario from './usuarios.model.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const usuarios = await Usuario.find({})
            .limit(parseInt(limit))
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Usuario.countDocuments({});

        return res.status(200).json({
            success: true,
            data: usuarios,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        return res.status(200).json({
            success: true,
            data: usuario,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error.message,
        });
    }
};

// Crear usuario
export const createUsuario = async (req, res) => {
    try {
        const usuarioData = req.body;
        const usuario = new Usuario(usuarioData);

        await usuario.save();

        return res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: usuario,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        const usuario = await Usuario.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: usuario,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

// Activar / Desactivar usuario
export const changeUsuarioStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        usuario.isActive = !usuario.isActive;
        await usuario.save();

        return res.status(200).json({
            success: true,
            message: usuario.isActive
                ? 'Usuario activado'
                : 'Usuario desactivado',
            data: usuario,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al cambiar estado',
            error: error.message,
        });
    }
};