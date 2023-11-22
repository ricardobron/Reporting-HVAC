import { Request, Response } from 'express';
import prisma from 'prisma/client';
import { IFindByIdResponse, IFindResponse } from '../dto/machineDTO';
import AppError from '@errors/AppError';
import { generateMachineQrCode } from 'utils/generateMachineQrCode';

class MachineController {
  async create(req: Request, res: Response) {
    const response = await prisma.machines.create({
      data: req.body,
    });

    return res.json(response);
  }

  async find(req: Request, res: Response) {
    const { id: company_id } = req.params;

    const response = await prisma.machines.findMany({
      where: { company_id },
      include: {
        _count: { select: { reports: true } },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    const formatedResponse: IFindResponse[] = response.map((cp) => ({
      ...cp,
      reports_count: cp._count.reports,
    }));

    return res.json(formatedResponse);
  }

  async findById(req: Request, res: Response) {
    const { id: machine_id } = req.params;

    const response = await prisma.machines.findFirst({
      where: { id: machine_id },
      include: {
        _count: {
          select: {
            reports: true,
          },
        },
        reports: {
          select: {
            updated_at: true,
          },
          orderBy: {
            updated_at: 'desc',
          },
        },
      },
    });

    if (!response) {
      throw new AppError('Company not found');
    }

    const formatedResponse: IFindByIdResponse = {
      ...response,
      reports_count: response._count.reports,
      last_report:
        response.reports.length > 0
          ? response.reports[0].updated_at
          : undefined,
    };

    return res.json(formatedResponse);
  }

  async update(req: Request, res: Response) {
    const { id: machine_id } = req.params;

    const findByMachineInCompany = await prisma.machines.findFirstOrThrow({
      where: { id: machine_id },
    });

    if (!findByMachineInCompany) {
      throw new AppError('Esta máquina não pertence a esta empresa');
    }

    await prisma.machines.update({
      where: { id: machine_id },
      data: req.body,
    });

    return res.end();
  }

  async delete(req: Request, res: Response) {
    const { id: machine_id } = req.params;

    await prisma.machines.delete({
      where: { id: machine_id },
    });

    return res.end();
  }

  async printLabelToPdf(req: Request, res: Response) {
    const { id: machine_id } = req.params;

    const response = await prisma.machines.findFirst({
      where: { id: machine_id },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!response) {
      throw new AppError('Máquina não encontrada');
    }

    const machine_name = `${response.brand} ${response.model}`;

    const pdfStream = await generateMachineQrCode({
      company_name: response.company.name,
      machine_id,
      machine_name,
    });

    res.contentType('application/pdf');
    // res.setHeader(
    //   'Content-disposition',
    //   `attachment; filename=qrcode-${machine_id}.pdf`
    // );

    pdfStream.pipe(res);
    pdfStream.on('finish', () => {
      res.end();
    });
    pdfStream.end();
  }
}

export default MachineController;
