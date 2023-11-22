import { Router } from 'express';

import Controller from '@controllers/userController';
import ensureAuthenticated from '@app/middlewares/ensureAuthenticated';

const router = Router();
const controller = new Controller();

// router.post('/', ensureAuthenticated('admin'), controller.create);

export default router;
