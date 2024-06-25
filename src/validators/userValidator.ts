import Joi from 'joi';

export const validateUser = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().min(18),
    city: Joi.string(),
    zipCode: Joi.string().required()
  });
  return schema.validate(user);
};
