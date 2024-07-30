import Joi from '@hapi/joi';

export const createDeptApiValidator = Joi.object({
  name: Joi.string().required(),
  acronym: Joi.string().required()
});
