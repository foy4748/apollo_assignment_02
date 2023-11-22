import cors from 'cors';
import express, {Application, Request, Response} from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

// App Routes

const getAController = (_: Request, res: Response) => {
	const a = 10;
	res.send(a);
};

app.get('/', getAController);

export default app;
