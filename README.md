# Store Manager

# Sumário

 - [Contexto](#contexto)
- [Tecnologias usadas](#tecnologias-usadas)
- [Configuração inicial](#configuração-inicial)
- [Executando a aplicação](#executando-aplicação)
- [Testes](#testes)
- [Rotas](#testes)
	- [POST `/products`](#post-products)
	- [GET `/products`](#get-products)
	- [GET `/products/:id`](#get-products-id)
	- [PUT  `/products/:id`](#put-products-id)
	- [DELETE `/products/:id`](#delete-products)
	- [POST `/sales`](#post-sales)
	- [GET `/sales`](#get-sales)
	- [GET `/sales/:id`](#get-sales-id)
	- [PUT  `/sales/:id`](#put-sales)
	- [DELETE `/sales/:id`](#delete-sales)

# Contexto

Neste projeto foi desenvolvida uma `API RESTful` utilizando a arquitetura MSC, em conjunto com o `ORM` `Sequelize`.

A API trata-se de um sistema de gerenciamento de um Blog, onde é possível, utilizando o `CRUD`, gerenciar posts, usuários e categorias. Também possui rotas de cadastro e login, feitas utilizando a biblioteca `JSON Web Token` para gerenciar o login e atividades dos usuários no Blog.
  

## Tecnologias usadas

> Desenvolvido usando: Javascript, Express, Node.js, Sequelize, JWT, Joi, ESlint, Mysql, Mocha, Chai, Sinon

## Configuração inicial

Instale as dependências do projeto: 

```bash
npm install
```

Para que o projeto funcione corretamente será necessário criar um arquivo do tipo `.env` com as variáveis de ambiente referentes ao banco de dados, portas a serem utilizadas e o seu segredo para utilizar o `JWT`. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo `.env` ficará desta forma:

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

Caso queira automaticamente incluir alguns dados para teste nas tabelas, basta rodar o seguinte comendo: 

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

## Testes

  A API possui até o momento somente testes unitários para a camada `Service`,  para rodar os testes basta executar o comando abaixo:
```bash
npm test
```

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
	message: "Invalid fields"
}
```

#### Regras:
- Atributos `email` e `password` não podem estar vazios ou faltando.
---

###  GET `/products`
Rota responsável por listar todos os produtos cadastrados na tabela `products`.

Exemplo de retorno com sucesso:
```json
 [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ]
```
---

###  GET `/products/:id`
Rota responsável por listar o produto especificado pelo `id` passado na rota.

Exemplo de retorno com sucesso:
```json
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  }
```
Quando o `id` do produto não é encontrado:
```json
  { "message": "Product not found" }
```
---

###  PUT  `/products/:id`
Rota responsável por atualizar os dados de um produto específico na tabela `products`. O `id` do produto deve ser passado na rota, e o `body` da requisição deve ter o seguinte formato:

```json
{
  "name": "new_product_name",
  "quantity": 20
}
```
Exemplo de retorno com sucesso:
```json
{
  "id": 1
  "name": "new_product_name",
  "quantity": 20
}
```
Quando o `id` do produto não é encontrado:
```json
  { "message": "Product not found" }
```

#### Regras:
- Atributos `name` e `quantity` não podem estar vazios;
- Atributo `name` não pode ter menos de 5 caracteres;
- Atributo `quantity` deve ser igual ou maior que `1`.
---

###  DELETE `/products/:id`
Rota responsável por remover um produto da tabela `products` com base no `id` passado na requisição.

Exemplo de retorno com sucesso:
```json
   {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  }
```
Quando o `id` do produto a ser deletado não é encontrado:
```json
  { "message": "Product not found" }
```
---

###  POST `/sales`
Rota responsável por cadastrar novos produtos na tabela `sales`. o `body` da requisição deve ter o seguinte formato:

```json
[
  {
    "product_id": 1,
    "quantity": 5,
  }
]
```
Exemplo de retorno com sucesso:
```json
  {
    "id": 1,
    "itemsSold": [
      {
        "product_id": 1,
        "quantity": 5
      }
    ]
  }
```

Também é possível cadastrar múltiplas vendas com uma requisição, exemplo com a venda de dois produtos:
```json
   [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 5
    }
  ]
```
Retorno do banco após o cadastro da venda de dois produtos:
```json
  {
    "id": 1,
    "itemsSold": [
      {
        "product_id": 1,
        "quantity": 2
      },
      {
        "product_id": 2,
        "quantity": 5
      }
    ]
  }
```

#### Regras:
- Atributos `product_id` e `quantity` não podem estar vazios;
- Atributo `quantity` deve ser igual ou maior que `1`.
---

###  GET `/sales`
Rota responsável por listar todas as vendas cadastradas na tabela `sales`.

Exemplo de retorno com sucesso:
```json
 [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
    {
      "saleId": 2,
      "date": "2021-09-09T04:54:54.000Z",
      "product_id": 2,
      "quantity": 2
    }
  ]
```
---

###  GET   `/sales/:id`
Rota responsável por listar uma venda especificada pelo `id` passado na rota.

Exemplo de retorno de uma venda com múltiplos produtos:
```json
   [
    { 
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "product_id": 2,
      "quantity": 2
    }
  ]
```
Quando o `id` da venda não é encontrado:
```json
  { "message": "Sale not found" }
```
---

###  PUT  `/sales/:id`
Rota responsável por atualizar os dados de uma venda específica na tabela `sales`. O `id` da venda deve ser passada na rota, e o `body` da requisição deve ter o seguinte formato:

```json
[
  {
    "product_id": 3,
    "quantity": 30
  }
]
```
Exemplo de retorno com sucesso:
```json
  {
    "saleId": 1,
    "itemUpdated": [
      {
        "product_id": 3,
        "quantity": 30
      }
    ]
  }
```
Quando o `id` da venda não é encontrado:
```json
  { "message": "Sale not found" }
```

#### Regras:
- Atributos `product_id` e `quantity` não podem estar vazios;
- Atributo `quantity` deve ser igual ou maior que `1`.
---

###  POST `/user/`
Rota responsável por cadastrar um usuário no blog, direto na tabela `users`.

Exemplo de retorno com sucesso:
```json
  [
    { 
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "product_id": 2,
      "quantity": 2
    }
  ]
```
Quando o `id` da venda a ser deletada não é encontrado:
```json
  { "message": "Sale not found" }
```
