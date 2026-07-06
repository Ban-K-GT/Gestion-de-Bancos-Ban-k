'use strict';

import mongoose from 'mongoose';

const ContactoSchema = new mongoose.Schema({
    usuarioId: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true,
        trim: true
    },
    numeroCuenta: {
        type: String,
        required: true,
        trim: true
    },
    banco: {
        type: String,
        default: 'Ban-k'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ContactoSchema.index({ usuarioId: 1, numeroCuenta: 1 }, { unique: true });

export default mongoose.model('Contacto', ContactoSchema);
