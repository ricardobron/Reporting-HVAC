import { Router } from 'express';

import Controller from '@controllers/sessionController';
import schemaValidator from '@app/middlewares/schemaValidator';

import * as sessionsValidation from '../app/validation/sessionsValidation';

const router = Router();
const controller = new Controller();

router.post(
  '/admin',
  schemaValidator(sessionsValidation.createAdminBody, 'body'),
  controller.authenticateAdmin
);
router.post(
  '/company',
  schemaValidator(sessionsValidation.createCompanyBody, 'body'),
  controller.authenticateCompany
);
router.post(
  '/validateToken',
  schemaValidator(sessionsValidation.validateTokenBody, 'body'),
  controller.validateToken
);

export default router;
