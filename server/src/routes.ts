import { Router } from 'express';

import companyRoutes from '@routes/company';
import machineRoutes from '@routes/machine';
import reportsRoutes from '@routes/reports';

import airConditioningTypesRoutes from '@routes/airConditioningTypes';
import installationTypesRoutes from '@routes/installationTypes';
import interventionTypesRoutes from '@routes/interventionTypes';
import existentFluidTypesRoutes from '@routes/existentFluidTypes';

import sessionsRoutes from '@routes/sessions';
import userRoutes from '@routes/user';

const routes = Router();

routes.use('/company', companyRoutes);
routes.use('/machine', machineRoutes);
routes.use('/reports', reportsRoutes);

routes.use('/air_conditioning_types', airConditioningTypesRoutes);
routes.use('/installation_types', installationTypesRoutes);
routes.use('/intervention_types', interventionTypesRoutes);
routes.use('/existent_fluid_types', existentFluidTypesRoutes);

routes.use('/sessions', sessionsRoutes);
routes.use('/users', userRoutes);

export default routes;
