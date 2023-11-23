import { Request, Response } from 'express';
import { IUser } from './user.interface';
import {
  SgetAllUsers,
  SpostSingleUser,
  SgetSingleUser,
  SdeleteSingleUser,
} from './user.service';
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
    return res.send(errorObj);
  }
};

const postSingleUser = async (req: Request, res: Response) => {
  try {
    const zodValidatedData = userValidationSchema.parse(req.body);
    const response = await SpostSingleUser(zodValidatedData);
    const resObj = {
      success: true,
      message: 'User created successfully!',
      data: response,
    };
    res.send(resObj);
  } catch (error) {
    console.log(error);
    const errorObj = {
      success: false,
      message: 'Something Went Wrong',
    };
    return res.send(errorObj);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user: IUser = (await SgetSingleUser(userId)) as IUser;
    return res.json(user);
  } catch (error: unknown) {
    const errorObj = {
      success: false,
      message: 'Something Went Wrong',
    };
    res.send(errorObj);
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await SdeleteSingleUser(userId);
    return res.json(user);
  } catch (error: unknown) {
    const errorObj = {
      success: false,
      message: 'Something Went Wrong',
    };
    res.send(errorObj);
  }
};

export { getAllUsers, postSingleUser, getSingleUser, deleteSingleUser };
