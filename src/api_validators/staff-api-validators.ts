import Joi from '@hapi/joi';

export const createStaffApiValidator = Joi.object({
  fullName: Joi.string().required(),
  role: Joi.string().valid('admin', 'installer').required(),
  staffRegion: Joi.string().valid('nassarawa', 'abuja', 'kogi', 'niger').required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phoneNumber: Joi.string().required(),
  nickName: Joi.string().required()
});

export const staffLoginApiValidator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required()
});

export const updateStaffApiValidator = Joi.object({
  fullName: Joi.string(),
  role: Joi.string().valid('admin', 'installer').required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phoneNumber: Joi.string(),
  nickName: Joi.string(),
  id: Joi.string().required(),
  isActive: Joi.boolean()
});

export const changePasswordApiValidator = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

export const resetPasswordApiValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } })
});
