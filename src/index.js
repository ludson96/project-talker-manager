const express = require('express');
const bodyParser = require('body-parser');
const getTalker = require('./middlewares/getTalker');
const generateToken = require('./middlewares/generateToken');
const validateLogin = require('./middlewares/validateLogin');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await getTalker();
  if (talker) return res.status(200).send(talker);
  res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const talker = await getTalker();
  const id = Number(req.params.id);
  const filtedTalker = talker.find((tal) => tal.id === id);
  if (filtedTalker) return res.status(200).send(filtedTalker);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});
  
app.post('/login', validateLogin, (_req, res) => {
  // const { email, password } = req.body;
  // if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
  // }
});

app.listen(PORT, () => {
  console.log('Online');
});
