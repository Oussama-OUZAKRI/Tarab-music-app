import jwt from 'jsonwebtoken';
import { secretKey } from '../configuration/jwtConfig.js';

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export default generateToken;