import Joi from '@hapi/joi';

import { METER_TYPE } from '../types/meter.js';

export const createMeterApiValidator = Joi.object({
  name: Joi.string().required(),
  meterNumber: Joi.string().required(),
  typeOfMeter: Joi.string().valid(METER_TYPE).required(),
  vendor: Joi.string().required()
});
