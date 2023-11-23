import { Request, Response } from 'express';
import { IUser } from './user.interface';
import { SgetAllUsers } from './user.service';

const getAllUsers = async (_: Request, res: Response) => {
  const users: IUser[] = await SgetAllUsers();
  res.json(users);
};

export { getAllUsers };
