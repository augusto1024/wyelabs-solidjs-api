import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import NotionApi from './notion-api';

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CORS_URL,
  })
);

app.get('/people', async (req, res, next) => {
  const { amount = 1 } = req.query;

  const notion = await NotionApi.init();
  let promiseArray = [];

  for (let i = 0; i < amount; i++) {
    promiseArray.push(notion.getRandomPerson());
  }

  const people = await Promise.all(promiseArray);
  amount === 1 ? res.send(people[0]) : res.send(people);
});

const port = process.env.PORT;

app.listen(port);
