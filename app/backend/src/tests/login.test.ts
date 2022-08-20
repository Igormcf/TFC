import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { describe } from 'mocha';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  describe('Testa ao fazer um novo login', () => {
    let obj = {
      email: 'user@user.com',
      password: 'secret_user',
    };

    beforeEach(() => {
      obj = {
        email: 'user@user.com',
        password: 'secret_user',
      }
      sinon.restore();
    });

    it('Retorna o status 400 ao informar um email em branco', async () => {
      obj.email = '';

      const response = await chai.request(app).post('/login').send(obj);

      expect(response).to.have.status(400);
    });

    it('Retorna o status 400 ao informar uma senha em branco', async () => {
      obj.password = '';

      const response = await chai.request(app).post('/login').send(obj);

      expect(response).to.have.status(400);
    });

    it('retorna o status 401 ao informar um email inexistente/inválido', async () => {
      obj.email = 'emailerrado@inexistente.com';

      const response = await chai.request(app).post('/login').send(obj);

      expect(response).to.have.status(401);
    });

    it('Retorna o status 200 ao fazer login com o payload correto', async () => {
      const response = await chai.request(app).get('/login');

      expect(response).to.have.status(200);
    });

    it('Retorna um token ao fazer login com o payload correto', async () => {
      const response = await chai.request(app).post('/login').send(obj);

      expect(response.body).to.have.property('token');
    });

    it('Retorna o status 200 na rota "/login/validate" caso o token gerado seja válido', async () => {
      const response = await chai.request(app).get('/login/validate');

      expect(response).to.have.status(200);
    });

    it('Retorna o "role" do usuário logado', async () => {
      const response = await chai.request(app).post('/login/validate').send(obj);

      expect(response.body).to.have.property('role');
    });
  })
}) 