const express = require('express');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite solicitudes desde otros dominios
app.use(express.json()); // Para poder recibir datos en formato JSON en las peticiones POST

// Llaves de VAPID: son necesarias para autenticar las notificaciones push
const publicVapidKey = 'BNN0KC6LlkNRrB6D4dGrnJd9BxdO0NjB_TMiIweFAtGMSvDem41CIvfRmpSESjQmh68YfCOBi_6NzdxddUPzfT4';
const privateVapidKey = '1qjhmuvsn-IdK3uggZnXu_mgHpIFtJO2EqRcZP3fnzY';

// Configura las llaves VAPID en la librería web-push
webpush.setVapidDetails('mailto:victor.villafane@davinci.edu.ar', publicVapidKey, privateVapidKey);

// Ruta para recibir la suscripción y enviar una notificación push
app.post('/send-notification', (req, res) => {
    const subscription = req.body.subscription; // La suscripción enviada por la PWA
    const payload = JSON.stringify({
        title: 'Notificación Push',
        body: 'Este es un mensaje desde la API en Node.js',
    });

    // Envía la notificación usando la suscripción y el payload
    webpush.sendNotification(subscription, payload)
        .then(() => res.status(200).json({ message: 'Notificación enviada' })) // Si todo sale bien, envía un estado 200
        .catch(error => res.status(500).json({ error })); // Si hay un error, responde con un estado 500
});

// Define el puerto donde correrá la API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
