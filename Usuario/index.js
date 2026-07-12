// Importaciones
import dotenv from 'dotenv';
import { app, initServer } from './configs/app.js';

// Configurar las variables de entorno
dotenv.config();

// Errores no capturados (Solo los pintamos en consola, NO matamos el proceso)
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// Errores no manejados en promesas (Solo los pintamos en consola, NO matamos el proceso)
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection en:', promise, 'razón:', reason);
});

// Iniciar el servidor
console.log('Iniciando servidor de Ban-k....');
await initServer();

export default app;