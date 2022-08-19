import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const validToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decodeToken = jwt.verify(token, secret);
    res.locals.user = decodeToken;

    /* req.user = (decodeToken as IToken).role; */

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validToken;
