import { Request, Response } from 'express';
import prisma from 'prisma/client';
import { IFindResponse } from '../dto/companyDTO';
import AppError from '@errors/AppError';
import { generateCompanyCode } from 'utils/generateCompanyCode';

class CompanyController {
  async create(req: Request, res: Response) {
    const companyCode = generateCompanyCode();

    const response = await prisma.company.create({
      data: { code: companyCode, ...req.body },
    });

    return res.json(response);
  }

  async find(req: Request, res: Response) {
    const response = await prisma.company.findMany({
      include: {
        _count: { select: { machines: true } },
        machines: {
          select: {
            _count: {
              select: {
                reports: true,
              },
            },
          },
        },
      },
    });

    const formatedResponse: IFindResponse[] = response.map((cp) => ({
      ...cp,
      machines_count: cp._count.machines,
      reports_count: cp.machines.reduce(
        (acc, obj) => acc + obj._count.reports,
        0
      ),
    }));

    return res.json(formatedResponse);
  }

  async findById(req: Request, res: Response) {
    const { id: company_id } = req.params;

    const response = await prisma.company.findFirst({
      where: { id: company_id },
      include: {
        _count: {
          select: {
            machines: true,
          },
        },
        machines: {
          select: {
            _count: {
              select: {
                reports: true,
              },
            },
          },
        },
      },
    });

    if (!response) {
      throw new AppError('Company not found');
    }

    const formatedResponse: IFindResponse = {
      ...response,
      machines_count: response._count.machines,
      reports_count: response.machines.reduce(
        (acc, obj) => acc + obj._count.reports,
        0
      ),
    };

    return res.json(formatedResponse);
  }

  async update(req: Request, res: Response) {
    const { id: company_id } = req.params;

    await prisma.company.update({
      where: { id: company_id },
      data: req.body,
      include: {
        _count: {
          select: {
            machines: true,
          },
        },
        machines: {
          select: {
            _count: {
              select: {
                reports: true,
              },
            },
          },
        },
      },
    });

    return res.end();
  }

  async delete(req: Request, res: Response) {
    const { id: company_id } = req.params;

    await prisma.company.delete({
      where: { id: company_id },
    });

    return res.end();
  }
}

export default CompanyController;
