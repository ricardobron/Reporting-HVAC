import { NextFunction, Request, Response } from 'express';
import Joi, { Schema, ValidationError } from 'joi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseNulls(payload: any) {
  if (Array.isArray(payload)) {
    // eslint-disable-next-line no-param-reassign
    payload = payload.map(item => parseNulls(item));
  } else if (typeof payload === 'object') {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const item in payload) {
      // eslint-disable-next-line no-param-reassign
      payload[item] = parseNulls(payload[item]);
    }
  } else if (payload === '') {
    // eslint-disable-next-line no-param-reassign
    payload = null;
  }
  return payload;
}

const schemaValidator =
  (
    schema: Joi.ObjectSchema<Schema> | Joi.ArraySchema,
    property: 'body' | 'query' | 'params',
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = parseNulls(req[property]);

      req[property] = await schema.validateAsync(payload, {
        abortEarly: false,
        convert: true,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res
          .status(400)
          .json({ status: 400, request: property, message: err.message });
      }
    }
    return next();
  };
export default schemaValidator;
