import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import 'express-async-errors';
import AppError from './errors/AppError';

import routes from './routes';

const app = express();

console.log('running', new Date());

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  async (err: Error, req: Request, response: Response, _: NextFunction) => {
    if ((err as unknown as AppError).statusCode) {
      return response
        .status((err as unknown as AppError).statusCode)
        .json({ ...err, message: err.message || err.name, type: 'AppError' });
    }

    console.error(err);

    return response.status(500).json({ error: 'Internal server error' });
  }
);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Rodando na porta ${PORT}`);
});
