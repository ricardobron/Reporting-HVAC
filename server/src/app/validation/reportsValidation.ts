import { ICreateRequest, IUpdateRequest } from '@app/dto/reportsDTO';
import * as IShared from './shared';

import joi from 'joi';

// create body validation
const createBodyKeys: IShared.IRouteRequest<ICreateRequest> = {
  machine_id: joi.string().uuid().required(),
  type_instalation: joi.string().required(),
  type_air_conditioning: joi.string().required(),
  type_intervention: joi.string().required(),
  fluid_existent: joi.string().required(),
  fluid_charged: joi.string(),
  fluid_description: joi.string(),
  temp_heat: joi.number().default(0),
  temp_cold: joi.number().default(0),
  hermetically_sealed: joi.boolean().default(false),
  satisfied: joi.boolean().default(false),
};
export const createBody = joi.object().keys(createBodyKeys);

// create body validation
const updateBodyKeys: IShared.IRouteRequest<IUpdateRequest> = {
  type_instalation: joi.string(),
  type_air_conditioning: joi.string(),
  type_intervention: joi.string(),
  fluid_existent: joi.string(),
  fluid_charged: joi.string(),
  fluid_description: joi.string(),
  temp_heat: joi.number(),
  temp_cold: joi.number(),
  hermetically_sealed: joi.boolean(),
  satisfied: joi.boolean(),
  locked: joi.boolean(),
};
export const updateBody = joi.object().keys(updateBodyKeys);
