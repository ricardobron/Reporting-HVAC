import { PrismaClient } from '@prisma/client';

export const type_inverventions = [
  {
    label: 'Carga com fluido',
    value: 'Carga com fluido',
  },
  {
    label: 'Recuperação de fluido',
    value: 'Recuperação de fluido',
  },
  {
    label: 'Pesquisa/ detecção de fugas',
    value: 'Pesquisa/ detecção de fugas',
  },

  {
    label: 'Recuperação de fugas',
    value: 'Recuperação de fugas',
  },
  {
    label: 'Acções de acompanhamento',
    value: 'Acções de acompanhamento',
  },
  {
    label: 'Verificação sistema de deteção de fugas',
    value: 'Verificação sistema de deteção de fugas',
  },
  {
    label: 'Outra',
    value: 'other',
  },
];

export default async (prisma: PrismaClient): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const type_invervention of type_inverventions) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await prisma.typeIntervention.create({
        data: type_invervention,
      });
    } catch {
      //skip
    }
  }
};
