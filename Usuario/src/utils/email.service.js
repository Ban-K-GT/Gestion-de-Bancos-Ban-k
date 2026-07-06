import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Gestión Ban-k - Soporte" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        });
        console.log(`Correo enviado a ${to}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`Error enviando correo a ${to}:`, error);
        return false;
    }
};

export const sendTransferEmail = async (to, amount, role) => {
    const isSender = role === 'sender';
    const subject = isSender ? 'Comprobante de Transferencia Realizada' : 'Has recibido una Transferencia';
    const title = isSender ? 'Transferencia Enviada Exitosamente' : '¡Fondos Recibidos!';
    const message = isSender
        ? `Has realizado una transferencia por <strong>Q${amount}</strong> exitosamente.`
        : `Se han acreditado <strong>Q${amount}</strong> a tu cuenta a través de una transferencia.`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #10b981; margin: 0;">BAN-K</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0;">${title}</h2>
            <p style="color: #475569; line-height: 1.6; font-size: 16px;">
                Hola,<br><br>
                ${message}<br><br>
                Gracias por utilizar <strong>BAN-K</strong>. Tu confianza es nuestra prioridad.
            </p>
        </div>
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Este correo es generado automáticamente, por favor no respondas a este mensaje.
            </p>
        </div>
    </div>
    `;

    return sendMail(to, subject, html);
};

export const sendDepositEmail = async (to, amount) => {
    const subject = 'Comprobante de Depósito Realizado';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #10b981; margin: 0;">BAN-K</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0;">Depósito Exitoso</h2>
            <p style="color: #475569; line-height: 1.6; font-size: 16px;">
                Hola,<br><br>
                Se ha acreditado a tu cuenta un depósito por <strong>Q${amount}</strong>.<br><br>
                Gracias por utilizar <strong>BAN-K</strong> para manejar tus finanzas.
            </p>
        </div>
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Este correo es generado automáticamente, por favor no respondas a este mensaje.
            </p>
        </div>
    </div>
    `;

    return sendMail(to, subject, html);
};

export const sendWithdrawalEmail = async (to, amount) => {
    const subject = 'Comprobante de Retiro Realizado';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #10b981; margin: 0;">BAN-K</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0;">Retiro Exitoso</h2>
            <p style="color: #475569; line-height: 1.6; font-size: 16px;">
                Hola,<br><br>
                Se ha registrado un retiro en tu cuenta por la cantidad de <strong>Q${amount}</strong>.<br><br>
                Si no reconoces este movimiento, comunícate con soporte de inmediato.
            </p>
        </div>
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Este correo es generado automáticamente, por favor no respondas a este mensaje.
            </p>
        </div>
    </div>
    `;

    return sendMail(to, subject, html);
};
