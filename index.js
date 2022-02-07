const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categorieController = require('./controllers/categorieController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.create);
app.get('/user', authMiddleware, userController.getAll);
app.get('/user/:id', authMiddleware, userController.getById);

app.post('/login', loginController.login);

app.post('/categories', authMiddleware, categorieController.create);
app.get('/categories', authMiddleware, categorieController.getAll);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
