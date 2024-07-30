import Joi from '@hapi/joi';

export const createVendorApiValidator = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().required()
});
