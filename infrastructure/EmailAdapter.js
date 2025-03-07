class EmailAdapter {
    supports(type) {
        return type === 'email';
    }
    async send(userId, message) {
        console.log(`Email enviado a ${userId}: ${message}`);
    }
}

module.exports = EmailAdapter;