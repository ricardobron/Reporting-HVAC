import { Company } from '@prisma/client';

export interface ICreateRequest {
  name: string;
  street: string;
  country: string;
  postal_code: string;
  telephone: string;
  nif: string;
}

export interface IUpdateRequest {
  name?: string;
  street?: string;
  country?: string;
  postal_code?: string;
  telephone?: string;
  nif?: string;
}

export interface IFindResponse extends Company {
  machines_count: number;
  reports_count: number;
}
