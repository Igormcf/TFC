import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validLogin from '../middlewares/validLogin';

const router = Router();
const loginController = new LoginController();

router.post('/login', validLogin, loginController.loginUser);

export default router;
