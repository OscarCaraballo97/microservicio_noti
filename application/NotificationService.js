const pool = require('../infrastructure/database');

class NotificationService {
    constructor(adapters) {
        this.adapters = adapters;
    }

    async enqueueNotification(userId, message, type) {
        const query = `
            INSERT INTO notifications (user_id, message, type, status)
            VALUES ($1, $2, $3, 'pending') RETURNING *;
        `;
        await pool.query(query, [userId, message, type]);
    }

    async processQueue() {
        const querySelect = `SELECT * FROM notifications WHERE status = 'pending' LIMIT 10;`;
        const { rows } = await pool.query(querySelect);

        for (const job of rows) {
            const adapter = this.adapters.find(a => a.supports(job.type));
            if (adapter) {
                await adapter.send(job.user_id, job.message);

                // Marcar como enviada
                const queryUpdate = `UPDATE notifications SET status = 'sent' WHERE id = $1;`;
                await pool.query(queryUpdate, [job.id]);
            }
        }
    }
}

module.exports = NotificationService;
