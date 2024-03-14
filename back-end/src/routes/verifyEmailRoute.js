import jwt from 'jsonwebtoken';
import {ObjectID} from 'mongodb';
import { getDbConnection } from '../db';


export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;
        const db = getDbConnection('react-auth-db');
        console.log(verificationString);
        const result = await db.collection('users').findOne({
            verificationString
        });

        if (!result) {
            res.sendStatus(401).json({messsage: 'The verfification string is incorrect'})
        }

        const { _id: id, email, info } = result;

        await db.collection('users').updateOne({_id: ObjectID(id)}, { 
            $set: {isVerified: true}}
        );

        jwt.sign({id, email, isVerified:true, info}, process.env.JWT_SECRET, { expiresIn: '2d'}, (err, token) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json({ token });
            }
        });
    }
}