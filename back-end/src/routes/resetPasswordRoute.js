import bycrpt from 'bcrypt';
import { getDbConnection } from '../db';

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        const db = getDbConnection('react-auth-db');

        const newPasswordHash = await bycrpt.hash(newPassword, 10);

        const result = await db.collection('users')
            .findOneAndUpdate({passwordResetCode}, {
                $set: { passwordHash: newPasswordHash},
                $unset: { passwordResetCode: ''}
            });
        
        if (result.lastErrorObject === 0) return res.sendStatus(404);

        res.sendStatus(200);
    }
}
