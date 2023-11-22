import { PrismaClient } from '@prisma/client';

export const existent_fluids = [
  {
    label: 'R12',
    value: 'R12',
  },
  {
    label: 'R22',
    value: 'R22',
  },
  {
    label: 'R502',
    value: 'R502',
  },
  {
    label: 'R134a',
    value: 'R134a',
  },
  {
    label: 'R404A',
    value: 'R404A',
  },
  {
    label: 'R407C',
    value: 'R407C',
  },
  {
    label: 'R410A',
    value: 'R410A',
  },
  {
    label: 'R417',
    value: 'R417',
  },
  {
    label: 'R422',
    value: 'R422',
  },
  {
    label: 'R428',
    value: 'R428',
  },
  {
    label: 'R507',
    value: 'R507',
  },
  {
    label: 'Outro',
    value: 'other',
  },
];

export default async (prisma: PrismaClient): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const existent_fluid of existent_fluids) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await prisma.existentFluid.create({
        data: existent_fluid,
      });
    } catch {
      //skip
    }
  }
};
