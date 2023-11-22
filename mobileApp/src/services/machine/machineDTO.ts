export type Machines = {
  id: string;
  company_id: string;
  brand: string;
  model: string;
  serie: string;
  year: number;
  watts_electric: number | null;
  created_at: Date;
  updated_at: Date;
};

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
