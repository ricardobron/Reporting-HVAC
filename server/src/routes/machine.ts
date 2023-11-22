import { Router } from 'express';

import Controller from '@controllers/machineController';
import ensureAuthenticated from '@app/middlewares/ensureAuthenticated';

import * as shared from '../app/validation/shared';
import * as machineValidation from '../app/validation/machineValidation';
import schemaValidator from '@app/middlewares/schemaValidator';

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
router.get(
  '/:id/qrcode',
  ensureAuthenticated('all'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.printLabelToPdf
);

router.post(
  '/',
  ensureAuthenticated('admin'),
  schemaValidator(machineValidation.createBody, 'body'),
  controller.create
);
router.put(
  '/:id',
  ensureAuthenticated('admin'),
  schemaValidator(machineValidation.updateBody, 'body'),
  controller.update
);
router.delete(
  '/:id',
  ensureAuthenticated('admin'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.delete
);

export default router;
