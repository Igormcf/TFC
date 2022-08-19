import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../database/models/UsersModel';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const options: object = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export default class LoginService {
  public loginUser = async (email: string, password: string) => {
    const findUser = await UsersModel.findOne({ where: { email } });

    if (!findUser) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }

    const descriptPassword = bcryptjs.compareSync(password, findUser.password);

    if (!descriptPassword) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }

    const payload = {
      email,
      id: findUser.id,
    };

    const token = jwt.sign(payload, secret, options);

    return { statusCode: 200, result: { token } };
  };
}
