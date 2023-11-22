import { PrismaClient } from '@prisma/client';
import ExistentFluid from './seeds/ExistentFluid';
import TypeAirConditioning from './seeds/TypeAirConditioning';
import TypeInstallation from './seeds/TypeInstallation';
import TypeIntervention from './seeds/TypeIntervention';

const prisma = new PrismaClient();

// seeds
ExistentFluid(prisma)
  .then(() => TypeAirConditioning(prisma))
  .then(() => TypeInstallation(prisma))
  .then(() => TypeIntervention(prisma))

  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
