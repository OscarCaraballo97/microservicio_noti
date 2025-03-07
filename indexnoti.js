const express = require('express');
const NotificationService = require('./application/NotificationService');
const EmailAdapter = require('./infrastructure/EmailAdapter');
const SmsAdapter = require('./infrastructure/SmsAdapter');

const app = express();
app.use(express.json());

const adapters = [new EmailAdapter(), new SmsAdapter()];
const notificationService = new NotificationService(adapters);

// API para enviar notificaciones
app.post('/notify', (req, res) => {
    const { userId, message, type } = req.body;
    notificationService.enqueueNotification(userId, message, type);
    res.status(200).send({ success: true, message: 'Notificación encolada' });
});

app.listen(3000, () => console.log('Microservicio de notificaciones en puerto 3000'));

setInterval(() => {
    notificationService.processQueue();
}, 5000);

