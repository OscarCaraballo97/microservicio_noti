class SmsAdapter {
    supports(type) {
        return type === 'sms';
    }
    async send(userId, message) {
        console.log(`SMS enviado a ${userId}: ${message}`);
    }
}

module.exports = SmsAdapter;