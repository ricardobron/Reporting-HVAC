import { ICreateRequest, IUpdateRequest } from '@app/dto/machineDTO';
import * as IShared from './shared';

import joi from 'joi';

// create body validation
const createBodyKeys: IShared.IRouteRequest<ICreateRequest> = {
  brand: joi.string().required(),
  company_id: joi.string().uuid().required(),
  model: joi.string().required(),
  serie: joi.string().required(),
  year: joi.number().required(),
  watts_electric: joi.number().default(0),
};
export const createBody = joi.object().keys(createBodyKeys);

// create body validation
const updateBodyKeys: IShared.IRouteRequest<IUpdateRequest> = {
  brand: joi.string(),
  model: joi.string(),
  serie: joi.string(),
  year: joi.number(),
  watts_electric: joi.number(),
};
export const updateBody = joi.object().keys(updateBodyKeys);
