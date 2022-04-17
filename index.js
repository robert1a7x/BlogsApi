const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categorieController = require('./controllers/categorieController');
const postController = require('./controllers/postController');

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.create);
app.get('/user', authMiddleware, userController.getAll);
app.get('/user/:id', authMiddleware, userController.getById);
app.delete('/user/me', authMiddleware, userController.remove);

app.post('/login', loginController.login);

app.post('/categories', authMiddleware, categorieController.create);
app.get('/categories', authMiddleware, categorieController.getAll);

app.get('/post/search', authMiddleware, postController.getByQuery);
app.post('/post', authMiddleware, postController.create);
app.get('/post', authMiddleware, postController.getAll);
app.get('/post/:id', authMiddleware, postController.getByPostId);
app.put('/post/:id', authMiddleware, postController.update);
app.delete('/post/:id', authMiddleware, postController.remove);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
