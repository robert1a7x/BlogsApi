const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.create);
app.post('/login', loginController.login);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
