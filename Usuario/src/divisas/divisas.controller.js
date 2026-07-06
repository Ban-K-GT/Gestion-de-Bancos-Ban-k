import axios from 'axios';

export const getRates = async (req, res) => {
    try {
        const apiKey = process.env.API_SECRET_DIVISAS;
        
        if (!apiKey) {
            return res.status(500).json({
                success: false,
                message: 'API Key de divisas no configurada en el servidor'
            });
        }

        const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`);
        
        return res.status(200).json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Error al obtener divisas:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error al consultar el servicio de divisas',
            error: error.message
        });
    }
};
