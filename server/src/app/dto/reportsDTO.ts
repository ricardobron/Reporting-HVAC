import { Reports } from '@prisma/client';

export interface ICreateRequest {
  machine_id: string;
  type_instalation: string;
  type_air_conditioning: string;
  type_intervention: string;
  fluid_existent: string;
  fluid_charged: string | null;
  fluid_description: string | null;
  temp_heat: number | null;
  temp_cold: number | null;
  hermetically_sealed: boolean;
  satisfied: boolean;
}

export interface IUpdateRequest {
  type_instalation?: string;
  type_air_conditioning?: string;
  type_intervention?: string;
  fluid_existent?: string;
  fluid_charged?: string;
  fluid_description?: string;
  temp_heat?: number;
  temp_cold?: number;
  hermetically_sealed?: boolean;
  satisfied?: boolean;
  locked?: boolean;
}

export type IEntity = Reports;
