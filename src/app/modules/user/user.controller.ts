import { Request, Response } from 'express';
import { IUser } from './user.interface';
import { SgetAllUsers, SpostSingleUser } from './user.service';
import userValidationSchema from './user.validation';

const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users: IUser[] = await SgetAllUsers();
    res.json(users);
  } catch (error: unknown) {
    const errorObj = {
      success: false,
      message: 'Something Went Wrong',
    };
    res.send(errorObj);
  }
};

const postSingleUser = async (req: Request, res: Response) => {
  try {
    const zodValidatedData = userValidationSchema.parse(req.body);
    const response = await SpostSingleUser(zodValidatedData);
    res.send(response);
  } catch (error) {
    console.log(error);
    const errorObj = {
      success: false,
      message: 'Something Went Wrong',
    };
    res.send(errorObj);
  }
};

export { getAllUsers, postSingleUser };
