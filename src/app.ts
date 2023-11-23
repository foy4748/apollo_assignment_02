import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { getAllUsers } from './app/modules/user/user.controller';

const app: Application = express();

app.use(express.json());
app.use(cors());

// App Routes
app.use('/api/users', getAllUsers);

const getAController = (_: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
