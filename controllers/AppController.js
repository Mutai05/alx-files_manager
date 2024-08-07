import redisClient from '../utils/redis.js'; // Adjust the path if needed
import dbClient from '../utils/db.js'; // Adjust the path if needed

class AppController {
    static async getStatus(req, res) {
        try {
            const redisStatus = await redisClient.isAlive();
            const dbStatus = await dbClient.isAlive();
            res.status(200).json({ redis: redisStatus, db: dbStatus });
        } catch (err) {
            res.status(500).json({ error: 'Error checking status' });
        }
    }

    static async getStats(req, res) {
        try {
            const usersCount = await dbClient.nbUsers();
            const filesCount = await dbClient.nbFiles();
            res.status(200).json({ users: usersCount, files: filesCount });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching stats' });
        }
    }
}

export default AppController;

