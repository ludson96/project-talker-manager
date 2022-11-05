const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const getTalker = require('./middlewares/getTalker');
const generateToken = require('./middlewares/generateToken');
const validateLogin = require('./middlewares/validateLogin');
const validAuthorization = require('./middlewares/validAuthorization');
const validName = require('./middlewares/validName');
const validAge = require('./middlewares/validAge');
const validWatched = require('./middlewares/validWatched');
const validRate = require('./middlewares/validRate');
const validTalk = require('./middlewares/validTalk');

const talkerPath = path.resolve(__dirname, './talker.json');
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
    const token = generateToken();
    return res.status(200).json({ token });
});

app.post('/talker', 
  validAuthorization, 
  validName, validAge, 
  validTalk, 
  validWatched,
  validRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await getTalker();
    const newTalker = {
      id: talker[talker.length - 1].id + 1,
      name,
      age,
      talk,
    };
    const allTalker = JSON.stringify([...talker, newTalker]);
    console.log(allTalker);
    await fs.writeFile(talkerPath, allTalker);
    res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validAuthorization, 
  validName, validAge, 
  validTalk, 
  validWatched,
  validRate,
  async (req, res) => {
    const id = Number(req.params.id);
    const { name, age, talk } = req.body;
    const talker = await getTalker();
    const index = talker.findIndex((e) => e.id === id);
    talker[index] = { id, name, age, talk };
    const updateTalkers = JSON.stringify(talker, null, 2);
    await fs.writeFile(talkerPath, updateTalkers);
    res.status(200).json(talker[index]);
});

app.delete('/talker/:id', validAuthorization, async (req, res) => {
  try {
  const id = Number(req.params.id);
  const talkers = await getTalker();
  const talkerDelete = talkers.filter((talker) => talker.id !== id);
  const newTalkers = JSON.stringify(talkerDelete, null, 2);
  await fs.writeFile(talkerPath, newTalkers);
  res.status(204).json();
  } catch (erro) {
    res.status(500).send({ message: erro.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
