import { Request, Response } from 'express';
import prisma from 'prisma/client';
import AppError from '@errors/AppError';

class CompanyController {
  async create(req: Request, res: Response) {
    const response = await prisma.reports.create({
      data: req.body,
    });

    return res.json(response);
  }

  async find(req: Request, res: Response) {
    const { id: machine_id } = req.params;

    const response = await prisma.reports.findMany({
      where: {
        machine: {
          id: machine_id,
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    return res.json(response);
  }

  async findById(req: Request, res: Response) {
    const { id: report_id } = req.params;

    const response = await prisma.reports.findFirst({
      where: {
        id: report_id,
      },
    });

    if (!response) {
      throw new AppError('Company not found');
    }

    return res.json(response);
  }

  async update(req: Request, res: Response) {
    const { id: report_id } = req.params;

    const findByReportInCompanyAndMachine =
      await prisma.reports.findFirstOrThrow({
        where: {
          id: report_id,
        },
      });

    if (!findByReportInCompanyAndMachine) {
      throw new AppError('Esta máquina não pertence a esta empresa');
    }

    await prisma.reports.update({
      where: { id: report_id },
      data: req.body,
    });

    return res.end();
  }

  async delete(req: Request, res: Response) {
    const { id: report_id } = req.params;

    await prisma.reports.delete({
      where: { id: report_id },
    });

    return res.end();
  }
}

export default CompanyController;
