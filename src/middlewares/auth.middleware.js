import jwt from 'jsonwebtoken'
import { AppError } from '../utils/error.js';

export const auth = (roles) => (req, res, next) => {
    // Authentication
    const { token } = req.headers;
    if (!token) throw new AppError('Please SignIn', 401)

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) throw new AppError('Invalid Token', 498)

        // Authorization
        if (!roles.includes(decoded.role)) throw new AppError('Not Enough Priviliges', 403);

        req.user = decoded;
        next();
    })
}

