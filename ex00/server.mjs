import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Asegúrate de servir archivos estáticos desde una carpeta llamada 'public'

// Servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Ajusta el camino según tu estructura de carpetas
});

app.post('/getAccessToken', async (req, res) => {
    const code = req.body.code;
    const clientId = 'mSw71ACM-ssc2WPg1gHak6VO6pYLuHffhj7qoSLOdm0'; // Reemplaza con tu Access Key
    const clientSecret = 'ryE2bDkvPYt3_ZQpLbncSe65_5YJfC7ymVkvjft_Wss'; // Reemplaza con tu Secret Key
    const redirectUri = 'http://localhost:3000';

    try {
        const response = await fetch('https://unsplash.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: code,
                grant_type: 'authorization_code',
            }),
        });

        const data = await response.json();
        console.log('Token recibido:', data.access_token); // Verifica que el token se imprima
        res.json(data);
    } catch (error) {
        console.error('Error al obtener el token:', error);
        res.status(500).json({ error: 'Error obteniendo el token' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});