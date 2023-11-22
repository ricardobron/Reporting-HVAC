import { Router } from 'express';

import Controller from '@controllers/companyController';
import ensureAuthenticated from '@app/middlewares/ensureAuthenticated';
import schemaValidator from '@app/middlewares/schemaValidator';

import * as shared from '../app/validation/shared';
import * as companyValidation from '../app/validation/companyValidation';

const router = Router();
const controller = new Controller();

router.get('/', ensureAuthenticated('admin'), controller.find);
router.get(
  '/:id',
  ensureAuthenticated('all'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.findById
);
router.post(
  '/',
  ensureAuthenticated('admin'),
  schemaValidator(companyValidation.createBody, 'body'),
  controller.create
);
router.put(
  '/:id',
  ensureAuthenticated('admin'),
  schemaValidator(shared.findByIdParam, 'params'),
  schemaValidator(companyValidation.updateBody, 'body'),
  controller.update
);
router.delete(
  '/:id',
  ensureAuthenticated('admin'),
  schemaValidator(shared.findByIdParam, 'params'),
  controller.delete
);

export default router;
