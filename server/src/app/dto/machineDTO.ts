import { Machines } from '@prisma/client';

export interface ICreateRequest {
  company_id: string;
  brand: string;
  model: string;
  serie: string;
  year: number;
  watts_electric: number | null;
}

export interface IUpdateRequest {
  brand?: string;
  model?: string;
  serie?: string;
  year?: number;
  watts_electric?: number;
}

export interface IFindResponse extends Machines {
  reports_count: number;
}

export interface IFindByIdResponse extends Machines {
  reports_count: number;
  last_report?: Date;
}
