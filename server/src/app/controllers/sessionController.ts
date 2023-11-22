import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import prisma from 'prisma/client';
import { compare } from 'bcryptjs';
import AppError from '@errors/AppError';
import { ITokenPayload } from '@app/middlewares/ensureAuthenticated';

class SessionController {
  async authenticateAdmin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Password inválida', 401);
    }

    const { id, name } = user;

    const subjectJWT = JSON.stringify({
      user_id: user.id,
    });

    const access_token = sign({}, authConfig.jwt.secret, {
      header: {
        alg: 'HS256',
        typ: 'JWT',
      },
      subject: subjectJWT,
      expiresIn: authConfig.jwt.expiresInToken,
    });

    return res.json({
      user: {
        id,
        name,
        email,
      },
      access_token,
    });
  }

  async authenticateCompany(req: Request, res: Response) {
    const { code } = req.body;

    const company = await prisma.company.findUnique({ where: { code } });

    if (!company) {
      return res.status(401).json({ error: 'Company not found' });
    }

    const subjectJWT = JSON.stringify({
      company_id: company.id,
    });

    const access_token = sign({}, authConfig.jwt.secret, {
      header: {
        alg: 'HS256',
        typ: 'JWT',
      },
      subject: subjectJWT,
      expiresIn: '30s',
    });

    return res.json({
      company_id: company.id,
      access_token,
    });
  }

  async validateToken(req: Request, res: Response) {
    const { token } = req.body;

    const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload;

    return res.status(!!decoded ? 200 : 401).json(Boolean(decoded));
  }
}

export default SessionController;
