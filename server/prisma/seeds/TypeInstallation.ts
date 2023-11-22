import { PrismaClient } from '@prisma/client';

export const type_installations = [
  {
    label: 'Doméstico',
    value: 'Doméstico',
  },
  {
    label: 'Comercial',
    value: 'Comercial',
  },
  {
    label: 'Industrial',
    value: 'Industrial',
  },
  {
    label: 'Outro',
    value: 'other',
  },
];

export default async (prisma: PrismaClient): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const type_installation of type_installations) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await prisma.typeInstalation.create({
        data: type_installation,
      });
    } catch {
      //skip
    }
  }
};
