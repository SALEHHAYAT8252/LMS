import cron from 'node-cron';
import { User } from '../models/userModel.js';

export const removeUnverifiedAccounts = () => {
    cron.schedule("* * * * * ", async () => {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
        await User.deleteMany({
            isVerified: false,
            createdAt: { $lt: thirtyMinutesAgo },
        });
        console.log("Unverified accounts older than 30 minutes have been removed.");    
    })
}