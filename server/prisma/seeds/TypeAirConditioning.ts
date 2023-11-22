import { PrismaClient } from '@prisma/client';

export const type_air_conditionings = [
  {
    label: 'Mono/ Multisplit',
    value: 'Mono/ Multisplit',
  },
  {
    label: 'Chiller',
    value: 'Chiller',
  },
  {
    label: 'Sistema VRF',
    value: 'Sistema VRF',
  },
  {
    label: 'Bomba calor',
    value: 'Bomba calor',
  },
  {
    label: 'Águas quentes sanit. / Aquecimento',
    value: 'Águas quentes sanit. / Aquecimento',
  },
  {
    label: 'Outro',
    value: 'other',
  },
];

export default async (prisma: PrismaClient): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const type_air_conditioning of type_air_conditionings) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await prisma.typeAirConditioning.create({
        data: type_air_conditioning,
      });
    } catch {
      //skip
    }
  }
};
