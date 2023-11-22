import { Router } from 'express';

import Controller from '@controllers/installationTypesController';
import ensureAuthenticated from '@app/middlewares/ensureAuthenticated';

const router = Router();
const controller = new Controller();

router.get('/', ensureAuthenticated('admin'), controller.find);

export default router;
