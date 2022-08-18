import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const MESSAGE_JOI = 'Incorrect email or password';

const loginDTO = Joi.object({
  email: Joi.string().email().required().empty(),
  password: Joi.string().required().empty(),
}).messages({
  'any.required': MESSAGE_JOI,
  'string.base': MESSAGE_JOI,
  'string.email': MESSAGE_JOI,
  'string.empty': MESSAGE_JOI,
});

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginDTO.validate(req.body);

  if (error) {
    const [message] = error.details.map((e) => e.message);

    return res.status(400).json({ message });
  }

  return next();
};

export default validLogin;
