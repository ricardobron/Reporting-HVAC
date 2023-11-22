export interface ICreateAdminRequest {
  email: string;
  password: string;
}

export interface ICreateCompanyRequest {
  code: string;
}

export interface IValidateTokenRequest {
  token: string;
}
