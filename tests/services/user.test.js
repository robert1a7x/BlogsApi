const { expect } = require('chai');
const Sinon = require('sinon');
const { create, getAll, getById, remove } = require('../../services/userService');
const { User } = require('../../models');
const { userMock, createUserMock } = require('../services/mocks');

describe('Testes da rota de USERS', () => {
  describe('Método getAll()', () => {
    before(() => {
      Sinon.stub(User, 'findAll').resolves(userMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar uma lista de usuarios', async() => {
      const users = await getAll();

      expect(users).to.deep.eq(userMock);
    });
  });

	describe('Método create()', () => {
    describe('Quando criado com sucesso', () => {
			before(() => {
				Sinon.stub(User, 'create').resolves(userMock[0]);
				Sinon.stub(User, 'findAll').resolves([]);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar uma string com um token jwt', async() => {
				const createToken = await create(createUserMock);

				expect(createToken).to.be.a('string');
			});
		});

		describe('Quando o displayName, email ou password estão no formato incorreto ou não são passados na requisição', () => {
			it('deve retornar um objeto de erro, com o erro 400', async() => {
				const user = await create({ displayName: "Brett Wiltshire" });
				
				expect(user).to.have.property('errCode');
				expect(user.errCode).to.be.eq(400);
			});
		});

		describe('Quando já existe um usuario com esses dados cadastrado', () => {
			before(() => {
				Sinon.stub(User, 'findAll').resolves(userMock);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 409 e a mensagem "User already registered"', async() => {
				const user = await create(createUserMock);

				expect(user).to.have.property('errCode');
				expect(user.errCode).to.be.eq(409);
				expect(user.message).to.be.eq('User already registered');
			});
		});
  });

	describe('Método getById()', () => {
    describe('Quando acha um usuario com o ID informado', () => {
			before(() => {
				Sinon.stub(User, 'findAll').resolves(userMock);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto com os dados do usuario procurado', async() => {
				const user = await getById();
	
				expect(user).to.deep.eq(userMock[0]);
			});
		});

		describe('Quando o usuario não é encontrado', () => {
			before(() => {
				Sinon.stub(User, 'findAll').resolves([]);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 404 e a mensagem "User does not exist"', async() => {
				const user = await getById();
	
				expect(user).to.have.property('errCode');
				expect(user.errCode).to.be.eq(404);
				expect(user.message).to.be.eq('User does not exist');
			});
		});
  });

	describe('Método remove()', () => {
    describe('Quando acha um usuario com o ID informado para ser removido', () => {
			before(() => {
				Sinon.stub(User, 'destroy').resolves(1);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar true, pois o usuario foi removido', async() => {
				const user = await remove('1111');
	
				expect(user).to.eq(true);
			});
		});

		describe('Quando o usuario não é encontrado', () => {
			before(() => {
				Sinon.stub(User, 'destroy').resolves(0);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 404 e a mensagem "User Already removed"', async() => {
				const user = await remove('token');
	
				expect(user).to.have.property('errCode');
				expect(user.errCode).to.be.eq(404);
				expect(user.message).to.be.eq('User Already removed');
			});
		});
  });
});