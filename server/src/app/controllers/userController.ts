import { Request, Response } from 'express';
import prisma from 'prisma/client';

import { hash } from 'bcryptjs';

class UserController {
  async create(req: Request, res: Response) {
    const { password, ...rest } = req.body;

    const hashedPassword = await hash(password, 8);

    const { id, name, email } = await prisma.user.create({
      data: { ...rest, password: hashedPassword },
    });

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default UserController;
