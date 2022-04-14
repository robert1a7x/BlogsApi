const { expect } = require('chai');
const Sinon = require('sinon');
const { create, getAll } = require('../../services/categorieService');
const { Categorie } = require('../../models');
const { categoriesMock } = require('../services/mocks');

describe('Testes da rota de categorias', () => {
  describe('Método getAll()', () => {
    before(() => {
      Sinon.stub(Categorie, 'findAll').resolves(categoriesMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar uma lista de categorias', async() => {
      const categories = await getAll();

      expect(categories).to.deep.eq(categoriesMock);
    });
  });

	describe('Método create()', () => {
    describe('Quando criado com sucesso', () => {
			before(() => {
				Sinon.stub(Categorie, 'create').resolves({id: 1, name: "Inovação" });
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto com a categoria criada', async() => {
				const newCategory = await create({ name: "Inovação" });

				expect(newCategory).to.deep.eq({id: 1, name: "Inovação" });
			});
		});

		describe('Quando nao é passado o atributo name na requisicao', () => {
			it('deve retornar um objeto de erro, com o erro 400', async() => {
				const newCategory = await create({});
				
				expect(newCategory).to.deep.eq({ errCode: 400, message: '"name" is required' });
			});
		});

  });
});