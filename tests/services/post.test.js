const { expect } = require('chai');
const Sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { create, getAll, getByQuery, getByPostId, update, remove } = require('../../services/postService');
const { User, BlogPost, Categorie } = require('../../models');
const { userMock, postMock, categoriesMock, createdPostMock, createPostMock,updatedPostMock } = require('../services/mocks');

describe('Testes da rota de POSTS', () => {
  describe('Método getAll()', () => {
    before(() => {
      Sinon.stub(BlogPost, 'findAll').resolves(postMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar uma lista de usuarios', async() => {
      const posts = await getAll();

      expect(posts).to.deep.eq(postMock);
    });
  });

	describe('Método create()', () => {
    describe('Quando criado com sucesso', () => {
			before(() => {
				Sinon.stub(Categorie, 'findAll').resolves(categoriesMock);
				Sinon.stub(User, 'findAll').resolves(userMock);
				Sinon.stub(BlogPost, 'create').resolves(createdPostMock);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto com os dados do post criado', async() => {
				const post = await create(createPostMock);

				expect(post).to.be.eq(createdPostMock);
			});
		});

		describe('Quando o title, content ou categoryIds estão no formato incorreto ou não são passados na requisição', () => {
			it('deve retornar um objeto de erro, com o erro 400', async() => {
				const post = await create({ title: 'post' });
				
				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(400);
			});
		});

		describe('Quando o id da categoria informada nao existe', () => {
			before(() => {
				Sinon.stub(Categorie, 'findAll').resolves([]);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 400 e a mensagem "categoryIds not found"', async() => {
				const post = await create(createPostMock);

				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(400);
				expect(post.message).to.be.eq('"categoryIds" not found');
			});
		});
  });

	describe('Método getByQuery()', () => {
    before(() => {
      Sinon.stub(BlogPost, 'findAll').resolves(postMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar uma lista com os posts pelo titulo ou conteudo', async() => {
      const posts = await getByQuery('Post do Ano');

      expect(posts).to.deep.eq(postMock);
    });
  });

	describe('Método getByPostId()', () => {
    describe('Quando acha um post com o ID informado', () => {
			before(() => {
				Sinon.stub(BlogPost, 'findByPk').resolves(postMock[0]);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto com os dados do usuario procurado', async() => {
				const post = await getByPostId(1);
	
				expect(post).to.deep.eq(postMock[0]);
			});
		});

		describe('Quando o post não é encontrado', () => {
			before(() => {
				Sinon.stub(BlogPost, 'findByPk').resolves(undefined);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 404 e a mensagem "Post does not exist"', async() => {
				const post = await getByPostId(10);
	
				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(404);
				expect(post.message).to.be.eq('Post does not exist');
			});
		});
  });

	describe('Método update()', () => {
    describe('Quando atualizado com sucesso', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves({ userId: 1 });
				Sinon.stub(BlogPost, 'findByPk').resolves(updatedPostMock);
				Sinon.stub(BlogPost, 'update').resolves();
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto com os dados do post atualizado', async() => {
				const post = await update({ title: 'Post do Ano', content: 'Ainda Melhor post do ano'}, 1, 'token');

				expect(post).to.be.eq(updatedPostMock);
			});
		});

		describe('Quando o title ou content estão no formato incorreto ou não são passados na requisição', () => {
			it('deve retornar um objeto de erro, com o erro 400', async() => {
				const post = await update({ title: 'post' });
				
				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(400);
			});
		});

		describe('Quando e passado uma categoria na requisicao', () => {
			it('deve retornar um erro informando que categorias nao podem ser editadas, erro 400, mensagem "Categories cannot be edited"', async() => {
				const post = await update({ title: 'Post', content: 'post post', categoryIds: [1, 2]}, 1, 'token');

				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(400);
				expect(post.message).to.be.eq('Categories cannot be edited');
			});
		});

		describe('Quando o post a ser atualizado não existe', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves({ userId: 1 });
				Sinon.stub(BlogPost, 'findByPk').resolves(null);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 404, e a mensagem "Post does not exist"', async() => {
				const post = await update({ title: 'Post do Ano', content: 'Ainda Melhor post do ano'}, 10, 'token');

				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(404);
				expect(post.message).to.be.eq('Post does not exist');
			});
		});

		describe('Quando a pessoa que está tentando atualizar o post não é o dono', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves({ userId: 10 });
				Sinon.stub(BlogPost, 'findByPk').resolves(postMock[0]);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 401, e a mensagem "Unauthorized user"', async() => {
				const post = await update({ title: 'Post do Ano', content: 'Ainda Melhor post do ano'}, 1, '1');

				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(401);
				expect(post.message).to.be.eq('Unauthorized user');
			});
		});
  });

	describe('Método remove()', () => {
    describe('Quando acha um post com o ID informado para ser removido', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves({ userId: 1 });
				Sinon.stub(BlogPost, 'findByPk').resolves(updatedPostMock);
				Sinon.stub(BlogPost, 'destroy').resolves();
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar true, pois o post foi removido', async() => {
				const post = await remove(1, 'token');
	
				expect(post).to.eq(true);
			});
		});

		describe('Quando o post não é encontrado', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves({ userId: 1 });
				Sinon.stub(BlogPost, 'findByPk').resolves(null);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 404, e a mensagem "Post does not exist"', async() => {
				const post = await remove(10, 'token');

				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(404);
				expect(post.message).to.be.eq('Post does not exist');
			});
		});

		describe('Quando a pessoa que está tentando remover o post não é o dono', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves({ userId: 10 });
				Sinon.stub(BlogPost, 'findByPk').resolves(postMock[0]);
			});
	
			after(() => {
				Sinon.restore();
			});
	
			it('deve retornar um objeto de erro, com o erro 401, e a mensagem "Unauthorized user"', async() => {
				const post = await remove(1);

				expect(post).to.have.property('errCode');
				expect(post.errCode).to.be.eq(401);
				expect(post.message).to.be.eq('Unauthorized user');
			});
		});
  });
});