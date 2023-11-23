import { NextFunction, Request, Response } from 'express';
import { IUser } from './user.interface';
import {
  SgetAllUsers,
  SpostSingleUser,
  SgetSingleUser,
  SdeleteSingleUser,
} from './user.service';
import userValidationSchema from './user.validation';

type TerrorObj = {
  success: false;
  message: string;
  error: {
    code: number;
    description: string;
  };
};

type TresObj = {
  success: true;
  message: string;
  data: object | object[] | null;
};

const errorHandler = async (
  error: Partial<TerrorObj>,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  return res.send(error);
};

const getAllUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users: IUser[] = await SgetAllUsers();
    res.json(users);
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to GET All Users.',
      error: {
        code: 501,
        description: 'FAILED to GET All Users.',
      },
    };
    next(errorObj);
  }
};

const postSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodValidatedData = userValidationSchema.parse(req.body);
    const response = await SpostSingleUser(zodValidatedData);
    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = response;
    address._id = undefined;
    fullName._id = undefined;
    const resObj: TresObj = {
      success: true,
      message: 'User created successfully!',
      data: {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    };
    res.send(resObj);
  } catch (error: unknown) {
    console.log(error);
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to POST Single User Data.',
      error: {
        code: 501,
        description: 'FAILED to POST Single User Data.',
      },
    };
    next(errorObj);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user: IUser | null = await SgetSingleUser(userId);
    if (user) {
      const resObj: TresObj = {
        success: true,
        message: 'User fetched successfully!',
        data: user,
      };
      return res.json(resObj);
    } else {
      const errorObj: TerrorObj = {
        success: false,
        message: `NO user found using provided slug: ${userId}`,
        error: {
          code: 404,
          description: `NO user found using provided slug: ${userId}`,
        },
      };
      return res.json(errorObj);
    }
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to GET Single User Data.',
      error: {
        code: 501,
        description: 'FAILED to GET Single User Data.',
      },
    };
    res.send(errorObj);
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await SdeleteSingleUser(userId);
    const resObj: TresObj = {
      success: true,
      message: 'User deleted successfully!',
      data: null,
    };
    return res.json(resObj);
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to DELETE Single User',
      error: {
        code: 501,
        description: 'FAILED to DELETE Single User Data.',
      },
    };
    res.send(errorObj);
  }
};

export {
  getAllUsers,
  postSingleUser,
  getSingleUser,
  deleteSingleUser,
  errorHandler,
};
