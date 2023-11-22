import { Request, Response } from 'express';
import prisma from 'prisma/client';

import { IFindMinifiedResponse } from '@app/dto/airConditioningTypesDTO';

class AirConditioningTypesController {
  async find(req: Request, res: Response) {
    const response = await prisma.typeAirConditioning.findMany({});

    const formatedResponse: IFindMinifiedResponse[] = response.map((cp) => ({
      label: cp.label,
      value: cp.value,
    }));

    return res.json(formatedResponse);
  }
}

export default AirConditioningTypesController;
