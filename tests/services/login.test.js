const { expect } = require('chai');
const Sinon = require('sinon');
const { login } = require('../../services/loginService');
const { User } = require('../../models');
const { userMock } = require('../services/mocks');

describe('Testes do login', () => {
  describe('Método login()', () => {
		describe('Quando o login é feito com sucesso', () => {
			const loginData = {
				email: "email@mail.com",
				password: "123456"
			}
			
			before(() => {
				Sinon.stub(User, 'findAll').resolves(userMock);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar uma string com um token jwt', async() => {
				const loginToken = await login(loginData);

				expect(loginToken).to.be.a('string');
			});
		});

		describe('Quando o email e a senha estao no formato errado, ou não são passados na requisição', () => {
			const loginWrongData = {
				email: "email@mail.com",
			}

			it('deve retornar um objeto de erro, com o erro 400', async() => {
				const loginToken = await login(loginWrongData);

				expect(loginToken).to.have.property('errCode');
				expect(loginToken.errCode).to.be.eq(400);
			});
		});

		describe('Quando o usuario não é encontrado no banco de dados', () => {
			const loginData = {
				email: "email@mail.com",
				password: "123456"
			}

			before(() => {
				Sinon.stub(User, 'findAll').resolves([]);
			});
	
			after(() => {
				Sinon.restore();
			});

			it('deve retornar um objeto de erro, com o erro 400 e a mensagem "Invalid fields"', async() => {
				const loginToken = await login(loginData);
				
				expect(loginToken).to.have.property('errCode');
				expect(loginToken.errCode).to.be.eq(400);
				expect(loginToken.message).to.be.eq('Invalid fields');
			});
		});
  });
});