import {
  ICreateAdminRequest,
  ICreateCompanyRequest,
  IValidateTokenRequest,
} from '@app/dto/sessionsDTO';
import * as IShared from './shared';

import joi from 'joi';

const createAdminBodyKeys: IShared.IRouteRequest<ICreateAdminRequest> = {
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().required(),
};
export const createAdminBody = joi.object().keys(createAdminBodyKeys);

const createCompanyBodyKeys: IShared.IRouteRequest<ICreateCompanyRequest> = {
  code: joi.string().required(),
};
export const createCompanyBody = joi.object().keys(createCompanyBodyKeys);

const validateTokenBodyKeys: IShared.IRouteRequest<IValidateTokenRequest> = {
  token: joi.string().required(),
};
export const validateTokenBody = joi.object().keys(validateTokenBodyKeys);
