# Blogs Api

# Sumário

 - [Contexto](#contexto)
- [Tecnologias usadas](#tecnologias-usadas)
- [Configuração inicial](#configuração-inicial)
- [Executando a aplicação](#executando-aplicação)
- [Testes](#testes)
- [Rotas](#testes)
	- [POST `/user`](#post-user)
	- [POST `/login`](#post-login)
	- [GET `/user`](#get-user)
	- [GET `/user/:id`](#get-user-id)
	- [DELETE `/user/me`](#delete-user-me)
	- [POST `/categories`](#post-categories)
	- [GET `/categories`](#get-categories)
	- [POST `/post`](#post-post)
	- [GET `/post/`](#get-post)
	- [GET`/post/:id`](#get-post-id)
	- [PUT`/post/:id`](#put-post-id)
	- [DELETE `/post/:id`](#delete-post-id)
	- [GET `post/search?q=:searchTerm`](#get-postsearchqsearchterm)

# Contexto

Neste projeto foi desenvolvida uma `API RESTful` utilizando a arquitetura MSC, em conjunto com o `ORM` `Sequelize`.

A API trata-se de um sistema de gerenciamento de um Blog, onde é possível, utilizando o `CRUD`, gerenciar posts, usuários e categorias. Também possui rotas de cadastro e login, feitas utilizando a biblioteca `JSON Web Token` para gerenciar o login e atividades dos usuários no Blog.
___

## Tecnologias usadas

> Desenvolvido usando: Javascript, Express, Node.js, Sequelize, JWT, Joi, ESlint, Mysql, Mocha, Chai, Sinon
___
## Configuração inicial

Instale as dependências do projeto: 

```bash
npm install
```

Para que o projeto funcione corretamente será necessário criar um arquivo do tipo `.env` com as variáveis de ambiente referentes ao banco de dados, portas a serem utilizadas e o seu segredo para utilizar o [JWT](https://jwt.io/introduction). Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo `.env` ficará desta forma:

```sh
MYSQL_USER=nome
MYSQL_PASSWORD=1234
HOSTNAME=localhost
PORT=3000
JWT_SECRET=secret
```
---
  Logo em seguida será necessário criar o banco de dados e as tabelas que vão compor o banco. Para isso basta ter o MySQL ativo na máquina, e utilizar os seguintes comandos:

```bash
npm run prestart
```
Este comendo vai automaticamente criar o bando de dados da API e criar todas as tabelas.

Caso queira automaticamente incluir alguns dados para teste nas tabelas, basta rodar o seguinte comando: 

```bash
npm run seed
```

---
O banco terá as tabelas: `users`, `categories` e `blogposts` e `postscategories`.

A tabela `users` tem o seguinte formato:

![Tabela Users](./public/users.png)

A tabela `categories` tem o seguinte formato:

![Tabela Categories](./public/categories.png)

A tabela `blogposts` tem o seguinte formato:

![Tabela Blogposts](./public/blogposts.png)

A tabela `postscategories`, é a tabela que faz o relacionamento `N:N` entre `blogposts` e `categories` e tem o seguinte formato:

![Tabela Postscategories](./public/postscategories.png)

## Executando a aplicação

Para executar a aplicação normalmente:
```bash
npm start
```
Para executar em modo de desenvolvimento, com a ferramenta `Nodemon`, onde a cada vez que um arquivo é alterado, o servidor é reiniciado automaticamente, assim, não há a necessidade de utilizar o `npm start` a cada alteração feita nos arquivos.
```bash
npm run debug
```
___
## Testes

  A API possui até o momento somente testes unitários para a camada `Service`,  para rodar os testes basta executar o comando abaixo:
```bash
npm test
```
___
## Rotas

###  POST `/user`
Rota responsável por cadastrar um usuário no blog, na tabela `users`. o `body` da requisição deve ter o seguinte formato:

```json
{
  "displayName": "nome",
  "email": "email@email.com",
  "password": "123456",
  "image": "http://image/image.png"
}
```

Exemplo de retorno com sucesso:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```
_token fictício_

Ao realizar o cadastro será retornado um token, que será necessário para realizar ações outras ações na API.

#### Regras:
- Somente o atributo `image` é opcional ao realizar a requisição;
- Atributo `displayName` não pode ter menos de 8 caracteres;
- Não será possível cadastrar um usuário que já esteja com o mesmo `email` no banco;
- Atributo `email` deve ter o formato correto `<prefixo>@<domínio>`;
- Atributo `password` deve ter `6` caracteres.
---
###  POST `/login`
Rota responsável por realizar o login de um usuário cadastrado. o `body` da requisição deve ter o seguinte formato:

```json
{
  "email": "email@mail.com",
  "password": "123456"
}
```

Exemplo de retorno com sucesso:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```
_token fictício_

Ao realizar o login será retornado um token, que será necessário para realizar ações outras ações na API.


Quando os dados de login estão incorretos:

```json
{
   "message": "Invalid fields"
}
```

#### Regras:
- Atributos `email` e `password` não podem estar vazios ou faltando.
---

###  GET `/user`
Rota responsável por listar todos os usuários cadastrados na tabela `users`. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-user.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Exemplo de retorno com sucesso:
```json
[
  {
    "id": 1,
    "displayName": "nome",
	"email": "email@email.com",
	"password": "123456",
	"image": "http://image/image.png"
  }
]
```
---


###  GET `/user/:id`
Rota responsável por listar um único usuário cadastrado na tabela `users`. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-userid.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___
Exemplo de retorno com sucesso:
```json
 {
	"id": 1,
    "displayName": "nome",
	"email": "email@email.com",
	"password": "123456",
	"image": "http://image/image.png"
 }
```
Quando o usuário com o id informado não existe:
```json
{
   "message": "User does not exist"
}
```

---
###  DELETE `/user/me`
Rota responsável por deletar o usuário logado. Para realizar a remoção do usuário será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-userdelete.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Quando o usuário é removido com sucesso, é retornado o status `204` sem nenhum conteúdo:
```sh
no body returned for response
```
---

###  POST `/categories`
Rota responsável por cadastrar uma nova categoria na tabela `categories`. Para realizar o cadastro será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-categories.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___
Além disso, o `body` da requisição deve ter o seguinte formato:

```json
 {
   "name": "Tecnologia"
 }
```
 
Exemplo de retorno com sucesso:
```json
 {
	"id": 1,
    "name": "Tecnologia"
 }
```
#### Regras:
-  Atributo `name` não pode estar vazio ou faltando.

---
###  GET `/categories`
Rota responsável por listar as categorias cadastradas na tabela `categories`. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-categoriesget.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Exemplo de retorno com sucesso:
```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```
---

###  POST `/post`
Rota responsável por cadastrar um novo post do blog na tabela `blogposts`. Para realizar o cadastro será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-postpost.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___
Além disso, o `body` da requisição deve ter o seguinte formato:

```json
{
  "title": "New post",
  "content": "Information about the new post",
  "categoryIds": [1, 2]
}
```
 
Exemplo de retorno com sucesso, o post é vinculado ao id do usuário que está logado:
```json
{
  "id": 3,
  "userId": 1,
  "title": "New post",
  "content": "Information about the new post",
  "categoryIds": [1, 2]
}
```
Quando o id da categoria informada não existe:
```json
{
   "message": "categoryIds not found"
}
```

#### Regras:
- Atributos `title`, `content` e `categoryIds` não podem estar vazios ou faltando.

---
###  GET `/post`
Rota responsável por listar todos os posts cadastrados na tabela `blogposts`. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-postget.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Exemplo de retorno com sucesso:
```json
[
  {
    "id": 1,
    "title": "Post",
    "content": "Post content",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "User",
      "email": "email@email.com",
      "image": "https://image/image.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Tecnologia"
      }
    ]
  }
]
```
---
###  GET `/post/:id`
Rota responsável por listar um único post cadastrado na tabela `blogposts`. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-postgetid.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___
Exemplo de retorno com sucesso:
```json
{
   "id": 1,
   "title": "Post",
   "content": "Post content",
   "userId": 1,
   "published": "2011-08-01T19:58:00.000Z",
   "updated": "2011-08-01T19:58:51.000Z",
   "user": {
     "id": 1,
     "displayName": "User",
     "email": "email@email.com",
     "image": "https://image/image.jpg"
   },
   "categories": [
     {
       "id": 1,
       "name": "Tecnologia"
     }
   ]
}
```
Quando o post com o id informado não existe:
```json
{
   "message": "Post does not exist"
}
```
---
###  PUT `/post/:id`
Rota responsável por atualizar os dados de um post cadastrado na tabela `blogposts` com base no id. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-postput.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Exemplo de retorno com sucesso:
```json
{
   "title": "Update Post",
   "content": "Updated content",
   "userId": 1,
   "categories": [
     {
       "id": 1,
       "name": "Tecnologia"
     }
   ]
}
```

Quando o usuário que está tentando atualizar o post não é o criador do post:
```json
{
   "message": "Unauthorized user"
}
```

Não será possível atualizar o conteúdo do post quando informado o atributo `categoryIds` na requisição, caso o atributo seja enviado, será retornado o seguinte erro:
```json
{
   "message": "Categories cannot be edited"
}
```
Quando o post com o id informado não existe:
```json
{
   "message": "Post does not exist"
}
```

#### Regras:
- Atributos `title` e `content`  não podem estar vazios ou faltando.
---

###  DELETE `/post/:id`
Rota responsável por deletar um post cadastrado na tabela `blogposts` com base no id. Para realizar a remoção do post será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-postdelete.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Quando o post é removido com sucesso, é retornado o status `204` sem nenhum conteúdo:
```sh
no body returned for response
```

Quando o usuário que está tentando remover o post não é o criador do post:
```json
{
   "message": "Unauthorized user"
}
```

Quando o post com o id informado não existe:
```json
{
   "message": "Post does not exist"
}
```
---
###  GET `post/search?q=:searchTerm`
Rota responsável por listar todos os posts cadastrados na tabela `blogposts` com base em um termo de pesquisa, sendo possível procurar pelo titulo ou pelo conteúdo do post. Para realizar a listagem será necessário possuir um token, que é gerado ao realizar o cadastro ou o login do usuário, e incluí-lo nos `headers` da requisição com a chave `authorization`.

![exemplo headers token](./public/token-postget.png)

Quando o token não é informado na requisição:
```json
{
   "message": "Token not found"
}
```
Quando o token é inválido:
```json
{
   "message": "Expired or invalid token"
}
```
___

Exemplo de retorno com sucesso, procurando pelo titulo do Post. `post/search?q=Post`:
```json
[
  {
    "id": 1,
    "title": "Post",
    "content": "Post content",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "User",
      "email": "email@email.com",
      "image": "https://image/image.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Tecnologia"
      }
    ]
  }
]
```

#### Regras:
- Quando não é informado nada na pesquisa são retornados todos os posts.
- Quando se busca um post inexistente é retornado um array vazio `[]`
