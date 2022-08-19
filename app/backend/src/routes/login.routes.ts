import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validLogin from '../middlewares/validLogin';
import validJWT from '../middlewares/validJWT';

const router = Router();
const loginController = new LoginController();

router.post('/login', validLogin, loginController.loginUser);
router.get('/login/validate', validJWT, loginController.loginRole);

export default router;
