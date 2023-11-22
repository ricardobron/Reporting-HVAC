import { Router } from 'express';

import Controller from '@controllers/reportsController';
import ensureAuthenticated from '@app/middlewares/ensureAuthenticated';
import schemaValidator from '@app/middlewares/schemaValidator';

import * as shared from '../app/validation/shared';
import * as reportsValidation from '../app/validation/reportsValidation';

const router = Router();
const controller = new Controller();

router.get(
  '/all/:id',
  ensureAuthenticated('all'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.find
);
router.get(
  '/:id',
  ensureAuthenticated('all'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.findById
);
router.post(
  '/',
  ensureAuthenticated('admin'),
  schemaValidator(reportsValidation.createBody, 'body'),
  controller.create
);
router.put(
  '/:id',
  ensureAuthenticated('admin'),
  schemaValidator(shared.findByIdParam, 'params'),
  schemaValidator(reportsValidation.updateBody, 'body'),
  controller.update
);
router.delete(
  '/:id',
  ensureAuthenticated('admin'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.delete
);

export default router;
