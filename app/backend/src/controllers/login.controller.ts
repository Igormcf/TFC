import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { statusCode, result } = await this.loginService.loginUser(email, password);

    return res.status(statusCode).json(result);
  };

  public loginRole = async (req: Request, res: Response) => {
    const { role } = res.locals.user;

    return res.status(200).json({ role });
  };
}
