export type ICompany = {
  id: string;
  code: string;
  name: string;
  street: string;
  country: string;
  postal_code: string;
  telephone: string;
  nif: string;
  created_at: Date;
  updated_at: Date;
};

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

export interface IFindResponse extends ICompany {
  machines_count: number;
  reports_count: number;
}
