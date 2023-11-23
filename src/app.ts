import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRoutes from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// App Routes
app.use('/api/users', userRoutes);

app.get('/', (_: Request, res: Response) => {
  res.send({ success: true, message: 'Server is UP and RUNNING' });
});

export default app;
