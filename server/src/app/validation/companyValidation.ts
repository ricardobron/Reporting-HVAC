import { ICreateRequest, IUpdateRequest } from '@app/dto/companyDTO';
import * as IShared from './shared';

import joi from 'joi';

// create body validation
const createBodyKeys: IShared.IRouteRequest<ICreateRequest> = {
  country: joi.string().required(),
  street: joi.string().required(),
  name: joi.string().required(),
  nif: joi.string().required(),
  postal_code: joi.string().required(),
  telephone: joi.string().required(),
};
export const createBody = joi.object().keys(createBodyKeys);

// create body validation
const updateBodyKeys: IShared.IRouteRequest<IUpdateRequest> = {
  country: joi.string(),
  street: joi.string(),
  name: joi.string(),
  nif: joi.string(),
  postal_code: joi.string(),
  telephone: joi.string(),
};
export const updateBody = joi.object().keys(updateBodyKeys);
