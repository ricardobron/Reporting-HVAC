import joi from 'joi';

// find by id
export interface IFindByIdRequest extends Record<string, string> {
  id: string;
}

export type IRouteRequest<T> = Record<keyof T, joi.AnySchema>;

// find by id param validation
const findByIdParamKeys: IRouteRequest<IFindByIdRequest> = {
  id: joi.string().uuid().required(),
};
export const findByIdParam = joi.object().keys(findByIdParamKeys);
