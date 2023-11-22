import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import prisma from 'prisma/client';
import { Company, User } from '@prisma/client';
import AppError from '@errors/AppError';

export interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface ISubDecodedPayload {
  user_id?: string;
  company_id?: string;
}

export default function ensureAuthenticated(
  user_type?: 'company' | 'admin' | 'all'
) {
  const userTypeAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload;

      const subDecoded = JSON.parse(decoded.sub) as ISubDecodedPayload;

      let companyData: Company | null = null;
      let userData: User | null = null;

      if (subDecoded) {
        if (subDecoded.company_id) {
          companyData = await prisma.company.findFirstOrThrow({
            where: {
              id: subDecoded.company_id,
            },
          });
        }

        if (subDecoded.user_id) {
          userData = await prisma.user.findFirstOrThrow({
            where: {
              id: subDecoded.user_id,
            },
          });
        }
      }

      if (user_type === 'admin' && !userData)
        throw new AppError('Not authorized', 401);

      if (user_type === 'company' && !companyData)
        throw new AppError('Not authorized', 401);

      if (user_type === 'all') {
        if (companyData || userData) {
          return next();
        }
      }

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }
  };

  return userTypeAuthorized;
}
